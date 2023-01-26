import React, { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as EnableNotifySvg } from '../../../assets/NoNotification.svg';
import { ReactComponent as CancelNotifySvg } from '../../../assets/CancelNotification.svg';

interface IControl {
  onSubscribe: () => void;
  onCancel: () => void;
}

export const NotifyMeButtons: FC<IControl> = ({ onSubscribe, onCancel }) => {
  return (
    <>
      <StyledButton
        value="Notify when available"
        onClick={onSubscribe}
        svgComponent={<EnableNotifySvg />}
      />
      <StyledButton
        value="Cancel"
        onClick={onCancel}
        svgComponent={<CancelNotifySvg />}
        transparent
      />
    </>
  );
};
