import React, { useEffect } from 'react';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import BookCard from '../components/BookCard';
import { List, Wrapper } from './HistoryOfClaimPage';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useGetAllDonatedMaterialsByPersonQuery } from '@mimir/apollo-client';
import { toast } from 'react-toastify';

const HistoryOfDonatePage = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data, loading, error } = useGetAllDonatedMaterialsByPersonQuery({
    variables: { id: id.toString() },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

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
                returnDate={item?.currentStatus?.returnDate}
                status={item?.currentStatus?.status || 'Pending'}
                claimedUserId={item?.currentStatus?.person_id}
              />
            ))
            .reverse()}
      </List>
    </Wrapper>
  );
};

export default HistoryOfDonatePage;
