import { FC } from 'react';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListItems from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { dimensions } from '@mimir/ui-kit';
import { useGetAllTakenItemsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';

const WrapperHome = styled.div`
  @media (max-width: ${dimensions.tablet_width}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

const HomePage: FC = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data, loading } = useGetAllTakenItemsQuery({
    variables: { person_id: id },
  });
  console.log('Full data', data);

  if (loading) return <h1>Loading...</h1>;

  return (
    <WrapperHome>
      <InstructionsClaim />
      {data?.getAllTakenItems.length ? (
        <>
          <Wrapper>
            <TitleArticle>Don't forget to pass</TitleArticle>
            <TextBase>List of items you have taken and due dates</TextBase>
          </Wrapper>
          <ListItems items={data?.getAllTakenItems} />
        </>
      ) : (
        <EmptyListItems />
      )}
    </WrapperHome>
  );
};

export default HomePage;
