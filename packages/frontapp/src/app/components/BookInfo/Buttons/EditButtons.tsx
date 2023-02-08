import { FC } from 'react';
import Button from '../../Button';
import { t } from 'i18next';

interface IEdit {
  onSave: () => void;
  onCancel: () => void;
}

export const EditButtons: FC<IEdit> = ({ onSave, onCancel }) => {
  return (
    <>
      <Button value={t('Buttons.Save')} onClick={onSave} />
      <Button value={t('Buttons.Cancel')} onClick={onCancel} transparent />
    </>
  );
};
