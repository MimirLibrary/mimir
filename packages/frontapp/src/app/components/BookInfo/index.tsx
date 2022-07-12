import styled from '@emotion/styled';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as Claim } from '../../../assets/claim.svg';
import { ReactComponent as Edit } from '../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../assets/Remove.svg';
import { ReactComponent as EnableNotifySvg } from '../../../assets/NoNotification.svg';
import { ReactComponent as CancelNotifySvg } from '../../../assets/CancelNotification.svg';
import Button from '../Button';
import ClaimOperation from '../ClaimOperation';
import Modal from '../Modal';
import {
  getDates,
  getStatus,
  periodOfKeeping,
} from '../../models/helperFunctions/converTime';
import { StyledBookStatus } from '../../globalUI/Status';
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
  useGetAllMaterialsQuery,
  useGetNotificationsByPersonQuery,
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import ErrorMessage from '../ErrorMessge';
import AskManagerForm from '../AskManagerForm';
import { WrapperInput } from '../Search';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RolesTypes } from '@mimir/global-types';
const BookHolder = styled.div`
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

const BookImage = styled.img`
  display: inline-block;
  width: 12rem;
  height: 19.5rem;
  border-radius: 10px;
  @media (max-width: ${dimensions.phone_width}) {
    margin-right: ${dimensions.base};
  }
`;

const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
  }
`;

const ShortDescription = styled.div`
  width: 100%;
  margin-left: ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    margin: 0;
  }
`;

const TitleBook = styled.h3`
  font-weight: 700;
  margin-bottom: ${dimensions.base_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  @media (max-width: ${dimensions.phone_width}) {
    margin-bottom: 0;
    margin-top: ${dimensions.base};
  }
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
  color: ${colors.main_black};
`;

const LongDescription = styled.div`
  margin-top: ${dimensions.xl_2};
  grid-column: 1 / span 3;
`;

const OpenLink = styled.a`
  cursor: pointer;
  margin: ${dimensions.xs_2} 0;
  font-weight: 300;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const StyledStatus = styled(StyledBookStatus)`
  font-size: ${dimensions.base};
  margin-top: ${dimensions.base};
`;

const WrapperInfo = styled.div`
  display: flex;
  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
    align-items: center;
  }
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

const StyledInput = styled.input`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  margin-right: 0.12rem;
`;
const StyledInputDeadline = styled.input`
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  width: 3.7rem;
  outline: none;
  padding-left: ${dimensions.xl};
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
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const TitleHolder = styled.p`
  font-weight: 700;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.xs};
`;

const StyledSelect = styled.select`
  border: none;
  outline: none;
  width: 95%;
  color: ${colors.main_black};
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

interface IBookInfoProps {
  person_id: number | undefined;
  src: string | null | undefined;
  title: string | undefined;
  description: string | undefined;
  statusInfo: any;
  author: string | undefined;
  category: string | undefined;
  identifier: string;
  material_id: number;
  created_at: any;
  updated_at: any;
  type: string;
  location_id: number;
}

