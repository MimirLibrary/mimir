import React, { FC } from 'react';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
import { IMaterialState } from '../../types/materilsTypes';
import { useAppSelector } from '../../hooks/useTypedSelector';

const ListOfMaterialsSearch = () => {
  const { searchMaterials } = useAppSelector((state) => state.materials);
  return (
    <WrapperList>
      {searchMaterials &&
        searchMaterials.map((item) => (
          <BookCard
            key={item?.id}
            id={item?.id}
            src={item?.picture}
            title={item?.title}
            author={item?.author}
            category={item?.category}
            date={item?.statuses.slice(-1)[0]?.created_at}
            status={item?.statuses.slice(-1)[0]?.status}
          />
        ))}
    </WrapperList>
  );
};

export default ListOfMaterialsSearch;
