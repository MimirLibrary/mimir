import { Injectable } from '@nestjs/common';
import { Material } from './material.entity';
import {
  DonateBookInput,
  RolesTypes,
  SearchInput,
  StatusTypes,
} from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ErrorBook } from '../../errors';
import { GraphQLError } from 'graphql';
import axios from 'axios';
import { normalizeIdentifier } from '@mimir/helper-functions';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaterialService {
  private get periodOfKeeping(): number {
    return +this.config.get('common.periodOfKeeping');
  }

  constructor(private connection: Connection, private config: ConfigService) {}

  async search(
    searchInput: SearchInput,
    selectHidden = false
  ): Promise<Material[]> {
    const { search, locations } = searchInput;
    if (!search) {
      return [];
    }

    const query = Material.createQueryBuilder('material')
      .where('material.location_id IN (:...locations)', { locations })
      .andWhere(
        `${
          search
            ? '(material.title ILIKE :text OR material.author ILIKE :text)'
            : ''
        }`,
        { text: `%${search}%` }
      )
      .addOrderBy('title', 'ASC');

    if (!selectHidden) {
      query.innerJoin(
        'status',
        'currentStatus',
        'material.current_status_id = currentStatus.id'
      );
      query.andWhere('currentStatus.status NOT IN (:...statuses)', {
        statuses: [
          StatusTypes.PENDING,
          StatusTypes.REJECTED,
          StatusTypes.SUSPEND,
        ],
      });
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

  async allMaterials(
    locations: Array<number>,
    limit?: number,
    offset?: number
  ) {
    const paginationPage = (offset - 1) * limit;
    const elements = await Material.createQueryBuilder('material')
      .leftJoinAndSelect('material.status', 'status')
      .where('material.location_id IN (:...locations)', { locations })
      .orderBy('material.created_at', 'ASC')
      .limit(limit || null)
      .offset(paginationPage || null)
      .getMany();
    return elements;
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
}
