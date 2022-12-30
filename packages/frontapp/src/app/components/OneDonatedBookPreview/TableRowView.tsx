import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
import React, { FC } from 'react';
import { StatusTypes } from '@mimir/global-types';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import Button from '../Button';
import StatusBadge from '../StatusBadge';

interface CardViewProps {
  grayBackground: boolean;
  picture: string;
  title: string;
  description: string;
  username: string;
  status: StatusTypes;
  accept: () => void;
  reject: () => void;
  redirect: () => void;
}

interface BackgroundProps {
  grayBackground?: boolean;
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

const DonateWrapper = styled.div<BackgroundProps>`
  display: flex;
  justify-content: center;
  position: relative;
  background-color: ${({ grayBackground }) =>
    !grayBackground ? colors.light_gray : colors.bg_secondary};
  padding: ${dimensions.base} ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    padding: 5px;
    height: 350px;
  }
`;
const Title = styled.p`
  margin-right: 30%;
  margin-bottom: ${dimensions.base};
  font-size: 16px;
  font-weight: 500;
  @media (max-width: ${dimensions.phone_width}) {
    margin-right: 0px;
  }
`;
const Description = styled.p`
  font-size: 14px;
  margin-right: 30%;
  font-weight: 300;
  line-height: 17px;
  word-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;

  @media (max-width: ${dimensions.phone_width}) {
    position: absolute;
    width: 100%;
    margin-top: 40px;
    height: 150px;
  }
`;
const DonatorName = styled.p`
  font-size: 16px;
  flex: 1;
  color: blue;
  word-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  padding: 0px 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dimensions.base};
`;
const FlexContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: 20px;
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
  grayBackground,
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
    <DonateWrapper grayBackground={grayBackground}>
      <FlexContainer onClick={() => redirect()}>
        <BookImage src={picture || EmptyCover} />
        <Wrapper>
          <Title>{title}</Title>
          <Description> {description || 'no description provided'}</Description>
        </Wrapper>
      </FlexContainer>
      <DonatorName>{username}</DonatorName>
      <WrapperBtn>
        {status === StatusTypes.PENDING && (
          <Button onClick={() => accept()} value="Accept" />
        )}
        {status === StatusTypes.FREE && (
          <StatusBadge type="success">Accepted</StatusBadge>
        )}
        {status === StatusTypes.REJECTED && (
          <StatusBadge type="danger">Rejected</StatusBadge>
        )}
      </WrapperBtn>
    </DonateWrapper>
  );
};

export default TableRowView;
