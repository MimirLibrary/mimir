import React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface TitleArticleProps {
  margin?: string;
}

const WrapperInstructions = styled.section`
  //display: flex;
  //justify-content: start;
  //flex-direction: column;
  //align-items: center;
`;

const TitleArticle = styled.h3<TitleArticleProps>`
  font-weight: 700;
  font-size: 1.5625rem;
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
  margin: ${(props) => (props.margin ? props.margin : '')};
`;

const TextBase = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  margin-top: ${dimensions.base}; ;
`;

const InstructionsClaim = () => {
  return (
    <WrapperInstructions>
      <TitleArticle margin="0">
        Did you find something interesting to claim?
      </TitleArticle>
      <TextBase>
        Use the mobile version of the application and quickly and easily take
        books and other items with this application
      </TextBase>
      <TitleArticle margin="3rem 0 0 0">Don't forget to pass</TitleArticle>
      <TextBase>List of items you have taken and due dates</TextBase>
    </WrapperInstructions>
  );
};

export default InstructionsClaim;
