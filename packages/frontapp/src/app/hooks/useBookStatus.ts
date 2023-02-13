import { OWNCLAIMED_STATUS } from './../const/statuses';
import { useAppSelector } from './useTypedSelector';
import { useTranslation } from 'react-i18next';
import { StatusTypes } from '@mimir/global-types';
import { RoutesTypes } from '../../utils/routes';

const useBookStatus = (
  currentStatus: string | null,
  returnDate?: string,
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
    case StatusTypes.PROLONG:
    case OWNCLAIMED_STATUS:
    case StatusTypes.BUSY: {
      const day = `${new Date(returnDate!).getDate()}`.padStart(2, '0');
      const month = `${new Date(returnDate!).getMonth() + 1}`.padStart(2, '0');
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
