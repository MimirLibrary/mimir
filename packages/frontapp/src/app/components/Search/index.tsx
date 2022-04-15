import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as SearchIcon } from '../../../assets/Search.svg';
import { dimensions } from '@mimir/ui-kit';

const WrapperInput = styled.div`
  max-width: 21.5625rem;
  width: 100%;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 0.8125rem 0;
  padding-right: 1.0625rem;
`;

const InputSearch = styled.input`
  width: 80%;
  border: none;
  outline: none;
  margin-left: 0.58125rem;

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
  }
`;

const Search = () => {
  const [search, setSearch] = useState<string>('');

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <WrapperInput>
      <SearchIcon fill="#BDBDBD" width="14" height="14" />
      <InputSearch
        value={search}
        onChange={handleChangeSearch}
        placeholder="Search by book or author"
      />
    </WrapperInput>
  );
};

export default Search;
