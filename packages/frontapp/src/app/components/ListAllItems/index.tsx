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

const StyledWrapperList = styled(WrapperList)`
  grid-template-columns: repeat(auto-fill, 310px);
  margin-top: ${dimensions.xl_2};
  @media (max-width: ${dimensions.tablet_width}) {
    grid-template-columns: repeat(auto-fill, 260px);
  }
`;

const ListAllItems = () => {
  const { location } = useAppSelector((state) => state.user);
  const { data, loading, error } = useGetAllMaterialsForManagerQuery({
    variables: { location_id: location.id },
  });

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
          {data?.getAllMaterials &&
            data.getAllMaterials.map((item) => (
              <BookCardExtended key={item?.id} item={item} />
            ))}
        </StyledWrapperList>
      )}
    </>
  );
};

export default ListAllItems;
