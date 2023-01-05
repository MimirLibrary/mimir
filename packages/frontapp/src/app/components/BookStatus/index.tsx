import { FC } from 'react';
import { getStatus } from '../../models/helperFunctions/converTime';
import {
  StyledBookStatus,
  StyledBookStatusWrapper,
} from '../../globalUI/Status';
import { useLocation } from 'react-router-dom';
import useBookStatus from '../../hooks/useBookStatus';

interface IBookStatusProps {
  status?: string | null;
  date: any;
  fontSize?: string;
}

const BookStatus: FC<IBookStatusProps> = ({ status, date, fontSize }) => {
  const currentStatus = getStatus(status, date);
  const { pathname } = useLocation();
  const bookStatus = useBookStatus(currentStatus, date, pathname);

  return (
    <StyledBookStatusWrapper status={currentStatus} data-testid="bookStatus">
      <StyledBookStatus fontSize={fontSize} status={currentStatus}>
        {bookStatus}
      </StyledBookStatus>
    </StyledBookStatusWrapper>
  );
};

export default BookStatus;
