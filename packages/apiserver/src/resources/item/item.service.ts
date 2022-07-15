import { Injectable } from '@nestjs/common';
import { Material } from '../materials/material.entity';
import { BookInput, ProlongTimeInput } from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection } from 'typeorm';
import { ErrorBook } from '../../errors';
import { StatusTypes } from '../../../../global-types/src/lib/statusTypes';
import { setTimeToProlong } from '../../utils/helpersFunctions/setTimeToProlong';
import { config } from '../../config';

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
        throw new ErrorBook('This item is not registered in the library');
      }
      const { id } = material;
      const [status] = await statusRepository.find({
        where: { material_id: id },
        order: { id: 'DESC', created_at: 'DESC' },
        take: 1,
      });
      if (status.status === StatusTypes.PROLONG && type !== StatusTypes.FREE) {
        throw new ErrorBook('This book has been extended');
      }
      if (status.status === type) {
        throw new ErrorBook(
          `This book is ${type.toLocaleLowerCase()}. Ask the manager!`
        );
      }
      const newStatusObj = await statusRepository.create({
        status: type,
        material_id: status.material_id,
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
    const statusesQb = Status.createQueryBuilder('status')
      .select('status.id')
      .distinctOn(['material_id'])
      .orderBy('material_id', 'DESC')
      .where('person_id = :person_id', { person_id })
      .addOrderBy('status.created_at', 'DESC');

    const ids = (await statusesQb.getRawMany()).map((d) => d.status_id);

    // Despite TypeORM supports subqueries, there are no possibility
    // to map FROM (SELECT ...) to a Status entity type
    // The only way is to split it onto 2 sequential queries
    return await Status.createQueryBuilder('status')
      .leftJoinAndSelect('status.material', 'material')
      .leftJoinAndSelect('status.person', 'person')
      .where('status.id IN (:...ids)', { ids })
      .andWhere('status.status IN(:...statuses)', {
        statuses: [StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .getMany();
  }

  async prolong(prolongTime: ProlongTimeInput) {
    try {
      const { person_id, material_id } = prolongTime;
      const [currentStatus] = await Status.find({
        where: { material_id, person_id },
        order: { id: 'DESC', created_at: 'DESC' },
        take: 1,
      });
      if (currentStatus.status === StatusTypes.PROLONG) {
        throw new ErrorBook('This item has already been extended!');
      }
      if (currentStatus.status === StatusTypes.FREE) {
        throw new ErrorBook('This book is free!');
      }
      const prolongStatus = await Status.create({
        status: StatusTypes.PROLONG,
        created_at: setTimeToProlong(
          currentStatus.created_at,
          config.shelfLife
        ),
        material_id: currentStatus.material_id,
        person_id: currentStatus.person_id,
      });
      return Status.save(prolongStatus);
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
