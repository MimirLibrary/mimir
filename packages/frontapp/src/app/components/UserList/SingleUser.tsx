import React, { FC, useEffect, useState } from 'react';
import { isOverdue } from '../../models/helperFunctions/converTime';
import Avatar from '../Avatar';
import { mocData } from './mocData';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  row-gap: 8px;
  > p:first-child {
    margin-bottom: 8px;
  }
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  width: 320px;
  margin: 0 0 20px;
  height: 151px;
  padding: 24px;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: 10px;
`;
const AvatarWrapper = styled.div`
  height: 71px;
  width: 71px;
  border-radius: 50%;
`;
interface IDescriptionProps {
  warning?: boolean;
  bold?: boolean;
  secondary?: boolean;
}
const Description = styled.p<IDescriptionProps>`
  font-weight: ${({ bold }) => (bold ? 500 : 300)};
  font-size: ${({ secondary }) => (secondary ? '14px' : '16px')};
  line-height: ${({ secondary }) => (secondary ? '17px' : '20px')};
  color: ${({ warning }) => (warning ? colors.problem_red : null)};
`;

export interface IClaimHistory {
  material_id: number;
  status: string;
  created_at: Date;
}

const countClaimHistory = (statuses: IClaimHistory[] = []) => {
  const busyItems = statuses.filter(
    (status) => status.status === 'Busy' || status.status === 'Prolong'
  );
  const freeItems = statuses.filter((status) => status.status === 'Free');
  const claimNowItems = busyItems.filter((busyItem) => {
    const ind = freeItems.findIndex(
      (freeItem) => freeItem.material_id === busyItem.material_id
    );
    if (ind) {
      freeItems.splice(ind, 1);
    }
    return ind;
  });
  const overdueItems = claimNowItems.filter((item) =>
    isOverdue(item.created_at)
  );
  console.log(busyItems, freeItems, claimNowItems);
  const claimHistory = busyItems.length;
  const claimNow = claimNowItems.length;
  const overdue = overdueItems.length;
  return {
    claimNow,
    claimHistory,
    overdue,
  };
};

export interface ISingleUser {
  id: string;
  statuses: IClaimHistory[];
}

const SingleUser: FC<ISingleUser> = ({ id = '', statuses = [] }) => {
  const [claims, setClaims] = useState({
    claimNow: 0,
    claimHistory: 0,
    overdue: 0,
  });
  useEffect(() => {
    setClaims(countClaimHistory(statuses));
  }, []);

  return (
    <CardWrapper>
      <AvatarWrapper>
        <Avatar src={''} />
      </AvatarWrapper>
      <InfoWrapper>
        <Description bold>{mocData.name}</Description>
        <InlineWrapper>
          <Description bold secondary>
            {t('Claim history:')}
          </Description>
          <Description secondary>
            {claims.claimHistory ? claims.claimHistory : '-'}
            {claims.claimHistory
              ? claims.claimHistory === 1
                ? ' item'
                : ' items'
              : null}
          </Description>
        </InlineWrapper>
        <InlineWrapper>
          <Description bold secondary>
            {t('Claim now:')}
          </Description>
          <Description secondary>
            {claims.claimNow ? claims.claimNow : '-'}
            {claims.claimNow
              ? claims.claimNow === 1
                ? ' item'
                : ' items'
              : null}
          </Description>
        </InlineWrapper>
        <InlineWrapper>
          {claims.overdue ? (
            <>
              <Description>{t('Overdue: ')}</Description>
              <Description>
                {claims.overdue}
                {claims.overdue === 1 ? ' item' : ' items'}
              </Description>
            </>
          ) : (
            <>
              <Description bold secondary>
                {t('Claim now:')}
              </Description>
              <Description secondary>-</Description>
            </>
          )}
        </InlineWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default SingleUser;
