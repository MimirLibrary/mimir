import { useAppSelector } from './useTypedSelector';
import { DateTime } from '@mimir/global-types';
import { getDates } from '../models/helperFunctions/converTime';
import { useTranslation } from 'react-i18next';
import { StatusTypes } from '@mimir/global-types';
import { RoutesTypes } from '../../utils/routes';

const useBookStatus = (
  currentStatus: string | null,
  created_at: DateTime,
  pathname?: string,
  claimedUserId?: number
) => {
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.user.id);
  switch (currentStatus) {
    case StatusTypes.FREE:
      if (
        pathname === RoutesTypes.HISTORY_OF_CLAIM ||
        pathname === RoutesTypes.HISTORY_OF_DONATE
      )
        return t(`Statuses.${currentStatus + pathname}`);

      return t('Statuses.Free');
    case StatusTypes.BUSY || StatusTypes.PROLONG: {
      const day = `${getDates(created_at).returnDate.getDate()}`.padStart(
        2,
        '0'
      );
      const month = `${
        getDates(created_at).returnDate.getMonth() + 1
      }`.padStart(2, '0');
      return `${
        claimedUserId === userId ? t('Statuses.OwnClaimed') : t('Statuses.Busy')
      } ${day}.${month}`;
    }
    case StatusTypes.OVERDUE:
      return t('Statuses.Overdue');
    case StatusTypes.PENDING:
      return t('Statuses.Pending');
    case StatusTypes.REJECTED:
      return t('Statuses.Rejected');
    default:
      return '';
  }
};

export default useBookStatus;
