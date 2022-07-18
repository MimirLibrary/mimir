import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookCardExtended from '../components/BookCardExtended';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useGetAllMaterialsForManagerQuery } from '@mimir/apollo-client';
import createNewItem from './CreateNewItem';

const WrapperTitle = styled.section`
  margin-top: 3.5rem;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  color: ${colors.main_black};
  line-height: ${dimensions.xl_3};
  margin-bottom: ${dimensions.base};
`;

const SubTitle = styled.h3`
  font-weight: 300;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
`;

const BooksStuff = () => {
  const { location } = useAppSelector((state) => state.user);
  const { data, fetchMore } = useGetAllMaterialsForManagerQuery({
    variables: { limit: 10, offset: 0, location_id: location.id },
  });

  useEffect(() => {
    fetchMore({
      variables: { location_id: location.id },
    });
  }, []);

  console.log(data);
  return (
    <main>
      <WrapperTitle>
        <Title>Items in library</Title>
        <SubTitle>
          List of items in the library. To change something, go to the item card
        </SubTitle>
      </WrapperTitle>
      <div>
        {data?.getAllMaterials &&
          data.getAllMaterials.map((item) => <BookCardExtended />)}
      </div>
      <BookCardExtended />
    </main>
  );
};

export default BooksStuff;
