import { ReactComponent as Home } from '../../../assets/Home.svg';
import { ReactComponent as Search } from '../../../assets/Search.svg';
import { ReactComponent as Book } from '../../../assets/Book.svg';
import { ReactComponent as Donate } from '../../../assets/Donate.svg';
import { ReactComponent as Settings } from '../../../assets/Settings.svg';
import React from 'react';

export const navbarItemsArray = [
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
