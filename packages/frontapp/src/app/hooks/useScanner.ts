import { useGetMaterialByIdentifierQuery } from '@mimir/apollo-client';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './useTypedSelector';

const useScanner = () => {
  const navigate = useNavigate();
  const { fetchMore } = useGetMaterialByIdentifierQuery({ skip: true });
  const [isShowScanner, setIsShowScanner] = useState(false);
  const { location } = useAppSelector((state) => state.user);

  const handleOnDetectedScannerRoute = useCallback(
    async (code) => {
      const {
        data: {
          getMaterialByIdentifier: { id },
        },
      } = await fetchMore({
        variables: {
          identifier: code,
          location_id: parseInt(location.id),
        },
      });

      navigate(`/item/${id}?claimModal=${code}`);
    },
    [fetchMore, location.id, navigate]
  );

  const handleOnCloseScanner = useCallback(() => {
    document.body.style.overflow = 'visible';
    setIsShowScanner(false);
  }, []);

  return {
    isShowScanner,
    setIsShowScanner,
    handleOnDetectedScannerRoute,
    handleOnCloseScanner,
  };
};

export default useScanner;
