import React from 'react';
import styled from '@emotion/styled';
import { TitleArticle } from '../../globalUI/TextArticle';
import { TextBase } from '../../globalUI/TextBase';

const WrapperInstructions = styled.section`
  margin-top: 3.5rem;
  max-width: 611px;
  width: 100%;
`;

const InstructionsClaim = () => {
  return (
    <WrapperInstructions>
      <TitleArticle>Did you find something interesting to claim?</TitleArticle>
      <TextBase>
        Use the mobile version of the application and quickly and easily take
        books and other items with this application
      </TextBase>
    </WrapperInstructions>
  );
};

export default InstructionsClaim;
