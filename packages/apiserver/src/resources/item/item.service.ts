import { Injectable } from '@nestjs/common';
import { Material } from '../materials/material.entity';
import { BookInput } from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ClaimError } from '../../errors';
import { StatusTypes } from '../../utils/statusTypes';

@Injectable()
export class ItemService {
  constructor(private connection: Connection) {}

  private async claimOrReturnOperations(
    bookInput: BookInput,
    type: StatusTypes
  ) {
    const queryRunner = this.connection.createQueryRunner();
    const statusRepository =
      queryRunner.manager.getRepository<Status>('status');
    const materialRepository =
      queryRunner.manager.getRepository<Material>('material');
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { identifier, person_id } = bookInput;
      const material = await materialRepository.findOne({
        where: { identifier },
      });
      if (!material) {
        throw new ClaimError('This item is not registered in the library');
      }
      const { id } = material;
      const status = await statusRepository.find({
        where: { material_id: id },
        order: { id: 'DESC' },
        take: 1,
      });
      if (status[0].status === type) {
        throw new ClaimError(
          `This book is ${type.toLocaleLowerCase()}. Ask the manager!`
        );
      }
      const newStatusObj = await statusRepository.create({
        status: type,
        material_id: status[0].material_id,
        person_id,
      });
      const newStatus = await statusRepository.save(newStatusObj);
      await queryRunner.commitTransaction();
      return newStatus;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return {
        message: e.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async claim(claimBookInput: BookInput) {
    return this.claimOrReturnOperations(claimBookInput, StatusTypes.BUSY);
  }

  async return(returnBookInput: BookInput) {
    return this.claimOrReturnOperations(returnBookInput, StatusTypes.FREE);
  }

  async getAllTakenItems(person_id: number) {
    try {
      const listOfMaterials = await Status.createQueryBuilder('status')
        .leftJoinAndSelect('status.material', 'material')
        .leftJoinAndSelect('status.person', 'person')
        .distinctOn(['material_id'])
        .orderBy('material_id', 'DESC')
        .where('person_id = :person_id', { person_id })
        .addOrderBy('status.id', 'DESC')
        .getMany();
      const listOfTakenMaterials = listOfMaterials.filter(
        (item) => item.status === StatusTypes.BUSY
      );
      return listOfTakenMaterials;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
