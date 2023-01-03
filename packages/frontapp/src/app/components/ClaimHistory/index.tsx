import { t } from 'i18next';
import {
  countClaimHistory,
  IClaimHistory,
} from '../../models/helperFunctions/claimHistory';
import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const ClaimWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: inherit;

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
    align-items: flex-start;
  } ;
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
    align-items: flex-start;
  } ;
`;
interface IDescriptionProps {
  warning?: boolean;
  bold?: boolean;
}
const Description = styled.p<IDescriptionProps>`
  font-weight: ${({ bold }) => (bold ? 500 : 300)};
  font-size: inherit;
  line-height: ${dimensions.xl};
  color: ${({ warning }) => (warning ? colors.problem_red : null)};
`;

export interface IClaimList {
  statuses: IClaimHistory[];
}

const ClaimHistory: FC<IClaimList> = ({ statuses }) => {
  const [claims, setClaims] = useState({
    claimNow: 0,
    claimHistory: 0,
    overdue: 0,
  });
  useEffect(() => {
    setClaims(countClaimHistory(statuses));
  }, []);

  return (
    <ClaimWrapper>
      <InlineWrapper>
        <Description bold>{t('Readers.SingleUser.ClaimHistory')}</Description>
        <Description>
          {claims.claimHistory ? claims.claimHistory : '-'}
          {claims.claimHistory
            ? claims.claimHistory === 1
              ? ' ' + t('Readers.SingleUser.Item')
              : ' ' + t('Readers.SingleUser.Items')
            : null}
        </Description>
      </InlineWrapper>
      <InlineWrapper>
        <Description bold>{t('Readers.SingleUser.ClaimNow')}</Description>
        <Description>
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
            <Description bold warning>
              {t('Statuses.Overdue') + ': '}
            </Description>
            <Description>
              {claims.overdue}
              {claims.overdue === 1
                ? ' ' + t('Readers.SingleUser.Item')
                : ' ' + t('Readers.SingleUser.Items')}
            </Description>
          </>
        ) : (
          <>
            <Description bold>{t('Statuses.Overdue') + ': '}</Description>
            <Description>-</Description>
          </>
        )}
      </InlineWrapper>
    </ClaimWrapper>
  );
};

export default ClaimHistory;
