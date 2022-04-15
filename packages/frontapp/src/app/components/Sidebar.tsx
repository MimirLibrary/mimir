import React from 'react';
import styled from '@emotion/styled';
import Navbar from './Navbar';

const StyledSidebar = styled.div`
  width: 22.375rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
