import React, { useEffect, useState } from 'react';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
import { useSearchParams } from 'react-router-dom';
import { Material } from '@mimir/apollo-client';
import BackButton from '../BackButton';
import { useAppSelector } from '../../hooks/useTypedSelector';

type IMaterial =
  | null
  | undefined
  | Pick<
      Material,
      'id' | 'title' | 'author' | 'type' | 'picture' | 'created_at' | 'category'
    >;

const BooksByCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { location } = useAppSelector((state) => state.user);
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetAllMaterialsQuery({
    variables: { location_id: location.id },
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
          if (
            lastStatus.status === 'Free' &&
            availability.includes('On the Shelf')
          )
            return true;
        } else if (
          lastStatus === undefined &&
          availability.includes('Will be available this week')
        ) {
          return true;
        }
        return false;
      });
      !availability.includes('All') && (allBooks = filter);
    }
    setFilteredData(allBooks);
  }, [searchParams]);

  if (loading) return <h1>Loading...</h1>;

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
