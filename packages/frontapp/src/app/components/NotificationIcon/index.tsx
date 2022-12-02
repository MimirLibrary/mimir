import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Notification } from '../../../assets/Notification.svg';
import { ReactComponent as NoNotification } from '../../../assets/NoNotification.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { RoutesTypes } from '../../../utils/routes';

const WrapperIcon = styled.div`
  cursor: pointer;
`;

interface IProps {
  active: boolean;
  hideSidebar: () => void;
}

const NotificationIcon: FC<IProps> = ({ active, hideSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkToNotification = () => {
    navigate(RoutesTypes.NOTIFICATIONS);
    dispatch(setActiveTab(null));
    hideSidebar();
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

export default memo(NotificationIcon);
