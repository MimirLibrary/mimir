import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as SearchIcon } from '../../../assets/Navbar/Search.svg';
import Input from '../Input';
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

export const InputSearch = styled(Input)`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 0.12rem;

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    margin-left: -${dimensions.xl};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
  :hover {
    fill: ${colors.accent_color};
  }
`;

export const WrapperInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 21.5rem;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  padding-left: ${dimensions.xs_1};
  margin-right: ${dimensions.xs_1};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }
`;

const SearchByBookOrAuthor = () => {
  const [search, setSearch] = useState<string>('');
  const { location } = useAppSelector((state) => state.user);
  const debounceSearch = useDebounce<string>(search, 600);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSearchOfMaterialsQuery({
    variables: { search: debounceSearch, location: location?.value },
    skip: !search,
  });

  const path = RolesTypes.READER
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
