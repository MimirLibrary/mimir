import { FC } from 'react';
import Button from '../../Button';
import { t } from 'i18next';

interface IEdit {
  onAccept: () => void;
  onReject: () => void;
}

export const DonateButtons: FC<IEdit> = ({ onAccept, onReject }) => {
  return (
    <>
      <Button value={t('Buttons.Accept')} onClick={onAccept} />
      <Button value={t('Buttons.Reject')} transparent onClick={onReject} />
    </>
  );
};
