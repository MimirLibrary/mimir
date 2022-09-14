import React, { FC, useRef } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { SearchOfMaterialsQuery } from '@mimir/apollo-client';
import BookCard from '../BookCard';
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

interface IProps {
  materials: SearchOfMaterialsQuery['searchOfMaterials'];
  removeSuggestionSearchWindow: () => void;
}

const SearchSuggestions: FC<IProps> = ({
  materials,
  removeSuggestionSearchWindow,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, removeSuggestionSearchWindow);

  return (
    <Wrapper ref={ref}>
      <WrapperList>
        {materials &&
          materials.map((material) => (
            <SuggestionBookCard
              key={material?.id}
              src={material?.picture}
              id={material?.id}
              status={material?.statuses.at(-1)?.status}
              date={material?.statuses.at(-1)?.created_at}
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
