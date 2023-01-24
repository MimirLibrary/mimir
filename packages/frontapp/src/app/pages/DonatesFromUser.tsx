import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { WrapperInfo } from '../components/DonateBookFlow';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';
import {
  InputSearch,
  StyledSearchIcon,
  WrapperInput,
} from '../components/Search';
import { t } from 'i18next';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import DonatesFromUserContent from '../components/DonatesFromUserContent/DonatesFromUserContent';

const WrapperSearch = styled(WrapperInput)`
  position: relative;
  left: 0;
  top: -3.5rem;
  @media (max-width: ${dimensions.phone_width}) {
    top: -6.5rem;
  }
`;
const StyledWrapperInput = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: ${dimensions.phone_width}) {
    justify-content: center;
  }
`;

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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShownId([]);
    setShownItems(pendingDonates);
    setSearch(e.target.value);
  };

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
      <StyledWrapperInput>
        <WrapperSearch>
          <StyledSearchIcon
            fill={colors.dropdown_gray}
            width="20"
            height="20"
          />
          <InputSearch
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder={t('Search.UsernamePlaceholder')}
          />
        </WrapperSearch>
      </StyledWrapperInput>

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
