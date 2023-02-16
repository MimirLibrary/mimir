import styled from '@emotion/styled';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  GetAllMaterialsForManagerDocument,
  GetItemsForClaimHistoryDocument,
  Status,
} from '@mimir/apollo-client';
import { DateTime } from '@mimir/global-types';
import Button from '../Button';
import ClaimOperation from '../ClaimOperation';
import Modal from '../Modal';
import { getStatus } from '../../models/helperFunctions/converTime';
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
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RolesTypes } from '@mimir/global-types';
import { IDropdownOption } from '../Dropdown';
import { TUserLocation } from '../../store/slices/userSlice';
import DescriptionBook from './DescriptionBook';
import Section from '../Section';
import ExpandableText from '../ExpandableText';
import { useMediaQuery } from 'react-responsive';
import { ReturnBookButtons } from './ReturnBookButtons';
import { NotifyMeButtons } from './NotifyMeButtons';
import { EditButtons } from './EditButtons';
import { ControlButtons } from './ControlButtons';
import { t } from 'i18next';
import { UserOperationType } from '../../types/operationType';

export const BookHolder = styled.div`
  width: 100%;
  top: 11.5rem;
  left: 24.5rem;
  border-radius: ${dimensions.xs_1};
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base_2};
  box-shadow: 0 10px 70px rgba(26, 30, 214, 0.08);
  box-sizing: border-box;
`;

