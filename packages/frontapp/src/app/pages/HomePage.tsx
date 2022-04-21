import React, { FC, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MATERIALS } from '@mimir/apollo-client';

const HomePage: FC = () => {
  const [allMaterials, setAllMaterials] = useState();
  const { data, error, loading } = useQuery(GET_ALL_MATERIALS);
  useEffect(() => {
    if (!loading) {
      setAllMaterials(data.getAllMaterials);
    }
  }, [data]);

  console.log(error);
  console.log(allMaterials);

  return <div>Home page</div>;
};

export default HomePage;
