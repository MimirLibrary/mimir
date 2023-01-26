import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
import React, { FC } from 'react';
import { StatusTypes } from '@mimir/global-types';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import Button from '../Button';
import StatusBadge from '../StatusBadge';
import { t } from 'i18next';

interface CardViewProps {
  picture: string;
  title: string;
  description: string;
  username: string;
  status: StatusTypes;
  accept: () => void;
  reject: () => void;
  redirect: () => void;
}

const BookImage = styled.img`
  display: inline-block;
  height: 10.5rem;
  max-width: 8rem;
  min-width: 8rem;

  @media (max-width: ${dimensions.phone_width}) {
    height: 6rem;
    max-width: 5rem;
    min-width: 5rem;
  }
`;

const DonateWrapper = styled.div`
  :nth-child(2n) {
    background-color: ${colors.bg_secondary};
  }
  display: flex;
  justify-content: center;
  position: relative;
  background-color: ${colors.light_gray};
  padding: ${dimensions.base} ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    padding: 5px;
    height: 350px;
  }
`;
const Title = styled.p`
  font-size: ${dimensions.base};
  font-weight: 500;
  @media (max-width: ${dimensions.phone_width}) {
    margin-right: 0;
  }
`;
const Description = styled.p`
  font-size: ${dimensions.sm};
  font-weight: 300;
  line-height: 1.063rem;

  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  display: -webkit-box;

  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${dimensions.phone_width}) {
    position: absolute;
    width: 100%;
    margin-top: ${dimensions.xl_6};
    height: 150px;
  }
`;
const DonatorName = styled.p`
  font-size: ${dimensions.base};
  flex: 1;
  color: blue;
  word-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  padding: 0 ${dimensions.xs_1};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dimensions.base};
`;
const FlexContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: ${dimensions.xl};
  flex: 3;
  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
    flex: 1;
  }
`;

const WrapperBtn = styled.div`
  flex: 1;
  width: 150px;
`;

const TableRowView: FC<CardViewProps> = ({
  picture,
  title,
  description,
  username,
  status,
  accept,
  reject,
  redirect,
}) => {
  return (
    <DonateWrapper>
      <FlexContainer onClick={redirect}>
        <BookImage src={picture || EmptyCover} />
        <Wrapper>
          <Title>{title}</Title>
          <Description>{description || t('Donates.NoDescription')}</Description>
        </Wrapper>
      </FlexContainer>
      <DonatorName>{username}</DonatorName>
      <WrapperBtn>
        {status === StatusTypes.PENDING && (
          <Button onClick={accept} value={t('Buttons.Accept')} />
        )}
        {status === StatusTypes.FREE && (
          <StatusBadge type="success">{t('Statuses.Accepted')}</StatusBadge>
        )}
        {status === StatusTypes.REJECTED && (
          <StatusBadge type="danger">{t('Statuses.Rejected')}</StatusBadge>
        )}
      </WrapperBtn>
    </DonateWrapper>
  );
};

export default TableRowView;
