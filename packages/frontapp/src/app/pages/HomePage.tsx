import { FC, useEffect } from 'react';
import InstructionsClaim from '../components/InstructionsClaim';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListBooks from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  useGetAllMessagesQuery,
  useGetAllTakenItemsQuery,
} from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';
import ManagerInfoCard from '../components/ManagerInfoCard';
import { ManagerCardTypes } from '../components/ManagerInfoCard/managerCardTypes';
import Button from '../components/Button';
import { t } from 'i18next';
import { managerData } from '../models/mockData/managerInfoCard';
import { RolesTypes } from '@mimir/global-types';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Message } from '../../../../apiserver/src/resources/messages/message.entity';

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

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: ${dimensions.xs_2};
    position: static;
    width: 160px;
    height: 40px;
    button {
      span {
        font-size: ${dimensions.xs};
      }
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

const CardsWrapper = styled.div`
  padding-top: 58px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const NotificationsWrapper = styled.div`
  height: 587px;
`;

const OverdueDonatesWrapper = styled.div`
  display: flex;
  height: 467px;
  flex-direction: row;
  column-gap: 18px;
`;

managerData.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

const HomePage: FC = () => {
  const { id, userRole, location } = useAppSelector((state) => state.user);
  const { data, loading } = useGetAllTakenItemsQuery({
    variables: { person_id: id },
    skip: userRole === RolesTypes.MANAGER,
  });

  const {
    data: allMessagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useGetAllMessagesQuery({
    variables: {
      location_id: parseInt(location.id),
    },
    skip: userRole === RolesTypes.READER,
  });

  useEffect(() => {
    if (messagesError && userRole === RolesTypes.MANAGER) {
      toast.error(messagesError.message);
    }
  }, [messagesError]);

  if (loading || messagesLoading)
    return <Loader height={200} width={200} color={`${colors.accent_color}`} />;

  console.log(allMessagesData);

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
              <ListBooks items={data?.getAllTakenItems} />
            </>
          ) : (
            <EmptyListItems />
          )}
        </>
      ) : (
        <>
          <ButtonWrapper>
            <Button value={t(`ManagerInfoCard.Description.Library`)} />
          </ButtonWrapper>
          <CardsWrapper>
            <OverdueDonatesWrapper>
              <ManagerInfoCard
                type={ManagerCardTypes.OVERDUE}
                fields={managerData}
              />
              <ManagerInfoCard
                type={ManagerCardTypes.DONATES}
                fields={managerData}
              />
            </OverdueDonatesWrapper>
            <NotificationsWrapper>
              <ManagerInfoCard
                type={ManagerCardTypes.NOTIFICATIONS}
                fields={managerData}
              />
            </NotificationsWrapper>
          </CardsWrapper>
        </>
      )}
    </WrapperHome>
  );
};

export default HomePage;
