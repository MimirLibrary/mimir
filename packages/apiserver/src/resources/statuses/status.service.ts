import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { RolesTypes, StatusTypes } from '@mimir/global-types';
import { IsNull } from 'typeorm';

@Injectable()
export class StatusService {
  constructor() {}

  public getCurrentBusyAndProlongStatuses(
    locations: Array<number>
  ): Promise<Status[]> {
    return Status.createQueryBuilder('status')
      .innerJoinAndSelect('status.material', 'material')
      .innerJoinAndSelect('status.person', 'person')
      .andWhere({ effectiveTo: IsNull() })
      .andWhere('person.type = :type', { type: RolesTypes.READER })
      .andWhere('material.location_id IN (:...locations)', { locations })
      .andWhere('status.status IN(:...statuses)', {
        statuses: [StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .getMany();
  }

  public getStatusesForReminder(reminderPeriod: number): Promise<Status[]> {
    return Status.createQueryBuilder('status')
      .where('status.status IN(:...statuses)', {
        statuses: [StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .andWhere({ effectiveTo: IsNull() })
      .andWhere(
        `(status.lastReminderTime IS NULL OR status.lastReminderTime < NOW() - INTERVAL '${reminderPeriod} days')`
      )
      .andWhere(`status.returnDate < NOW()`)
      .getMany();
  }
}
