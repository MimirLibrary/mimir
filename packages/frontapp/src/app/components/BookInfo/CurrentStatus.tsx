import React, { FC } from 'react';
import { StatusType } from './index';
import StatusBadge from '../StatusBadge';
import { t } from 'i18next';

interface ICurrentStatus {
  status: StatusType;
}

export const CurrentStatus: FC<ICurrentStatus> = ({ status }) => {
  return status.status === 'Free' ? (
    <StatusBadge type="success">{t('Statuses.Accepted')}</StatusBadge>
  ) : status.status === 'Rejected' ? (
    <StatusBadge type="danger">{t('Statuses.Rejected')}</StatusBadge>
  ) : status.status === 'Pending' ? (
    <StatusBadge type="warning">{status.status}</StatusBadge>
  ) : (
    <StatusBadge type="default">{status.status}</StatusBadge>
  );
};
