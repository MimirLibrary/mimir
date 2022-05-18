import { FC } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { colors, dimensions } from '@mimir/ui-kit';
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
  z-index: 1;
  padding-top: ${dimensions.xl_6};
  @media (max-width: ${dimensions.tablet_width}) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isSidebarVisible ? '0' : '-100%')};
    background: ${colors.bg_secondary};
    width: 90%;
    transition: all 0.8s;
    height: 100%;
  }
`;

const Sidebar: FC = () => {
  const { sidebarActive } = useAppSelector((state) => state.sidebar);
  return (
    <StyledSidebar isSidebarVisible={sidebarActive}>
      <Header />
      <Navbar />
    </StyledSidebar>
  );
};

export default Sidebar;
