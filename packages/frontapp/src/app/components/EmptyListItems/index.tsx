import React from 'react';
import emptyList from '../../../assets/EmptyList.png';
import styled from '@emotion/styled';
import { TitleArticle } from '../../globalUI/TextArticle';
import { TextBase } from '../../globalUI/TextBase';
import { colors, dimensions } from '@mimir/ui-kit';

const Wrapper = styled.section`
  width: 100%;
  max-height: 32.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${colors.bg_secondary};
  padding: 7.5rem 0;
  border-radius: 0.625rem;
  margin-top: 1.5rem;
`;

const WrapperText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: ${dimensions.base_2};
  max-width: 26rem;
  width: 100%;
`;

const StyleTitle = styled(TitleArticle)`
  font-size: ${dimensions.xl};
  margin-bottom: 8px;
`;

const StyleTextBase = styled(TextBase)`
  margin-top: 0.5rem;
`;

const EmptyListItems = () => {
  return (
    <Wrapper>
      <div>
        <img src={emptyList} alt="no items" />
      </div>
      <WrapperText>
        <StyleTitle>Shelf for your books and other items</StyleTitle>
        <TextBase>
          Go to the search section and choose the one that suits you
        </TextBase>
      </WrapperText>
    </Wrapper>
  );
};

export default EmptyListItems;
