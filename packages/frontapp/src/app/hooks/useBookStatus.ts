import { useTranslation } from 'react-i18next';
import { StatusTypes } from '@mimir/global-types';
import { RoutesTypes } from '../../utils/routes';

const useBookStatus = (
  currentStatus: string | null,
  returnDate?: string,
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
    const day = `${new Date(returnDate!).getDate()}`.padStart(2, '0');
    const month = `${new Date(returnDate!).getMonth() + 1}`.padStart(2, '0');
    return `${t('Statuses.Busy')} : ${day}.${month}`;
  } else if (currentStatus === StatusTypes.OVERDUE) {
    return t('Statuses.Overdue');
  }
  return '';
};

export default useBookStatus;
