import React, { FC, useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
import { Material } from '@mimir/apollo-client';
import BackButton from '../BackButton';

export type IMaterial = Pick<
  Material,
  | 'id'
  | 'title'
  | 'author'
  | 'type'
  | 'picture'
  | 'created_at'
  | 'category'
  | 'statuses'
>;

interface IBookList {
  allData: IMaterial[];
  searchParams: URLSearchParams;
}
const BookList: FC<IBookList> = ({ allData, searchParams }) => {
  const authors = searchParams.getAll('authors');
  const availability = searchParams.getAll('availability');
  const categories = searchParams.getAll('categories');
  const items = searchParams.getAll('items');
  const sortBy = searchParams.getAll('sortby');
  const [filteredData, setFilteredData] = useState<IMaterial[]>([]);

  useEffect(() => {
    let allBooks = allData;
    if (authors.length !== 0) {
      const filter = allBooks.filter(
        (book: IMaterial) => book && authors.includes(book.author)
      );
      !authors.includes('All') && (allBooks = filter);
    }
    if (categories.length !== 0) {
      const filter = allBooks.filter(
        (book: IMaterial) => book && categories.includes(book.category)
      );

      !categories.includes('All') && (allBooks = filter);
    }
    if (items.length !== 0) {
      const filter = allBooks.filter(
        (book: IMaterial) => book && items.includes(book.type)
      );
      allBooks = filter;
    }
    if (availability.length !== 0) {
      const filter = allBooks.filter((book: IMaterial) => {
        const lastStatus = book.statuses.slice(-1)[0];
        if (lastStatus) {
          return availability.includes(lastStatus.status);
        }
        return false;
      });
      !availability.includes('All') && (allBooks = filter);
    }
    if (sortBy.length !== 0) {
      if (sortBy[0].localeCompare('By date added')) {
        const filter = allBooks.slice().sort((firstBook, secondBook) => {
          const firstDate = new Date(firstBook.created_at);
          const secondDate = new Date(secondBook.created_at);
          return firstDate.getTime() - secondDate.getTime();
        });
        allBooks = filter;
      }
    }
    setFilteredData(allBooks);
  }, [searchParams]);

  return (
    <div>
      <BackButton />
      <WrapperList>
        {filteredData.length !== 0 ? (
          filteredData.map((material: IMaterial) => (
            <BookCard
              key={material.id}
              id={material.id}
              src={material.picture}
              title={material.title}
              author={material.author}
              category={material.category}
              date={material.created_at}
              status={material.statuses.slice(-1)[0]?.status}
            />
          ))
        ) : (
          <h3>Nothing was found</h3>
        )}
      </WrapperList>
    </div>
  );
};

export default BookList;
