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
import { RolesTypes } from '../../utils/rolesTypes';
import ManagerInfoCard from '../components/ManagerInfoCard';
import { ManagerCardTypes } from '../../utils/managerCardTypes';
import Button from '../components/Button';

const WrapperHome = styled.div`
  @media (max-width: ${dimensions.tablet_width}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: absolute;
  width: 234px;
  height: 52px;
  right: 46px;
  top: 40px;
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

const CardsWrapper = styled.div`
  padding-top: 58px;
  display: grid;
  width: auto;
  grid-template-areas:
    '${ManagerCardTypes.OVERDUE} ${ManagerCardTypes.DONATES}'
    '${ManagerCardTypes.NOTIFICATIONS} ${ManagerCardTypes.NOTIFICATIONS}';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 467px 587px;
  grid-column-gap: 18px;
  grid-row-gap: 30px;
`;

const HomePage: FC = () => {
  const { id, userRole } = useAppSelector((state) => state.user);
  const { data, loading } = useGetAllTakenItemsQuery({
    variables: { person_id: id },
  });

  if (loading) return <h1>Loading...</h1>;

  return (
    <WrapperHome>
      {userRole === RolesTypes.READER ? (
        <>
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
        </>
      ) : (
        <>
          <ButtonWrapper>
            <Button value={'Open library statistics'} />
          </ButtonWrapper>
          <CardsWrapper>
            <ManagerInfoCard
              type={ManagerCardTypes.OVERDUE}
              fields={['haha', ',a,a,', 'ijewf']}
            />
            <ManagerInfoCard
              type={ManagerCardTypes.DONATES}
              fields={['haha', ',a,a,', 'ijewf']}
            />
            <ManagerInfoCard
              type={ManagerCardTypes.NOTIFICATIONS}
              fields={['haha', ',a,a,', 'ijewf']}
            />
          </CardsWrapper>
        </>
      )}
    </WrapperHome>
  );
};

export default HomePage;
