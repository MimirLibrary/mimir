import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, fonts } from '@mimir/ui-kit';

const Title = styled.h1`
  font-family: ${fonts.secondary}, sans-serif;
  color: ${colors.main_black};
  line-height: 2.625rem;
  font-size: 2.1875rem;
  font-weight: 500;
  text-transform: uppercase;
`;

interface IPropsTitleProject {
  title: string;
}

const TitleProject: FC<IPropsTitleProject> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default TitleProject;
