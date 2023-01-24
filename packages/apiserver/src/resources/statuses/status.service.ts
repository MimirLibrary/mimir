import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { RolesTypes, StatusTypes } from '@mimir/global-types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StatusService {
  get periodOfKeeping(): number {
    return +this.config.get<number>('common.periodOfKeeping');
  }

  constructor(private config: ConfigService) {}

  async allOverdueStatuses(locations: Array<number>) {
    const statusesQb = Status.createQueryBuilder('status')
      .select('status.id')
      .distinctOn(['material_id'])
      .orderBy('material_id', 'DESC')
      .addOrderBy('status.created_at', 'DESC');

    const ids = (await statusesQb.getRawMany()).map((d) => d.status_id);

    return Status.createQueryBuilder('status')
      .leftJoinAndSelect('status.material', 'material')
      .leftJoinAndSelect('status.person', 'person')
      .where('status.id IN (:...ids)', { ids })
      .andWhere('person.type = :type', { type: RolesTypes.READER })
      .andWhere('material.location_id IN (:...locations)', { locations })
      .andWhere('status.status IN(:...statuses)', {
        statuses: [StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .getMany();
  }

  public getStatusesForReminder(reminderPeriod: number): Promise<Status[]> {
    return Status.createQueryBuilder('s1')
      .leftJoin(
        'status',
        's2',
        's1.material_id = s2.material_id AND s1.id < s2.id'
      )
      .where('s2.id IS NULL')
      .andWhere('s1.status IN(:...statuses)', {
        statuses: [StatusTypes.BUSY, StatusTypes.PROLONG],
      })
      .andWhere(
        `(s1.lastReminderTime IS NULL OR s1.lastReminderTime < NOW() - INTERVAL '${reminderPeriod} days')`
      )
      .andWhere(
        `s1.created_at < NOW() - INTERVAL '${this.periodOfKeeping} days'`
      )
      .getMany();
  }
}
