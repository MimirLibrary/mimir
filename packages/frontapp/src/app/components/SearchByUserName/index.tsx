import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { useNavigate } from 'react-router-dom';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { RoutesTypes } from '../../../utils/routes';
import { setActiveTab } from '../../store/slices/tabsSlice';
import Search from '../Search';
import { setSearchReaders } from '../../store/slices/readersSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { NavbarItems } from '../../../utils/NavbarItems';
import { useTranslation } from 'react-i18next';

const SearchByUserName = () => {
  const [search, setSearch] = useState<string>('');
  const locations = useAppSelector(locationIds);
  const debounceSearch = useDebounce<string>(search, 600);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, error } = useGetAllPersonsQuery({
    variables: {
      username: debounceSearch,
      locations,
    },
    skip: !debounceSearch,
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(setSearchReaders(data.getAllPersons));
    }
  }, [data]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const redirectToSearchByKey = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter') {
      navigate(RoutesTypes.READERS);
      dispatch(setActiveTab(NavbarItems.SEARCH));
    }
  };

  const redirectToSearchByClick = () => {
    if (search) {
      navigate(RoutesTypes.READERS);
      dispatch(setActiveTab(NavbarItems.SEARCH));
    }
  };

  return (
    <Search
      handleChangeSearch={handleChangeSearch}
      placeholder={t('Search.UsernamePlaceholder')}
      search={search}
      redirectToSearchByClick={redirectToSearchByClick}
      redirectToSearchByKey={redirectToSearchByKey}
    />
  );
};

export default SearchByUserName;
