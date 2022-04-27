import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';

interface IProps {
  icon: ReactElement;
  name: string;
  path: string;
  index: number;
  changeActiveTab: (index: number) => void;
}

interface IStyle {
  primary: string;
}

const StyledLink = styled(Link)<IStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    JSON.parse(props.primary) ? colors.accent_color : colors.bg_secondary};
  width: 16rem;
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
    fill: ${colors.bg_secondary};
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
    margin-right: 10px;
    width: 32px;
    height: 32px;
    fill: ${(props) =>
      JSON.parse(props.primary) ? colors.bg_secondary : colors.main_black};
  }
`;

const TextInButton = styled.p<IStyle>`
  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${(props) =>
    JSON.parse(props.primary) ? colors.bg_secondary : colors.main_black};
`;

const NavbarItem: FC<IProps> = ({
  icon,
  name,
  path,
  index,
  changeActiveTab,
}) => {
  const { activeTab } = useAppSelector((state) => state.tabs);
  return (
    <StyledLink
      primary={String(index === activeTab)}
      to={path}
      onClick={() => changeActiveTab(index)}
    >
      <InsideButtonContainer>
        <StyledIcon primary={index === activeTab}>{icon}</StyledIcon>
        <TextInButton primary={index === activeTab}>
          {t(`Navbar.${name}`)}
        </TextInButton>
      </InsideButtonContainer>
    </StyledLink>
  );
};

export default NavbarItem;
