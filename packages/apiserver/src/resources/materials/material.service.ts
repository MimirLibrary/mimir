import { Injectable } from '@nestjs/common';
import { Material } from './material.entity';
import {
  DonateBookInput,
  RolesTypes,
  SearchInput,
  SortDir,
  StatusTypes,
} from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ErrorBook } from '../../errors';
import { GraphQLError } from 'graphql';
import axios from 'axios';
import { normalizeIdentifier } from '@mimir/helper-functions';
import { ConfigService } from '@nestjs/config';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@Injectable()
export class MaterialService {
  private get periodOfKeeping(): number {
    return +this.config.get('common.periodOfKeeping');
  }

  constructor(private connection: Connection, private config: ConfigService) {}

  async search(
    searchInput: SearchInput,
    sortBy: string,
    sortDir: SortDir,
    limit: number,
    offset: number,
    selectHidden = false
  ): Promise<Material[]> {
    const query = this.buildSearchQuery(searchInput);

    if (!selectHidden) {
      this.addExcludeHiddenStatusesCondition(query);
    }

    query.addOrderBy(sortBy ? `material.${sortBy}` : 'title', sortDir || 'ASC');
    if (limit != undefined) {
      query.limit(limit);
    }
    if (offset != undefined) {
      query.offset(offset);
    }

    return query.getMany();
  }

