import { FC, useEffect, useMemo } from 'react';
import { useAppSelector } from '../hooks/useTypedSelector';
import ManagerInfoCard from '../components/ManagerInfoCard';
import InstructionsClaim from '../components/InstructionsClaim';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import styled from '@emotion/styled';
import ListBooks from '../components/ListBooks';
import EmptyListItems from '../components/EmptyListItems';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  useGetAllMaterialsForDonateQuery,
  useGetAllMessagesQuery,
  useGetAllStatusesIsOverdueQuery,
  useGetAllTakenItemsQuery,
} from '@mimir/apollo-client';
import { ManagerCardTypes } from '../components/ManagerInfoCard/managerCardTypes';
import Button from '../components/Button';
import { t } from 'i18next';
import { RolesTypes, StatusTypes } from '@mimir/global-types';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { isOverdue } from '../models/helperFunctions/converTime';
import NotificationList from '../components/NotificationList';
import { locationIds } from '../store/slices/userSlice';

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

const WrapperLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-height: 467px;
  flex-direction: row;
  column-gap: 18px;
  @media (max-width: ${dimensions.tablet_width}) {
    flex-wrap: wrap;
  }
`;

const HomePage: FC = () => {
  const { id, userRole } = useAppSelector((state) => state.user);
  const locations = useAppSelector(locationIds);
  const {
    data,
    loading,
    error: getAllTakenItemsError,
  } = useGetAllTakenItemsQuery({
    variables: { person_id: id },
    skip: userRole === RolesTypes.MANAGER,
    fetchPolicy: 'no-cache',
  });

  const {
    data: allMaterialsData,
    loading: materialsLoading,
    error: errorMaterials,
  } = useGetAllMaterialsForDonateQuery({
    variables: { locations },
  });

  const {
    data: allMessagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useGetAllMessagesQuery({
    skip: userRole === RolesTypes.READER,
    variables: { location_id: locations[0] },
  });

  const {
    data: overdueData,
    loading: overdueLoading,
    error: errorOverdue,
  } = useGetAllStatusesIsOverdueQuery({
    variables: { locations },
    skip: userRole === RolesTypes.READER,
  });

  const donateList = useMemo(() => {
    return allMaterialsData?.getAllMaterials.filter(
      (material) =>
        material?.statuses[material?.statuses.length - 1]?.status ===
        StatusTypes.PENDING
    );
  }, [allMaterialsData]);

  const overdueList = useMemo(() => {
    return overdueData?.getAllStatusesIsOverdue.filter((item) =>
      isOverdue(item?.created_at)
    );
  }, [overdueData]);

  useEffect(() => {
    if (messagesError) {
      toast.error(messagesError.message);
    } else if (errorOverdue) {
      toast.error(errorOverdue.message);
    } else if (getAllTakenItemsError) {
      toast.error(getAllTakenItemsError.message);
    } else {
      toast.error(errorMaterials?.message);
    }
    return;
  }, [messagesError, errorOverdue, errorMaterials, getAllTakenItemsError]);

  if (loading || messagesLoading || overdueLoading || materialsLoading)
    return (
      <WrapperLoader>
        <Loader height={100} width={100} color={`${colors.accent_color}`} />
      </WrapperLoader>
    );

  return (
    <WrapperHome>
      {userRole === RolesTypes.READER ? (
        <>
          <InstructionsClaim />
          {data?.getAllTakenItems.length ? (
            <>
              <Wrapper>
                <TextArticle>Don't forget to pass</TextArticle>
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
                fieldsOverdue={overdueList}
              />
              <ManagerInfoCard
                type={ManagerCardTypes.DONATES}
                fieldsDonate={donateList}
              />
            </OverdueDonatesWrapper>
            <NotificationsWrapper>
              <NotificationList
                fieldsNotification={allMessagesData?.getAllMessages}
              />
            </NotificationsWrapper>
          </CardsWrapper>
        </>
      )}
    </WrapperHome>
  );
};

export default HomePage;
