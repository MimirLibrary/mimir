import { FC, Dispatch, SetStateAction } from 'react';
import TitleProject from '../TitleProject';
import styled from '@emotion/styled';
import NotificationIcon from '../NotificationIcon';
import Avatar from '../Avatar';
import UserInfo from '../UserInfo';
import { useAppSelector } from '../../hooks/useTypedSelector';
import ClosedButton from '../ClosedButton';

interface IProps {
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
}

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
  margin-top: 2rem;
`;

const WrapperHeader = styled.header`
  max-width: 16.5rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const Header: FC<IProps> = ({ setSidebarActive }) => {
  const { username, email, avatar } = useAppSelector((state) => state.user);
  return (
    <WrapperHeader>
      <WrapperTitle>
        <TitleProject title="Mimir" />
        <NotificationIcon active={true} />
        <ClosedButton setSidebarActive={setSidebarActive} />
      </WrapperTitle>
      <WrapperForCenter>
        <WrapperUserInfo>
          <Avatar src={avatar} />
          <UserInfo userName={username} email={email} />
        </WrapperUserInfo>
      </WrapperForCenter>
    </WrapperHeader>
  );
};

export default Header;
