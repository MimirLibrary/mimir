import React, { FC } from 'react';

interface IPropsNotificationIcon {
  active: boolean;
}

const NotificationIcon: FC<IPropsNotificationIcon> = ({ active }) => {
  return <div>{active ? <p>active</p> : <p>noactive</p>}</div>;
};

export default NotificationIcon;
