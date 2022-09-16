import { FC } from 'react';
import { getStatus } from '../../models/helperFunctions/converTime';
import {
  StyledBookStatus,
  StyledBookStatusWrapper,
} from '../../globalUI/Status';
import { useLocation } from 'react-router-dom';
import useBookStatus from '../../hooks/useBookStatus';

interface IBookStatusProps {
  status?: string;
  date: any;
}

const BookStatus: FC<IBookStatusProps> = ({ status, date }) => {
  const currentStatus = getStatus(status, date);
  const { pathname } = useLocation();
  const bookStatus = useBookStatus(currentStatus, date, pathname);

  return (
    <StyledBookStatusWrapper status={currentStatus}>
      <StyledBookStatus status={currentStatus}>{bookStatus}</StyledBookStatus>
    </StyledBookStatusWrapper>
  );
};

export default BookStatus;
