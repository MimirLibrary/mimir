import React, { FC } from 'react';
import { ReactComponent as EnableNotifySvg } from '../../../../assets/NoNotification.svg';
import { ReactComponent as CancelNotifySvg } from '../../../../assets/CancelNotification.svg';
import Button from '../../Button';

interface IControl {
  isUserSubscriber?: boolean;
  onSubscribe: () => void;
  onCancel: () => void;
}

export const NotifyMeButtons: FC<IControl> = ({
  onSubscribe,
  onCancel,
  isUserSubscriber = false,
}) => {
  return !isUserSubscriber ? (
    <Button
      value="Notify when available"
      onClick={onSubscribe}
      svgComponent={<EnableNotifySvg />}
    />
  ) : (
    <Button
      value="Cancel"
      onClick={onCancel}
      svgComponent={<CancelNotifySvg />}
      transparent
    />
  );
};
