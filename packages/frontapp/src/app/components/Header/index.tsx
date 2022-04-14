import React from 'react';
import TitleProject from '../TitleProject';
import styled from '@emotion/styled';
import NotificationIcon from '../NotificationIcon';
import Avatar from '../Avatar';

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
`;

const Header = () => {
  return (
    <section>
      <WrapperTitle>
        <TitleProject title="Mimir" />
        <NotificationIcon active={false} />
      </WrapperTitle>
      <WrapperUserInfo>
        <Avatar src={''} />
        {/*<UserInfo />*/}
      </WrapperUserInfo>
    </section>
  );
};

export default Header;
