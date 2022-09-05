import React, { useEffect, useState } from 'react';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useParams } from 'react-router-dom';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
import { useSearchParams } from 'react-router-dom';
import { Material } from '@mimir/apollo-client';
import BackButton from '../BackButton';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import ErrorType500 from '../ErrorType500';

type IMaterial =
  | null
  | undefined
  | Pick<
      Material,
      'id' | 'title' | 'author' | 'type' | 'picture' | 'created_at' | 'category'
    >;

const BooksByCategory = () => {
  const locations = useAppSelector(locationIds);
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const { data, loading } = useGetAllMaterialsQuery({
    variables: { locations },
  });

  const [filteredData, setFilteredData] = useState(data?.getAllMaterials);

  useEffect(() => {
    const authors = searchParams.getAll('authors');
    const availability = searchParams.getAll('availability');
    const categories = searchParams.getAll('categories');
    const items = searchParams.getAll('items');
    const sortBy = searchParams.getAll('sortBy');
    let allBooks = data?.getAllMaterials;
    if (authors?.length !== 0) {
      const filter = allBooks?.filter(
        (book: IMaterial) => book && authors.includes(book.author)
      );
      !authors.includes('All') && (allBooks = filter);
    }
    if (categories?.length !== 0) {
      const filter = allBooks?.filter(
        (book: IMaterial) => book && categories.includes(book.category)
      );

      !categories.includes('All') && (allBooks = filter);
    }
    if (items?.length !== 0) {
      const correctItemsArray: string[] = items.map((type: string) =>
        type.slice(0, -1)
      );
      const filter = allBooks?.filter(
        (book: IMaterial) => book && correctItemsArray?.includes(book.type)
      );
      allBooks = filter;
    }
    if (availability?.length !== 0) {
      const filter = allBooks?.filter((book: any) => {
        const lastStatus = book.statuses.slice(-1)[0];
        if (lastStatus) {
          return availability.includes(lastStatus.status);
        }
        return false;
      });
      !availability.includes('All') && (allBooks = filter);
    }
    setFilteredData(allBooks);
  }, [searchParams]);

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <ErrorType500 />;

  return (
    <div>
      <BackButton />
      {!category ? (
        <WrapperList>
          {filteredData?.length !== 0 ? (
            filteredData?.map((material: IMaterial) => (
              <BookCard
                key={material?.id}
                id={material?.id}
                src={material?.picture}
                title={material?.title}
                author={material?.author}
                category={material?.category}
                date={material?.created_at}
              />
            ))
          ) : (
            <h3>Nothing was found</h3>
          )}
        </WrapperList>
      ) : (
        <WrapperList>
          {data &&
            data?.getAllMaterials.map(
              (material: IMaterial) =>
                material?.category === category && (
                  <BookCard
                    key={material.id}
                    id={material.id}
                    src={material.picture}
                    title={material.title}
                    author={material.author}
                    category={material.category}
                    date={material.created_at}
                  />
                )
            )}
        </WrapperList>
      )}
    </div>
  );
};

export default BooksByCategory;
