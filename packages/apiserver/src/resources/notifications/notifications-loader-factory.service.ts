import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import {
  groupByKey,
  GroupRecord,
} from '../../utils/helpersFunctions/groupByKey';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsLoaderFactoryService {
  public createMaterialsNotificationsLoader(): DataLoader<
    number,
    Notification[]
  > {
    return new DataLoader<number, Notification[]>(
      async (materialIds: number[]) => {
        const notifications = await Notification.find({
          where: { material_id: In(materialIds) },
        });

        const notificationsMap: GroupRecord<Notification> = groupByKey(
          notifications,
          'material_id'
        );

        return materialIds.map((id) => notificationsMap[id] || []);
      }
    );
  }

  public createPersonsNotificationsLoader(): DataLoader<
    number,
    Notification[]
  > {
    return new DataLoader<number, Notification[]>(
      async (personIds: number[]) => {
        const notifications = await Notification.find({
          where: { person_id: In(personIds) },
        });

        const notificationsMap: GroupRecord<Notification> = groupByKey(
          notifications,
          'person_id'
        );

        return personIds.map((id) => notificationsMap[id] || []);
      }
    );
  }
}
