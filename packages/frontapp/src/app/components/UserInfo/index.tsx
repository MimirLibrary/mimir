import React, { FC } from 'react';
import styled from '@emotion/styled';

const WrapperUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserNameText = styled.span`
  display: inline-block;
  color: #333333;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

const UserEmailText = styled.span`
  display: inline-block;
`;

interface IPropsUserInfo {
  userName: string;
  email: string;
}

const UserInfo: FC<IPropsUserInfo> = ({ userName, email }) => {
  return <WrapperUserInfo></WrapperUserInfo>;
};

export default UserInfo;
