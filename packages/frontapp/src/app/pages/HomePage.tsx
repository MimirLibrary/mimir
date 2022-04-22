import React, { FC } from 'react';

import { useGetAllMaterialsQuery } from '@mimir/apollo-client';

const HomePage: FC = () => {
  const { data, error, loading } = useGetAllMaterialsQuery();

  console.log(data?.getAllMaterials);
  return <div>Home page</div>;
};

export default HomePage;
