import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { TitleInfo, SubTitle, WrapperInfo } from '../components/DonateBookFlow';
import { BookHolder } from '../components/BookInfo';
import OneDonator from '../components/OneDonatedBookPreview';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';
import {
  InputSearch,
  StyledSearchIcon,
  WrapperInput,
} from '../components/Search';
import { t } from 'i18next';
import { IMaterial } from '../types';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';

interface TitleProps {
  flex?: number;
}

const WrapperSearch = styled(WrapperInput)`
  position: relative;
  top: -3.5rem;
`;

const ColumnHeader = styled.div`
  display: flex;
  border-radius: 10px 10px 0px 0px;
  background-color: ${colors.accent_color};
  padding: ${dimensions.xl};
`;
const Column = styled.h4<TitleProps>`
  font-size: ${dimensions.base};
  font-weight: 600;
  color: ${colors.bg_secondary};
  flex: ${({ flex }) => flex};
  @media (max-width: ${dimensions.phone_width}) {
    flex: 1;
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
      <WrapperSearch>
        <StyledSearchIcon fill={colors.dropdown_gray} width="20" height="20" />
        <InputSearch
          type="text"
          value={search}
          onChange={handleChangeSearch}
          placeholder={t('Search.UsernamePlaceholder')}
        />
      </WrapperSearch>
      <TitleInfo>Donates from user</TitleInfo>
      <SubTitle>
        Items brought to the library by users. Confirm them so that they appear
        in the electronic database of books
      </SubTitle>
      <hr />
      <BookHolder>
        <ColumnHeader>
          <Column flex={3}>Item name</Column>
          <Column flex={1}>User name</Column>
          <Column flex={1}>State</Column>
        </ColumnHeader>
        {shownItems &&
          shownItems?.map((donate: any, index: number) => {
            return (
              <OneDonator
                search={search}
                setShownId={setShownId}
                shownId={shownId}
                identifier={donate.identifier}
                title={donate.title}
                statuses={donate.statuses}
                key={donate.identifier}
                id={donate.id}
                index={index}
                picture={donate.picture}
                description={donate.description}
              />
            );
          })}
      </BookHolder>
    </WrapperInfo>
  );
};

export default DonatesFromUser;
