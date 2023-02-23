import React, { useEffect } from 'react';
import { WrapperList } from '../ListBooks';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useGetAllMaterialsForManagerQuery } from '@mimir/apollo-client';
import BookCardExtended from '../BookCardExtended';
import styled from '@emotion/styled';
import { WrapperLoader } from '../DonateBookFlow';
import { toast } from 'react-toastify';
import { colors, dimensions } from '@mimir/ui-kit';
import Loader from '../Loader';
import { setSearchMaterials } from '../../store/slices/materialsSlice';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { IMaterial } from '../../types';
import { locationIds } from '../../store/slices/userSlice';
import Button from '../Button';
import { NotFoundWindow } from '../NotFoundWindow';
import { ReactComponent as ArrowSVG } from './../../../assets/ArrowLeftUncolored.svg';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';

const StyledWrapperList = styled(WrapperList)`
  width: 100%;
  margin-top: ${dimensions.xl_10};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: space-between;
  gap: ${dimensions.base};

  @media (hover: none) {
    > * {
      box-shadow: 0 6px 14px -6px rgba(24, 39, 75, 0.08),
        0 10px 32px -4px rgba(24, 39, 75, 0.08);
    }
  }
`;

const ListAllItems = () => {
  const locations = useAppSelector(locationIds);
  const { searchMaterials } = useAppSelector((state) => state.materials);

  const { data, loading, error } = useGetAllMaterialsForManagerQuery({
    variables: { input: { locations } },
    fetchPolicy: 'no-cache',
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  // Todo: this handler should be replaced after implementation of reader url search
  const handleGoBack = () => {
    navigate(RoutesTypes.HOME);
  };

  useEffect(() => {
    if (data)
      dispatch(setSearchMaterials(data?.getAllMaterials as IMaterial[]));
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return loading ? (
    <WrapperLoader>
      <Loader
        height={100}
        width={100}
        color={`${colors.accent_color}`}
        strokeWidth={5}
      />
    </WrapperLoader>
  ) : searchMaterials?.length ? (
    <StyledWrapperList>
      {searchMaterials?.map((item) => (
        <BookCardExtended key={item?.id} item={item} />
      ))}
    </StyledWrapperList>
  ) : (
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
  );
};

export default ListAllItems;
