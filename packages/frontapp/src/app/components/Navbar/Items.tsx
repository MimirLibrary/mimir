import { ReactComponent as Home } from '../../../assets/Navbar/Home.svg';
import { ReactComponent as Search } from '../../../assets/Navbar/Search.svg';
import { ReactComponent as Book } from '../../../assets/Navbar/Book.svg';
import { ReactComponent as Donate } from '../../../assets/Navbar/Donate.svg';
import { ReactComponent as Settings } from '../../../assets/Navbar/Settings.svg';
import { ReactComponent as Readers } from '../../../assets/Navbar/Readers.svg';
import { ReactComponent as Books } from '../../../assets/Navbar/Books.svg';
import { ReactComponent as DonateFromUser } from '../../../assets/Navbar/DonateFromUser.svg';
import { ReactComponent as Create } from '../../../assets/Navbar/Create.svg';
import { ReactComponent as DonateToLibrary } from '../../../assets/Navbar/DonateToLibrary.svg';
import { ReactComponent as Logout } from '../../../assets/Navbar/Logout.svg';
import { RoutesTypes } from '../../../utils/routes';
import { NavbarItems } from '../../../utils/NavbarItems';

export const navReaderItemsArray = [
  { icon: <Home />, name: NavbarItems.HOME, path: RoutesTypes.HOME },
  { icon: <Search />, name: NavbarItems.SEARCH, path: RoutesTypes.SEARCH },
  {
    icon: <DonateToLibrary />,
    name: NavbarItems.DONATE_TO_LIBRARY,
    path: RoutesTypes.DONATE_TO_LIBRARY,
  },
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
  {
    icon: <Logout />,
    name: NavbarItems.LOGOUT,
    path: '',
  },
];

export const navManagerItemsArray = [
  { icon: <Home />, name: NavbarItems.HOME, path: RoutesTypes.HOME },
  { icon: <Readers />, name: NavbarItems.READERS, path: RoutesTypes.READERS },
  {
    icon: <Books />,
    name: NavbarItems.BOOKS_STUFF,
    path: RoutesTypes.BOOKS_STUFF,
  },
  {
    icon: <DonateFromUser />,
    name: NavbarItems.DONATES_FROM_USER,
    path: RoutesTypes.DONATES_FROM_USER,
  },
  {
    icon: <Create />,
    name: NavbarItems.CREATE_NEW_ITEM,
    path: RoutesTypes.CREATE_NEW_ITEM,
  },
  {
    icon: <Settings />,
    name: NavbarItems.SETTINGS,
    path: RoutesTypes.SETTINGS,
  },
  {
    icon: <Logout />,
    name: NavbarItems.LOGOUT,
    path: '',
  },
];
