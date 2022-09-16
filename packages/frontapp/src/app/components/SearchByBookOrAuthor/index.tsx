import React, { FC, useCallback, useEffect, useState } from 'react';
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
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  position: relative;
`;

const SearchByBookOrAuthor: FC<{ path: string }> = ({ path }) => {
  const [search, setSearch] = useState<string>('');
  const [isShowListSuggestions, setIsShowListSuggestions] =
    useState<boolean>(false);
  const locations = useAppSelector(locationIds);
  const debounceSearch = useDebounce<string>(search, 600);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, error } = useSearchOfMaterialsQuery({
    variables: { search: debounceSearch, locations },
    skip: !debounceSearch,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(setSearchMaterials(data?.searchOfMaterials));
    }
  }, [data]);

  useEffect(() => {
    setIsShowListSuggestions(!!(search && data?.searchOfMaterials?.length));
  }, [debounceSearch, data]);

  const removeSuggestionSearchWindow = useCallback(() => {
    setIsShowListSuggestions(false);
    setSearch('');
  }, []);

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
    <Wrapper>
      <Search
        handleChangeSearch={handleChangeSearch}
        placeholder={t('Search.Placeholder')}
        search={search}
        redirectToSearchByClick={redirectToSearchByClick}
        redirectToSearchByKey={redirectToSearchByKey}
      />
      {isShowListSuggestions && (
        <SearchSuggestions
          materials={data?.searchOfMaterials}
          removeSuggestionSearchWindow={removeSuggestionSearchWindow}
        />
      )}
    </Wrapper>
  );
};

export default SearchByBookOrAuthor;
