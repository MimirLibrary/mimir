import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as SearchIcon } from '../../../assets/Search.svg';
import Input from '../Input';

const InputSearch = styled(Input)`
  width: 80%;
  border: none;
  outline: none;
  margin-left: 9px;
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
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
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
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
        placeholder="Search by book or author"
      />
    </WrapperInput>
  );
};

export default Search;
