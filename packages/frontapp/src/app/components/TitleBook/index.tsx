import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledTitleBook = styled.h3`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.main_black};
`;

interface IProps {
  title: string;
}

const TitleBook: FC<IProps> = ({ title }) => {
  return <StyledTitleBook>{title}</StyledTitleBook>;
};

export default TitleBook;
