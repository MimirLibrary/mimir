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

const StyledWrapperList = styled(WrapperList)`
  padding: ${dimensions.xs_2} 0;
  grid-template-columns: repeat(auto-fill, 310px);
  margin-top: ${dimensions.xl_2};
  @media (max-width: ${dimensions.tablet_width}) {
    grid-template-columns: repeat(auto-fill, 260px);
  }

  @media (max-width: ${dimensions.phone_width}) {
    display: flex;
    flex-direction: column;
  }
`;

const ListAllItems = () => {
  const locations = useAppSelector(locationIds);
  const { searchMaterials } = useAppSelector((state) => state.materials);

  const { data, loading, error } = useGetAllMaterialsForManagerQuery({
    variables: { locations },
    fetchPolicy: 'no-cache',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data)
      dispatch(setSearchMaterials(data?.getAllMaterials as IMaterial[]));
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <WrapperLoader>
          <Loader
            height={100}
            width={100}
            color={`${colors.accent_color}`}
            strokeWidth={5}
          />
        </WrapperLoader>
      ) : (
        <StyledWrapperList>
          {searchMaterials?.map((item) => (
            <BookCardExtended key={item?.id} item={item} />
          ))}
        </StyledWrapperList>
      )}
    </>
  );
};

export default ListAllItems;
