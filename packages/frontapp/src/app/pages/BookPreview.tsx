import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookInfo from '../components/BookInfo';
import AllBooksList from '../components/AllBooksList';
import styled from '@emotion/styled';

import { colors, dimensions } from '@mimir/ui-kit';
import {
  useGetMaterialByIdQuery,
  useGetAllMaterialsQuery,
} from '@mimir/apollo-client';
import { ReactComponent as ScrollButtonRight } from '../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../assets/ArrowButtonLeft.svg';
import { ReactComponent as ArrowBack } from '../../assets/ArrowUp2.svg';

const GoBack = styled.a`
  font-weight: 600;
  font-size: ${dimensions.base};
`;

const ButtonWrapper = styled.div`
  margin: 3rem 0 ${dimensions.xl_3} 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${dimensions.base};
  @media (max-width: ${dimensions.phone_width}) {
    display: none;
  }
`;

const Suggestions = styled.div`
  margin: ${dimensions.base_2} 0;
  display: flex;
`;

const SuggestionText = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  flex: 1;
`;

const BookPreview = () => {
  const { item_id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetMaterialByIdQuery({
    variables: { id: item_id! },
  });
  const { data: getAllMaterials } = useGetAllMaterialsQuery();

  const lastStatusAnotherPerson = data?.getMaterialById.statuses.slice(-1)[0];

  const handleGoBack = () => {
    navigate('/search');
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <ButtonWrapper onClick={handleGoBack}>
        <ArrowBack />
        <GoBack>Back</GoBack>
      </ButtonWrapper>
      {data?.getMaterialById && (
        <BookInfo
          person_id={lastStatusAnotherPerson?.person_id}
          identifier={data.getMaterialById.identifier}
          src={data?.getMaterialById.picture}
          title={data?.getMaterialById.title}
          author={data?.getMaterialById.author}
          category={data?.getMaterialById.category}
          status={lastStatusAnotherPerson?.status}
          created_at={lastStatusAnotherPerson?.created_at}
          material_id={data.getMaterialById.id}
          description=""
          updated_at={data?.getMaterialById?.updated_at}
          type={data?.getMaterialById?.type}
          location_id={data?.getMaterialById?.location_id}
        />
      )}
      <Suggestions>
        <SuggestionText>You may also like</SuggestionText>
        <ButtonGroup>
          <ScrollButtonLeft />
          <ScrollButtonRight />
        </ButtonGroup>
      </Suggestions>
      <AllBooksList
        sortingCategory={data?.getMaterialById.category}
        items={getAllMaterials?.getAllMaterials}
      />
    </>
  );
};

export default BookPreview;
