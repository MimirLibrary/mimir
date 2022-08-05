import styled from '@emotion/styled';
import { useGetItemsForClaimHistoryQuery } from '@mimir/apollo-client';
import { RolesTypes } from '@mimir/global-types';
import { dimensions } from '@mimir/ui-kit';
import { useTranslation } from 'react-i18next';
import BookCard from '../components/BookCard';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import { useAppSelector } from '../hooks/useTypedSelector';

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
  const { id, userRole } = useAppSelector((state) => state.user);
  const { data, loading } = useGetItemsForClaimHistoryQuery({
    variables: { person_id: id },
    skip: userRole === RolesTypes.MANAGER,
  });
  return (
    <Wrapper>
      <TextArticle>{t('ClaimHistory.Title')}</TextArticle>
      <TextBase>{t('ClaimHistory.Desc')}</TextBase>
      <List>
        {!loading &&
          data?.getItemsForClaimHistory
            .map((item) => (
              <BookCard
                key={item?.id}
                id={item?.material?.id}
                src={item?.material?.picture}
                title={item?.material.title}
                author={item?.material.author}
                category={item?.material.category}
                date={item?.created_at}
                status={item?.status}
              />
            ))
            .reverse()}
      </List>
    </Wrapper>
  );
};

export default HistoryOfClaimPage;
