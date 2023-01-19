import styled from '@emotion/styled';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as Claim } from '../../../assets/claim.svg';
import { ReactComponent as Edit } from '../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../assets/Remove.svg';
import { ReactComponent as EnableNotifySvg } from '../../../assets/NoNotification.svg';
import { ReactComponent as CancelNotifySvg } from '../../../assets/CancelNotification.svg';
import {
  GetAllMaterialsForManagerDocument,
  Status,
} from '@mimir/apollo-client';
import { DateTime } from '@mimir/global-types';
import Button from '../Button';
import ClaimOperation from '../ClaimOperation';
import Modal from '../Modal';
import {
  getDates,
  getStatus,
  periodOfKeeping,
} from '../../models/helperFunctions/converTime';
import SuccessMessage from '../SuccessMessage';
import {
  GetAllTakenItemsDocument,
  GetMaterialByIdDocument,
  GetNotificationsByPersonDocument,
  useClaimBookMutation,
  useProlongTimeMutation,
  useReturnBookMutation,
  useRemoveMaterialMutation,
  useUpdateMaterialMutation,
  useGetNotificationsByPersonQuery,
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import ErrorMessage from '../ErrorMessge';
import AskManagerForm from '../AskManagerForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RolesTypes } from '@mimir/global-types';
import { IDropdownOption } from '../Dropdown';
import { TUserLocation } from '../../store/slices/userSlice';
import DescriptionBook from './DescriptionBook';
import Section from '../Section';
import ExpandableText from '../ExpandableText';

export const BookHolder = styled.div`
  width: 100%;
  top: 11.5rem;
  left: 24.5rem;
  border-radius: ${dimensions.xs_1};
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base_2};
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  @media (max-width: ${dimensions.phone_width}) {
    padding-top: ${dimensions.base};
  }
`;

export const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
  }
`;

export const LongDescription = styled.div`
  grid-column: 1 / span 3;
`;

export const WrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  max-width: 276px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  max-width: 278px;
  width: 100%;
`;

export const TitleHolder = styled.p`
  font-weight: 600;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.xs};
  line-height: ${dimensions.xl};
`;

const StyledTextArea = styled.textarea`
  border: none;
  outline: none;
  width: 98%;
  height: 10rem;
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  resize: none;
`;
const TextAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  padding-left: ${dimensions.xs_1};
  margin-right: ${dimensions.xs_1};
  background: ${colors.bg_secondary};
  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }
`;

export const OpenLink = styled.a`
  cursor: pointer;
  margin: ${dimensions.xs_2} 0;
  font-weight: 300;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
`;

export const Topic = styled.p`
  margin: ${dimensions.base} 0 ${dimensions.xs_2} 0;
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

type StatusType = Pick<Status, 'id' | 'person_id' | 'created_at' | 'status'>;

export type Location = {
  __typename?: 'Location' | undefined;
  id: string;
  location: string;
};

export interface INewData {
  newTitle: string;
  newAuthor: string;
}

export interface IBookInfoProps {
  person_id: number | undefined;
  src: string | null | undefined;
  title: string | undefined;
  description: string | undefined;
  statusInfo?: StatusType | null;
  author: string | undefined;
  category: string | undefined;
  identifier: string;
  material_id: number;
  created_at: DateTime;
  updated_at: DateTime;
  type: string;
  location: Location;
}

