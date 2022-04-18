import React, { FC } from 'react';
import NavbarItem from '../NavbarItem';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { navbarItemsArray } from './Items';

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
