import { FC } from 'react';
import { getStatus } from '../../models/helperFunctions/converTime';
import {
  StyledBookStatus,
  StyledBookStatusWrapper,
} from '../../globalUI/Status';
import { useLocation } from 'react-router-dom';
import useBookStatus from '../../hooks/useBookStatus';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IBookStatusProps {
  status?: string | null;
  returnDate?: string;
  fontSize?: string;
  claimedUserId?: number;
}

const BookStatus: FC<IBookStatusProps> = ({
  status,
  returnDate,
  fontSize,
  claimedUserId,
}) => {
  const userId = useAppSelector((state) => state.user.id);
  const isClaimedByCurrentUser = claimedUserId === userId;
  const currentStatus = getStatus(status, returnDate, isClaimedByCurrentUser);
  const { pathname } = useLocation();
  const bookStatus = useBookStatus(
    currentStatus,
    returnDate,
    pathname,
    claimedUserId
  );

  return (
    <StyledBookStatusWrapper status={currentStatus} data-testid="bookStatus">
      <StyledBookStatus fontSize={fontSize} status={currentStatus}>
        {bookStatus}
      </StyledBookStatus>
    </StyledBookStatusWrapper>
  );
};

export default BookStatus;
