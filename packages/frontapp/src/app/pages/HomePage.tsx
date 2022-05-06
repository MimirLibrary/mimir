import React, { FC } from 'react';
import Search from '../components/Search';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListItems from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { dimensions } from '@mimir/ui-kit';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

const HomePage: FC = () => {
  const { data, loading } = useGetAllMaterialsQuery();
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <Search />
      <InstructionsClaim />
      {data?.getAllMaterials.length ? (
        <>
          <Wrapper>
            <TitleArticle>Don't forget to pass</TitleArticle>
            <TextBase>List of items you have taken and due dates</TextBase>
          </Wrapper>
          <ListItems items={data?.getAllMaterials} />
        </>
      ) : (
        <EmptyListItems />
      )}
    </>
  );
};

export default HomePage;
