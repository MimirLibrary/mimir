import React, { FC } from 'react';
import BookCard from '../BookCard';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { Material } from '@mimir/apollo-client';
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
type IMaterial = Pick<
  Material,
  'id' | 'title' | 'author' | 'picture' | 'created_at' | 'category'
>;

interface IAllBooksListProps {
  items: Array<IMaterial | null> | undefined;
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
              />
            )
        )}
    </WrapperList>
  );
};

export default AllBooksList;
