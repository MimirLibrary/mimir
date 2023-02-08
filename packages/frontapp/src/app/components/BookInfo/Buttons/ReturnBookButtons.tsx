import { FC } from 'react';
import { ReactComponent as Claim } from '../../../../assets/claim.svg';
import Button from '../../Button';
import { StatusType } from '../index';
import { t } from 'i18next';

interface IControl {
  isClaimed?: boolean;
  onClaim: () => void;
  onReturn: () => void;
  onProlong: () => void;
  currentStatus: StatusType;
}

export const ReturnBookButtons: FC<IControl> = ({
  isClaimed = false,
  onClaim,
  onReturn,
  onProlong,
  currentStatus,
}) => {
  if (!isClaimed) {
    return (
      <Button
        value={t('Buttons.Claim')}
        onClick={onClaim}
        svgComponent={<Claim />}
      />
    );
  } else {
    return (
      <>
        <Button value={t('Buttons.Return')} onClick={onReturn} />
        <Button
          value={t('Buttons.Prolong')}
          onClick={onProlong}
          transparent
          disabled={currentStatus.status === 'Prolong'}
        />
      </>
    );
  }
};
