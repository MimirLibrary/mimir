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

@Injectable()
export class MaterialService {
  constructor(
    private fileService: FileService,
    private connection: Connection
  ) {}
  async search(searchInput: SearchInput) {
    const { search, location } = searchInput;
    if (!search) return null;
    const data = await Material.createQueryBuilder('material')
      .leftJoinAndSelect('material.location', 'location')
      .where(
        'location.location = :location ' +
          'AND (material.title ILIKE :text OR material.author ILIKE :text)',
        { location, text: `%${search}%` }
      )
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
}
