import {FC, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import {Status} from "@mimir/global-types";

interface IbookStatusProps {
  status:
    | { __typename?: 'Status'; status: string; created_at: any }
    | undefined
    | null;
}

interface IStyledBookStatusProps {
  status: string | null;
}

const getDates = (date: string) => {
  const currentDate = new Date();
  const startDate = new Date(date);
  const periodOfKeeping = 30;
  const returnDate = new Date(startDate.setDate(startDate.getDate() + periodOfKeeping));
  return {
    currentDate,
    startDate,
    returnDate,
  };
};

const isOverdue = (date: string) =>
  getDates(date).currentDate <= getDates(date).returnDate;

const getStatus = (status: string | undefined, date: string) => {
  if (!status) return null;
  if (status === 'Free') return 'Free';
  if (isOverdue(date)) return 'Busy';
  return 'Overdue';
};

const StyledBookStatus = styled.p<IStyledBookStatusProps>`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${(props) => {
    switch (props.status) {
      case 'Free':
        return colors.free_book;
      case 'Busy':
        return colors.accent_color;
      case 'Overdue':
        return colors.problem_red;
      default:
        return '';
    }
  }};
`;

const BookStatus: FC<IbookStatusProps> = ({ status }) => {
  const [statusText, setStatusText] = useState<String>('');
  const currentStatus = getStatus(status?.status, status?.created_at);

  useEffect(() => {
    switch (currentStatus) {
      case "Free":
        setStatusText("On the shelf")
        break
      case "Busy":
        const day = (`${getDates(status?.created_at).returnDate.getDate()}`).padStart(2, "0")
        const month = (`${getDates(status?.created_at).returnDate.getMonth()}`).padStart(2, "0")
        setStatusText(`Return till ${day}.${month}`)
        break
      case "Overdue":
        setStatusText("Overdue")
        break
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
