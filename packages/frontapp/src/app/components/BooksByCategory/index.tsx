import React from 'react';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { GoBack, ButtonWrapper } from '../../pages/BookPreview';
import { ReactComponent as ArrowBack } from '../../../assets/ArrowUp2.svg';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../BookCard';
import { WrapperList } from '../ListBooks';

const BooksByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetAllMaterialsQuery();
  const handleGoBack = () => {
    navigate('/search');
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <ButtonWrapper onClick={handleGoBack}>
        <ArrowBack />
        <GoBack>Back to all categories</GoBack>
      </ButtonWrapper>
      <WrapperList>
        {data &&
          data?.getAllMaterials.map(
            (material: any) =>
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
    </div>
  );
};

export default BooksByCategory;
