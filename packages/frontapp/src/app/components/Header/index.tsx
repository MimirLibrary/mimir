import React from 'react';
import TitleProject from '../TitleProject';
import styled from '@emotion/styled';
import NotificationIcon from '../NotificationIcon';
import Avatar from '../Avatar';
import UserInfo from '../UserInfo';

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
  width: 10rem;
`;

const WrapperForCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <header style={{ width: '358px' }}>
      <WrapperTitle>
        <TitleProject title="Mimir" />
        <NotificationIcon active={false} />
      </WrapperTitle>
      <WrapperForCenter>
        <WrapperUserInfo>
          <Avatar src={''} />
          <UserInfo
            userName="Ivan Ivanovisky"
            email="ivanivanov@itechart-group.com"
          />
        </WrapperUserInfo>
      </WrapperForCenter>
    </header>
  );
};

export default Header;
