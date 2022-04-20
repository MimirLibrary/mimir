import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const MockBox = styled.div`
  height: 330px;
  width: 195px;
  background: red;
`;

const WrapperList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  row-gap: ${dimensions.base};
  column-gap: 35px;
  width: 100%;
  max-height: 35rem;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    background: #e0e0e0;
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.accent_color};
    border-radius: 0.5rem;
    height: 0.6rem;
  }
`;

interface IProps {
  items: any[];
}

const ListItems: FC<IProps> = ({ items }) => {
  return (
    <>
      <WrapperList>
        {items && items.map((item, index) => <MockBox key={index} />)}
      </WrapperList>
    </>
  );
};

export default ListItems;
