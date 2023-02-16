import { Injectable } from '@nestjs/common';
import { Material } from '../materials/material.entity';
import { BookInput, ProlongTimeInput, StatusTypes } from '@mimir/global-types';
import { Status } from '../statuses/status.entity';
import { Connection, EntityManager } from 'typeorm';
import { ErrorBook } from '../../errors';
import { normalizeIdentifier } from '@mimir/helper-functions';
import { config } from '../../config';
import { ConfigService } from '@nestjs/config';
import { setTimeToProlong } from '../../utils/helpersFunctions/setTimeToProlong';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ItemService {
  private get periodOfKeeping(): number {
    return +this.config.get<number>('common.periodOfKeeping');
  }

  constructor(private connection: Connection, private config: ConfigService) {}

  async claim(claimBookInput: BookInput): Promise<Status> {
    return this.connection.transaction(async (manager) => {
      const { identifier, person_id } = claimBookInput;
      const material = await this.getMaterialAndCurrentStatusByIdentifier(
        identifier,
        manager
      );

      if (!material) {
        throw new ErrorBook('This item is not registered in the library');
      }

      if (material.currentStatus.status !== StatusTypes.FREE) {
        throw new ErrorBook(`This book can't be claimed. Ask the manager!`);
      }

      return this.insertStatus(
        {
          status: StatusTypes.BUSY,
          material_id: material.id,
          person_id,
          returnDate: () =>
            `NOW() + INTERVAL '${
              material.claimDuration || this.periodOfKeeping
            } days'`,
        },
        manager
      );
    });
  }

  async accept(returnBookInput: BookInput): Promise<Status> {
    return this.connection.transaction(async (manager) => {
      const { identifier, person_id } = returnBookInput;
      const material = await this.getMaterialAndCurrentStatusByIdentifier(
        identifier,
        manager
      );

      if (!material) {
        throw new ErrorBook('This item is not registered in the library');
      }

      if (material.currentStatus.status !== StatusTypes.PENDING) {
        throw new ErrorBook(`This book can't be accepted`);
      }

      return this.insertStatus(
        {
          status: StatusTypes.FREE,
          material_id: material.id,
          person_id,
        },
        manager
      );
    });
  }

  async return(returnBookInput: BookInput): Promise<Status> {
    return this.connection.transaction(async (manager) => {
      const { identifier, person_id } = returnBookInput;
      const material = await this.getMaterialAndCurrentStatusByIdentifier(
        identifier,
        manager
      );

      if (!material) {
        throw new ErrorBook('This item is not registered in the library');
      }

      if (
        material.currentStatus.status !== StatusTypes.BUSY &&
        material.currentStatus.status !== StatusTypes.PROLONG
      ) {
        throw new ErrorBook(`This book can't be returned. Ask the manager!`);
      }
      return this.insertStatus(
        {
          status: StatusTypes.FREE,
          material_id: material.id,
          person_id,
        },
        manager
      );
    });
  }

  async reject(rejectBookInput: BookInput): Promise<Status> {
    return this.connection.transaction(async (manager) => {
      const { identifier, person_id } = rejectBookInput;
      const material = await this.getMaterialAndCurrentStatusByIdentifier(
        identifier,
        manager
      );

      if (!material) {
        throw new ErrorBook('This item is not registered in the library');
      }

      if (material.currentStatus.status !== StatusTypes.PENDING) {
        throw new ErrorBook(`This book can't be rejected.`);
      }

      return this.insertStatus(
        {
          status: StatusTypes.REJECTED,
          material_id: material.id,
          person_id,
        },
        manager
      );
    });
  }

  async getAllTakenItems(person_id: number) {
    const statusesQb = Status.createQueryBuilder('status')
      .select('status.id')
      .distinctOn(['material_id'])
      .orderBy('material_id', 'DESC')
      .where('person_id = :person_id', { person_id })
      .addOrderBy('status.created_at', 'DESC');

    const ids = (await statusesQb.getRawMany()).map((d) => d.status_id);

    // Skip query if there is no data
    if (ids.length === 0) return [];

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

  async getItemsForClaimHistory(person_id: number) {
    const statusesQb = Status.createQueryBuilder('status')
      .select('status.id')
      .distinctOn(['material_id'])
      .orderBy('material_id', 'DESC')
      .where('person_id = :person_id', { person_id })
      .addOrderBy('status.created_at', 'DESC');

    const ids = (await statusesQb.getRawMany()).map((d) => d.status_id);

    if (ids.length === 0) return [];

    return await Status.createQueryBuilder('status')
      .leftJoinAndSelect('status.material', 'material')
      .leftJoinAndSelect('status.person', 'person')
      .where('status.id IN (:...ids)', { ids })
      .andWhere('status.status IN(:...statuses)', {
        statuses: [StatusTypes.FREE, StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .getMany();
  }

  async prolong(prolongTime: ProlongTimeInput): Promise<Status> {
    const { person_id, material_id } = prolongTime;
    const [currentStatus] = await Status.find({
      where: { material_id, person_id },
      order: { id: 'DESC', created_at: 'DESC' },
      take: 1,
    });
    if (currentStatus.status === StatusTypes.PROLONG) {
      throw new ErrorBook('This item has already been extended!');
    }
    if (currentStatus.status !== StatusTypes.BUSY) {
      throw new ErrorBook("This book can't be prolonged");
    }

    return this.insertStatus({
      status: StatusTypes.PROLONG,
      returnDate: setTimeToProlong(currentStatus.returnDate, config.shelfLife),
      material_id: currentStatus.material_id,
      person_id: currentStatus.person_id,
    });
  }

  private async getMaterialAndCurrentStatusByIdentifier(
    identifier: string,
    manager: EntityManager
  ): Promise<Material> {
    const normalizedIdentifier = normalizeIdentifier(identifier);
    return await manager.findOne(Material, {
      relations: ['currentStatus'],
      where: { identifier: normalizedIdentifier },
    });
  }

  private async insertStatus(
    status: QueryDeepPartialEntity<Status>,
    transactionManager?: EntityManager
  ): Promise<Status> {
    const insertResult = await (transactionManager
      ? transactionManager.createQueryBuilder(Status, 'status')
      : Status.createQueryBuilder()
    )
      .insert()
      .values(status)
      .returning('*')
      .execute();
    return Status.create(insertResult.generatedMaps[0]);
  }
}
