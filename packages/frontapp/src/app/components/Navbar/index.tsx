import React, { FC } from 'react';
import NavbarItem from '../NavbarItem';
import { ReactComponent as Home } from '../../../assets/Home.svg';
import { ReactComponent as Search } from '../../../assets/Search.svg';
import { ReactComponent as Book } from '../../../assets/Book.svg';
import { ReactComponent as Donate } from '../../../assets/Donate.svg';
import { ReactComponent as Settings } from '../../../assets/Settings.svg';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../redux/slices/tabsSlice';

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const navbarItemsArray = [
  { icon: <Home />, name: 'Home', path: '/home' },
  { icon: <Search />, name: 'Search', path: '/search' },
  {
    icon: <Book />,
    name: 'History of claim',
    path: '/history-of-claim',
  },
  { icon: <Donate />, name: 'History of donate', path: '/history-of-donate' },
  { icon: <Settings />, name: 'Settings', path: '/settings' },
];

const Navbar: FC = () => {
  const dispatch = useAppDispatch();

  const changeActiveTab = (index: number) => {
    dispatch(setActiveTab(index));
  };

  return (
    <NavbarWrapper>
      {navbarItemsArray.map((item, index) => (
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
