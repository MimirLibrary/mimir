import React, { FC } from 'react';
import { Topic } from '../BookInfo';
import styled from '@emotion/styled';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const SectionWrapper = styled.div`
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #333333;
`;

const Section: FC<IProps> = ({ title, children }) => {
  return (
    <SectionWrapper>
      <Topic>{title}</Topic>
      {children}
    </SectionWrapper>
  );
};

export default Section;
