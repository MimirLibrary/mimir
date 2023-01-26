import React, { FC } from 'react';
import { StyledButton } from './index';

interface IEdit {
  onSave: () => void;
  onCancel: () => void;
}

export const EditButtons: FC<IEdit> = ({ onSave, onCancel }) => {
  return (
    <>
      <StyledButton value="Save changes" onClick={onSave} />
      <StyledButton value="Cancel changes" onClick={onCancel} transparent />
    </>
  );
};
