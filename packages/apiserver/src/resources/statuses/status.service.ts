import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { RolesTypes } from '@mimir/global-types';
import { StatusTypes } from '@mimir/global-types';

@Injectable()
export class StatusService {
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
        statuses: [StatusTypes.IN_USE, StatusTypes.PROLONG],
      })
      .getMany();
  }
}
