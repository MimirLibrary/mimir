import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookCard from '../BookCard';
import { IBookCard } from '@mimir/global-types';

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

interface IProps {
  items: Array<IBookCard>;
}

const ListItems: FC<IProps> = ({ items }) => {
  return (
    <>
      <WrapperList>
        {items &&
          items.map((item, index) => (
            <BookCard
              key={index}
              src={''}
              title={item.title}
              description={item.description}
            />
          ))}
      </WrapperList>
    </>
  );
};

export default ListItems;
