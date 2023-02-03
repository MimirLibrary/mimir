import { Status } from './status.entity';
import * as DataLoader from 'dataloader';

const createStatusesLoader = () => {
  return new DataLoader<number, Status>(async (ids: number[]) => {
    const statuses = await Status.findByIds(ids);

    const statusesMap: Record<number, Status> = statuses.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    return ids.map((id) => statusesMap[id]);
  });
};

export default createStatusesLoader;
