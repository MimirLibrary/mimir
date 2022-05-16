import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as SearchIcon } from '../../../assets/Navbar/Search.svg';
import Input from '../Input';

const InputSearch = styled(Input)`
  width: 300px;
  border: none;
  outline: none;
  margin-left: 9px;
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 2px;

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
  }

  @media (max-width: 768px) {
    margin-left: -20px;
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
  padding-left: 10px;
  margin: 0 10px;
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: 758px) {
    width: 100%;
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
