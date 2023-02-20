import { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as Edit } from '../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../assets/Remove.svg';
import { t } from 'i18next';

interface IControl {
  onEdit: () => void;
  onDelete: () => void;
}

export const ControlButtons: FC<IControl> = ({ onEdit, onDelete }) => {
  return (
    <>
      <StyledButton
        value={t('DonateItem.Buttons.Edit')}
        onClick={onEdit}
        svgComponent={<Edit />}
        transparent
      />
      <StyledButton
        value={t('DonateItem.Buttons.Delete')}
        onClick={onDelete}
        svgComponent={<Remove />}
        transparent
        secondary
      />
    </>
  );
};
