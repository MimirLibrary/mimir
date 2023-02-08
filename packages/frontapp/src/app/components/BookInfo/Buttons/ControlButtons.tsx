import React, { FC } from 'react';
import { ReactComponent as Edit } from '../../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../../assets/Remove.svg';
import Button from '../../Button';
import { t } from 'i18next';

interface IControl {
  onEdit: () => void;
  onDelete: () => void;
}

export const ControlButtons: FC<IControl> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Button
        value={t('Buttons.Edit')}
        onClick={onEdit}
        svgComponent={<Edit />}
        transparent
      />
      <Button
        value={t('Buttons.Delete')}
        onClick={onDelete}
        svgComponent={<Remove />}
        transparent
        secondary
      />
    </>
  );
};
