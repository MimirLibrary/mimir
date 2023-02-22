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
    const query = this.buildSearchQuery(searchInput, selectHidden);

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
    searchInput: SearchInput,
    selectHidden: boolean
  ): SelectQueryBuilder<Material> {
    const queryBuilder = Material.createQueryBuilder('material').innerJoin(
      'status',
      'currentStatus',
      'material.current_status_id = currentStatus.id'
    );
    let isFirstWhere = true;
    if (
      this.addHiddenStatusesCondition(queryBuilder, selectHidden, isFirstWhere)
    ) {
      isFirstWhere = false;
    }
    if (!searchInput) {
      return queryBuilder;
    }

    if (
      this.addLocationsCondition(
        queryBuilder,
        searchInput.locations,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addExcludeLocationsCondition(
        queryBuilder,
        searchInput.excludeLocations,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addSearchCondition(queryBuilder, searchInput.search, isFirstWhere)
    ) {
      isFirstWhere = false;
    }
    if (
      this.addStatusesCondition(
        queryBuilder,
        searchInput.statuses,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addExcludeStatusesCondition(
        queryBuilder,
        searchInput.excludeStatuses,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addOverdueCondition(queryBuilder, searchInput.overdue, isFirstWhere)
    ) {
      isFirstWhere = false;
    }
    if (
      this.addAcceptedCondition(
        queryBuilder,
        searchInput.accepted,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addAuthorsCondition(queryBuilder, searchInput.authors, isFirstWhere)
    ) {
      isFirstWhere = false;
    }
    if (
      this.addExcludeAuthorsCondition(
        queryBuilder,
        searchInput.excludeAuthors,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (this.addTypesCondition(queryBuilder, searchInput.types, isFirstWhere)) {
      isFirstWhere = false;
    }
    if (
      this.addExcludeTypesCondition(
        queryBuilder,
        searchInput.excludeTypes,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addCategoriesCondition(
        queryBuilder,
        searchInput.categories,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    if (
      this.addExcludeCategoriesCondition(
        queryBuilder,
        searchInput.excludeCategories,
        isFirstWhere
      )
    ) {
      isFirstWhere = false;
    }
    return queryBuilder;
  }

  private addLocationsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    locations: number[],
    isFirstWhere: boolean
  ): boolean {
    if (locations?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        'material.location_id IN (:...locations)',
        { locations }
      );
      return true;
    }
    return false;
  }

  private addExcludeLocationsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeLocations: number[],
    isFirstWhere: boolean
  ): boolean {
    if (excludeLocations?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        'material.location_id NOT IN (:...excludeLocations)',
        {
          excludeLocations,
        }
      );
      return true;
    }
    return false;
  }

  private addSearchCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    search: string,
    isFirstWhere: boolean
  ): boolean {
    if (search) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `${
          search
            ? '(material.title ILIKE :text OR material.author ILIKE :text)'
            : ''
        }`,
        { text: `%${search}%` }
      );
      return true;
    }
    return false;
  }

  private addStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    statuses: string[],
    isFirstWhere: boolean
  ): boolean {
    if (statuses?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        'currentStatus.status IN (:...statuses)',
        {
          statuses,
        }
      );
      return true;
    }
    return false;
  }

  private addExcludeStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeStatuses: string[],
    isFirstWhere: boolean
  ): boolean {
    if (excludeStatuses?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        'currentStatus.status NOT IN (:...excludeStatuses)',
        {
          excludeStatuses,
        }
      );
      return true;
    }
    return false;
  }

  private addOverdueCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    overdue: boolean,
    isFirstWhere: boolean
  ): boolean {
    if (overdue === true || overdue === false) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        overdue
          ? `currentStatus.returnDate < NOW()`
          : `(currentStatus.returnDate IS NULL OR currentStatus.returnDate > NOW())`
      );
      return true;
    }
    return false;
  }

  private addAcceptedCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    accepted: boolean,
    isFirstWhere: boolean
  ): boolean {
    if (accepted === true || accepted === false) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `currentStatus.status ${
          accepted ? 'NOT' : ''
        } IN (:...notAcceptedStatuses)`,
        { notAcceptedStatuses: [StatusTypes.PENDING, StatusTypes.REJECTED] }
      );
      return true;
    }
    return false;
  }

  private addAuthorsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    authors: string[],
    isFirstWhere: boolean
  ): boolean {
    if (authors?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.author IN (:...authors)`,
        {
          authors,
        }
      );
      return true;
    }
    return false;
  }

  private addExcludeAuthorsCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeAuthors: string[],
    isFirstWhere: boolean
  ): boolean {
    if (excludeAuthors?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.author NOT IN (:...excludeAuthors)`,
        {
          excludeAuthors,
        }
      );
      return true;
    }
    return false;
  }

  private addTypesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    types: string[],
    isFirstWhere: boolean
  ): boolean {
    if (types?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.type IN (:...types)`,
        {
          types,
        }
      );
      return true;
    }
    return false;
  }

  private addExcludeTypesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeTypes: string[],
    isFirstWhere: boolean
  ): boolean {
    if (excludeTypes?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.type NOT IN (:...excludeTypes)`,
        {
          excludeTypes,
        }
      );
      return true;
    }
    return false;
  }

  private addCategoriesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    categories: string[],
    isFirstWhere: boolean
  ): boolean {
    if (categories?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.category IN (:...categories)`,
        { categories }
      );
      return true;
    }
    return false;
  }

  private addExcludeCategoriesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    excludeCategories: string[],
    isFirstWhere: boolean
  ): boolean {
    if (excludeCategories?.length) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        `material.category NOT IN (:...excludeCategories)`,
        { excludeCategories }
      );
      return true;
    }
    return false;
  }

  private addHiddenStatusesCondition(
    queryBuilder: SelectQueryBuilder<Material>,
    selectHidden: boolean,
    isFirstWhere: boolean
  ): boolean {
    if (!selectHidden) {
      queryBuilder[isFirstWhere ? 'where' : 'andWhere'](
        'currentStatus.status NOT IN (:...hiddenStatuses)',
        {
          hiddenStatuses: [
            StatusTypes.PENDING,
            StatusTypes.REJECTED,
            StatusTypes.SUSPEND,
          ],
        }
      );
      return true;
    }
    return false;
  }
}
