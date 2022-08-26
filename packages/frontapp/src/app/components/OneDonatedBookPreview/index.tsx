import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useGetOnePersonQuery } from '@mimir/apollo-client';
import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { dimensions, colors } from '@mimir/ui-kit';
import AcceptRejectModals from '../AcceptRejectModals';
interface BackgroundProps {
  GrayBackground?: boolean;
}

interface OneDonatorProps {
  title: string;
  identifier: string;
  statuses: any;
  id: number;
  index: number;
  picture: string;
  description: string;
  search: string;
  setShownId: Dispatch<SetStateAction<number[]>>;
  shownId: Array<number>;
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
  background-color: ${({ GrayBackground }) =>
    !GrayBackground ? colors.light_gray : colors.bg_secondary};
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
export const Accepted = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.main_green};
`;
export const Rejected = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.problem_red};
`;
const WrapperBtn = styled.div`
  flex: 1;
  width: 150px;
`;
const OneDonator = ({
  id,
  identifier,
  picture,
  title,
  description,
  statuses,
  index,
  search,
  shownId,
  setShownId,
}: OneDonatorProps) => {
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate();
  const handleRedirect = (item_id: number) => {
    navigate(`/donate/${item_id}`);
  };
  const lastStatus = statuses.slice(-1)[0];
  console.log(statuses);
  console.log(lastStatus);
  const GrayBackground = index % 2 === 0;
  const { data: personName } = useGetOnePersonQuery({
    variables: {
      id: lastStatus.person_id,
    },
  });
  useEffect(() => {
    if (
      personName?.getOnePerson.username
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      setShownId((arr) => [...arr, id]);
  }, [search]);
  return (
    <>
      <DonateWrapper GrayBackground={GrayBackground}>
        <FlexContainer onClick={() => handleRedirect(id)}>
          <BookImage src={picture || EmptyCover} />
          <Wrapper>
            <Title>{title}</Title>
            <Description>
              {' '}
              {description || 'no description provided'}
            </Description>
          </Wrapper>
        </FlexContainer>
        <DonatorName>
          {personName ? personName?.getOnePerson.username : 'unknown'}
        </DonatorName>
        <WrapperBtn>
          {lastStatus.status === 'Pending' && (
            <Button onClick={() => setAccept(true)} value="Accept" />
          )}
          {lastStatus.status === 'Free' && <Accepted>Accepted</Accepted>}
          {lastStatus.status === 'Rejected' && <Rejected>Rejected</Rejected>}
        </WrapperBtn>
      </DonateWrapper>
      <AcceptRejectModals
        active={accept}
        setActive={setAccept}
        title={title}
        statusInfo={lastStatus}
        identifier={identifier}
        method="accept"
      />
    </>
  );
};

export default OneDonator;
