import React, { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as Claim } from '../../../assets/claim.svg';
import { t } from 'i18next';

interface IControl {
  isClaimed?: boolean;
  onClaim: () => void;
  onReturn: () => void;
  onProlong: () => void;
}

export const ReturnBookButtons: FC<IControl> = ({
  isClaimed = false,
  onClaim,
  onReturn,
  onProlong,
}) => {
  if (!isClaimed)
    return (
      <StyledButton
        value={t('DonateItem.Buttons.Claim')}
        onClick={onClaim}
        svgComponent={<Claim />}
      />
    );

  return (
    <>
      <StyledButton value={t('DonateItem.Buttons.Return')} onClick={onReturn} />
      <StyledButton
        value={t('DonateItem.Buttons.Extend')}
        onClick={onProlong}
        transparent
      />
    </>
  );
};
