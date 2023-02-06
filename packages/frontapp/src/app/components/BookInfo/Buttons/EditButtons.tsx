import React, { FC } from 'react';
import Button from '../../Button';

interface IEdit {
  onSave: () => void;
  onCancel: () => void;
}

export const EditButtons: FC<IEdit> = ({ onSave, onCancel }) => {
  return (
    <>
      <Button value="Save changes" onClick={onSave} />
      <Button value="Cancel changes" onClick={onCancel} transparent />
    </>
  );
};
