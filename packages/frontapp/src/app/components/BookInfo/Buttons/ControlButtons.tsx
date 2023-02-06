import React, { FC } from 'react';
import { ReactComponent as Edit } from '../../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../../assets/Remove.svg';
import Button from '../../Button';

interface IControl {
  onEdit: () => void;
  onDelete: () => void;
}

export const ControlButtons: FC<IControl> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Button
        value="Edit information"
        onClick={onEdit}
        svgComponent={<Edit />}
        transparent
      />
      <Button
        value="Delete item"
        onClick={onDelete}
        svgComponent={<Remove />}
        transparent
        secondary
      />
    </>
  );
};
