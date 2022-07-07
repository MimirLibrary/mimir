import React, { FC, useEffect, useState } from 'react';
import { isOverdue } from '../../models/helperFunctions/converTime';
import Avatar from '../Avatar';
import { mockData } from './mockData';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useNavigate } from 'react-router-dom';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${dimensions.base};
  row-gap: ${dimensions.xs_2};
  > p:first-child {
    margin-bottom: ${dimensions.xs_2};
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
  background: ${colors.bg_secondary};
  width: 320px;
  margin: 0 0 ${dimensions.xl};
  height: 151px;
  padding: ${dimensions.xl_2};
  box-shadow: ${colors.shadow};
  border-radius: ${dimensions.xs_1};
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
  font-size: ${({ secondary }) =>
    secondary ? `${dimensions.sm}` : `${dimensions.base}`};
  line-height: ${({ secondary }) =>
    secondary ? `${dimensions.lg}` : `${dimensions.xl}`};
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
  const navigate = useNavigate();
  const handleUserRedirect = () => {
    navigate(`/readers/${id}`);
  };

  return (
    <CardWrapper onClick={handleUserRedirect}>
      <AvatarWrapper>
        <Avatar src={''} />
      </AvatarWrapper>
      <InfoWrapper>
        <Description bold>{mockData.name}</Description>
        <InlineWrapper>
          <Description bold secondary>
            {t('Readers.SingleUser.ClaimHistory')}
          </Description>
          <Description secondary>
            {claims.claimHistory ? claims.claimHistory : '-'}
            {claims.claimHistory
              ? claims.claimHistory === 1
                ? ' ' + t('Readers.SingleUser.Item')
                : ' ' + t('Readers.SingleUser.Items')
              : null}
          </Description>
        </InlineWrapper>
        <InlineWrapper>
          <Description bold secondary>
            {t('Readers.SingleUser.ClaimNow')}
          </Description>
          <Description secondary>
            {claims.claimNow ? claims.claimNow : '-'}
            {claims.claimNow
              ? claims.claimNow === 1
                ? ' ' + t('Readers.SingleUser.Item')
                : ' ' + t('Readers.SingleUser.Items')
              : null}
          </Description>
        </InlineWrapper>
        <InlineWrapper>
          {claims.overdue ? (
            <>
              <Description secondary bold warning>
                {t('Readers.SingleUser.Overdue')}
              </Description>
              <Description secondary>
                {claims.overdue}
                {claims.overdue === 1
                  ? ' ' + t('Readers.SingleUser.Item')
                  : ' ' + t('Readers.SingleUser.Items')}
              </Description>
            </>
          ) : (
            <>
              <Description bold secondary>
                {t('Readers.SingleUser.Overdue')}
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
