import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { useTranslation } from 'react-i18next';
import BookCard from '../components/BookCard';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';

const Wrapper = styled.div`
  padding-top: 3.5rem;

  @media (max-width: ${dimensions.tablet_width}) {
    padding-top: ${dimensions.base_2};
  }
`;

const List = styled.div`
  margin-top: ${dimensions.xl_2};
  display: flex;
  flex-wrap: wrap;
  column-gap: ${dimensions.base_2};
  row-gap: ${dimensions.base};
  max-height: 650px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 8px;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    overflow: visible;
    max-height: none;
  }
`;

const HistoryOfClaimPage = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <TitleArticle>{t('ClaimHistory.Title')}</TitleArticle>
      <TextBase>{t('ClaimHistory.Desc')}</TextBase>
      <List>
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
        <BookCard
          title="Half Life"
          author="Morgan Freeman"
          category="Fantastic"
        />
      </List>
    </Wrapper>
  );
};

export default HistoryOfClaimPage;
