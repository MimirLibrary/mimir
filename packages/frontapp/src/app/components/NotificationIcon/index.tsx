import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Notification } from '../../../assets/Notification.svg';
import { ReactComponent as NoNotification } from '../../../assets/NoNotification.svg';

const WrapperIcon = styled.div`
  cursor: pointer;
`;

interface IProps {
  active: boolean;
}

const NotificationIcon: FC<IProps> = ({ active }) => {
  const linkToNotification = () => {};
  return (
    <WrapperIcon>
      {active ? (
        <Notification onClick={linkToNotification} />
      ) : (
        <NoNotification onClick={linkToNotification} />
      )}
    </WrapperIcon>
  );
};

export default NotificationIcon;
