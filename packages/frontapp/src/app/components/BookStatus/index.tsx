import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledBookStatus = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.accent_color};
`;

interface IProps {
  status: string;
}

const BookStatus: FC<IProps> = ({ status }) => {
  return <StyledBookStatus>{status}</StyledBookStatus>;
};

export default BookStatus;
