import React, { FC } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { dimensions } from '@mimir/ui-kit';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IProps {
  isSidebarVisible: boolean;
}

const StyledSidebar = styled.aside<IProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 22rem;
  width: 100%;
  z-index: 50;
  padding-top: ${dimensions.xl_6};
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isSidebarVisible ? '0' : '100%')};
    z-index: 50;
    background: white;
    width: 65%;
  }
`;

const Sidebar: FC = () => {
  const { isSidebarVisible } = useAppSelector((state) => state.sidebar);
  return (
    <StyledSidebar isSidebarVisible={isSidebarVisible}>
      <Header />
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
