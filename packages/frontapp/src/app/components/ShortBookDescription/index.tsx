import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledDescriptionBook = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.description_gray};
  margin: ${dimensions.xs_2} auto;
`;

interface IProps {
  description: string;
}

const ShortBookDescription: FC<IProps> = ({ description }) => {
  return <StyledDescriptionBook>{description}</StyledDescriptionBook>;
};

export default ShortBookDescription;
