import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { TitleInfo, SubTitle, WrapperInfo } from '../components/DonateBookFlow';
import { BookHolder } from '../components/BookInfo';
import OneDonator from '../components/OneDonatedBookPreview';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../hooks/useTypedSelector';
import { locationIds } from '../store/slices/userSlice';
import {
  InputSearch,
  StyledSearchIcon,
  WrapperInput,
} from '../components/Search';
import { t } from 'i18next';
import { IMaterial } from '../types';

interface TitleProps {
  flex?: number;
}

const ColumnHeader = styled.div`
  display: flex;
  border-radius: 10px 0px 0px 0px;
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
  const { data } = useGetAllMaterialsQuery({
    variables: { locations },
  });
  const [pendingDonates, setPendingDonates] = useState<any>();
  useEffect(() => {
    if (data) {
      const pendingDonates = data.getAllMaterials.filter((material: any) => {
        return material.is_donated === true;
      });
      setPendingDonates(pendingDonates);
    }
    return () => {
      setPendingDonates(undefined);
    };
  }, [data]);

  return (
    <WrapperInfo>
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
        {pendingDonates &&
          pendingDonates?.map((donate: any, index: number) => (
            <OneDonator
              identifier={donate.identifier}
              title={donate.title}
              statuses={donate.statuses}
              key={donate.identifier}
              id={donate.id}
              index={index}
              picture={donate.picture}
              description={donate.description}
            />
          ))}
      </BookHolder>
    </WrapperInfo>
  );
};

export default DonatesFromUser;
