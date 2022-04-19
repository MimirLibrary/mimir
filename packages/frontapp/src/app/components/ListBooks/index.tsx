import React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const mockListItems = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

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
  height: 766px;
  overflow-y: scroll;

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

const ListItems = () => {
  return (
    <>
      {/*<TitleArticle>Don't forget to pass</TitleArticle>*/}
      {/*<TextBase>List of items you have taken and due dates</TextBase>*/}
      <WrapperList>
        {mockListItems && mockListItems.map((item) => <MockBox />)}
      </WrapperList>
    </>
  );
};

export default ListItems;
