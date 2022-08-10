import emptyList from '../../../assets/EmptyList.svg';
import styled from '@emotion/styled';
import { TextArticle } from '../../globalUI/TextArticle';
import { TextBase } from '../../globalUI/TextBase';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';

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
  border-radius: ${dimensions.xs_1};
  margin-top: ${dimensions.xl_2};

  & img {
    width: 60%;
  }

  @media (max-width: ${dimensions.phone_width}) {
    & img {
      width: 80%;
    }
  }
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

const StyleTitle = styled(TextArticle)`
  font-size: ${dimensions.xl};
  margin-bottom: ${dimensions.xs_2};
`;

const StyleTextBase = styled(TextBase)`
  margin-top: ${dimensions.xs_2};
`;

const EmptyListItems = () => {
  return (
    <Wrapper>
      <img src={emptyList} alt="no items" />
      <WrapperText>
        <StyleTitle>{t(`EmptyListItems.Header`)}</StyleTitle>
        <StyleTextBase>{t(`EmptyListItems.Description`)}</StyleTextBase>
      </WrapperText>
    </Wrapper>
  );
};

export default EmptyListItems;
