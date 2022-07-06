import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { mocData, mocData1 } from './mocData';
import Avatar from '../Avatar';
import { t } from 'i18next';
import { isOverdue } from '../../models/helperFunctions/converTime';
import SingleUser, { IClaimHistory, ISingleUser } from './SingleUser';

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

const Description = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`;

// interface IUser{
//   name: string;
//   id: string;
//   statuses: IClaimHistory;
// }

const UserList = () => {
  const { data, loading } = useGetAllPersonsQuery();
  // console.log(data);
  //   console.log(countClaimHistory(data?.getAllPersons[4]?.statuses as IClaimHistory[]).claimHistory);

  if (loading) return <h1>{t('Loading...')}</h1>;

  return (
    <ReadersWrapper>
      <Title>{t('All users')}</Title>
      <Description>
        {t(
          'For detailed information and interaction with the user, go to his card'
        )}
      </Description>
      <ListWrapper>
        {data?.getAllPersons.map((person) => (
          <SingleUser
            id={person?.id as string}
            statuses={person?.statuses as IClaimHistory[]}
          />
        ))}
      </ListWrapper>
    </ReadersWrapper>
  );
};

export default UserList;
