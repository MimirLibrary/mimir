import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { css } from '@emotion/react';

interface CardSectionProps {
  title: string;
  children: React.ReactNode;
}

const CardSectionTitle = styled.div`
  font-weight: 600;
  font-size: ${() => dimensions.base};
  line-height: ${dimensions.xl};
  color: ${() => colors.main_black};
  margin-bottom: 8px;
`;

const cardSectionContainer = css`
  & + & {
    margin-top: 16px;
  }
`;

const CardSection: FC<CardSectionProps> = ({ title, children }) => {
  return (
    <div css={cardSectionContainer}>
      <CardSectionTitle>{title}</CardSectionTitle>
      {children}
    </div>
  );
};

export default CardSection;
