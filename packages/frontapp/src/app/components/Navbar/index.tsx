import { FC } from 'react';
import NavbarItem from '../NavbarItem';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { bottomNavSectionList, managerNavList, readerNavList } from './Items';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RolesTypes } from '@mimir/global-types';

interface IProps {
  hideSidebar: () => void;
}
const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavbarTopSubsectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavbarBottomSubsectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;

  @media (max-height: 747px) {
    position: static;
  }
`;

const Navbar: FC<IProps> = ({ hideSidebar }) => {
  const { userRole } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const changeActiveTab = (name: string) => {
    hideSidebar();
    dispatch(setActiveTab(name));
  };

  return (
    <NavbarWrapper data-testid="navbar">
      <NavbarTopSubsectionWrapper>
        {userRole === RolesTypes.READER
          ? readerNavList.map((item) => (
              <NavbarItem
                key={item.path}
                {...item}
                changeActiveTab={() => changeActiveTab(item.name)}
              />
            ))
          : managerNavList.map((item) => (
              <NavbarItem
                key={item.path}
                {...item}
                changeActiveTab={() => changeActiveTab(item.name)}
              />
            ))}
      </NavbarTopSubsectionWrapper>
      <NavbarBottomSubsectionWrapper>
        {bottomNavSectionList.map((item) => (
          <NavbarItem
            key={item.path}
            {...item}
            changeActiveTab={() => changeActiveTab(item.name)}
          />
        ))}
      </NavbarBottomSubsectionWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
