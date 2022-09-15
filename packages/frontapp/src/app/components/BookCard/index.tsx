import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { useNavigate } from 'react-router-dom';
import { getDates, getStatus } from '../../models/helperFunctions/converTime';
import { DateTime } from '@mimir/global-types';
import { StyledBookStatus } from '../../globalUI/Status';
export interface IBookCardProps {
  src?: string | null;
  title?: string;
  date?: DateTime;
  status?: any;
  author?: string;
  category?: string;
  id?: string;
}

const BookCardWrapper = styled.div`
  flex-shrink: 0;
  width: 12rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs};
  padding: ${dimensions.base};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: ${colors.shadow};

  @media (min-width: ${dimensions.phone_width}) {
    min-height: 19.5rem;
  }

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: row;
    height: min-content;
    width: 100%;
  }
`;

const StyledStatus = styled(StyledBookStatus)`
  font-size: ${dimensions.base};
  margin-top: ${dimensions.base};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const BookImage = styled.img`
  width: 7rem;
  height: 12rem;
  margin-bottom: ${dimensions.xs_2};
  align-self: center;
  @media (max-width: ${dimensions.phone_width}) {
    width: 5rem;
    height: 8rem;
    margin-right: ${dimensions.base};
  }
`;

const TitleBook = styled.h3`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 10rem;
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.main_black};
`;

const DescriptionBook = styled.p`
  max-width: 10rem;
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.description_gray};
  margin: ${dimensions.xs_2} 0;
`;

const BookCard: FC<IBookCardProps> = ({
  src = '',
  title = '',
  author = '',
  status,
  category,
  date,
  id,
}) => {
  const navigate = useNavigate();
  const handleItemRedirect = () => {
    navigate(`/item/${id}`);
  };
  const [statusText, setStatusText] = useState('');
  const currentStatus = getStatus(status?.status, date);
  useEffect(() => {
    console.log(currentStatus);
    switch (currentStatus) {
      case 'Free':
        setStatusText('On the shelf');
        break;
      case 'Busy': {
        const day = `${getDates(date).returnDate.getDate()}`.padStart(2, '0');
        const month = `${getDates(date).returnDate.getMonth() + 1}`.padStart(
          2,
          '0'
        );
        setStatusText(`Return till: ${day}.${month}`);
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
    <BookCardWrapper onClick={handleItemRedirect}>
      <BookImage src={src || bookImage} />
      <DescriptionWrapper>
        <TitleBook>{title}</TitleBook>
        <DescriptionBook>{category + ' / ' + author}</DescriptionBook>
        <StyledStatus status={currentStatus}>{statusText}</StyledStatus>
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
