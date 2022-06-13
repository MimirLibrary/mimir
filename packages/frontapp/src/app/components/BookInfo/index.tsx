import styled from '@emotion/styled';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import React, { FC, useEffect, useState } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as Claim } from '../../../assets/claim.svg';
import Button from '../Button';
import ClaimOperation from '../ClaimOperation';
import Modal from '../Modal';
import { getDates, getStatus } from '../../models/helperFunctions/converTime';
import { StyledBookStatus } from '../../globalUI/Status';
import SuccessMessage from '../SuccesMessage';
import {
  GetAllTakenItemsDocument,
  GetMaterialByIdDocument,
  useClaimBookMutation,
  useReturnBookMutation,
  useGetAllTakenItemsQuery,
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import ErrorMessage from '../ErrorMessge';
import { useParams } from 'react-router';

const BookHolder = styled.div`
  max-width: 62.5rem;
  height: 41rem;
  top: 11.5rem;
  left: 24.5rem;
  border-radius: ${dimensions.xs_1};
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base_2};
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
`;

const BookImage = styled.img`
  display: inline-block;
  width: 12rem;
  height: 19.5rem;
  @media (max-width: ${dimensions.phone_width}) {
    width: 5rem;
    height: 8rem;
    margin-right: ${dimensions.base};
  }
`;

const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${dimensions.xl_2};
`;
const ShortDescription = styled.div`
  width: 100%;
  margin-left: ${dimensions.xl_2};
`;

const TitleBook = styled.h3`
  font-weight: 700;
  margin-bottom: ${dimensions.base_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const Topic = styled.p`
  margin: ${dimensions.xs_2} 0;
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const TopicDescription = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

const LongDescription = styled.div`
  margin-top: ${dimensions.xl_2};
  grid-column: 1 / span 3;
`;

const OpenLink = styled.a`
  cursor: pointer;
  margin: ${dimensions.xs_2} 0;
  font-weight: 500;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

const StyledStatus = styled(StyledBookStatus)`
  font-size: ${dimensions.base};
  margin-top: ${dimensions.base};
`;

const WrapperInfo = styled.div`
  display: flex;
`;

const WrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 276px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  max-width: 278px;
  width: 100%;
  margin-bottom: 8px;
`;

interface IBookInfoProps {
  src: string | null | undefined;
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  author: string | undefined;
  category: string | string[] | undefined;
  identifier: string;
  created_at: any;
}

const BookInfo: FC<IBookInfoProps> = ({
  src = '',
  title = '',
  author = '',
  status,
  description = '',
  category,
  identifier,
  created_at,
}) => {
  const { id } = useAppSelector((state) => state.user);
  const { item_id } = useParams();
  const [statusText, setStatusText] = useState<string>('');
  const [isShowClaimModal, setIsShowClaimModal] = useState<boolean>(false);
  const [isShowSuccessClaim, setIsShowSuccessClaim] = useState<boolean>(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState<boolean>(false);
  const [isShowSuccessReturn, setIsSuccessReturn] = useState<boolean>(false);
  const [isMaterialTakenByCurrentUser, setIsMaterialTakenByCurrentUser] =
    useState<boolean>(false);
  const [
    isNotificationEnabledByCurrentUser,
    setIsNotificationEnabledByCurrentUser,
  ] = useState<boolean>(false);
  const [valueIsISBN, setValueIsISBN] = useState<string>('');
  const [claimBook, { data }] = useClaimBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [returnBook, infoReturnBook] = useReturnBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const {
    data: allTakenItemsByCurrentUserData,
    loading: allTakenItemsByCurrentUserLoading,
  } = useGetAllTakenItemsQuery({
    variables: {
      person_id: id,
    },
  });
  const [createNotification] = useCreateNotificationMutation();
  const [removeNotification] = useRemoveNotificationMutation();

  const currentStatus = getStatus(status, created_at);
  const dateConditionOfClaiming =
    data?.claimBook.__typename === 'Status' ? data.claimBook.created_at : null;
  const errorConditionOfClaiming =
    data?.claimBook.__typename === 'Error' ? data.claimBook.message : null;
  const claim = async () => {
    await claimBook({
      variables: {
        person_id: id,
        identifier: valueIsISBN,
      },
    });

    setValueIsISBN('');
    setIsMaterialTakenByCurrentUser(true);
  };

  const retrieveBook = async () => {
    await returnBook({
      variables: {
        person_id: id,
        identifier,
      },
    });

    setIsSuccessReturn(true);
  };

  useEffect(() => {
    setIsShowClaimModal(false);
    if (data?.claimBook.__typename === 'Status') {
      setIsShowSuccessClaim(true);
    } else if (data?.claimBook.__typename === 'Error') {
      setIsShowErrorMessage(true);
    }
  }, [data]);

  useEffect(() => {
    switch (currentStatus) {
      case 'Free':
        setStatusText('On the shelf');
        break;
      case 'Busy': {
        const day = `${getDates(created_at).returnDate.getDate()}`.padStart(
          2,
          '0'
        );
        const month = `${
          getDates(created_at).returnDate.getMonth() + 1
        }`.padStart(2, '0');
        setStatusText(`Return till: ${day}.${month}`);
        break;
      }
      case 'Overdue':
        setStatusText('Overdue');
        break;
      default:
        setStatusText('');
        break;
    }
  }, [currentStatus]);

  useEffect(() => {
    if (!allTakenItemsByCurrentUserLoading) {
      setIsMaterialTakenByCurrentUser(
        !!allTakenItemsByCurrentUserData?.getAllTakenItems.find(
          (item) => item?.material.id === item_id
        )
      );
    }
  }, [allTakenItemsByCurrentUserLoading]);

  const showClaimModal = () => {
    setIsShowClaimModal(true);
  };

  const handleCreateNotification = async () => {
    await createNotification({
      variables: {
        input: {
          material_id: parseInt(item_id!),
          person_id: id,
        },
      },
    });

    setIsNotificationEnabledByCurrentUser(true);
  };

  const handleRemoveNotification = async () => {
    await removeNotification({
      variables: {
        input: {
          material_id: parseInt(item_id!),
          person_id: id,
        },
      },
    });

    setIsNotificationEnabledByCurrentUser(false);
  };

  return (
    <>
      <BookHolder>
        <ShortDescriptionWrapper>
          <WrapperInfo>
            <BookImage src={src || bookImage} />
            <ShortDescription>
              <TitleBook>{title || 'Book Title'}</TitleBook>
              <Topic>Genre: </Topic>
              <OpenLink>{category || 'Genres of book'}</OpenLink>
              <Topic>Author: </Topic>
              <TopicDescription>{author || 'Author Name'}</TopicDescription>
              <StyledStatus status={currentStatus}>{statusText}</StyledStatus>
            </ShortDescription>
          </WrapperInfo>
          <WrapperButtons>
            {status === 'Free' && !allTakenItemsByCurrentUserLoading && (
              <StyledButton
                value="Claim a book"
                svgComponent={<Claim />}
                onClick={showClaimModal}
              />
            )}
            {status !== 'Free' &&
              isMaterialTakenByCurrentUser &&
              !allTakenItemsByCurrentUserLoading && (
                <>
                  <StyledButton value="Return a book" onClick={retrieveBook} />
                  <StyledButton value="Extend claim period" transparent />
                </>
              )}
            {status === 'Busy' &&
              !isMaterialTakenByCurrentUser &&
              !allTakenItemsByCurrentUserLoading &&
              !isNotificationEnabledByCurrentUser && (
                <StyledButton
                  value="Notify when available"
                  onClick={handleCreateNotification}
                />
              )}
            {status === 'Busy' &&
              !isMaterialTakenByCurrentUser &&
              !allTakenItemsByCurrentUserLoading &&
              isNotificationEnabledByCurrentUser && (
                <StyledButton
                  value="Cancel"
                  onClick={handleRemoveNotification}
                  transparent
                />
              )}
          </WrapperButtons>
        </ShortDescriptionWrapper>
        <LongDescription>
          <Topic>Description: </Topic>
          <Description>
            {description ||
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi impedit aliquid alias consequuntur! Totam sequi expedita sunt dolor obcaecati, iusto ducimus? Beatae ea, commodi ab repellat, corporis atque quasi, tempore sunt modi similique soluta nemo hic necessitatibus esse accusantium omnis neque rerum. Placeat tempore, fugiat unde consequuntur dolor tempora ducimus.'}
          </Description>
          <OpenLink>see full description</OpenLink>
        </LongDescription>
      </BookHolder>
      <Modal active={isShowClaimModal} setActive={setIsShowClaimModal}>
        <ClaimOperation
          setActive={setIsShowClaimModal}
          claimBook={claim}
          value={valueIsISBN}
          setValueInput={setValueIsISBN}
        />
      </Modal>
      <Modal active={isShowSuccessClaim} setActive={setIsShowSuccessClaim}>
        <SuccessMessage
          setActive={setIsShowSuccessClaim}
          title="You have successfully claim the book"
          description="Enjoy reading and don't forget to return this by"
          created_at={dateConditionOfClaiming}
        />
      </Modal>
      <Modal active={isShowErrorMessage} setActive={setIsShowErrorMessage}>
        <ErrorMessage
          message={errorConditionOfClaiming}
          setActive={setIsShowErrorMessage}
        />
      </Modal>
      <Modal active={isShowSuccessReturn} setActive={setIsSuccessReturn}>
        <SuccessMessage
          setActive={setIsSuccessReturn}
          title="You have successfully return the book"
        />
      </Modal>
    </>
  );
};

export default React.memo(BookInfo);
