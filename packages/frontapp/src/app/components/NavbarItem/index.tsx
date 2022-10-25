import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { NavbarItems } from '../../../utils/NavbarItems';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { logout } from '../../store/slices/userSlice';
import { RolesTypes } from '@mimir/global-types';

interface IProps {
  icon: ReactElement;
  name: string;
  path: string;
  changeActiveTab: (name: string) => void;
}

interface IStyle {
  primary: string;
  name?: string;
}

const StyledLink = styled(Link)<IStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    JSON.parse(props.primary) ? colors.accent_color : colors.bg_secondary};
  width: 15rem;
  height: 4rem;
  text-decoration: none;
  border-radius: 6.25rem;
  padding-left: ${dimensions.xl_2};
  margin-bottom: 0.12rem;

  :hover {
    background: ${colors.hover_color};
    color: ${colors.bg_secondary};
  }

  :hover svg {
    filter: invert(100%);
  }

  :hover p {
    color: ${colors.bg_secondary};
  }

  :active {
    background: ${colors.pressed_color};
  }

  :active p {
    color: ${colors.bg_secondary};
  }
`;

const InsideButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 12.5rem;
  width: 100%;
  color: ${colors.bg_secondary};
`;

const StyledIcon = styled.div<IStyle>`
  & svg {
    margin-right: ${dimensions.xl};
    width: ${dimensions.xl_3};
    height: ${dimensions.base_2};
    filter: ${(props) =>
      JSON.parse(props.primary) ? 'invert(1)' : 'invert(0)'};
  }
`;

const TextInButton = styled.p<IStyle>`
  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${(props) =>
    JSON.parse(props.primary) ? colors.bg_secondary : colors.main_black};
`;

const NavbarItem: FC<IProps> = ({ icon, name, path, changeActiveTab }) => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const { userRole } = useAppSelector((state) => state.user);
  const { activeTab } = useAppSelector((state) => state.tabs);

  const handleLogout = () => {
    dispatch(logout());
    history('/');
    localStorage.clear();
  };

  return (
    <StyledLink
      primary={String(name === activeTab)}
      data-testid={name === activeTab ? 'navbar-active' : 'navbar-regular'}
      name={name}
      to={path}
      onClick={() => {
        if (name === NavbarItems.LOGOUT) return handleLogout();
        changeActiveTab(name);
      }}
    >
      <InsideButtonContainer>
        <StyledIcon primary={String(name === activeTab)}>{icon}</StyledIcon>
        <TextInButton primary={String(name === activeTab)}>
          {userRole === RolesTypes.READER
            ? t(`NavbarReader.${name}`)
            : t(`NavbarManager.${name}`)}
        </TextInButton>
      </InsideButtonContainer>
    </StyledLink>
  );
};

export default NavbarItem;
