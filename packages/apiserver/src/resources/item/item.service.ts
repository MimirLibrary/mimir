import { Injectable } from '@nestjs/common';
import { Material } from '../materials/material.entity';
import { ClaimBookInput } from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ClaimError } from '../../errors';
import { StatusTypes } from '../../utils/statusTypes';

@Injectable()
export class ItemService {
  constructor(private connection: Connection) {}

  async claim(claimBookInput: ClaimBookInput) {
    const queryRunner = this.connection.createQueryRunner();
    const statusRepository =
      queryRunner.manager.getRepository<Status>('status');
    const materialRepository =
      queryRunner.manager.getRepository<Material>('material');
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { identifier, person_id } = claimBookInput;
      const material = await materialRepository.findOne({
        where: { identifier },
      });

      if (!material) {
        throw new ClaimError('This item is not registered in the library');
      }
      const { id } = material;
      const status = await statusRepository.find({
        where: { material_id: id },
        order: { created_at: 'DESC' },
        take: 1,
      });
      if (status[0].status === StatusTypes.BUSY) {
        throw new ClaimError(`This book is busy. Ask the manager!`);
      }
      const newStatusObj = await statusRepository.create({
        status: StatusTypes.BUSY,
        material_id: status[0].material_id,
        person_id,
      });
      const newStatus = await statusRepository.save(newStatusObj);
      await statusRepository.save(newStatus);
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
}
