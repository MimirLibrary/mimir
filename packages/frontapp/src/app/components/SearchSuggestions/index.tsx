import React, { FC, useRef } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { SearchOfMaterialsQuery } from '@mimir/apollo-client';
import SuggestionBookCard from '../SuggestionBookCard';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Wrapper = styled.div`
  max-width: 345px;
  height: 262px;
  width: 100%;
  background-color: ${colors.bg_secondary};
  position: absolute;
  border-radius: ${dimensions.xs_1};
  top: 50px;
  padding: ${dimensions.xl_2};
  box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
  z-index: 10;
`;

const WrapperList = styled.div`
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }
`;

export interface IPropsSearchSuggestions {
  materials: SearchOfMaterialsQuery['searchOfMaterials'];
  removeSuggestionSearchWindow: () => void;
}

const SearchSuggestions: FC<IPropsSearchSuggestions> = ({
  materials,
  removeSuggestionSearchWindow,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, removeSuggestionSearchWindow);

  if (!materials || !materials.length) return null;

  return (
    <Wrapper ref={ref} data-testid="wrapper">
      <WrapperList>
        {materials.map((material) => (
          <SuggestionBookCard
            key={material?.id}
            src={material?.picture}
            id={material?.id}
            status={material?.currentStatus?.status}
            date={material?.currentStatus?.created_at}
            title={material?.title}
            category={material?.category}
            author={material?.author}
            removeSuggestionSearchWindow={removeSuggestionSearchWindow}
          />
        ))}
      </WrapperList>
    </Wrapper>
  );
};

export default SearchSuggestions;
