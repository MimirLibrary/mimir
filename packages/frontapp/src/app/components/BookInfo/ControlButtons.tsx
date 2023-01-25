import React, { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as Edit } from '../../../assets/Edit.svg';
import { ReactComponent as Remove } from '../../../assets/Remove.svg';

interface IControl {
  onEdit: () => void;
  onDelete: () => void;
}

export const ControlButtons: FC<IControl> = ({ onEdit, onDelete }) => {
  return (
    <>
      <StyledButton
        value="Edit information"
        onClick={onEdit}
        svgComponent={<Edit />}
        transparent
      />
      <StyledButton
        value="Delete item"
        onClick={onDelete}
        svgComponent={<Remove />}
        transparent
        secondary
      />
    </>
  );
};
