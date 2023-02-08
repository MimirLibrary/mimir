import defaultImage from '../../../assets/MOC-data/BookImage.png';
import styled from '@emotion/styled';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import { StatusTypes } from '@mimir/global-types';
import { t } from 'i18next';
import { formatReturnDate, formatReturnedDate, FieldsText } from './Item';
import React, { FC } from 'react';
import { colors } from '@mimir/ui-kit';

const MobileItemWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;

  background: ${colors.bg_secondary};
  box-shadow: ${colors.shadow};
  border-radius: 15px;
  padding: 20px;

  :first-of-type {
    margin-top: 18px;
  }

  img {
    height: auto;
    max-width: 75px;
    margin-right: 20px;
  }
`;

const ItemData = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  item: IClaimHistory;
}

const MobileItem: FC<IProps> = ({ item }) => {
  const material = item.material;
  const coverUrl = material?.picture
    ? `${item.material?.picture}`
    : defaultImage;

  return (
    <MobileItemWrapper key={item.material_id}>
      <img data-testid="coverImg" src={coverUrl} alt={'book cover'} />
      <ItemData>
        <FieldsText titlee>{material?.title}</FieldsText>
        <FieldsText
          secondary
        >{`${material?.category} / ${material?.author}`}</FieldsText>
        <FieldsText>
          Deadline:{' '}
          {item.status !== StatusTypes.FREE
            ? item.returnDate && formatReturnDate(item.returnDate)
            : formatReturnedDate(item.created_at)}
        </FieldsText>
        Status:{' '}
        {item.status === StatusTypes.FREE ? (
          <FieldsText returned>{t('UserCard.Table.Returned')}</FieldsText>
        ) : item.status === StatusTypes.OVERDUE ? (
          <FieldsText overdue>{t('UserCard.Table.Overdue')}</FieldsText>
        ) : (
          <FieldsText>
            {item.status === StatusTypes.BUSY
              ? t('UserCard.Table.Claim')
              : t('UserCard.Table.Prolong')}
          </FieldsText>
        )}
      </ItemData>
    </MobileItemWrapper>
  );
};

export default MobileItem;
