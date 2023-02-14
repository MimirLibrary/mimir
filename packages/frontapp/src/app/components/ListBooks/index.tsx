import { FC } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import BookCard from '../BookCard';
import { useAppSelector } from '../../hooks/useTypedSelector';

export const WrapperList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: ${dimensions.base};
  column-gap: ${dimensions.base_2};
  width: 100%;
`;

export interface IMaterial {
  id: string;
  __typename?: 'Material';
  picture?: string | null | undefined;
  category: string;
  author: string;
  title: string;
}

export interface IListBooks {
  id: string;
  __typename?: 'Status' | undefined;
  status: string;
  created_at: any;
  returnDate?: string;
  material: IMaterial;
}

interface IProps {
  userId?: number;
  items: Array<IListBooks | null>;
}

const ListBooks: FC<IProps> = ({ userId, items }) => {
  return (
    <WrapperList>
      {items &&
        items.map((item) => (
          <BookCard
            key={item?.id}
            id={item?.material?.id}
            src={item?.material?.picture}
            title={item?.material.title}
            author={item?.material.author}
            category={item?.material.category}
            returnDate={item?.returnDate}
            status={item?.status}
            claimedUserId={userId}
          />
        ))}
    </WrapperList>
  );
};

export default ListBooks;
