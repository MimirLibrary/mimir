import { t } from 'i18next';
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
import StatusBadge from '../StatusBadge';
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

              <Topic>{t('DonateItem.Inputs.Genre.Title')}:</Topic>
              <TopicDescription>{category}</TopicDescription>

              <Topic>{t('DonateItem.Inputs.Author.Title')}:</Topic>
              <TopicDescription>{author}</TopicDescription>
            </ShortDescription>
          </WrapperInfo>
          {statusInfo?.status === 'Pending' && (
            <WrapperButtons>
              <StyledButton
                value={t('Buttons.Accept')}
                onClick={onClickAccept}
              />
              <StyledButton
                value={t('Buttons.Reject')}
                transparent
                onClick={onClickReject}
              />
            </WrapperButtons>
          )}
          {statusInfo?.status === 'Free' && (
            <StatusBadge type="success">{t('Statuses.Accepted')}</StatusBadge>
          )}
          {statusInfo?.status === 'Rejected' && (
            <StatusBadge type="danger">{t('Statuses.Rejected')}</StatusBadge>
          )}
        </ShortDescriptionWrapper>
        <LongDescription>
          <Topic>{t('DonateItem.Inputs.Description.Title')}: </Topic>
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
