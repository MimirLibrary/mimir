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
  returnDate?: string;
  fontSize?: string;
}

const BookStatus: FC<IBookStatusProps> = ({ status, returnDate, fontSize }) => {
  const currentStatus = getStatus(status, returnDate);
  const { pathname } = useLocation();
  const bookStatus = useBookStatus(currentStatus, returnDate, pathname);

  return (
    <StyledBookStatusWrapper status={currentStatus} data-testid="bookStatus">
      <StyledBookStatus fontSize={fontSize} status={currentStatus}>
        {bookStatus}
      </StyledBookStatus>
    </StyledBookStatusWrapper>
  );
};

export default BookStatus;
