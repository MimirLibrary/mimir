import { isOverdue } from './converTime';
import { IStatus } from '../../types';
import { StatusTypes } from '@mimir/global-types';

type ResponseGetCurrentStatus = {
  type: string;
  body: string;
  person_id: number | string;
};

export function getCurrentStatus(
  currentStatus: IStatus | null | undefined
): string | ResponseGetCurrentStatus {
  switch (currentStatus?.status) {
    case StatusTypes.FREE:
      return 'on the shelf';
    case StatusTypes.BUSY || StatusTypes.PROLONG: {
      if (isOverdue(currentStatus.created_at)) {
        return {
          type: StatusTypes.OVERDUE,
          body: currentStatus?.person!.username,
          person_id: currentStatus?.person!.id,
        };
      }
      return {
        type: StatusTypes.BUSY,
        body: currentStatus?.person!.username,
        person_id: currentStatus?.person!.id,
      };
    }
    case StatusTypes.PENDING:
      return 'Pending approval';
    default:
      return '-';
  }
}
