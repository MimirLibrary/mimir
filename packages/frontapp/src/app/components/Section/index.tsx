import React, { FC } from 'react';
import { Topic } from '../BookInfo';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<IProps> = ({ title, children }) => {
  return (
    <>
      <Topic>{title}</Topic>
      {children}
    </>
  );
};

export default Section;
