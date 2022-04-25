import React, { FC } from 'react';
import Search from '../components/Search';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListItems from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { mockItemsBooks } from '../models/mockData/listBooks';
import { dimensions } from '@mimir/ui-kit';

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

import { useGetAllMaterialsQuery } from '@mimir/apollo-client';

const HomePage: FC = () => {
  const { data, error, loading } = useGetAllMaterialsQuery();

  console.log(data?.getAllMaterials);
  return <div>Home page</div>;
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
