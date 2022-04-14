import React, { FC } from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  font-family: 'Bitter', sans-serif;
  color: #333333;
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
