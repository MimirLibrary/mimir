import React from 'react';
import { useSearchParams } from 'react-router-dom';
import UserList from '../components/UserList';
const Readers = () => {
  const [searchParams] = useSearchParams();
  return (
    <UserList
      itemsTaken={searchParams.getAll('itemstaken')}
      sortBy={searchParams.getAll('sortby')}
    />
  );
};

export default Readers;
