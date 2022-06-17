import React from 'react';
import { useAppSelector } from '../hooks/useTypedSelector';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import ListOfMaterialsSearch from '../components/ListOfMaterialsSearch';

const Wrapper = styled.section`
  margin-top: ${dimensions.base_3};
`;

const WrapperSearch = styled.div``;

const AmountTitle = styled.h2`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base_2};
`;

const SearchPage = () => {
  const { searchMaterials } = useAppSelector((state) => state.materials);
  const quantityOfMaterials = searchMaterials?.length || 0;
  return (
    <Wrapper>
      <WrapperSearch>
        <AmountTitle>Result: {quantityOfMaterials}</AmountTitle>
        {searchMaterials && <ListOfMaterialsSearch />}
      </WrapperSearch>
    </Wrapper>
  );
};

export default SearchPage;
