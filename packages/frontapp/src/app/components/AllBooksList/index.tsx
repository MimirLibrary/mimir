import React, { FC } from 'react';
import BookCard from '../BookCard';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';
const WrapperList = styled.section`
  display: flex;
  gap: ${dimensions.base_2};
  width: 100%;
  flex-wrap: nowrap;
  max-height: 22rem;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 0;
  }
`;

interface IAllBooksListProps {
  items: GetAllMaterialsQuery['getAllMaterials'] | undefined;
  sortingCategory: string | undefined;
}
const AllBooksList: FC<IAllBooksListProps> = ({ items, sortingCategory }) => {
  return (
    <WrapperList>
      {items &&
        items.map(
          (item) =>
            item?.category === sortingCategory && (
              <BookCard
                key={item?.id}
                id={item?.id}
                src={item?.picture}
                title={item?.title}
                author={item?.author}
                category={item?.category}
                date={item?.created_at}
                status={item?.statuses.slice(-1)[0]?.status}
              />
            )
        )}
    </WrapperList>
  );
};

export default AllBooksList;
