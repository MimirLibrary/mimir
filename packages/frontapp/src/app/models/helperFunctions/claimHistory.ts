import { isOverdue } from './converTime';

export interface IClaimHistory {
  material_id: number;
  status: string;
  created_at: Date;
}

export const countClaimHistory = (statuses: IClaimHistory[] = []) => {
  const busyItems = statuses.filter(
    (status) => status.status === 'Busy' || status.status === 'Prolong'
  );
  const freeItems = statuses.filter((status) => status.status === 'Free');
  const claimNowItems = busyItems.filter((busyItem) => {
    const ind = freeItems.findIndex(
      (freeItem) => freeItem.material_id === busyItem.material_id
    );
    if (ind) {
      freeItems.splice(ind, 1);
    }
    return ind;
  });
  const overdueItems = claimNowItems.filter((item) =>
    isOverdue(item.created_at)
  );
  const claimHistory = busyItems.length;
  const claimNow = claimNowItems.length;
  const overdue = overdueItems.length;
  return {
    claimNow,
    claimHistory,
    overdue,
  };
};
