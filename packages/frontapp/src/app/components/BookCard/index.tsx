import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { useNavigate } from 'react-router-dom';
import { DateTime } from '@mimir/global-types';
import BookStatus from '../BookStatus';
export interface IBookCardProps {
  src?: string | null;
  title?: string;
  date?: DateTime;
  status?: string;
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
  transition: box-shadow 0.3s;

  :hover {
    box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.08),
      0px 10px 32px -4px rgba(24, 39, 75, 0.08);
  }
  @media (min-width: ${dimensions.phone_width}) {
    min-height: 19.5rem;
  }

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: row;
    height: min-content;
    width: 100%;
  }
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

  return (
    <BookCardWrapper onClick={handleItemRedirect} data-testid="bookCard">
      <BookImage src={src || bookImage} data-testid="bookImage" />
      <DescriptionWrapper>
        <TitleBook data-testid="bookTitle">{title}</TitleBook>
        <DescriptionBook>{category + ' / ' + author}</DescriptionBook>
        <BookStatus status={status} date={date} />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
