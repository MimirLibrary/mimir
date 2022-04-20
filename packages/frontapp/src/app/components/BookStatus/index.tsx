import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import {Status} from "@mimir/global-types";

interface IProps {
  status?: Status;
}

function getDates(date: string) {
  const currentDate = new Date()
  const startDate = new Date(date)
  const periodOfUsing = 30;
  const returnDate = new Date(startDate.setDate(startDate.getDate() + periodOfUsing));
  return {
    currentDate,
    startDate,
    returnDate
  }
}

const isOverdue = (date: string) => getDates(date).currentDate <= getDates(date).returnDate

function getStatus(status: string | undefined, date: string) {
  if(status === "Free") {
    return "Free";
  }
  if(isOverdue(date)) {
    return "Busy"
  }
    return "Overdue"
}

const StyledBookStatus = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.accent_color};
`;

const BookStatus: FC<IProps> = ({ status }) => {
  const [statusText, setStatusText] = useState<String>('')
  useEffect(() => {
    switch (getStatus(status?.status, status?.created_at)) {
      case "Free":
        setStatusText("On the shelf")
        break
      case "Busy":
        const day = (`${getDates(status?.created_at).returnDate.getDay()}`).padStart(2, "0")
        const month = (`${getDates(status?.created_at).returnDate.getMonth()}`).padStart(2, "0")
        setStatusText(`Return till ${day}.${month}`)
        break
      case "Overdue":
        setStatusText("Overdue")
        break
      default:
        console.log('some text')
        break
    }
  }, [status?.status, status?.created_at])
  return <StyledBookStatus >{statusText}</StyledBookStatus>;
};

export default BookStatus;
