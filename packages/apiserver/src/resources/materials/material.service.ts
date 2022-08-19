import { Injectable } from '@nestjs/common';
import { Material } from './material.entity';
import {
  DonateBookInput,
  RolesTypes,
  SearchInput,
  StatusTypes,
} from '@mimir/global-types';
import { FileService } from '../../file/file.service';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ErrorBook } from '../../errors';
import { GraphQLError } from 'graphql';
import axios from 'axios';

@Injectable()
export class MaterialService {
  constructor(
    private fileService: FileService,
    private connection: Connection
  ) {}
  async search(searchInput: SearchInput) {
    const { search, locations } = searchInput;
    if (!search) return [];
    console.log(search, locations);
    const data = await Material.createQueryBuilder('material')
      .where('material.location_id IN (:...locations)', { locations })
      .andWhere(
        `${
          search
            ? '(material.title ILIKE :text OR material.author ILIKE :text)'
            : ''
        }`,
        { text: `%${search}%` }
      )
      // .where(
      //   `location.location = :location
      // ${
      //   search
      //     ? 'AND (material.title ILIKE :text OR material.author ILIKE :text)'
      //     : ''
      // }`,
      //   { location, text: `%${search}%` }
      // )
      .getMany();

    return data.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
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
      const isExistMaterial = await materialRepository.findOne({
        where: { identifier: donateBookInput.identifier },
      });
      if (isExistMaterial) {
        throw new ErrorBook('This material is already exist!');
      }
      const pictureWithIdentifier = this.fileService.moveFileInMainStorage(
        donateBookInput.picture,
        donateBookInput.identifier
      );
      const newMaterial = await materialRepository.create({
        ...newMaterialObj,
        is_donated: donateBookInput.role === RolesTypes.READER,
        picture: pictureWithIdentifier,
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
}
