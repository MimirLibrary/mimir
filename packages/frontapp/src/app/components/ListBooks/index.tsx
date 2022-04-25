import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookCard from '../BookCard';

const WrapperList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  row-gap: ${dimensions.base};
  column-gap: ${dimensions.base_2};
  width: 100%;
  max-height: 35rem;
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

export interface IStatusForMaterial {
  __typename?: 'Status' | undefined;
  status: string;
  created_at: Date;
}

export interface IListMaterial {
  __typename?: 'Material' | undefined;
  identifier: string;
  id: string;
  type: string;
  statuses: (IStatusForMaterial | null)[];
}

interface IProps {
  items: (IListMaterial | null)[] | undefined;
}

const ListItems: FC<IProps> = ({ items }) => {
  return (
    <>
      <WrapperList>
        {items &&
          items.map((item) => (
            <BookCard
              key={item?.id}
              src={''}
              title={item?.identifier}
              description={''}
              status={item?.statuses[item.statuses.length - 1]}
            />
          ))}
      </WrapperList>
    </>
  );
};

export default ListItems;
