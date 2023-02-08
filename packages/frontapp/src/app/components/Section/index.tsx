import React, { FC } from 'react';
import { Topic } from '../BookInfo';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const SectionWrapper = styled.div`
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${colors.main_black};
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