  async donate(donateBookInput: DonateBookInput) {
    const queryRunner = this.connection.createQueryRunner();
    const statusRepository =
      queryRunner.manager.getRepository<Status>('status');
    const materialRepository =
      queryRunner.manager.getRepository<Material>('material');
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { person_id, ...newMaterialObj } = donateBookInput;
      const updateIdentifier = normalizeIdentifier(donateBookInput.identifier);
      const isExistMaterial = await materialRepository.findOne({
        where: { identifier: updateIdentifier },
      });
      if (isExistMaterial) {
        throw new ErrorBook('This material already exists!');
      }
      const newMaterial = await materialRepository.create({
        ...newMaterialObj,
        identifier: updateIdentifier,
        is_donated: donateBookInput.role === RolesTypes.READER,
        picture: donateBookInput.picture,
        claimDuration: this.periodOfKeeping,
      });
      const savedMaterial = await materialRepository.save(newMaterial);
      await statusRepository.save({
        status:
          donateBookInput.role === RolesTypes.READER
            ? StatusTypes.PENDING
            : StatusTypes.FREE,
        material_id: savedMaterial.id,
        person_id: donateBookInput.person_id,
      });
      await queryRunner.commitTransaction();
      return savedMaterial;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new GraphQLError(e.message);
    } finally {
      await queryRunner.release();
    }
  }

  async getMaterialByIdentifierFromMetadata(identifier: string) {
    try {
      const responseMetadataService = await axios.get(
        `${process.env['NX_API_METADATA_URL']}/search/${identifier}`
      );
      return responseMetadataService.data;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  async getAllDonatedMaterialsByPerson(id: number | string) {
    try {
      return await Material.createQueryBuilder('material')
        .leftJoinAndSelect('material.status', 'status')
        .where('status.person_id = :person_id AND status.status = :status', {
          person_id: id,
          status: StatusTypes.PENDING,
        })
        .orderBy('material.created_at', 'ASC')
        .addOrderBy('status.created_at', 'ASC')
        .getMany();
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  public async deleteMaterial(identifier: string): Promise<Material> {
    return this.connection.transaction(async (manager) => {
      const material: Material = await manager.findOne(Material, {
        where: { identifier },
      });
      await manager.update(Material, material.id, { currentStatusId: null });
      await manager.delete(Status, { material_id: material.id });
      await manager.remove(Material, material);
      return material;
    });
  }

  private buildSearchQuery(
    searchInput: SearchInput
  ): SelectQueryBuilder<Material> {
    const queryBuilder = Material.createQueryBuilder('material').innerJoin(
      'status',
      'currentStatus',
      'material.current_status_id = currentStatus.id'
    );
    if (!searchInput) {
      return queryBuilder;
    }
    this.addLocationsCondition(queryBuilder, searchInput.locations);
    this.addExcludeLocationsCondition(
      queryBuilder,
      searchInput.excludeLocations
    );
    this.addSearchCondition(queryBuilder, searchInput.search);
    this.addStatusesCondition(queryBuilder, searchInput.statuses);
    this.addExcludeStatusesCondition(queryBuilder, searchInput.excludeStatuses);
    this.addOverdueCondition(queryBuilder, searchInput.overdue);
    this.addAcceptedCondition(queryBuilder, searchInput.accepted);
    this.addAuthorsCondition(queryBuilder, searchInput.authors);
    this.addExcludeAuthorsCondition(queryBuilder, searchInput.excludeAuthors);
    this.addTypesCondition(queryBuilder, searchInput.types);
    this.addExcludeTypesCondition(queryBuilder, searchInput.excludeTypes);
    this.addCategoriesCondition(queryBuilder, searchInput.categories);
    this.addExcludeCategoriesCondition(
      queryBuilder,
      searchInput.excludeCategories
    );
    return queryBuilder;
  }

  private addLocationsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    locations: number[]
  ): void {
    if (locations?.length) {
      queryBuilder.andWhere('material.location_id IN (:...locations)', {
        locations,
      });
    }
  }

  private addExcludeLocationsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeLocations: number[]
  ): void {
    if (excludeLocations?.length) {
      queryBuilder.andWhere(
        'material.location_id NOT IN (:...excludeLocations)',
        {
          excludeLocations,
        }
      );
    }
  }

  private addSearchCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    search: string | undefined
  ): void {
    if (search) {
      queryBuilder.andWhere(
        `${
          search
            ? '(material.title ILIKE :text OR material.author ILIKE :text)'
            : ''
        }`,
        { text: `%${search}%` }
      );
    }
  }

  private addStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    statuses: string[]
  ): void {
    if (statuses?.length) {
      queryBuilder.andWhere('currentStatus.status IN (:...statuses)', {
        statuses,
      });
    }
  }

  private addExcludeStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeStatuses: string[]
  ): void {
    if (excludeStatuses?.length) {
      queryBuilder.andWhere(
        'currentStatus.status NOT IN (:...excludeStatuses)',
        {
          excludeStatuses,
        }
      );
    }
  }

  private addOverdueCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    overdue: boolean | undefined
  ): void {
    if (overdue === true || overdue === false) {
      queryBuilder.andWhere(
        overdue
          ? `currentStatus.returnDate < NOW()`
          : `(currentStatus.returnDate IS NULL OR currentStatus.returnDate > NOW())`
      );
    }
  }

  private addAcceptedCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    accepted: boolean | undefined
  ): void {
    if (accepted === true || accepted === false) {
      queryBuilder.andWhere(
        `currentStatus.status ${
          accepted ? 'NOT' : ''
        } IN (:...notAcceptedStatuses)`,
        { notAcceptedStatuses: [StatusTypes.PENDING, StatusTypes.REJECTED] }
      );
    }
  }

  private addAuthorsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    authors: string[]
  ): void {
    if (authors?.length) {
      queryBuilder.andWhere(`material.author IN (:...authors)`, {
        authors,
      });
    }
  }

  private addExcludeAuthorsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeAuthors: string[]
  ): void {
    if (excludeAuthors?.length) {
      queryBuilder.andWhere(`material.author NOT IN (:...excludeAuthors)`, {
        excludeAuthors,
      });
    }
  }

  private addTypesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    types: string[]
  ): void {
    if (types?.length) {
      queryBuilder.andWhere(`material.type IN (:...types)`, {
        types,
      });
    }
  }

  private addExcludeTypesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeTypes: string[]
  ): void {
    if (excludeTypes?.length) {
      queryBuilder.andWhere(`material.type NOT IN (:...excludeTypes)`, {
        excludeTypes,
      });
    }
  }

  private addCategoriesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    categories: string[]
  ): void {
    if (categories?.length) {
      queryBuilder.andWhere(`material.category IN (:...categories)`, {
        categories,
      });
    }
  }

  private addExcludeCategoriesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeCategories: string[]
  ): void {
    if (excludeCategories?.length) {
      queryBuilder.andWhere(
        `material.category NOT IN (:...excludeCategories)`,
        { excludeCategories }
      );
    }
  }

  private addExcludeHiddenStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>
  ): void {
    queryBuilder.andWhere('currentStatus.status NOT IN (:...hiddenStatuses)', {
      hiddenStatuses: [
        StatusTypes.PENDING,
        StatusTypes.REJECTED,
        StatusTypes.SUSPEND,
      ],
    });
  }
}
