import React, { FC } from 'react';
import { ReactComponent as EnableNotifySvg } from '../../../../assets/NoNotification.svg';
import { ReactComponent as CancelNotifySvg } from '../../../../assets/CancelNotification.svg';
import Button from '../../Button';
import { t } from 'i18next';

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
      value={t('Buttons.NotifyMe')}
      onClick={onSubscribe}
      svgComponent={<EnableNotifySvg />}
    />
  ) : (
    <Button
      value={t('Buttons.Cancel')}
      onClick={onCancel}
      svgComponent={<CancelNotifySvg />}
      transparent
    />
  );
};
