import React, { FC } from 'react';
import Search from '../components/Search';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListItems from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';

const mockItems = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`;

const HomePage: FC = () => {
  return (
    <>
      <Search />
      <InstructionsClaim />
      {mockItems.length ? (
        <>
          <Wrapper>
            <TitleArticle>Don't forget to pass</TitleArticle>
            <TextBase>List of items you have taken and due dates</TextBase>
          </Wrapper>
          <ListItems items={mockItems} />
        </>
      ) : (
        <EmptyListItems />
      )}
    </>
  );
};

export default HomePage;
