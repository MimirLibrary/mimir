import { useEffect, useState, FC } from 'react';
import styled from '@emotion/styled';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { t } from 'i18next';
import SingleUser from './SingleUser';
import { dimensions } from '@mimir/ui-kit';
import {
  countClaimHistory,
  IClaimHistory,
} from '../../models/helperFunctions/claimHistory';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSearchReaders } from '../../store/slices/readersSlice';
import { IReader } from '../../types';
import { locationIds } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

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

interface IProps {
  itemsTaken?: string[];
  sortBy?: string[];
}

type MinMaxType = {
  min: number;
  max: number;
};

const UserList: FC<IProps> = ({ itemsTaken, sortBy }) => {
  const locations = useAppSelector(locationIds);
  const [minMax, setMinMax] = useState<MinMaxType[]>([]);
  const { data, loading, error } = useGetAllPersonsQuery({
    variables: { locations: locations },
    fetchPolicy: 'cache-and-network',
  });

  const dispatch = useAppDispatch();

  const { searchReaders } = useAppSelector((state) => state.readers);

  const getClaims = (person: IReader | null) =>
    countClaimHistory(person?.statuses as IClaimHistory[]);

  const sortAlphabetically = (
    userFirst: IReader | null,
    userSecond: IReader | null
  ) => {
    return userFirst!.username.localeCompare(userSecond!.username);
  };

  const sortByThingsTaken = (
    userFirst: IReader | null,
    userSecond: IReader | null
  ) => {
    return getClaims(userSecond).claimNow - getClaims(userFirst).claimNow;
  };

  const sortByThingsOverdue = (
    userFirst: IReader | null,
    userSecond: IReader | null
  ) => {
    return getClaims(userSecond).overdue - getClaims(userFirst).overdue;
  };
  const filterCategories = (filtersArr: string[] | undefined) => {
    filtersArr?.forEach((item) => {
      switch (item) {
        case '2 - 10 items':
          setMinMax((oldArray) => [...oldArray, { min: 2, max: 10 }]);
          break;
        case '10 or more items':
          setMinMax((oldArray) => [...oldArray, { min: 10, max: Infinity }]);
          break;
        case 'Nothing':
          setMinMax((oldArray) => [...oldArray, { min: 0, max: 0 }]);
          break;
        case 'All':
          setMinMax([]);
          break;
      }
    });
  };
  const filterUsers = (category: string) => {
    switch (category) {
      case 'By alphabet':
        if (searchReaders) searchReaders.sort(sortAlphabetically);
        break;
      case 'Number of things taken':
        if (searchReaders) searchReaders.sort(sortByThingsTaken);
        break;
      case 'Number of overdue deals':
        if (searchReaders) searchReaders.sort(sortByThingsOverdue);
        break;
    }
  };

  useEffect(() => {
    filterUsers(sortBy![0]);
  }, [sortBy]);

  useEffect(() => {
    setMinMax([]);
    filterCategories(itemsTaken);
  }, [itemsTaken]);

  useEffect(() => {
    if (data) dispatch(setSearchReaders(data?.getAllPersons));
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <h1>{t('Loading')}</h1>;

  return (
    <ReadersWrapper>
      <Title>
        {itemsTaken!.length > 0 || sortBy!.length > 0
          ? t('Readers.TitleFiltered')
          : t('Readers.Title')}
      </Title>
      <Description>{t('Readers.Description')}</Description>
      <ListWrapper>
        {searchReaders?.map((person) => {
          if (minMax.length === 0) {
            return (
              <SingleUser
                avatar={person!.avatar}
                name={person!.username}
                key={person?.id}
                id={person?.id as string}
                statuses={person?.statuses as IClaimHistory[]}
              />
            );
          }
          return (
            <>
              {minMax.map((item) => {
                if (
                  getClaims(person).claimNow >= item.min &&
                  getClaims(person).claimNow <= item.max
                ) {
                  return (
                    <SingleUser
                      avatar={person!.avatar}
                      name={person!.username}
                      id={person?.id as string}
                      key={person?.id}
                      statuses={person?.statuses as IClaimHistory[]}
                    />
                  );
                }
                return null;
              })}
            </>
          );
        })}
      </ListWrapper>
    </ReadersWrapper>
  );
};

export default UserList;
