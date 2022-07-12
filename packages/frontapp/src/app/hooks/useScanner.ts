import { useGetMaterialByIdentifierQuery } from '@mimir/apollo-client';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from './useTypedSelector';
import { t } from 'i18next';

const useScanner = () => {
  const navigate = useNavigate();
  const { fetchMore } = useGetMaterialByIdentifierQuery({ skip: true });
  const [isShowScanner, setIsShowScanner] = useState(false);
  const { location } = useAppSelector((state) => state.user);

  const handleOnDetectedScannerRoute = useCallback(
    async (code) => {
      const {
        data: { getMaterialByIdentifier },
      } = await fetchMore({
        variables: {
          identifier: code,
          location_id: parseInt(location.id),
        },
      });

      if (!getMaterialByIdentifier)
        return toast.error(t('PopUps.NotFoundByIdentifier'));

      return navigate(`/item/${getMaterialByIdentifier.id}?claimModal=${code}`);
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
