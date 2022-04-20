import React, { FC } from 'react';
import Search from '../components/Search';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListItems from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { mockItemsBooks } from '../models/mockData/listBooks';

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`;

const HomePage: FC = () => {
  return (
    <>
      <Search />
      <InstructionsClaim />
      {mockItemsBooks.length ? (
        <>
          <Wrapper>
            <TitleArticle>Don't forget to pass</TitleArticle>
            <TextBase>List of items you have taken and due dates</TextBase>
          </Wrapper>
          <ListItems items={mockItemsBooks} />
        </>
      ) : (
        <EmptyListItems />
      )}
    </>
  );
};

export default HomePage;
