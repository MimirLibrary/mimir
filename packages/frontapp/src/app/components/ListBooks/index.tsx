import React from 'react';
import styled from '@emotion/styled';

const MockBox = styled.div`
  height: 330px;
  width: 195px;
  background: red;
`;

const Wrapper = styled.div`
  width: 885px;
  height: 766px;
  overflow: scroll;
`;
const ListItems = () => {
  return (
    <Wrapper>
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
      <MockBox />
    </Wrapper>
  );
};

export default ListItems;
