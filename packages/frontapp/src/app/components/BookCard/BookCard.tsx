import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookImage from '../BookImage';
import TitleBook from '../TitleBook';
import ShortBookDescription from '../ShortBookDescription';
import BookStatus from '../BookStatus';

const BookCardWrapper = styled.div`
  height: 20.5rem;
  width: 12rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs};
  padding: ${dimensions.base};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const BookCard: FC = () => {
  return (
    <BookCardWrapper>
      <BookImage src={''} />
      <DescriptionWrapper>
        <TitleBook title="The Psychology of Money Second part..." />
        <ShortBookDescription description="Psychology / Morgan Housel"></ShortBookDescription>
        <BookStatus status="Return till: 26.04" />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
