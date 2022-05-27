import styled from '@emotion/styled';
import { t } from 'i18next';
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
      <TitleArticle>{t(`InstructionsClaim.Header`)}</TitleArticle>
      <TextBase>{t(`InstructionsClaim.Description`)}</TextBase>
    </WrapperInstructions>
  );
};

export default InstructionsClaim;
