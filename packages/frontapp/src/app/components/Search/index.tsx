import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as SearchIcon } from '../../../assets/Navbar/Search.svg';
import Input from '../Input';
import { t } from 'i18next';

const InputSearch = styled(Input)`
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

const WrapperInput = styled.div`
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

const Search = () => {
  const [search, setSearch] = useState<string>('');

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <WrapperInput>
      <SearchIcon fill="#BDBDBD" width="20" height="20" />
      <InputSearch
        type="text"
        value={search}
        onChange={handleChangeSearch}
        placeholder={t('Search.Placeholder')}
      />
    </WrapperInput>
  );
};

export default Search;
