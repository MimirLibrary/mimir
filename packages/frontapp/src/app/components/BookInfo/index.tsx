import styled from '@emotion/styled';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  GetAllMaterialsForManagerDocument,
  GetAllTakenItemsDocument,
  GetMaterialByIdDocument,
  GetNotificationsByPersonDocument,
  Status,
  useClaimBookMutation,
  useCreateNotificationMutation,
  useGetAllLocationsQuery,
  useGetNotificationsByPersonQuery,
  useProlongTimeMutation,
  useRemoveMaterialMutation,
  useRemoveNotificationMutation,
  useReturnBookMutation,
  useUpdateMaterialMutation,
} from '@mimir/apollo-client';
import { DateTime, RolesTypes, Notification } from '@mimir/global-types';
import ClaimOperation from '../ClaimOperation';
import Modal from '../Modal';
import {
  getDates,
  getStatus,
  periodOfKeeping,
} from '../../models/helperFunctions/converTime';
import SuccessMessage from '../SuccessMessage';
import { useAppSelector } from '../../hooks/useTypedSelector';
import ErrorMessage from '../ErrorMessge';
import AskManagerForm from '../AskManagerForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IDropdownOption } from '../Dropdown';
import { TUserLocation } from '../../store/slices/userSlice';
import Section from '../Section';
import ExpandableText from '../ExpandableText';
import { ReturnBookButtons } from './Buttons/ReturnBookButtons';
import { NotifyMeButtons } from './Buttons/NotifyMeButtons';
import { EditButtons } from './Buttons/EditButtons';
import { ControlButtons } from './Buttons/ControlButtons';
import emptyCover from '../../../assets/MOC-data/EmptyCover.png';
import Edit from '../Edit';
import { listOfGenres } from '../../../assets/SearchConsts';
import { toast } from 'react-toastify';
import AcceptRejectModals from '../AcceptRejectModals';
import { DonateButtons } from './Buttons/DonateButtons';
import { CurrentStatus } from './CurrentStatus';

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

const BookWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 12rem 1fr minmax(auto, 278px);
  gap: ${dimensions.base};
  grid-template-areas:
    'picture credits buttons'
    'description description description';

  padding: ${dimensions.base_2};
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  box-shadow: 0 10px 70px rgba(26, 30, 214, 0.08);
  box-sizing: border-box;

  @media (max-width: ${dimensions.wide_laptop_width}) {
    grid-template-columns: 12rem 1fr;
    grid-template-areas:
      'picture credits'
      'description description'
      'buttons buttons';
  }

  @media (max-width: ${dimensions.tablet_width}) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'picture'
      'credits'
      'description'
      'buttons';
  }
`;
const BookImageWrapper = styled.div`
  display: flex;

  @media (max-width: ${dimensions.tablet_width}) {
    justify-content: center;
  }
`;

const BookImage = styled.img`
  grid-area: picture;
  width: 12rem;
  height: 19.5rem;
  border-radius: ${dimensions.xs_1};

  @media (max-width: ${dimensions.tablet_width}) {
    justify-self: center;
  }
`;

const BookTitle = styled.p`
  font-weight: 700;
  margin-bottom: ${dimensions.xl_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};

  @media (max-width: ${dimensions.tablet_width}) {
    text-align: center;
  }
`;

const BookCredits = styled.div`
  width: 100%;
  grid-area: credits;
`;

const BookDescription = styled.div`
  width: 100%;
  grid-area: description;
`;

const BookControls = styled.div`
  grid-area: buttons;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: ${dimensions.base};

  @media (max-width: ${dimensions.wide_laptop_width}) {
    flex-direction: row;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    flex-direction: column;
  }
`;

export const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${dimensions.xl_2};
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

export const TitleHolder = styled.p`
  font-weight: 600;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.xs};
  line-height: ${dimensions.xl};
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

export type StatusType = Pick<
  Status,
  'id' | 'person_id' | 'created_at' | 'status'
