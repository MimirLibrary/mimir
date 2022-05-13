import { ReactComponent as Home } from '../../../assets/Home.svg';
import { ReactComponent as Search } from '../../../assets/Search.svg';
import { ReactComponent as Book } from '../../../assets/Book.svg';
import { ReactComponent as Donate } from '../../../assets/Donate.svg';
import { ReactComponent as Settings } from '../../../assets/Settings.svg';
import React from 'react';
import { RoutesTypes } from '../../../utils/routes';
import { NavbarItems } from '../../../utils/NavbarItems';

export const navReaderItemsArray = [
  { icon: <Home />, name: NavbarItems.HOME, path: RoutesTypes.HOME },
  { icon: <Search />, name: NavbarItems.SEARCH, path: RoutesTypes.SEARCH },
  {
    icon: <Book />,
    name: NavbarItems.HISTORY_OF_CLAIM,
    path: RoutesTypes.HISTORY_OF_CLAIM,
  },
  {
    icon: <Donate />,
    name: NavbarItems.HISTORY_OF_DONATE,
    path: RoutesTypes.HISTORY_OF_DONATE,
  },
  {
    icon: <Settings />,
    name: NavbarItems.SETTINGS,
    path: RoutesTypes.SETTINGS,
  },
];

export const navManagerItemsArray = [
  { icon: <Home />, name: NavbarItems.HOME, path: '/home' },
  { icon: <Search />, name: NavbarItems.READERS, path: RoutesTypes.READERS },
  {
    icon: <Book />,
    name: NavbarItems.BOOKS_STUFF,
    path: RoutesTypes.BOOKS_STUFF,
  },
  {
    icon: <Donate />,
    name: NavbarItems.DONATES_FROM_USER,
    path: RoutesTypes.DONATES_FROM_USER,
  },
  {
    icon: <Settings />,
    name: NavbarItems.CREATE_NEW_ITEM,
    path: RoutesTypes.CREATE_NEW_ITEM,
  },
];
