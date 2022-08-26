import { isOverdue } from './converTime';
import { IMaterial } from '../../components/ListBooks';
import { StatusTypes } from '@mimir/global-types';

export interface IClaimHistory {
  material_id?: number | string;
  status: string;
  created_at: Date;
  material?: IMaterial;
}

export const countClaimHistory = (statuses: IClaimHistory[] = []) => {
  const busyItems: IClaimHistory[] = [];
  const freeItems: IClaimHistory[] = [];
  const claimNowItems: IClaimHistory[] = [];
  statuses.forEach((status) => {
    if (
      status.status === StatusTypes.BUSY ||
      status.status === StatusTypes.PROLONG
    ) {
      if (!isOverdue(status.created_at)) busyItems.push(status);
      else busyItems.push({ ...status, status: 'Overdue' });
    } else if (status.status === StatusTypes.FREE) {
      freeItems.push(status);
    }
  });
  const free = freeItems.slice();
  busyItems.forEach((item) => {
    const ind = free.findIndex((freeI) => {
      return freeI.material_id === item.material_id;
    });
    if (ind !== -1) {
      free.splice(ind, 1);
    } else claimNowItems.push(item);
  });

  const overdueItems = claimNowItems.filter(
    (item) => item.status === 'Overdue'
  );
  const claimHistoryItems = freeItems.concat(claimNowItems);
  claimHistoryItems.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const claimHistory = busyItems.length;
  const claimNow = claimNowItems.length;
  const overdue = overdueItems.length;
  return {
    claimHistoryItems,
    claimNow,
    claimHistory,
    overdue,
  };
};
