import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { useSearchOfMaterialsQuery } from '@mimir/apollo-client';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { setSearchMaterials } from '../../store/slices/materialsSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { RoutesTypes } from '../../../utils/routes';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Search from '../Search';
import { RolesTypes } from '@mimir/global-types';

const SearchByBookOrAuthor = () => {
  const [search, setSearch] = useState<string>('');
  const { location, userRole } = useAppSelector((state) => state.user);
  const debounceSearch = useDebounce<string>(search, 600);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSearchOfMaterialsQuery({
    variables: { search: debounceSearch, location: location?.value },
  });

  const path =
    userRole === RolesTypes.READER
      ? `${RoutesTypes.SEARCH}_by_name_or_author`
      : RoutesTypes.BOOKS_STUFF;

  useEffect(() => {
    if (data) {
      dispatch(setSearchMaterials(data?.searchOfMaterials));
    }
  }, [data]);

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
    <Search
      handleChangeSearch={handleChangeSearch}
      placeholder={t('Search.Placeholder')}
      search={search}
      redirectToSearchByClick={redirectToSearchByClick}
      redirectToSearchByKey={redirectToSearchByKey}
    />
  );
};

export default SearchByBookOrAuthor;
