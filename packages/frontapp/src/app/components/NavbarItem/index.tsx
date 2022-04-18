import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { colors, dimensions } from '@mimir/ui-kit';

interface IProps {
  icon: ReactElement;
  name: string;
  path: string;
  index: number;
  changeActiveTab: (index: number) => void;
}

interface IStyle {
  primary?: boolean;
}

const StyledLink = styled(Link)<IStyle>`
  background: ${(props) =>
    props.primary ? colors.accent_color : colors.bg_secondary};
  width: 16rem;
  height: 4rem;
  text-decoration: none;
  border-radius: 6.25rem;
  padding-left: ${dimensions.xl_2};
  padding-top: 0.25rem;
  margin-bottom: 0.12rem;

  :hover {
    background: #14168f;
    color: #ffffff;
  }

  :hover svg {
    fill: #ffffff;
  }

  :hover p {
    color: #ffffff;
  }

  :active {
    background: #07097b;
  }

  :active p {
    color: #ffffff;
  }
`;

const InsideButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 200px;
  width: 100%;
  color: #ffffff;
`;

const StyledIcon = styled.svg<IStyle>`

  margin-right: 10px;
  width: 32px;
  height: 32px;
  fill: ${(props) => (props.primary ? '#ffffff' : '#333333')};:
`;

const TextInButton = styled.p<IStyle>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.primary ? '#ffffff' : '#333333')};
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
      primary={index === activeTab}
      to={path}
      onClick={() => changeActiveTab(index)}
    >
      <InsideButtonContainer>
        <StyledIcon primary={index === activeTab}>{icon}</StyledIcon>
        <TextInButton primary={index === activeTab}>{name}</TextInButton>
      </InsideButtonContainer>
    </StyledLink>
  );
};

export default NavbarItem;
