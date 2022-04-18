import React from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../redux/slices/tabsSlice';

const StyledSidebar = styled.div`
  width: 22.375rem;
`;

const Sidebar = () => {
  console.log('render');
  return (
    <StyledSidebar>
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
