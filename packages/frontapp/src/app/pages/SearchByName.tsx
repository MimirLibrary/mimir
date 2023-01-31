import React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useAppSelector } from '../hooks/useTypedSelector';
import ListOfMaterialsSearch from '../components/ListOfMaterialsSearch';
import { NotFoundWindow } from '../components/NotFoundWindow';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { ReactComponent as ArrowSVG } from './../../assets/ArrowLeft.svg';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../utils/routes';

const Wrapper = styled.section`
  margin-top: ${dimensions.base_3};
`;

const WrapperSearch = styled.div`
  width: 100%;
  height: 100%;
`;

const AmountTitle = styled.h2`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base_2};
`;

const SearchByNameOrAuthorPage = () => {
  const { searchMaterials } = useAppSelector((state) => state.materials);
  const quantityOfMaterials = searchMaterials?.length || 0;

  const navigate = useNavigate();
  const handleGoBack = () => {
    window.history.state.idx === 0
      ? navigate(RoutesTypes.SEARCH)
      : navigate(-1);
  };
  return (
    <Wrapper>
      <BackButton customName="BackForNotFoundBook" />
      {searchMaterials?.length !== 0 ? (
        <WrapperSearch>
          <AmountTitle>Result: {quantityOfMaterials}</AmountTitle>
          {searchMaterials && <ListOfMaterialsSearch />}
        </WrapperSearch>
      ) : (
        <WrapperSearch>
          <NotFoundWindow
            searchEntity={t('Readers.SingleUser.Item')}
            withButton={
              <Button
                type="button"
                onClick={handleGoBack}
                value={t('Back')}
                svgComponent={<ArrowSVG />}
                transparent={true}
              />
            }
          />
        </WrapperSearch>
      )}
    </Wrapper>
  );
};

export default SearchByNameOrAuthorPage;
