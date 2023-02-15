import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { getIdMap } from '../../utils/helpersFunctions/getIdMap';
import { Status } from './status.entity';
import { In } from 'typeorm';
import { groupByKey } from '../../utils/helpersFunctions/groupByKey';

@Injectable()
export class StatusesLoaderFactoryService {
  public createStatusesLoader(): DataLoader<number, Status> {
    return new DataLoader<number, Status>(async (ids: number[]) => {
      const statuses = await Status.findByIds(ids);

      const statusesMap: Record<number, Status> = getIdMap(statuses);

      return ids.map((id) => statusesMap[id]);
    });
  }

  public createMaterialsStatusesLoader(): DataLoader<number, Status[]> {
    return new DataLoader<number, Status[]>(async (materialIds: number[]) => {
      const statuses = await Status.find({
        where: { material_id: In(materialIds) },
        order: { id: 'ASC' },
      });

      const statusesMap: Record<number, Status[]> = groupByKey(
        statuses,
        'material_id'
      );

      return materialIds.map((id) => statusesMap[id] || []);
    });
  }

  public createPersonsStatusesLoader(): DataLoader<number, Status[]> {
    return new DataLoader<number, Status[]>(async (personIds: number[]) => {
      const statuses = await Status.find({
        where: { person_id: In(personIds) },
      });

      const statusesMap: Record<number, Status[]> = groupByKey(
        statuses,
        'person_id'
      );

      return personIds.map((id) => statusesMap[id] || []);
    });
  }
}
