import React, { useEffect, useState } from 'react';
import { WrapperInfo } from '../components/DonateBookFlow';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import DonatesFromUserContent from '../components/DonatesFromUserContent/DonatesFromUserContent';

const DonatesFromUser = () => {
  const locations = useAppSelector(locationIds);
  const { data, error } = useGetAllMaterialsQuery({
    variables: { locations },
    fetchPolicy: 'no-cache',
  });
  const [search, setSearch] = useState<string>('');
  const [pendingDonates, setPendingDonates] = useState<any>();
  const [shownItems, setShownItems] = useState<any>();
  const [shownId, setShownId] = useState<Array<number>>([]);

  useEffect(() => {
    if (data) {
      const pendingDonates = data.getAllMaterials.filter((material: any) => {
        return material.is_donated === true;
      });
      setPendingDonates(pendingDonates);
      setShownItems(pendingDonates);
    }
    return () => {
      setPendingDonates(undefined);
      setShownItems(undefined);
    };
  }, [data]);

  useEffect(() => {
    setShownItems(
      pendingDonates?.filter((item: any) =>
        shownId.includes(item.id || !shownId.length)
      )
    );
  }, [shownId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <WrapperInfo>
      <DonatesFromUserContent
        items={shownItems}
        setShownId={setShownId}
        shownId={shownId}
        search={search}
      ></DonatesFromUserContent>
    </WrapperInfo>
  );
};

export default DonatesFromUser;
