import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useSearchOfMaterialsQuery } from '@mimir/apollo-client';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { setSearchMaterials } from '../../store/slices/materialsSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Search from '../Search';
import { locationIds } from '../../store/slices/userSlice';
import SearchSuggestions from '../SearchSuggestions';

const SearchByBookOrAuthor: FC<{ path: string }> = ({ path }) => {
  const [search, setSearch] = useState<string>('');
  const [isShowListSuggestions, setIsShowListSuggestions] =
    useState<boolean>(false);
  const locations = useAppSelector(locationIds);
  const debounceSearch = useDebounce<string>(search, 600);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSearchOfMaterialsQuery({
    variables: { search: debounceSearch, locations },
    skip: !debounceSearch,
  });

  useEffect(() => {
    if (data) {
      dispatch(setSearchMaterials(data?.searchOfMaterials));
    }
  }, [data]);

  useEffect(() => {
    if (search && data?.searchOfMaterials?.length) {
      setIsShowListSuggestions(true);
    } else {
      setIsShowListSuggestions(false);
    }
  }, [debounceSearch, data]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const redirectToSearchByKey = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter') {
      navigate(path);
      dispatch(setActiveTab(1));
    }
  };

  const redirectToSearchByClick = () => {
    if (search) {
      navigate(path);
      dispatch(setActiveTab(1));
    }
  };

  return (
    <>
      <Search
        handleChangeSearch={handleChangeSearch}
        placeholder={t('Search.Placeholder')}
        search={search}
        redirectToSearchByClick={redirectToSearchByClick}
        redirectToSearchByKey={redirectToSearchByKey}
      />
      {isShowListSuggestions && (
        <SearchSuggestions materials={data?.searchOfMaterials} />
      )}
    </>
  );
};

export default SearchByBookOrAuthor;
