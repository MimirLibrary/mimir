import { DateTime } from '@mimir/global-types';
import { getDates } from '../models/helperFunctions/converTime';
import { useTranslation } from 'react-i18next';
import { StatusTypes } from '@mimir/global-types';
import { RoutesTypes } from '../../utils/routes';

const useBookStatus = (
  currentStatus: string | null,
  created_at: DateTime,
  pathname?: string
) => {
  const { t } = useTranslation();
  if (currentStatus === StatusTypes.FREE) {
    if (
      pathname === RoutesTypes.HISTORY_OF_CLAIM ||
      pathname === RoutesTypes.HISTORY_OF_DONATE
    )
      return t(`Statuses.${currentStatus + pathname}`);

    return t('Statuses.Free');
  } else if (
    currentStatus === StatusTypes.BUSY ||
    currentStatus === StatusTypes.PROLONG
  ) {
    const day = `${getDates(created_at).returnDate.getDate()}`.padStart(2, '0');
    const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
      2,
      '0'
    );
    return `${t('Statuses.Busy')} ${day}.${month}`;
  } else if (currentStatus === StatusTypes.OVERDUE) {
    return t('Statuses.Overdue');
  }
  return '';
};

export default useBookStatus;
