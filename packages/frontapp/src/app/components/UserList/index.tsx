import React, { useEffect, useState, FC } from 'react';
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
import BackButton from '../BackButton';
import Button from '../Button';
import { NotFoundWindow } from '../NotFoundWindow';
import { ReactComponent as ArrowSVG } from './../../../assets/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';

const WrapperReaders = styled.div`
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
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

const BackButtonContainer = styled.div`
  margin-top: -48px;
  margin-bottom: -60px;
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

  const navigate = useNavigate();
  const handleGoBack = () => {
    window.history.state.idx === 0
      ? navigate(RoutesTypes.SEARCH)
      : navigate(-1);
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
    <WrapperReaders>
      {itemsTaken.length > 0 || sortBy.length > 0 ? (
        <>
          <Title>
            {`${t('Readers.TitleFiltered')} - ${readers?.length || 0}`}
          </Title>
          <Description>{t('Readers.Description')}</Description>
        </>
      ) : (
        <>
          <BackButtonContainer>
            <BackButton customName="BackForNotFoundUser" />
          </BackButtonContainer>
          <NotFoundWindow
            searchEntity={'user'}
            withButton={
              <Button
                type="button"
                onClick={handleGoBack}
                value={t('Back')}
                svgComponent={<ArrowSVG />}
                transparent={true}
              />
            }
          />
        </>
      )}

      {/*<Title>
        {itemsTaken.length > 0 || sortBy.length > 0
          ? `${t('Readers.TitleFiltered')} - ${readers?.length || 0}`
          : t('Readers.Title')}
      </Title>
      <Description>{t('Readers.Description')}</Description>
      <Tags chosenTags={allFilters} />*/}
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
    </WrapperReaders>
  );
};

export default UserList;
