import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Notification } from '../../../assets/Notification.svg';
import { ReactComponent as NoNotification } from '../../../assets/NoNotification.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { dimensions } from '@mimir/ui-kit';

const WrapperIcon = styled.div`
  cursor: pointer;
  @media (max-width: ${dimensions.tablet_width}) {
    display: none;
  }
`;

interface IProps {
  active: boolean;
}

const NotificationIcon: FC<IProps> = ({ active }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const linkToNotification = () => {
    history('/notifications');
    dispatch(setActiveTab(null));
  };
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

export default React.memo(NotificationIcon, () => false);
