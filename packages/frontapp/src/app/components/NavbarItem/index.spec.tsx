import { render } from '../../../helpers/customRender';
import { act, screen } from '@testing-library/react';
import * as reactHooks from 'react-redux';
import { RolesTypes } from '@mimir/global-types';
import NavbarItem from './index';
import { ReactComponent as Home } from '../../../assets/Navbar/Home.svg';
import { NavbarItems } from '../../../utils/NavbarItems';

jest.mock('react-redux');
jest.mock('i18next', () => ({
  t: (str: any) => str,
}));

const mockedStore = {
  user: {
    id: 0,
    isAuth: false,
    username: '',
    avatar: '',
    email: '',
    userRole: RolesTypes.READER,
    blocked: false,
    locations: [],
  },
  tabs: {
    activeTab: NavbarItems.HOME,
  },
};

describe('render NavbarItem component', () => {
  it('should be correct active navbar item', async () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(mockedStore);
    const handleChangeTab = jest.fn();
    render(
      <NavbarItem
        icon={<Home />}
        name="Home"
        path="/"
        changeActiveTab={handleChangeTab}
      />
    );
    expect(screen.getByTestId('navbar-active')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-active')).toHaveTextContent('Home');
    expect(screen.getByTestId('navbar-active')).toHaveAttribute(
      'primary',
      'true'
    );
  });

  it('should be correct inactive navbar item', async () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(mockedStore);
    const handleChangeTab = jest.fn();
    render(
      <NavbarItem
        icon={<Home />}
        name="Library"
        path="/"
        changeActiveTab={handleChangeTab}
      />
    );
    expect(screen.getByTestId('navbar-regular')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-regular')).toHaveTextContent('Library');
    expect(screen.getByTestId('navbar-regular')).toHaveAttribute(
      'primary',
      'false'
    );
  });

  it('should fire logout', () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(mockedStore);
    const handleChangeTab = jest.fn();
    const handleDispatch = jest.spyOn(reactHooks, 'useDispatch');
    render(
      <NavbarItem
        icon={<Home />}
        name="Logout"
        path="/"
        changeActiveTab={handleChangeTab}
      />
    );
    const button = screen.getByTestId('navbar-regular');
    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(handleDispatch).toBeCalledTimes(2);
  });

  it('should activate item', async () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(mockedStore);
    const handleChangeTab = jest.fn();
    render(
      <NavbarItem
        icon={<Home />}
        name="Library"
        path="/"
        changeActiveTab={handleChangeTab}
      />
    );
    const button = screen.getByTestId('navbar-regular');
    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(handleChangeTab).toBeCalledTimes(1);
  });
});
