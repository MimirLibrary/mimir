import React, { FC, useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
import { Material, Status } from '@mimir/apollo-client';
import Tags from './tags';
import ItemsNotFound from '../ItemsNotFound';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';

const Header = styled.h2`
  font-size: ${dimensions.xl_2};
  font-weight: 700;
  margin-bottom: ${dimensions.base};
`;

type IStatus = Omit<
  Status,
  'person' | 'material' | 'id' | 'material_id' | 'created_at'
>;
export type IMaterial = Pick<
  Material,
  'id' | 'title' | 'author' | 'type' | 'picture' | 'created_at' | 'category'
> & { currentStatus: IStatus | null };

interface IBookList {
  materials: IMaterial[];
  filters: string[];
}
const BookList: FC<IBookList> = ({ materials, filters }) => {
  return (
    <div data-testid="bookList">
      <Header>
        {t('Readers.TitleFiltered')} - {materials.length}
      </Header>
      <Tags chosenTags={filters} />
      <WrapperList>
        {materials.length !== 0 ? (
          materials.map((material: IMaterial) => (
            <BookCard
              key={material.id}
              id={material.id}
              src={material.picture}
              title={material.title}
              author={material.author}
              category={material.category}
              returnDate={material?.currentStatus?.returnDate}
              status={material.currentStatus?.status}
              claimedUserId={material?.currentStatus?.person_id}
            />
          ))
        ) : (
          <ItemsNotFound />
        )}
      </WrapperList>
    </div>
  );
};

export default BookList;
