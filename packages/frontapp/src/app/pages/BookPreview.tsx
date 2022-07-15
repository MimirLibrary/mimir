import { useParams } from 'react-router-dom';
import BookInfo from '../components/BookInfo';
import AllBooksList from '../components/AllBooksList';
import styled from '@emotion/styled';
import { useAppSelector } from '../hooks/useTypedSelector';

import { colors, dimensions } from '@mimir/ui-kit';
import {
  useGetMaterialByIdQuery,
  useGetAllMaterialsQuery,
} from '@mimir/apollo-client';
import { ReactComponent as ScrollButtonRight } from '../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../assets/ArrowButtonLeft.svg';
import DonatInfo from '../components/DonatInfo';
import BackButton from '../components/BackButton';

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
type BookPreviewProps = {
  donat?: boolean;
};

const BookPreview = ({ donat }: BookPreviewProps) => {
  const { item_id } = useParams();
  const { id } = useAppSelector((state) => state.user);
  const { data, loading } = useGetMaterialByIdQuery({
    variables: { id: item_id! },
  });
  const { data: getAllMaterials } = useGetAllMaterialsQuery();

  const lastStatusAnotherPerson = data?.getMaterialById.statuses.slice(-1)[0];

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <BackButton />
      {donat ? (
        data?.getMaterialById && (
          <DonatInfo
            person_id={id}
            identifier={data.getMaterialById.identifier}
            src={data?.getMaterialById.picture}
            title={data?.getMaterialById.title}
            author={data?.getMaterialById.author}
            category={data?.getMaterialById.category}
            statusInfo={lastStatusAnotherPerson}
            created_at={lastStatusAnotherPerson?.created_at}
            material_id={parseInt(data.getMaterialById.id)}
            description={data?.getMaterialById.description}
            updated_at={data?.getMaterialById?.updated_at}
            type={data?.getMaterialById?.type}
            location_id={data?.getMaterialById?.location_id}
          />
        )
      ) : (
        <>
          {data?.getMaterialById && (
            <BookInfo
              person_id={id}
              identifier={data.getMaterialById.identifier}
              src={data?.getMaterialById.picture}
              title={data?.getMaterialById.title}
              author={data?.getMaterialById.author}
              category={data?.getMaterialById.category}
              statusInfo={lastStatusAnotherPerson}
              created_at={lastStatusAnotherPerson?.created_at}
              material_id={parseInt(data.getMaterialById.id)}
              description={data?.getMaterialById.description}
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
      )}
    </>
  );
};

export default BookPreview;
