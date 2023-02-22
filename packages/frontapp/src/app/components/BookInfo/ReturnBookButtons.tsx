import React, { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as Claim } from '../../../assets/claim.svg';
import { t } from 'i18next';
import { StatusTypes } from '@mimir/global-types';

interface IControl {
  isClaimed?: boolean;
  onClaim: () => void;
  onReturn: () => void;
  onProlong: () => void;
  currentStatus: StatusTypes;
}

export const ClaimOrReturnBookButtons: FC<IControl> = ({
  isClaimed = false,
  onClaim,
  onReturn,
  onProlong,
  currentStatus,
}) => {
  if (!isClaimed) {
    return (
      <StyledButton
        value={t('DonateItem.Buttons.Claim')}
        onClick={onClaim}
        svgComponent={<Claim />}
      />
    );
  }
  return (
    <>
      <StyledButton value={t('DonateItem.Buttons.Return')} onClick={onReturn} />
      <StyledButton
        value={t('DonateItem.Buttons.Extend')}
        onClick={onProlong}
        transparent
        disabled={currentStatus === StatusTypes.PROLONG}
      />
    </>
  );
};
