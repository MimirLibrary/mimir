import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as NotificationIconCircle } from '../../../assets/NotificationWithCircle.svg';
import { ReactComponent as NotificationIconWithoutCircle } from '../../../assets/NotificationWithoutCircle.svg';

const WrapperIcon = styled.div`
  cursor: pointer;
`;

interface IPropsNotificationIcon {
  active: boolean;
}

const NotificationIcon: FC<IPropsNotificationIcon> = ({ active }) => {
  const linkToNotification = () => {};
  return (
    <WrapperIcon>
      {active ? (
        <NotificationIconCircle onClick={linkToNotification} />
      ) : (
        <NotificationIconWithoutCircle onClick={linkToNotification} />
      )}
    </WrapperIcon>
  );
};

export default NotificationIcon;
