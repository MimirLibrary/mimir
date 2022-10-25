import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';

const Title = styled.h1`
  font-family: ${fonts.secondary}, sans-serif;
  color: ${colors.main_black};
  line-height: 2.6rem;
  font-size: 2.2rem;
  font-weight: 500;
  text-transform: uppercase;
  @media (max-width: ${dimensions.tablet_width}) {
    font-size: 1.7rem;
  }
`;

interface IProps {
  title: string;
}

const TitleProject: FC<IProps> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default TitleProject;
