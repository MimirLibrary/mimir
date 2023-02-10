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
  date: any;
  fontSize?: string;
  claimedUserId?: number;
}

const BookStatus: FC<IBookStatusProps> = ({
  status,
  date,
  fontSize,
  claimedUserId,
}) => {
  const userId = useAppSelector((state) => state.user.id);
  const isClaimedByCurrentUser = claimedUserId === userId;
  const currentStatus = getStatus(status, date, isClaimedByCurrentUser);
  const { pathname } = useLocation();
  const bookStatus = useBookStatus(
    currentStatus,
    date,
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