const BookInfo: FC<IBookInfoProps> = ({
  src = '',
  title = '',
  author = '',
  statusInfo,
  description = '',
  category,
  identifier,
  created_at,
  updated_at,
  material_id,
  person_id,
  type,
  location_id,
}) => {
  const { id, userRole } = useAppSelector((state) => state.user);
  const { data: allMaterials } = useGetAllMaterialsQuery();
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
  const [statusText, setStatusText] = useState<string>('');
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
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newCategory, setNewCategory] = useState(category);
  const [newDescription, setNewDescription] = useState(
    description
      ? description
      : ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi impedit aliquid alias consequuntur! Totam sequi expedita sunt dolor obcaecati, iusto ducimus? Beatae ea, commodi ab repellat, corporis atque quasi, tempore sunt modi similique soluta nemo hic necessitatibus esse accusantium omnis neque rerum. Placeat tempore, fugiat unde consequuntur dolor tempora ducimus.'
  );
  const [newDeadline, setNewDeadline] = useState(periodOfKeeping);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [authorsDropDown, setAuthorsDropDown] = useState<
    (string | undefined)[] | undefined
  >();
  const [categoriesDropDown, setCategoriesDropDown] = useState<
    (string | undefined)[] | undefined
  >();
  const [isMaterialTakenByCurrentUser, setIsMaterialTakenByCurrentUser] =
    useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  const handleChangeDescription = (e: any) => {
    setNewDescription(e.target.value);
  };
  const handleChangeDeadline = (e: any) => {
    setNewDeadline(e.target.value);
    e.target.value > 31 && setNewDeadline(31);
    e.target.value <= 0 && setNewDeadline(1);
  };

  const [claimBook, { data }] = useClaimBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [returnBook, infoReturnBook] = useReturnBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [prolongTime, { data: infoOfProlong }] = useProlongTimeMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const [removeMaterial] = useRemoveMaterialMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
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
    await returnBook({
      variables: {
        person_id: id,
        identifier,
      },
    });

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
        location_id: location_id,
        title: newTitle,
        author: newAuthor,
        category: newCategory,
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
        location_id: location_id,
      },
    });
    navigate('/search');
    window.location.reload();
  };
  const handleEditBtn = () => setEditing(true);
  const handleDeleteBtn = () => setDeleteWarning(true);

  const discardChanges = () => {
    setNewTitle(title);
    setNewAuthor(author);
    setNewCategory(category);
    setNewDescription(
      description
        ? description
        : ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi impedit aliquid alias consequuntur! Totam sequi expedita sunt dolor obcaecati, iusto ducimus? Beatae ea, commodi ab repellat, corporis atque quasi, tempore sunt modi similique soluta nemo hic necessitatibus esse accusantium omnis neque rerum. Placeat tempore, fugiat unde consequuntur dolor tempora ducimus.'
    );
    setEditing(false);
  };
  useEffect(() => {
    if (searchParams.has('claimModal') && currentStatus === 'Free') {
      const claimModal = searchParams.get('claimModal')!;
      setIsShowClaimModal(true);
      setValueIsISBN(claimModal);
    }
    const authors = allMaterials?.getAllMaterials?.map((item) => {
      return item?.author;
    });
    const categories = allMaterials?.getAllMaterials?.map((item) => {
      return item?.category;
    });
    setAuthorsDropDown([...new Set(authors)]);
    setCategoriesDropDown([...new Set(categories)]);
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
      case 'Prolong': {
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
    if (!getNotificationsByPersonData) return;

    if (
      getNotificationsByPersonData.getNotificationsByPerson.find(
        (notification) => notification?.person_id === id
      )
    )
      return setIsMaterialTakenByCurrentUser(true);
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
          <WrapperInfo>
            <BookImage
              src={
                (src && `${process.env['NX_API_ROOT_URL']}/${src}`) || bookImage
              }
            />
            <ShortDescription>
              {editing ? (
                <>
                  <TitleHolder>Name </TitleHolder>
                  <WrapperInput>
                    <StyledInput
                      type="text"
                      value={newTitle}
                      onChange={handleChangeTitle}
                    />
                  </WrapperInput>
                </>
              ) : (
                <TitleBook>{title || 'Book Title'}</TitleBook>
              )}
              {!editing && <Topic>Genre: </Topic>}
              {userRole === RolesTypes.READER ? (
                <OpenLink>{category || 'Genres of book'}</OpenLink>
              ) : editing ? (
                <>
                  <br />
                  <TitleHolder>Genre </TitleHolder>
                  <WrapperInput>
                    <StyledSelect
                      name="categories"
                      onChange={(e) => {
                        setNewCategory(e.target.value);
                      }}
                    >
                      {categoriesDropDown?.map(
                        (category: string | undefined) => (
                          <option value={category}>{category}</option>
                        )
                      )}
                    </StyledSelect>
                  </WrapperInput>
                </>
              ) : (
                <TopicDescription>
                  {category || 'Genres of book'}
                </TopicDescription>
              )}
              {editing ? (
                <>
                  <br />
                  <TitleHolder>Author </TitleHolder>
                  <WrapperInput>
                    <StyledSelect
                      name="authors"
                      onChange={(e) => {
                        setNewAuthor(e.target.value);
                      }}
                    >
                      {authorsDropDown?.map((author: string | undefined) => (
                        <option value={author}>{author}</option>
                      ))}
                    </StyledSelect>
                  </WrapperInput>
                </>
              ) : (
                <>
                  <Topic>Author: </Topic>
                  <TopicDescription>{author || 'Author Name'}</TopicDescription>
                </>
              )}
              {userRole === RolesTypes.READER ? (
                <StyledStatus status={currentStatus}>{statusText}</StyledStatus>
              ) : editing ? (
                <>
                  <br />
                  <TitleHolder>Deadline </TitleHolder>
                  <StyledInputDeadline
                    value={newDeadline}
                    type="number"
                    onChange={handleChangeDeadline}
                    min="1"
                    max="31"
                  />{' '}
                  days
                </>
              ) : (
                <>
                  <Topic>Deadline: </Topic>
                  <TopicDescription>{newDeadline + ' days'}</TopicDescription>
                </>
              )}
            </ShortDescription>
          </WrapperInfo>
          {userRole === RolesTypes.READER ? (
            <>
              {person_id === id ? (
                <WrapperButtons>
                  {statusInfo?.status !== 'Free' ? (
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
                  ) : null}
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
        ) : (
          <LongDescription>
            <Topic>Description: </Topic>
            <Description>
              {description ||
                ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi impedit aliquid alias consequuntur! Totam sequi expedita sunt dolor obcaecati, iusto ducimus? Beatae ea, commodi ab repellat, corporis atque quasi, tempore sunt modi similique soluta nemo hic necessitatibus esse accusantium omnis neque rerum. Placeat tempore, fugiat unde consequuntur dolor tempora ducimus.'}
            </Description>
            {userRole === RolesTypes.READER ? (
              <OpenLink>see full description</OpenLink>
            ) : null}
          </LongDescription>
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
      <Modal active={isShowAskManger} setActive={setIsShowAskManager}>
        <AskManagerForm
          setActive={setIsShowAskManager}
          setSuccessModal={setIsShowWindowReportedToManager}
          material_id={material_id}
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
            onClick={deleteItem}
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
            onClick={deleteItem}
          />
        </Modal>
      )}
    </>
  );
};

export default React.memo(BookInfo);
