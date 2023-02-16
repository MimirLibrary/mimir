import { Status } from './status.entity';
import { Material } from '../materials/material.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  IsNull,
  Not,
  UpdateResult,
} from 'typeorm';
import { StatusTypes } from '@mimir/global-types';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@EventSubscriber()
export class StatusSubscriber implements EntitySubscriberInterface<Status> {
  listenTo() {
    return Status;
  }

  async afterInsert(event: InsertEvent<Status>): Promise<void> {
    const { entity, manager } = event;
    await this.updateMaterial(manager, entity);
    await this.setPreviousStatusEffectiveTo(manager, entity);
  }

  private updateMaterial(
    entityManager: EntityManager,
    newStatus: Status
  ): Promise<UpdateResult> {
    const update: QueryDeepPartialEntity<Material> = {
      currentStatusId: newStatus.id,
    };
    if (newStatus.status === StatusTypes.BUSY) {
      update.claimCount = () => 'claim_count + 1';
    }
    return entityManager
      .createQueryBuilder(Material, 'material')
      .update()
      .where({ id: newStatus.material_id })
      .set(update)
      .execute();
  }

  private setPreviousStatusEffectiveTo(
    entityManager: EntityManager,
    newStatus: Status
  ): Promise<UpdateResult> {
    return entityManager.update(
      Status,
      {
        material_id: newStatus.material_id,
        effectiveTo: IsNull(),
        id: Not(newStatus.id),
      },
      { effectiveTo: newStatus.created_at }
    );
  }
}
