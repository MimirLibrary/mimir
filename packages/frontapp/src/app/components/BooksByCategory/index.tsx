import React, { useEffect } from 'react';
import { SortDir, useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import ErrorType500 from '../ErrorType500';
import { toast } from 'react-toastify';
import BookList, { IMaterial } from './bookList';
import BackButton from '../BackButton';
import ItemsNotFound from '../ItemsNotFound';
import Loader, { WrapperLoader } from '../Loader';
import { colors } from '@mimir/ui-kit';

const BooksByCategory = () => {
  const locations = useAppSelector(locationIds);
  const [searchParams] = useSearchParams();

  const authors = searchParams.getAll('authors');
  const availability = searchParams.getAll('availability');
  const categories = searchParams.getAll('categories');
  const items = searchParams.getAll('items');
  const sortBy = searchParams.getAll('sortby');
  const filters = [
    ...authors,
    ...availability,
    ...categories,
    ...items,
    ...sortBy,
  ];

  const { data, loading, error } = useGetAllMaterialsQuery({
    variables: {
      input: {
        locations,
        categories,
        authors,
        types: items,
        statuses: availability,
      },
      sortBy:
        sortBy?.[0]?.localeCompare('By date added') === 0
          ? 'created_at'
          : sortBy?.[0],
      ...(sortBy?.[0]?.localeCompare('By date added') === 0 && {
        sortDir: SortDir.Asc,
      }),
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) {
    return (
      <WrapperLoader>
        <Loader height={100} width={100} color={`${colors.accent_color}`} />
      </WrapperLoader>
    );
  }

  if (!data) {
    return <ErrorType500 />;
  }
  if (data.getAllMaterials.length === 0) {
    return <ItemsNotFound />;
  }

  return (
    data && (
      <>
        <BackButton />
        <BookList
          materials={data.getAllMaterials as IMaterial[]}
          filters={filters}
        />
      </>
    )
  );
};

export default BooksByCategory;
