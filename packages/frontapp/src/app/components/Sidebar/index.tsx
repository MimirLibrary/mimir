import { FC } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { colors, dimensions } from '@mimir/ui-kit';

interface IProps {
  isSidebarActive: boolean;
  hideSidebar: () => void;
}

interface IStyledSidebarProps {
  isSidebarActive: boolean;
}

const StyledSidebar = styled.aside<IStyledSidebarProps>`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 22rem;
  width: 100%;
  padding-top: ${dimensions.xl_2};
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
  @media (max-width: ${dimensions.tablet_width}) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isSidebarActive ? '0' : '-100%')};
    background: ${colors.bg_secondary};
    width: 90%;
    transition: all 0.8s;
    height: 100%;
    z-index: 1000;
  }
`;

const Sidebar: FC<IProps> = ({ isSidebarActive, hideSidebar }) => {
  return (
    <StyledSidebar isSidebarActive={isSidebarActive}>
      <Header hideSidebar={hideSidebar} />
      <Navbar hideSidebar={hideSidebar} />
    </StyledSidebar>
  );
};

export default Sidebar;
