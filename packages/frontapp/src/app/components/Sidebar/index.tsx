import React from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';

const StyledSidebar = styled.aside`
  width: 22rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
