import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { BlockedUsers } from './blocked-users.entity';
import { In } from 'typeorm';
import {
  groupByKey,
  GroupRecord,
} from '../../utils/helpersFunctions/groupByKey';

@Injectable()
export class BlockedUsersLoaderFactoryService {
  public createBlockedUsersLoader(): DataLoader<number, BlockedUsers[]> {
    return new DataLoader<number, BlockedUsers[]>(async (ids: number[]) => {
      const users = await BlockedUsers.find({ where: { person_id: In(ids) } });

      const usersMap: GroupRecord<BlockedUsers> = groupByKey(
        users,
        'person_id'
      );

      return ids.map((id) => usersMap[id] || []);
    });
  }
}
