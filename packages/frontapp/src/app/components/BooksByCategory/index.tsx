import React, { useEffect } from 'react';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import ErrorType500 from '../ErrorType500';
import { toast } from 'react-toastify';
import BookList, { IMaterial } from './bookList';
import BackButton from '../BackButton';
import ItemsNotFound from '../ItemsNotFound';

const BooksByCategory = () => {
  const locations = useAppSelector(locationIds);
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useGetAllMaterialsQuery({
    variables: { locations },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <ErrorType500 />;
  if (data.getAllMaterials.length === 0) return <ItemsNotFound />;

  return (
    data && (
      <>
        <BackButton />
        <BookList
          allData={data.getAllMaterials as IMaterial[]}
          searchParams={searchParams}
        />
      </>
    )
  );
};

export default BooksByCategory;
