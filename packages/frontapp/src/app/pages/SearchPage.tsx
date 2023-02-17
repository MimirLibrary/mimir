import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
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
import Loader, { WrapperLoader } from '../components/Loader';
import { t } from 'i18next';
import { useMediaQuery } from 'react-responsive';
import CarouselWrapper from '../components/CarouselWrapper';

const ContentWrapper = styled.div`
  margin: 3rem 0 ${dimensions.xl_6};
`;

const TopicNameWrapper = styled.div`
  margin-bottom: ${dimensions.xl_2};
  display: flex;
  justify-content: space-between;
  position: relative;

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
  const isTablet = useMediaQuery({ maxWidth: dimensions.tablet_width });
  useEffect(() => {
    const available = data?.getAllMaterials.filter((material: any) => {
      const currentStatus = getStatus(
        material?.currentStatus?.status,
        material?.returnDate
      );
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

  const getSortedByCategoryList = (category: string) => {
    return availableMaterial.filter((item: any) => item.category === category);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading)
    return (
      <WrapperLoader>
        <Loader height={100} width={100} color={`${colors.accent_color}`} />
      </WrapperLoader>
    );

  if (!data) return <ErrorType500 />;
  if (data.getAllMaterials.length === 0) return <ItemsNotFound />;

  return (
    <>
      <TextWrapper type="main">
        <MainText>{t('SearchFiltersForm.ItemFilter.Categories')}</MainText>
        <SeeAllButton onClick={() => setIsModalActive(true)}>
          {t('SearchFiltersForm.SeeAll')}
        </SeeAllButton>
      </TextWrapper>
      <CategoriesList allCategories={allCategories} />
      {allCategories &&
        Object.keys(allCategories).map((category) => {
          return isTablet ? (
            <ContentWrapper key={category}>
              <TopicNameWrapper>
                <TextWrapper>
                  <Topics>{category}</Topics>
                  <SeeAllButton onClick={() => navigateToCategory(category)}>
                    {t('SearchFiltersForm.UsersFilter.All')}
                  </SeeAllButton>
                </TextWrapper>
              </TopicNameWrapper>
              <AllBooksList items={getSortedByCategoryList(category)} />
            </ContentWrapper>
          ) : (
            <CarouselWrapper
              key={category}
              slidesListLengt={getSortedByCategoryList(category).length}
              header={
                <TextWrapper>
                  <Topics>{category}</Topics>
                  <SeeAllButton onClick={() => navigateToCategory(category)}>
                    {t('SearchFiltersForm.UsersFilter.All')}
                  </SeeAllButton>
                </TextWrapper>
              }
              slides={
                <AllBooksList
                  items={getSortedByCategoryList(category)}
                  forSlider
                />
              }
            />
          );
        })}
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <CategorySearch setActive={setIsModalActive} />
      </Modal>
    </>
  );
};

export default SearchPage;
