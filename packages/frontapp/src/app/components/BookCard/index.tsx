import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookStatus from '../BookStatus';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { IStatusForMaterial } from '../ListBooks';

export interface IProps {
  src: string;
  title: string | undefined;
  description: string;
  status: IStatusForMaterial | null | undefined;
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
  description = '',
  status,
}) => {
  return (
    <BookCardWrapper>
      <BookImage src={bookImage} />
      <DescriptionWrapper>
        <TitleBook>{title}</TitleBook>
        <DescriptionBook>{description}</DescriptionBook>
        <BookStatus status={status} />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
