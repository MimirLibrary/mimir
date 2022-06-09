import React, { FC } from 'react';
import BookCard from '../BookCard';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
const WrapperList = styled.section`
  display: flex;
  gap: ${dimensions.base_2};
  width: 100%;
  flex-wrap: nowrap;
  max-height: 22rem;
  overflow-x: hidden;
`;

export interface IMaterial {
  id: string;
  __typename?: 'Material';
  picture?: string | null | undefined;
  category: string;
  author: string;
  title: string;
  created_at: string;
}

interface IProps {
  items: Array<IMaterial | null> | undefined;
  sortingCategory: string | undefined;
}
const index: FC<IProps> = ({ items, sortingCategory }) => {
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

export default index;
