import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';

const currentURL = window.location.href.split('/').slice(-1).join('');
console.log(currentURL);

const StyledNav = styled.nav`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NavButton = styled.button`
  border-radius: 6.25rem;
  border: none;
  width: 16.375rem;
  height: 4rem;
  cursor: pointer;

  :hover {
    background: #14168f;
    color: ${colors.accent_color};
  }

  :active {
    background: #07097b;
    color: ${colors.accent_color};
  }
`;

const StyledParagraph = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  transform: rotate(0.92deg);
`;

const Navbar: FC = () => {
  return (
    <StyledNav>
      <Link to="/home">
        <NavButton>
          <StyledParagraph>Home</StyledParagraph>
        </NavButton>
      </Link>
      <Link to="/search">
        <NavButton>Search</NavButton>
      </Link>
      <Link to="/history-of-claim">
        <NavButton>History of claim</NavButton>
      </Link>
      <Link to="/history-of-donate">
        <NavButton>History of donate</NavButton>
      </Link>
      <Link to="/settings">
        <NavButton>Settings</NavButton>
      </Link>
    </StyledNav>
  );
};

export default Navbar;
