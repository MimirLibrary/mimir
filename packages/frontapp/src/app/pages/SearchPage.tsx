import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ButtonGroup } from './BookPreview';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { ReactComponent as ScrollButtonRight } from '../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../assets/ArrowButtonLeft.svg';
import CategoriesList from '../components/CategoriesList';
import AllBooksList from '../components/AllBooksList';
import { useAppSelector } from '../hooks/useTypedSelector';
import { getStatus } from '../models/helperFunctions/converTime';
import ErrorType500 from '../components/ErrorType500';
import useMaterialFilter from '../hooks/useMaterialFilter';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import ItemsNotFound from '../components/ItemsNotFound';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../utils/routes';
import Modal from '../components/Modal';
import CategorySearch from '../components/CategorySearch';
const ContentWrapper = styled.div`
  margin: 3rem 0 ${dimensions.xl_6};
`;

const TopicNameWrapper = styled.div`
  margin-bottom: ${dimensions.xl_2};
  display: flex;
  justify-content: space-between;

  @media (max-width: ${dimensions.phone_width}) {
    display: block;
  }
`;

const MainText = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.xl_2};

  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.xl};
  }
`;

const TextWrapper = styled.div<{ type?: string }>`
  margin: ${({ type }) =>
    type === 'main' ? `3.5rem 0 ${dimensions.xl_6}` : `0`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SeeAllButton = styled.button`
  font-size: ${dimensions.sm};
  font-weight: 500;
  color: ${colors.accent_color};
  background: transparent;
  border: none;
  outline: none;
  display: none;
  gap: ${dimensions.base};
  cursor: pointer;

  @media (max-width: ${dimensions.phone_width}) {
    display: flex;
  }
`;

const Topics = styled.h5`
  font-weight: 700;
  flex: 1;
  font-size: ${dimensions.xl};
`;

const SearchPage = () => {
  const locations = useAppSelector(locationIds);
  const [availableMaterial, setAvailableMaterial] = useState<any>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error } = useGetAllMaterialsQuery({
    variables: { locations },
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    const available = data?.getAllMaterials.filter((material: any) => {
      const lastStatus = material.statuses.slice(-1)[0];
      const currentStatus = getStatus(lastStatus?.status, material?.created_at);
      return currentStatus !== 'Rejected' && currentStatus !== 'Pending';
    });
    setAvailableMaterial(available);
  }, [data]);

  const allCategories = useMaterialFilter(availableMaterial, 'category');

  const navigateToCategory = (category: string) => {
    navigate({
      pathname: RoutesTypes.CATEGORY,
      search: `?categories=${category}`,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <h1>Loading...</h1>;

  if (!data) return <ErrorType500 />;
  if (data.getAllMaterials.length === 0) return <ItemsNotFound />;

  return (
    <>
      <TextWrapper type="main">
        <MainText>Categories</MainText>
        <SeeAllButton onClick={() => setIsModalActive(true)}>
          See All
        </SeeAllButton>
      </TextWrapper>
      <CategoriesList allCategories={allCategories} />
      {allCategories &&
        Object.keys(allCategories).map((category) => {
          return (
            <ContentWrapper key={category}>
              <TopicNameWrapper>
                <TextWrapper>
                  <Topics>{category}</Topics>
                  <SeeAllButton onClick={() => navigateToCategory(category)}>
                    All
                  </SeeAllButton>
                </TextWrapper>
                <ButtonGroup>
                  <ScrollButtonLeft />
                  <ScrollButtonRight />
                </ButtonGroup>
              </TopicNameWrapper>
              <AllBooksList
                sortingCategory={category}
                items={availableMaterial}
              />
            </ContentWrapper>
          );
        })}
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <CategorySearch setActive={setIsModalActive} />
      </Modal>
    </>
  );
};

export default SearchPage;
