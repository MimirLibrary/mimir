import { FC, useEffect, useState } from 'react';
import { getDates, getStatus } from '../../models/helperFunctions/converTime';
import { StyledBookStatus } from '../../globalUI/Status';
import { useLocation } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';

interface IBookStatusProps {
  status: string | undefined;
  date: Date;
}

const BookStatus: FC<IBookStatusProps> = ({ status, date }) => {
  const [statusText, setStatusText] = useState<string>('');
  const currentStatus = getStatus(status, date);
  const { pathname } = useLocation();

  useEffect(() => {
    switch (currentStatus) {
      case 'Free':
        if (pathname === RoutesTypes.HISTORY_OF_CLAIM) {
          setStatusText('Returned');
          break;
        }
        setStatusText('On the shelf');
        break;
      case 'Busy': {
        const day = `${getDates(date).returnDate.getDate()}`.padStart(2, '0');
        const month = `${getDates(date).returnDate.getMonth() + 1}`.padStart(
          2,
          '0'
        );
        setStatusText(`Return till ${day}.${month}`);
        break;
      }
      case 'Prolong': {
        const day = `${getDates(date).returnDate.getDate()}`.padStart(2, '0');
        const month = `${getDates(date).returnDate.getMonth() + 1}`.padStart(
          2,
          '0'
        );
        setStatusText(`Return till: ${day}.${month}`);
        break;
      }
      case 'Overdue':
        setStatusText('Overdue');
        break;
      default:
        setStatusText('');
        break;
    }
  }, [currentStatus]);
  return (
    <StyledBookStatus status={currentStatus}>{statusText}</StyledBookStatus>
  );
};

export default BookStatus;
