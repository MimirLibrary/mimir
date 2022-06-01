import { FC } from 'react';
import BookStatus from '../BookStatus';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { Link } from 'react-router-dom';

interface IProps {
  src: string | null | undefined;
  title: string | undefined;
  date: any | undefined;
  status: string | undefined;
  author: string | undefined;
  category: string | undefined;
  item_id: string | undefined;
}

const BookCardWrapper = styled.div`
  height: 19.5rem;
  width: 12rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs};
  padding: ${dimensions.base};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: row;
    height: 100%;
    width: 90%;
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

  @media (max-width: ${dimensions.phone_width}) {
    width: 5rem;
    height: 8rem;
    margin-right: ${dimensions.base};
  }
`;

const TitleBook = styled.h3`
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
  margin: ${dimensions.xs_2} auto;
`;

const BookCard: FC<IProps> = ({
  src = '',
  title = '',
  author = '',
  status,
  category,
  date,
  item_id,
}) => {
  return (
    <BookCardWrapper>
      <BookImage src={src || bookImage} />
      <DescriptionWrapper>
        <Link to={'/item/' + item_id}>
          <TitleBook>{title}</TitleBook>
        </Link>
        <DescriptionBook>{category + ' / ' + author}</DescriptionBook>
        <BookStatus status={status} date={date} />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
