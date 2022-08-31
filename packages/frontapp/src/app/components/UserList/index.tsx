import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { t } from 'i18next';
import SingleUser from './SingleUser';
import { dimensions } from '@mimir/ui-kit';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSearchReaders } from '../../store/slices/readersSlice';
import { locationIds } from '../../store/slices/userSlice';

const ReadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${dimensions.xl_2};
  padding-top: 56px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
`;

const ListWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  column-gap: ${dimensions.xl_2};
  row-gap: ${dimensions.base};
  overflow: auto;
  max-height: 70vh;
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

const UserList = () => {
  const locations = useAppSelector(locationIds);
  const { data, loading } = useGetAllPersonsQuery({
    variables: { locations: locations },
  });
  const dispatch = useAppDispatch();
  const { searchReaders } = useAppSelector((state) => state.readers);
  useEffect(() => {
    if (data && !searchReaders?.length)
      dispatch(setSearchReaders(data?.getAllPersons));
  }, [data]);
  if (loading) return <h1>{t('Loading')}</h1>;
  return (
    <ReadersWrapper>
      <Title>{t('Readers.Title')}</Title>
      <Description>{t('Readers.Description')}</Description>
      <ListWrapper>
        {searchReaders?.map((person) => (
          <SingleUser
            avatar={person!.avatar}
            name={person!.username}
            key={person?.id}
            id={person?.id as string}
            statuses={person?.statuses as IClaimHistory[]}
          />
        ))}
      </ListWrapper>
    </ReadersWrapper>
  );
};

export default UserList;
