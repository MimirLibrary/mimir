import { Dispatch, FC, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { colors, dimensions } from '@mimir/ui-kit';

interface IProps {
  isSidebarActive: boolean;
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
}

interface IStyledSidebarProps {
  isSidebarActive: boolean;
}

const StyledSidebar = styled.aside<IStyledSidebarProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 22rem;
  width: 100%;
  z-index: 1;
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
  }
`;

const Sidebar: FC<IProps> = ({ isSidebarActive, setSidebarActive }) => {
  return (
    <StyledSidebar isSidebarActive={isSidebarActive}>
      <Header setSidebarActive={setSidebarActive} />
      <Navbar setSidebarActive={setSidebarActive} />
    </StyledSidebar>
  );
};

export default Sidebar;
