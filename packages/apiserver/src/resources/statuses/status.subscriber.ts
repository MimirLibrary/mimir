import { Status } from './status.entity';
import { Material } from '../materials/material.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class StatusSubscriber implements EntitySubscriberInterface<Status> {
  listenTo() {
    return Status;
  }

  async afterInsert(event: InsertEvent<Status>): Promise<void> {
    const status = event.entity;
    await event.manager.getRepository(Material).update(status.material_id, {
      currentStatusId: status.id,
      currentPersonId: status.person_id,
      currentStatusValue: status.status,
    });
  }
}