>;

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
  isDonate?: boolean;
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
  type,
  location,
  isDonate = false,
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
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [active, setActive] = useState(false);
  const [method, setMethod] = useState('');

  const [newCategory, setNewCategory] = useState(category);
  const [newLocation, setNewLocation] = useState<Location>(location);
  const [newDeadline, setNewDeadline] = useState(periodOfKeeping);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description || '');

  const [isCurrentUserSubscribed, setIsCurrentUserSubscriber] = useState(false);

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

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(e.target.value);
  };

  const handleChangeCategory = (e: IDropdownOption) => {
    setNewCategory(e.value);
  };

  const handleChangeLocation = (e: TUserLocation) => {
    const newLocation = { id: e.id, location: e.value };
    setNewLocation(newLocation);
  };

  const handleChangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setNewDeadline(Number(e.target.value));
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
        title: newTitle,
        author: newAuthor,
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
    setNewTitle(title);
    setNewAuthor(author);
    setNewCategory(category);
    setNewDeadline(newDeadline);
    setNewLocation(location);
    setNewDescription(description ? description : '');
    setEditing(false);
  };

  useEffect(() => {
    if (searchParams.has('claimModal') && currentStatus === 'Free') {
      const claimModal = searchParams.get('claimModal')!;
      setIsShowClaimModal(true);
      setValueIsISBN(claimModal);
    }
  }, [currentStatus, searchParams]);

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

  // Check if current user is subscribed on this book
  useEffect(() => {
    if (!getNotificationsByPersonData) return;
    if (
      getNotificationsByPersonData.getNotificationsByPerson
        .filter((item): item is Notification => !!item)
        .filter((item) => item.material_id === material_id)
        .find((item) => item.person_id === id)
    ) {
      setIsCurrentUserSubscriber(true);
    }
  }, [id, material_id, getNotificationsByPersonData]);

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
    setIsCurrentUserSubscriber(true);
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
    setIsCurrentUserSubscriber(false);
  };

  const onClickReject = () => {
    setActive(true);
    setMethod('reject');
  };
  const onClickAccept = () => {
    setActive(true);
    setMethod('accept');
  };

  const { data: locations, error: errorLocations } = useGetAllLocationsQuery({
    skip: userRole === RolesTypes.READER,
  });

  useEffect(() => {
    if (errorLocations) {
      toast.error(errorLocations.message);
    }
  }, [errorLocations]);

  const locationsMap: IDropdownOption[] =
    locations?.getAllLocations
      .filter((value): value is Location => !!value)
      .map((loc) => ({ id: loc.id, value: loc.location })) || [];

  return (
    <>
      <BookWrapper>
        <BookImageWrapper>
          <BookImage src={src || emptyCover} />
        </BookImageWrapper>
        <BookCredits>
          {editing ? (
            <>
              <Edit
                title={'Name:'}
                handler={handleChangeTitle}
                placeholder={'Enter title'}
                value={newTitle}
              />
              <Edit
                dropdown
                title={'Genre:'}
                dropdownOptions={listOfGenres}
                placeholder={'Enter genre'}
                handler={handleChangeCategory}
                value={newCategory}
              />
              <Edit
                title={'Author:'}
                handler={handleChangeAuthor}
                placeholder={'Enter author(s)'}
                value={newAuthor}
              />
              <Edit
                type="number"
                title={'Deadline:'}
                handler={handleChangeDeadline}
                placeholder={'Enter deadline'}
                value={newDeadline.toString()}
              />
              <Edit
                dropdown
                title={'Location:'}
                dropdownOptions={locationsMap}
                handler={handleChangeLocation}
                value={newLocation.location}
              />
            </>
          ) : (
            <>
              <BookTitle>{title}</BookTitle>
              <Section title={'Genre:'}>{category}</Section>
              <Section title={'Author:'}>{author}</Section>
              {isDonate ? (
                <Section title={'Status:'}>
                  {statusInfo ? (
                    <CurrentStatus status={statusInfo} />
                  ) : (
                    'No information provided'
                  )}
                </Section>
              ) : (
                <Section title={'Deadline:'}>{newDeadline}</Section>
              )}
              <Section title={'Location:'}>{location.location}</Section>
            </>
          )}
        </BookCredits>
        {description ? (
          <BookDescription>
            {editing ? (
              <Edit
                textarea
                title={'Description:'}
                handler={handleChangeDescription}
                value={newDescription}
              />
            ) : (
              <Section title={'Description:'}>
                <ExpandableText>{description}</ExpandableText>
              </Section>
            )}
          </BookDescription>
        ) : null}
        <BookControls>
          {userRole === RolesTypes.READER ? (
            statusInfo?.status !== 'Pending' ? (
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
                  isUserSubscriber={isCurrentUserSubscribed}
                  onSubscribe={handleEnableNotifyButton}
                  onCancel={handleCancelNotifyButton}
                />
              )
            ) : null
          ) : editing ? (
            <EditButtons onSave={editInformation} onCancel={discardChanges} />
          ) : isDonate && statusInfo?.status === 'Pending' ? (
            <DonateButtons onAccept={onClickAccept} onReject={onClickReject} />
          ) : isDonate && statusInfo?.status !== 'Pending' ? null : (
            <ControlButtons onEdit={handleEditBtn} onDelete={handleDeleteBtn} />
          )}
        </BookControls>
      </BookWrapper>
      <AcceptRejectModals
        active={active}
        setActive={setActive}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
        method={method}
      />
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
