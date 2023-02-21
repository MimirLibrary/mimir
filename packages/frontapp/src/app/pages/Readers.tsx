import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Tabs from '../components/Tabs';
import UserList from '../components/UserList';
import { RolesTypes } from '@mimir/global-types';
const Readers = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(RolesTypes.READER);

  const handleTabChange = (tab: RolesTypes) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Tabs
        tabs={[RolesTypes.READER, RolesTypes.MANAGER]}
        activeTab={activeTab}
        onChange={handleTabChange}
      />
      <UserList
        itemsTaken={searchParams.getAll('itemstaken')}
        sortBy={searchParams.getAll('sortby')}
      />
    </>
  );
};

export default Readers;
