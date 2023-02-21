import { t } from 'i18next';
import { FC } from 'react';
import { StyledButton } from './index';

interface IEdit {
  onSave: () => void;
  onCancel: () => void;
}

export const EditButtons: FC<IEdit> = ({ onSave, onCancel }) => {
  return (
    <>
      <StyledButton value={t('DonateItem.Buttons.Save')} onClick={onSave} />
      <StyledButton
        value={t('DonateItem.Buttons.Cancel')}
        onClick={onCancel}
        transparent
      />
    </>
  );
};