const BookInfo: FC<IBookInfoProps> = ({
  src = '',
  title = '',
  author = '',
  statusInfo,
  description,
  category,
  identifier,
  created_at,
  updated_at,
  material_id,
  person_id,
  type,
  location,
}) => {
  const { id, userRole } = useAppSelector((state) => state.user);

  const { data: getNotificationsByPersonData } =
    useGetNotificationsByPersonQuery({
      variables: {
        person_id: id,
      },
    });

  const [createNotificationMutation] = useCreateNotificationMutation({
    refetchQueries: [GetNotificationsByPersonDocument],
  });
  const [removeNotificationMutation] = useRemoveNotificationMutation({
    refetchQueries: [GetNotificationsByPersonDocument],
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isShowClaimModal, setIsShowClaimModal] = useState<boolean>(false);
  const [isShowAskManger, setIsShowAskManager] = useState<boolean>(false);
  const [isShowSuccessClaim, setIsShowSuccessClaim] = useState<boolean>(false);
  const [isShowErrorMessageOfClaiming, setIsShowErrorMessageOfClaiming] =
    useState<boolean>(false);
  const [isShowSuccessReturn, setIsSuccessReturn] = useState<boolean>(false);
  const [isShowSuccessExtend, setIsSuccessExtend] = useState<boolean>(false);
  const [isShowErrorMessageOfExtending, setIsShowErrorMessageOfExtending] =
    useState<boolean>(false);
  const [isShowWindowReportedToManager, setIsShowWindowReportedToManager] =
    useState<boolean>(false);
  const [valueIsISBN, setValueIsISBN] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [ReturningBookError, setReturningBookError] = useState<string>();
  const [isReturnError, setIsReturnError] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState(category);
  const [newLocation, setNewLocation] = useState<Location>(location);
  const [newDeadline, setNewDeadline] = useState(periodOfKeeping);
  const [newDescriptionData, setNewDescriptionData] = useState<INewData>({
    newAuthor: author,
    newTitle: title,
  });

  const [newDescription, setNewDescription] = useState(description || '');
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [isMaterialTakenByCurrentUser, setIsMaterialTakenByCurrentUser] =
    useState(false);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };

  const [claimBook, { data }] = useClaimBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [returnBook] = useReturnBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [prolongTime, { data: infoOfProlong }] = useProlongTimeMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [removeMaterial] = useRemoveMaterialMutation({
    refetchQueries: [
      GetMaterialByIdDocument,
      GetAllMaterialsForManagerDocument,
    ],
  });
  const [updateMaterial] = useUpdateMaterialMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const currentStatus = getStatus(statusInfo?.status, created_at);

  const dateConditionOfClaiming =
    data?.claimBook.__typename === 'Status' ? data.claimBook.created_at : null;

  const dateConditionOfExtending =
    infoOfProlong?.prolongClaimPeriod.__typename === 'Status'
      ? infoOfProlong?.prolongClaimPeriod.created_at
      : null;

  const errorConditionOfClaiming =
    data?.claimBook.__typename === 'Error' ? data.claimBook.message : null;
  const errorConditionOfExtending =
    infoOfProlong?.prolongClaimPeriod.__typename === 'Error'
      ? infoOfProlong?.prolongClaimPeriod.message
      : null;

  const handleChangeNewDescriptionData = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDescriptionData({
      ...newDescriptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCategory = (option: IDropdownOption) => {
    setNewCategory(option.value);
  };

  const handleChangeLocation = (option: TUserLocation) => {
    const newLocation = {
      id: option.id,
      location: option.value,
    };
    setNewLocation(newLocation);
  };

  const handleChangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeadline(Number(e.target.value));
    Number(e.target.value) > 31 && setNewDeadline(31);
    Number(e.target.value) <= 0 && setNewDeadline(1);
  };

  const claim = async () => {
    await claimBook({
      variables: {
        person_id: id,
        identifier: valueIsISBN,
      },
    });
    setValueIsISBN('');
    setIsShowClaimModal(false);
    setIsMaterialTakenByCurrentUser(true);
  };

  const retrieveBook = async () => {
    const output = await returnBook({
      variables: {
        person_id: id,
        identifier,
      },
    });
    if (output.data?.returnItem.__typename === 'Error') {
      setReturningBookError(output.data.returnItem.message);
      setIsReturnError(true);
      return;
    }
    setIsReturnError(false);
    setIsSuccessReturn(true);
  };

  const prolongPeriod = async () => {
    await prolongTime({
      variables: {
        person_id: id,
        material_id,
      },
    });
  };

  const editInformation = async () => {
    await updateMaterial({
      variables: {
        identifier: identifier,
        type: type,
        location_id: Number(newLocation.id),
        title: newDescriptionData.newTitle,
        author: newDescriptionData.newAuthor,
        category: newCategory,
        description: newDescription,
        updated_at: getDates(updated_at).currentDate,
      },
    });
    setEditing(false);
  };

  const deleteItem = async () => {
    await removeMaterial({
      variables: {
        identifier: identifier,
        type: type,
        location_id: Number(location.id),
      },
    });
    navigate('/books-stuff');
  };
  const handleEditBtn = () => setEditing(true);
  const handleDeleteBtn = () => setDeleteWarning(true);

  const discardChanges = () => {
    setNewDescriptionData({
      newAuthor: author,
      newTitle: title,
    });
    setNewCategory(category);
    setNewDescription(description ? description : ' ');
    setEditing(false);
  };

  useEffect(() => {
    if (searchParams.has('claimModal') && currentStatus === 'Free') {
      const claimModal = searchParams.get('claimModal')!;
      setIsShowClaimModal(true);
      setValueIsISBN(claimModal);
    }
  }, []);

  useEffect(() => {
    if (infoOfProlong?.prolongClaimPeriod.__typename === 'Status') {
      setIsSuccessExtend(true);
    } else if (infoOfProlong?.prolongClaimPeriod.__typename === 'Error') {
      setIsShowErrorMessageOfExtending(true);
    }
  }, [infoOfProlong]);

  useEffect(() => {
    if (data?.claimBook.__typename === 'Status') {
      setIsShowSuccessClaim(true);
    } else if (data?.claimBook.__typename === 'Error') {
      setIsShowErrorMessageOfClaiming(true);
    }
  }, [data]);

  useEffect(() => {
    if (!getNotificationsByPersonData) return;

    if (
      getNotificationsByPersonData.getNotificationsByPerson.find(
        (notification) => notification?.person_id === id
      )
    ) {
      //TODO: consider removing this local book claiming if no material_id provided
      setIsMaterialTakenByCurrentUser(true);
    }
  }, [getNotificationsByPersonData]);

  const showAskManagerModal = () => {
    setIsShowErrorMessageOfClaiming(false);
    setIsShowAskManager(true);
  };

  const closeReportedManager = useCallback(() => {
    setIsShowWindowReportedToManager(false);
  }, []);

  const showClaimModal = useCallback(() => {
    setIsShowClaimModal(true);
  }, []);

  const handleEnableNotifyButton = async () => {
    await createNotificationMutation({
      variables: {
        input: {
          material_id,
          person_id: id,
        },
      },
    });
    setIsMaterialTakenByCurrentUser(true);
  };

  const handleCancelNotifyButton = async () => {
    await removeNotificationMutation({
      variables: {
        input: {
          material_id,
          person_id: id,
        },
      },
    });
    setIsMaterialTakenByCurrentUser(false);
  };

  return (
    <>
      <BookHolder>
        <ShortDescriptionWrapper>
          <div>
            <DescriptionBook
              title={title}
              author={author}
              category={category}
              date={created_at}
              editing={editing}
              location={location}
              src={src}
              status={statusInfo?.status}
              newDeadline={newDeadline}
              newTitleAndAuthor={newDescriptionData}
              handleChangeDeadline={handleChangeDeadline}
              handleChangeLocation={handleChangeLocation}
              handleChangeAuthorAndTitle={handleChangeNewDescriptionData}
              handleChangeNewGenre={handleChangeCategory}
            />
            {editing ? (
              <>
                <br />
                <TitleHolder>Description: </TitleHolder>
                <TextAreaWrapper>
                  <StyledTextArea
                    value={newDescription}
                    onChange={handleChangeDescription}
                  />
                </TextAreaWrapper>
              </>
            ) : description ? (
              <Section title={'Description: '}>
                <ExpandableText>{description}</ExpandableText>
              </Section>
            ) : null}
          </div>
          {userRole === RolesTypes.READER ? (
            <>
              {statusInfo?.person_id === id ? (
                <WrapperButtons>
                  {!statusInfo ? (
                    <></>
                  ) : (
                    statusInfo?.status !== 'Free' && (
                      <>
                        <StyledButton
                          value="Return a book"
                          onClick={retrieveBook}
                        />
                        <StyledButton
                          value="Extend claim period"
                          transparent
                          onClick={prolongPeriod}
                        />
                      </>
                    )
                  )}
                </WrapperButtons>
              ) : (
                <WrapperButtons>
                  {statusInfo?.status !== 'Free' &&
                    (!isMaterialTakenByCurrentUser ? (
                      <StyledButton
                        value="Notify when available"
                        svgComponent={<EnableNotifySvg />}
                        onClick={handleEnableNotifyButton}
                      />
                    ) : (
                      <StyledButton
                        value="Cancel"
                        svgComponent={<CancelNotifySvg />}
                        transparent
                        onClick={handleCancelNotifyButton}
                      />
                    ))}
                </WrapperButtons>
              )}
              {statusInfo?.status === 'Free' ? (
                <StyledButton
                  value="Claim a book"
                  svgComponent={<Claim />}
                  onClick={showClaimModal}
                />
              ) : null}
            </>
          ) : editing ? (
            <WrapperButtons>
              <StyledButton value="Save changes" onClick={editInformation} />
              <StyledButton
                value="Cancel changes"
                transparent
                onClick={discardChanges}
              />
            </WrapperButtons>
          ) : (
            <WrapperButtons>
              <StyledButton
                value="Edit information"
                transparent
                svgComponent={<Edit />}
                onClick={handleEditBtn}
              />
              <StyledButton
                value="Delete item"
                transparent
                secondary
                svgComponent={<Remove />}
                onClick={handleDeleteBtn}
              />
            </WrapperButtons>
          )}
        </ShortDescriptionWrapper>
        {editing ? (
          <>
            <br />
            <TitleHolder>Description: </TitleHolder>
            <TextAreaWrapper>
              <StyledTextArea
                value={newDescription}
                onChange={handleChangeDescription}
              />
            </TextAreaWrapper>
          </>
        ) : description ? (
          <Section title={'Description: '}>
            <ExpandableText>{description}</ExpandableText>
          </Section>
        ) : null}
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
      <Modal
        active={isShowErrorMessageOfClaiming}
        setActive={setIsShowErrorMessageOfClaiming}
      >
        <ErrorMessage
          title="Something goes wrong with your claiming"
          message={errorConditionOfClaiming}
          titleCancel="Ask a manager"
          setActive={setIsShowErrorMessageOfClaiming}
          onClick={showAskManagerModal}
        />
      </Modal>
      <Modal active={isShowSuccessReturn} setActive={setIsSuccessReturn}>
        <SuccessMessage
          setActive={setIsSuccessReturn}
          title="You have successfully return the book"
        />
      </Modal>
      <Modal active={isShowSuccessExtend} setActive={setIsSuccessExtend}>
        <SuccessMessage
          setActive={setIsSuccessExtend}
          created_at={dateConditionOfExtending}
          title="You have successfully extend claim period"
          description="Enjoy reading and don't forget to return this by"
        />
      </Modal>
      <Modal
        active={isShowErrorMessageOfExtending}
        setActive={setIsShowErrorMessageOfExtending}
      >
        <ErrorMessage
          title="Something goes wrong with your extending"
          message={errorConditionOfExtending}
          setActive={setIsShowErrorMessageOfExtending}
          titleCancel="Close"
        />
      </Modal>
      <Modal active={isReturnError} setActive={setIsReturnError}>
        <ErrorMessage
          title="Something goes wrong with your returning"
          message={ReturningBookError}
          setActive={setIsReturnError}
          titleCancel="Close"
        />
      </Modal>
      <Modal active={isShowAskManger} setActive={setIsShowAskManager}>
        <AskManagerForm
          setActive={setIsShowAskManager}
          setSuccessModal={setIsShowWindowReportedToManager}
          material_id={material_id}
          location_id={Number(location.id)}
        />
      </Modal>
      <Modal
        active={isShowWindowReportedToManager}
        setActive={setIsShowWindowReportedToManager}
      >
        <ErrorMessage
          title="We reported the problem to the manager"
          message="The problem will be solved soon"
          setActive={setIsShowWindowReportedToManager}
          titleCancel="Close"
          onClick={closeReportedManager}
        />
      </Modal>
      {currentStatus === 'Free' ? (
        <Modal active={deleteWarning} setActive={setDeleteWarning}>
          <ErrorMessage
            title="Warning"
            message={`Are you sure you want to delete the book "${title}" from the library permanently?`}
            setActive={setDeleteWarning}
            titleCancel="Cancel"
            titleOption="Yes, delete"
            onSubmitClick={deleteItem}
          />
        </Modal>
      ) : (
        <Modal active={deleteWarning} setActive={setDeleteWarning}>
          <ErrorMessage
            title="Warning"
            message={`The book "${title}" is now in the possession of a person with Id ${statusInfo?.person_id} .Are you sure you want to delete the book "${title}" from the library permanently?`}
            setActive={setDeleteWarning}
            titleCancel="Cancel"
            titleOption="Yes, delete"
            onSubmitClick={deleteItem}
          />
        </Modal>
      )}
    </>
  );
};

export default BookInfo;