export const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${dimensions.xl_2};
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

  @media (max-width: ${dimensions.wide_laptop_width}) {
    margin-top: ${dimensions.base};
    flex-flow: wrap row;
    max-width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  max-width: 278px;

  @media (max-width: ${dimensions.wide_laptop_width}) {
    flex: 1;
    min-width: 278px;
    max-width: 100%;
  }
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
  text-align: justify;
`;
const TextAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: ${dimensions.xs_1};
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
    width: 100%;
  }
`;

export const OpenLink = styled(Link)`
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
  person_id?: number | undefined;
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
  returnDate?: string;
  type: string;
  location: Location;
  claimDuration: number;
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
  returnDate,
  material_id,
  type,
  location,
  claimDuration,
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

  const isLaptop = useMediaQuery({ maxWidth: dimensions.wide_laptop_width });
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
  const [newClaimDuration, setNewClaimDuration] = useState(claimDuration);
  const [newDescriptionData, setNewDescriptionData] = useState<INewData>({
    newAuthor: author,
    newTitle: title,
  });

  const [newDescription, setNewDescription] = useState(description || '');
  const [deleteWarning, setDeleteWarning] = useState(false);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };

  const [claimBook, { data }] = useClaimBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [returnBook] = useReturnBookMutation({
    refetchQueries: [
      GetMaterialByIdDocument,
      GetAllTakenItemsDocument,
      GetItemsForClaimHistoryDocument,
    ],
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
  const currentStatus = getStatus(statusInfo?.status, returnDate);

  const dateConditionOfClaiming =
    data?.claimBook.__typename === 'Status' ? data.claimBook.created_at : null;

  const returnDateConditionOfClaiming =
    data?.claimBook.__typename === 'Status' ? data.claimBook.returnDate : null;

  const dateConditionOfExtending =
    infoOfProlong?.prolongClaimPeriod.__typename === 'Status'
      ? infoOfProlong?.prolongClaimPeriod.created_at
      : null;

  const returnDateConditionOfExtending =
    infoOfProlong?.prolongClaimPeriod.__typename === 'Status'
      ? infoOfProlong?.prolongClaimPeriod.returnDate
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

  const handleClaimDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDuration = Number(e.target.value);
    setNewClaimDuration(newDuration < 0 ? 0 : newDuration);
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
        updated_at: new Date(),
        claimDuration: newClaimDuration,
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
  };

  return (
    <>
      <BookHolder>
        <ShortDescriptionWrapper>
          <DescriptionBook
            title={title}
            author={author}
            category={category}
            date={created_at}
            returnDate={returnDate}
            editing={editing}
            location={location}
            src={src}
            status={statusInfo?.status}
            claimDuration={newClaimDuration}
            newTitleAndAuthor={newDescriptionData}
            claimedUserId={statusInfo?.person_id}
            handleChangeDeadline={handleClaimDurationChange}
            handleChangeLocation={handleChangeLocation}
            handleChangeAuthorAndTitle={handleChangeNewDescriptionData}
            handleChangeNewGenre={handleChangeCategory}
          />
          {isLaptop ? null : (
            <WrapperButtons>
              {userRole === RolesTypes.READER ? (
                statusInfo?.status === 'Free' ? (
                  <ReturnBookButtons
                    onClaim={showClaimModal}
                    onReturn={retrieveBook}
                    onProlong={prolongPeriod}
                  />
                ) : statusInfo?.status !== 'Free' &&
                  statusInfo?.person_id === id ? (
                  <ReturnBookButtons
                    isClaimed
                    onClaim={showClaimModal}
                    onReturn={retrieveBook}
                    onProlong={prolongPeriod}
                  />
                ) : (
                  <NotifyMeButtons
                    onSubscribe={handleEnableNotifyButton}
                    onCancel={handleCancelNotifyButton}
                  />
                )
              ) : editing ? (
                <EditButtons
                  onSave={editInformation}
                  onCancel={discardChanges}
                />
              ) : (
                <ControlButtons
                  onEdit={handleEditBtn}
                  onDelete={handleDeleteBtn}
                />
              )}
            </WrapperButtons>
          )}
        </ShortDescriptionWrapper>
        {editing ? (
          <>
            <br />
            <TitleHolder>
              {t('DonateItem.Inputs.Description.Title')}:
            </TitleHolder>
            <TextAreaWrapper>
              <StyledTextArea
                value={newDescription}
                onChange={handleChangeDescription}
              />
            </TextAreaWrapper>
          </>
        ) : description ? (
          <Section title={t('DonateItem.Inputs.Description.Title')}>
            <ExpandableText>{description}</ExpandableText>
          </Section>
        ) : null}
        {!isLaptop ? null : (
          <WrapperButtons>
            {userRole === RolesTypes.READER ? (
              statusInfo?.status === 'Free' ? (
                <ReturnBookButtons
                  onClaim={showClaimModal}
                  onReturn={retrieveBook}
                  onProlong={prolongPeriod}
                />
              ) : statusInfo?.status !== 'Free' &&
                statusInfo?.person_id === id ? (
                <ReturnBookButtons
                  isClaimed
                  onClaim={showClaimModal}
                  onReturn={retrieveBook}
                  onProlong={prolongPeriod}
                />
              ) : (
                <NotifyMeButtons
                  onSubscribe={handleEnableNotifyButton}
                  onCancel={handleCancelNotifyButton}
                />
              )
            ) : editing ? (
              <EditButtons onSave={editInformation} onCancel={discardChanges} />
            ) : (
              <ControlButtons
                onEdit={handleEditBtn}
                onDelete={handleDeleteBtn}
              />
            )}
          </WrapperButtons>
        )}
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
          title={t('DonateItem.Messages.Claim.Title')}
          description={t('DonateItem.Messages.Claim.Description')}
          returnDate={returnDateConditionOfClaiming}
          operation={UserOperationType.CLAIM}
        />
      </Modal>
      <Modal
        active={isShowErrorMessageOfClaiming}
        setActive={setIsShowErrorMessageOfClaiming}
      >
        <ErrorMessage
          title={t('DonateItem.Messages.Errors.Claim')}
          message={errorConditionOfClaiming}
          titleCancel={t('DonateItem.Buttons.AskManager')}
          setActive={setIsShowErrorMessageOfClaiming}
          onClick={showAskManagerModal}
        />
      </Modal>
      <Modal active={isShowSuccessReturn} setActive={setIsSuccessReturn}>
        <SuccessMessage
          setActive={setIsSuccessReturn}
          title={t('DonateItem.Messages.Return')}
          operation={UserOperationType.RETURN}
        />
      </Modal>
      <Modal active={isShowSuccessExtend} setActive={setIsSuccessExtend}>
        <SuccessMessage
          setActive={setIsSuccessExtend}
          returnDate={returnDateConditionOfExtending}
          title={t('DonateItem.Messages.Extend.Title')}
          description={t('DonateItem.Messages.Extend.Description')}
          operation={UserOperationType.PROLONG}
        />
      </Modal>
      <Modal
        active={isShowErrorMessageOfExtending}
        setActive={setIsShowErrorMessageOfExtending}
      >
        <ErrorMessage
          title={t('DonateItem.Messages.Errors.Extend')}
          message={errorConditionOfExtending}
          setActive={setIsShowErrorMessageOfExtending}
          titleCancel={t('DonateItem.Messages.Buttons.Cancel')}
        />
      </Modal>
      <Modal active={isReturnError} setActive={setIsReturnError}>
        <ErrorMessage
          title={t('DonateItem.Messages.Errors.Return')}
          message={ReturningBookError}
          setActive={setIsReturnError}
          titleCancel={t('DonateItem.Messages.Buttons.Close')}
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
          title={t('DonateItem.Messages.Errors.ReportToManager.Title')}
          message={t('DonateItem.Messages.Errors.ReportToManager.Description')}
          setActive={setIsShowWindowReportedToManager}
          titleCancel={t('DonateItem.Messages.Buttons.Close')}
          onClick={closeReportedManager}
        />
      </Modal>
      {currentStatus === 'Free' ? (
        <Modal active={deleteWarning} setActive={setDeleteWarning}>
          <ErrorMessage
            title={t('DonateItem.Messages.Delete.Title')}
            message={t('DonateItem.Messages.Delete.Desctription', { title })}
            setActive={setDeleteWarning}
            titleCancel={t('DonateItem.Messages.Buttons.Cancel')}
            titleOption={t('DonateItem.Messages.Buttons.Delete')}
            onSubmitClick={deleteItem}
          />
        </Modal>
      ) : (
        // Here, I removed the person_id from the message. Later we can add username if needed
        <Modal active={deleteWarning} setActive={setDeleteWarning}>
          <ErrorMessage
            title={t('DonateItem.Messages.Delete.Title')}
            message={t('DonateItem.Messages.Errors.Delete.Desctription', {
              title,
            })}
            setActive={setDeleteWarning}
            titleCancel={t('DonateItem.Messages.Buttons.Cancel')}
            titleOption={t('DonateItem.Messages.Buttons.Delete')}
            onSubmitClick={deleteItem}
          />
        </Modal>
      )}
    </>
  );
};

export default BookInfo;
