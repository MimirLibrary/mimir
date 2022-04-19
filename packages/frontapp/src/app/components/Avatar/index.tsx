import React, { FC } from 'react';
import styled from '@emotion/styled';
import avatar from '../../../assets/avatar.jpg';

const UserAvatar = styled.img`
  max-height: 7rem;
  max-width: 7rem;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

interface IProps {
  src: string;
}

const Avatar: FC<IProps> = ({ src = '' }) => {
  return (
    <div>
      <UserAvatar src={avatar} alt="avatar" />
    </div>
  );
};

export default Avatar;
