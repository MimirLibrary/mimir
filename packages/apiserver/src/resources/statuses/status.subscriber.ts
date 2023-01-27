import { Status } from './status.entity';
import { Material } from '../materials/material.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { StatusTypes } from '@mimir/global-types';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EventSubscriber()
export class StatusSubscriber implements EntitySubscriberInterface<Status> {
  listenTo() {
    return Status;
  }

  async afterInsert(event: InsertEvent<Status>): Promise<void> {
    const status = event.entity;
    const update: QueryDeepPartialEntity<Material> = {
      currentStatusId: status.id,
    };
    if (status.status === StatusTypes.BUSY) {
      update.claimCount = () => 'claim_count + 1';
    }
    await event.manager
      .getRepository(Material)
      .createQueryBuilder()
      .update()
      .where({ id: status.material_id })
      .set(update)
      .execute();
  }
}
