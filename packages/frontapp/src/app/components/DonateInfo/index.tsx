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
import { AcceptDonate, RejectDonate } from '../AcceptRejectModals';
import StyledButton from '../Button';
import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
const DonateInfo = ({
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
          {statusInfo.status === 'Pending' && (
            <WrapperButtons>
              <StyledButton value="Accept" onClick={() => setAccept(true)} />
              <StyledButton
                value="Reject"
                transparent
                onClick={() => setReject(true)}
              />
            </WrapperButtons>
          )}
        </ShortDescriptionWrapper>
        <LongDescription>
          <Topic>Description: </Topic>
          <Description>{description}</Description>
        </LongDescription>
      </BookHolder>
      <AcceptDonate
        active={accept}
        setActive={setAccept}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
      />
      <RejectDonate
        active={reject}
        setActive={setReject}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
      />
    </>
  );
};

export default DonateInfo;
