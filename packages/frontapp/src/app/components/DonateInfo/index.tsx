import React, { useState } from 'react';
import {
  IBookInfoProps,
  BookHolder,
  ShortDescriptionWrapper,
  Topic,
  LongDescription,
  Description,
  WrapperButtons,
} from '../BookInfo';
import {
  ShortDescription,
  TopicDescription,
  WrapperInfo,
  TitleBook,
  BookImage,
} from '../BookInfo/DescriptionBook';
import AcceptRejectModals from '../AcceptRejectModals';
import StyledButton from '../Button';
import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
import { Accepted, Rejected } from '../OneDonatedBookPreview';
const DonateInfo = ({
  description,
  title,
  author,
  category,
  statusInfo,
  identifier,
  src,
}: IBookInfoProps) => {
  const [active, setActive] = useState(false);
  const [method, setMethod] = useState('');
  const onClickReject = () => {
    setActive(true);
    setMethod('reject');
  };
  const onClickAccept = () => {
    setActive(true);
    setMethod('accept');
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
          {statusInfo?.status === 'Pending' && (
            <WrapperButtons>
              <StyledButton value="Accept" onClick={onClickAccept} />
              <StyledButton
                value="Reject"
                transparent
                onClick={onClickReject}
              />
            </WrapperButtons>
          )}
          {statusInfo?.status === 'Free' && <Accepted>Accepted</Accepted>}
          {statusInfo?.status === 'Rejected' && <Rejected>Rejected</Rejected>}
        </ShortDescriptionWrapper>
        <LongDescription>
          <Topic>Description: </Topic>
          <Description>{description}</Description>
        </LongDescription>
      </BookHolder>
      <AcceptRejectModals
        active={active}
        setActive={setActive}
        title={title}
        statusInfo={statusInfo}
        identifier={identifier}
        method={method}
      />
    </>
  );
};

export default DonateInfo;
