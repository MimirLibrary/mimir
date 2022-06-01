import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookCard from '../BookCard';

const WrapperList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: ${dimensions.base};
  column-gap: ${dimensions.base_2};
  width: 100%;
  max-height: 20rem;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    background: #e0e0e0;
    width: ${dimensions.xs_2};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.accent_color};
    border-radius: ${dimensions.xs_2};
    height: ${dimensions.xs_2};
  }
`;

export interface IMaterial {
  __typename?: 'Material';
  picture?: string | null | undefined;
  category: string;
  author: string;
  title: string;
}

export interface IListItems {
  id: string;
  __typename?: 'Status' | undefined;
  status: string;
  created_at: any;
  material: IMaterial;
}

interface IProps {
  items: Array<IListItems | null>;
}

const ListItems: FC<IProps> = ({ items }) => {
  return (
    <WrapperList>
      {items &&
        items.map((item) => (
          <BookCard
            key={item?.id}
            item_id={item?.id}
            src={item?.material?.picture}
            title={item?.material.title}
            author={item?.material.author}
            category={item?.material.category}
            date={item?.created_at}
            status={item?.status}
          />
        ))}
    </WrapperList>
  );
};

export default ListItems;
