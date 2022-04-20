import React from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { dimensions } from '@mimir/ui-kit';

const StyledSidebar = styled.aside`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 22rem;
  width: 100%;
  padding-top: ${dimensions.xl_6};
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Header />
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
