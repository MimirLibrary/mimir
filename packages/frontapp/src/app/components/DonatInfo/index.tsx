import React, { useState } from 'react';
import {
  IBookInfoProps,
  BookHolder,
  ShortDescriptionWrapper,
  BookImage,
  TitleBook,
  Topic,
  ShortDescription,
  TopicDescription,
  WrapperInfo,
  LongDescription,
  Description,
  WrapperButtons,
} from '../BookInfo';
import ErrorMessage from '../ErrorMessge';
import {
  GetMaterialByIdDocument,
  GetAllTakenItemsDocument,
  useReturnBookMutation,
  useRejectItemMutation,
} from '@mimir/apollo-client';
import Modal from '../../components/Modal';
import StyledButton from '../../components/Button';
import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
const DonatInfo = ({
  description,
  title,
  author,
  category,
  statusInfo,
  identifier,
  type,
  location_id,
  src,
}: IBookInfoProps) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  return (
    <>
      <BookHolder>
        <ShortDescriptionWrapper>
          <WrapperInfo>
            <BookImage
              src={
                (src && `${process.env['NX_API_ROOT_URL']}/${src}`) ||
                EmptyCover
              }
            />
            <ShortDescription>
              <TitleBook>{title}</TitleBook>

              <Topic>Genre: </Topic>
              <TopicDescription>{category}</TopicDescription>

              <Topic>Author: </Topic>
              <TopicDescription>{author}</TopicDescription>
            </ShortDescription>
          </WrapperInfo>
          <WrapperButtons>
            <StyledButton value="Accept" onClick={() => setAccept(true)} />
            <StyledButton
              value="Reject"
              transparent
              onClick={() => setReject(true)}
            />
          </WrapperButtons>
        </ShortDescriptionWrapper>
        <LongDescription>
          <Topic>Description: </Topic>
          <Description>{description}</Description>
        </LongDescription>
      </BookHolder>
      <ModalWindowAccept
        active={accept}
        setActive={setAccept}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
      />
      <ModalWindowReject
        active={reject}
        setActive={setReject}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
      />
    </>
  );
};
interface IModalWindowProps {
  active: boolean;
  setActive: any;
  title: string | undefined;
  statusInfo: any;
  identifier: string;
}
export const ModalWindowAccept = ({
  setActive,
  active,
  title,
  statusInfo,
  identifier,
}: IModalWindowProps) => {
  const [returnBook] = useReturnBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const acceptBook = async () => {
    await returnBook({
      variables: {
        person_id: statusInfo.person_id,
        identifier,
      },
    });
    setActive(false);
  };
  return (
    <Modal active={active} setActive={setActive}>
      <ErrorMessage
        title="Warning!"
        message={`Are you sure you want to add the book "${title}" from the library?`}
        setActive={setActive}
        titleCancel="Yes, accept"
        titleOption="Cancel"
        onClick={acceptBook}
      />
    </Modal>
  );
};
export const ModalWindowReject = ({
  setActive,
  active,
  title,
  statusInfo,
  identifier,
}: IModalWindowProps) => {
  const [rejectItem] = useRejectItemMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });

  const rejectBook = async () => {
    await rejectItem({
      variables: {
        person_id: statusInfo.person_id,
        identifier,
      },
    });
    setActive(false);
  };

  return (
    <Modal active={active} setActive={setActive}>
      <ErrorMessage
        title="Warning!"
        message={`Are you sure you want to reject the book "${title}" from the library?`}
        setActive={setActive}
        titleCancel="Yes, reject"
        titleOption="Cancel"
        onClick={rejectBook}
      />
    </Modal>
  );
};

export default DonatInfo;
