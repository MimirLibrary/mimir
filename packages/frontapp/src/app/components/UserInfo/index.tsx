import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const WrapperUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
`;

const UserNameText = styled.span`
  display: inline-block;
  color: ${colors.main_black};
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  text-align: center;
`;

const UserEmailText = styled.span`
  display: inline-block;
  font-size: ${dimensions.sm};
  line-height: 1.0625rem;
  color: #828282;
  text-align: center;
`;

interface IProps {
  userName: string;
  email: string;
}

const UserInfo: FC<IProps> = ({ userName, email }) => {
  return (
    <WrapperUserInfo>
      <UserNameText>{userName}</UserNameText>
      <UserEmailText>{email}</UserEmailText>
    </WrapperUserInfo>
  );
};

export default UserInfo;
