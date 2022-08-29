import { FC, Dispatch, SetStateAction } from 'react';
import NavbarItem from '../NavbarItem';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { navManagerItemsArray, navReaderItemsArray } from './Items';
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

const Navbar: FC<IProps> = ({ hideSidebar }) => {
  const { userRole } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const changeActiveTab = (index: number) => {
    hideSidebar();
    dispatch(setActiveTab(index));
  };

  return (
    <NavbarWrapper>
      {userRole === RolesTypes.READER
        ? navReaderItemsArray.map((item, index) => (
            <NavbarItem
              key={item.path}
              {...item}
              index={index}
              changeActiveTab={() => changeActiveTab(index)}
            />
          ))
        : navManagerItemsArray.map((item, index) => (
            <NavbarItem
              key={item.path}
              {...item}
              index={index}
              changeActiveTab={() => changeActiveTab(index)}
            />
          ))}
    </NavbarWrapper>
  );
};

export default Navbar;
