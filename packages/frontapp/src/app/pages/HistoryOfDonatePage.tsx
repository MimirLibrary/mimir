import React from 'react';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import BookCard from '../components/BookCard';
import { List, Wrapper } from './HistoryOfClaimPage';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useGetAllDonatedMaterialsByPersonQuery } from '@mimir/apollo-client';

const HistoryOfDonatePage = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data, loading } = useGetAllDonatedMaterialsByPersonQuery({
    variables: { id: id.toString() },
  });
  console.log(data?.getAllDonatedMaterialsByPerson);
  return (
    <Wrapper>
      <TextArticle>{t('DonateHistory.Title')}</TextArticle>
      <TextBase>{t('DonateHistory.Desc')}</TextBase>
      <List>
        {!loading &&
          data
            ?.getAllDonatedMaterialsByPerson!.map((item: any) => (
              <BookCard
                key={item?.id}
                id={item?.id}
                src={item?.picture}
                title={item?.title}
                author={item?.author}
                category={item?.category}
                date={item?.statuses.created_at}
                status={item?.statuses[1]?.status || 'Pending'}
              />
            ))
            .reverse()}
      </List>
    </Wrapper>
  );
};

export default HistoryOfDonatePage;
