import { useGetMaterialByIdentifierQuery } from '@mimir/apollo-client';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from './useTypedSelector';
import { t } from 'i18next';
import { locationIds } from '../store/slices/userSlice';

const useScanner = () => {
  const navigate = useNavigate();
  const { fetchMore } = useGetMaterialByIdentifierQuery({ skip: true });
  const [isShowScanner, setIsShowScanner] = useState(false);
  const locations = useAppSelector(locationIds);

  const handleOnDetectedScannerRoute = useCallback(
    async (code) => {
      try {
        const {
          data: { getMaterialByIdentifier },
        } = await fetchMore({
          variables: {
            identifier: code,
            locations: locations,
          },
        });
        return navigate(
          `/item/${getMaterialByIdentifier.id}?claimModal=${code}`
        );
      } catch (e) {
        toast.error(t('PopUps.NotFoundByIdentifier'));
      }
    },
    [fetchMore, locations, navigate]
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
