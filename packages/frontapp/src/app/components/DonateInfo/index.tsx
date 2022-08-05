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
import Modal from '../Modal';
import StyledButton from '../Button';
import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
const DonateInfo = ({
  description,
  title,
  author,
  category,
  statusInfo,
  identifier,
  src,
}: IBookInfoProps) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

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
    setAccept(false);
  };
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
    setReject(false);
  };

  return (
    <>
      <BookHolder>
        <ShortDescriptionWrapper>
          <WrapperInfo>
            <BookImage src={src || EmptyCover} />
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
      <Modal active={accept} setActive={setAccept}>
        <ErrorMessage
          title="Warning!"
          message={`Are you sure you want to add the book "${title}" from the library?`}
          setActive={setAccept}
          titleCancel="Yes, accept"
          titleOption="Cancel"
          onClick={acceptBook}
        />
      </Modal>
      <Modal active={reject} setActive={setReject}>
        <ErrorMessage
          title="Warning!"
          message={`Are you sure you want to reject the book "${title}" from the library?`}
          setActive={setReject}
          titleCancel="Yes, reject"
          titleOption="Cancel"
          onClick={rejectBook}
        />
      </Modal>
    </>
  );
};

export default DonateInfo;
