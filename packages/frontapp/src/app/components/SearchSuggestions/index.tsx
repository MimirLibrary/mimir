import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { SearchOfMaterialsQuery } from '@mimir/apollo-client';
import BookCard from '../BookCard';

const Wrapper = styled.div`
  max-width: 345px;
  height: 262px;
  width: 100%;
  background-color: ${colors.bg_secondary};
  position: absolute;
  border-radius: ${dimensions.xs_1};
  top: 50px;
  overflow: auto;
`;

interface IProps {
  materials: SearchOfMaterialsQuery['searchOfMaterials'];
}

const SearchSuggestions: FC<IProps> = ({ materials }) => {
  console.log();
  return (
    <Wrapper>
      {materials &&
        materials.map((material) => (
          <BookCard
            key={material?.id}
            src={material?.picture}
            id={material?.id}
            status={material?.statuses.at(-1)?.status}
            date={material?.statuses.at(-1)?.created_at}
            title={material?.title}
            category={material?.category}
            author={material?.author}
          />
        ))}
    </Wrapper>
  );
};

export default SearchSuggestions;
