import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';

const ReadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding-top: 56px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 25px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  column-gap: 24px;
  row-gap: 16px;
  overflow: auto;
  max-height: 70vh;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  width: 320px;
  margin: 0 0 20px;
  height: 151px;
  padding: 24px;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: 10px;
`;
const Avatar = styled.img`
  height: 71px;
  width: 71px;
  border-radius: 50%;
`;
interface IDescriptionProps {
  warning?: boolean;
  bold?: boolean;
  secondary?: boolean;
}
const Description = styled.p<IDescriptionProps>`
  font-weight: ${({ bold }) => (bold ? 500 : 300)};
  font-size: ${({ secondary }) => (secondary ? '14px' : '16px')};
  line-height: ${({ secondary }) => (secondary ? '17px' : '20px')};
  color: ${({ warning }) => (warning ? colors.problem_red : null)};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  row-gap: 8px;
  > p:first-child {
    margin-bottom: 8px;
  }
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

// const Description = styled.p`
//   font-weight: 300;
//   font-size:16px;
// `
const Readers = () => {
  const Pic = '../../assets/avatar.jpg';
  const data = [
    { name: 'Alex', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 1 },
    { name: 'Dmitry', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 0 },
    { name: 'Linkis', avatar: Pic, claimHistory: 0, claimNow: 0, overdue: 0 },
    { name: 'Alex', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 1 },
    { name: 'Dmitry', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 0 },
    { name: 'Linkis', avatar: Pic, claimHistory: 0, claimNow: 0, overdue: 0 },
    { name: 'Alex', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 1 },
    { name: 'Dmitry', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 0 },
    { name: 'Linkis', avatar: Pic, claimHistory: 0, claimNow: 0, overdue: 0 },
    { name: 'Alex', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 1 },
    { name: 'Dmitry', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 0 },
    { name: 'Linkis', avatar: Pic, claimHistory: 0, claimNow: 0, overdue: 0 },
    { name: 'Alex', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 1 },
    { name: 'Dmitry', avatar: Pic, claimHistory: 24, claimNow: 5, overdue: 0 },
    { name: 'Linkis', avatar: Pic, claimHistory: 0, claimNow: 0, overdue: 0 },
  ];

  return (
    <ReadersWrapper>
      <Title>All users</Title>
      <Description>
        For detailed information and interaction with the user, go to his card
      </Description>
      <ListWrapper>
        {data.map((person) => (
          <CardWrapper>
            <Avatar src={person.avatar}></Avatar>
            <InfoWrapper>
              <Description bold>{person.name}</Description>
              <InlineWrapper>
                <Description bold secondary>
                  Claim history:
                </Description>
                <Description secondary>
                  {person.claimHistory ? person.claimHistory : '-'}
                  {person.claimHistory
                    ? person.claimHistory === 1
                      ? ' item'
                      : ' items'
                    : null}
                </Description>
              </InlineWrapper>
              <InlineWrapper>
                <Description bold secondary>
                  Claim now:
                </Description>
                <Description secondary>
                  {person.claimNow ? person.claimNow : '-'}
                  {person.claimNow
                    ? person.claimNow === 1
                      ? ' item'
                      : ' items'
                    : null}
                </Description>
              </InlineWrapper>
              <InlineWrapper>
                {person.overdue ? (
                  <>
                    <Description bold secondary warning>
                      Overdue:
                    </Description>
                    <Description secondary>
                      {person.overdue}
                      {person.overdue === 1 ? ' item' : ' items'}
                    </Description>
                  </>
                ) : (
                  <>
                    <Description bold secondary>
                      Overdue:
                    </Description>
                    <Description secondary>-</Description>
                  </>
                )}
              </InlineWrapper>
            </InfoWrapper>
          </CardWrapper>
        ))}
      </ListWrapper>
    </ReadersWrapper>
  );
};

export default Readers;
