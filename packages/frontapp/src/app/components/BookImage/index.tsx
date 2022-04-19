import React, { FC } from 'react';
import styled from '@emotion/styled';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { dimensions } from '@mimir/ui-kit';

const StyledBookImage = styled.img`
  width: 7rem;
  height: 12rem;
  margin-bottom: ${dimensions.xs_2};
`;

interface IProps {
  src: string;
}

const BookImage: FC<IProps> = ({ src = '' }) => {
  return (
    <div>
      <StyledBookImage src={bookImage} alt="book image" />
    </div>
  );
};

export default BookImage;
