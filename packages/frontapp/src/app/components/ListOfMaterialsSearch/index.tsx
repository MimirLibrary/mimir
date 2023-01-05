import React from 'react';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';
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
            date={item?.currentStatus?.created_at}
            status={item?.currentStatus?.status}
          />
        ))}
    </WrapperList>
  );
};

export default ListOfMaterialsSearch;
