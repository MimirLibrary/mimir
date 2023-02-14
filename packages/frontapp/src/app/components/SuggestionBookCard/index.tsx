import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import BookStatus from '../BookStatus';
import { IBookCardProps } from '../BookCard';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

type IProps = IBookCardProps & {
  removeSuggestionSearchWindow: () => void;
};

const BookCardWrapper = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  margin-bottom: ${dimensions.base};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const BookImage = styled.img`
  width: 5rem;
  height: 7.5rem;
  align-self: center;
  margin-right: ${dimensions.xs_2};
  @media (max-width: ${dimensions.phone_width}) {
    width: 3.5rem;
    height: 4.5rem;
    margin-right: ${dimensions.xs_1};
  }
`;

const TitleBook = styled.h3`
  max-width: 10rem;
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.main_black};
  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.xs_1};
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
    font-size: ${dimensions.xs_1};
  }
`;

const SuggestionBookCard: FC<IProps> = ({
  removeSuggestionSearchWindow,
  src = '',
  title = '',
  author = '',
  status,
  category,
  returnDate,
  id,
  claimedUserId,
}) => {
  const navigate = useNavigate();
  const handleItemRedirect = () => {
    navigate(`/item/${id}`);
    removeSuggestionSearchWindow();
  };

  return (
    <BookCardWrapper onClick={handleItemRedirect}>
      <BookImage src={src || bookImage} />
      <DescriptionWrapper>
        <TitleBook>{title}</TitleBook>
        <DescriptionBook>{category + ' / ' + author}</DescriptionBook>
        <BookStatus
          status={status}
          returnDate={returnDate}
          claimedUserId={claimedUserId}
        />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default SuggestionBookCard;
