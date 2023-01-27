import { useEffect, useState, FC } from 'react';
import styled from '@emotion/styled';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { t } from 'i18next';
import SingleUser from './SingleUser';
import { colors, dimensions } from '@mimir/ui-kit';
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
import Loader, { WrapperLoader } from '../Loader';
import Tags from '../BooksByCategory/tags';

const ReadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${dimensions.xl_2};
  margin-top: 56px;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: 1.875rem;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
`;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: space-between;
  gap: ${dimensions.base};

  @media (hover: none) {
    > * {
      box-shadow: 0 6px 14px -6px rgba(24, 39, 75, 0.08),
        0 10px 32px -4px rgba(24, 39, 75, 0.08);
    }
  }
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

interface IProps {
  itemsTaken: string[];
  sortBy: string[];
}

type MinMaxType = {
  min: number;
  max: number;
};

type SortType = (
  userFirst: IReader | null,
  userSecond: IReader | null
) => number;

const UserList: FC<IProps> = ({ itemsTaken, sortBy }) => {
  const locations = useAppSelector(locationIds);
  const [minMax, setMinMax] = useState<MinMaxType[]>([]);
  const { data, loading, error } = useGetAllPersonsQuery({
    variables: { locations: locations },
    fetchPolicy: 'cache-and-network',
  });

  const dispatch = useAppDispatch();

  const { searchReaders } = useAppSelector((state) => state.readers);
  const [readers, setReaders] = useState<(IReader | null)[] | null | undefined>(
    []
  );
  const [allFilters, setAllFilters] = useState<Array<string>>([]);

  useEffect(() => {
    setReaders(searchReaders);
  }, [searchReaders]);

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

  const categorySortsMap: Record<string, SortType> = {
    'By alphabet': sortAlphabetically,
    'Number of things taken': sortByThingsTaken,
    'Number of overdue deals': sortByThingsOverdue,
  };

  const filterUsers = (category: keyof typeof categorySortsMap) => {
    if (searchReaders?.length) {
      setReaders([...searchReaders].sort(categorySortsMap[category]));
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
    setAllFilters([...itemsTaken, ...sortBy]);
  }, [itemsTaken, sortBy]);

  useEffect(() => {
    if (data) dispatch(setSearchReaders(data?.getAllPersons));
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading)
    return (
      <WrapperLoader>
        <Loader height={100} width={100} color={`${colors.accent_color}`} />
      </WrapperLoader>
    );
  return (
    <ReadersWrapper>
      <Title>
        {itemsTaken.length > 0 || sortBy.length > 0
          ? `${t('Readers.TitleFiltered')} - ${readers?.length || 0}`
          : t('Readers.Title')}
      </Title>
      <Description>{t('Readers.Description')}</Description>
      <Tags chosenTags={allFilters} />
      <ListWrapper>
        {readers?.map((person) => {
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
