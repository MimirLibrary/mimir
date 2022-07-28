import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { useNavigate } from 'react-router-dom';
import { useGetAllPersonsQuery } from '@mimir/apollo-client';
import { RoutesTypes } from '../../../utils/routes';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { t } from 'i18next';
import { InputSearch, StyledSearchIcon, WrapperInput } from '../Search';
import { setSearchReaders } from '../../store/slices/readersSlice';

const SearchByUserName = () => {
  const [search, setSearch] = useState<string>('');
  const { location } = useAppSelector((state) => state.user);
  const debounceSearch = useDebounce<string>(search, 600);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllPersonsQuery({
    variables: {
      input: {
        location_id: location.id,
        username: { contains: debounceSearch },
      },
    },
  });

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
      dispatch(setActiveTab(1));
    }
  };

  const redirectToSearchByClick = () => {
    if (search) {
      navigate(RoutesTypes.READERS);
      dispatch(setActiveTab(1));
    }
  };

  return (
    <WrapperInput onKeyPress={redirectToSearchByKey}>
      <StyledSearchIcon
        fill="#BDBDBD"
        width="20"
        height="20"
        onClick={redirectToSearchByClick}
      />
      <InputSearch
        type="text"
        value={search}
        onChange={handleChangeSearch}
        placeholder={t('Search.UsernamePlaceholder')}
      />
    </WrapperInput>
  );
};

export default SearchByUserName;
