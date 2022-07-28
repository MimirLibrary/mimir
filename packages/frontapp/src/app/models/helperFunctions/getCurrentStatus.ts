import { isOverdue } from './converTime';
import { IStatuses } from '../../components/BookCardExtended';

type ResponseGetCurrentStatus = {
  type: string;
  body: string;
};

export function getCurrentStatus(
  currentStatus: IStatuses | null | undefined
): string | ResponseGetCurrentStatus {
  switch (currentStatus?.status) {
    case 'Free':
      return 'on the shelf';
    case 'Busy' || 'Prolong': {
      if (isOverdue(currentStatus.created_at)) {
        return {
          type: 'Overdue',
          body: currentStatus?.person.username,
        };
      }
      return {
        type: 'Busy',
        body: currentStatus?.person.username,
      };
    }
    case 'Pending':
      return 'Pending approval';
    default:
      return '-';
  }
}
