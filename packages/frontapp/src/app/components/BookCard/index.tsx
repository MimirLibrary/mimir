import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { useNavigate } from 'react-router-dom';
import { DateTime } from '@mimir/global-types';
import BookStatus from '../BookStatus';
import { shortenText } from '../../../helpers/common';
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

  @media (max-width: ${dimensions.phone_width}) {
    max-width: 8.75rem;
    width: 100%;
    padding: ${dimensions.xs_1};
    align-items: center;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;

  @media (max-width: ${dimensions.phone_width}) {
    align-self: start;
  }
`;

const BookImage = styled.img`
  width: 7rem;
  height: 12rem;
  margin-bottom: ${dimensions.xs_2};
  align-self: center;
  @media (max-width: ${dimensions.phone_width}) {
    display: block;
    width: 7.5rem;
    height: 11.25rem;
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

  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.xs};};
    white-space: normal;
  }
`;

const DescriptionBook = styled.p`
  max-width: 10rem;
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.description_gray};
  margin: ${dimensions.xs_2} 0;

  @media (max-width: ${dimensions.phone_width}) {
    max-width: 100%;
    margin: 0.25rem 0;
    font-size: ${dimensions.xs};
  }
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
        <TitleBook data-testid="bookTitle">{shortenText(title, 20)}</TitleBook>
        <DescriptionBook>{shortenText(author, 20)}</DescriptionBook>
        <BookStatus status={status} date={date} />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
