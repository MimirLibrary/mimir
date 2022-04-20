import React from 'react';
import TitleProject from '../TitleProject';
import styled from '@emotion/styled';
import NotificationIcon from '../NotificationIcon';
import Avatar from '../Avatar';
import UserInfo from '../UserInfo';
import { useAppSelector } from '../../hooks/useTypedSelector';

const WrapperTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapperUserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 10rem;
  width: 100%;
`;

const WrapperForCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.2rem;
`;

const WrapperHeader = styled.header`
  max-width: 16.5rem;
  width: 100%;
  margin-bottom: 3.5rem;
`;

const Header = () => {
  const { username } = useAppSelector((state) => state.user);
  return (
    <WrapperHeader>
      <WrapperTitle>
        <TitleProject title="Mimir" />
        <NotificationIcon active={true} />
      </WrapperTitle>
      <WrapperForCenter>
        <WrapperUserInfo>
          <Avatar src={''} />
          <UserInfo userName={username} email="ivanivanov@itechart-group.com" />
        </WrapperUserInfo>
      </WrapperForCenter>
    </WrapperHeader>
  );
};

export default Header;
