import { Injectable } from '@nestjs/common';
import { DonateBookInput } from '@mimir/global-types';
import { FileService } from '../../file/file.service';
import { Status } from '../statuses/status.entity';
import { Material } from './material.entity';
import { Connection } from 'typeorm';
import { ErrorBook } from '../../errors';
import { StatusTypes } from '../../utils/types/statusTypes';
import { GraphQLError } from 'graphql';

@Injectable()
export class MaterialService {
  constructor(
    private fileService: FileService,
    private connection: Connection
  ) {}

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
        throw new ErrorBook('This material is already exist');
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
        status: StatusTypes.FREE,
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
