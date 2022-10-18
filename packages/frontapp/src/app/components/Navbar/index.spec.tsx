import { render } from '../../../helpers/customRender';
import { act, screen } from '@testing-library/react';
import * as reactHooks from 'react-redux';
import { RolesTypes } from '@mimir/global-types';
import Navbar from './index';
import { bottomNavSectionList, managerNavList, readerNavList } from './Items';

jest.mock('react-redux');
jest.mock('i18next', () => ({
  t: (str: any) => str,
}));

describe('render Navbar component', () => {
  const numberOfReaderItems =
    readerNavList.length + bottomNavSectionList.length;
  const numberOfManagerItems =
    managerNavList.length + bottomNavSectionList.length;

  it('should be correct reader navbar', async () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.READER);
    const handleChangeSomeData = jest.fn();
    render(<Navbar hideSidebar={handleChangeSomeData} />);
    expect(screen.getByTestId('navbar-active')).toHaveTextContent('Home');
    expect(screen.getAllByRole('link').length).toEqual(numberOfReaderItems);
  });

  it('should be correct manager navbar', async () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.MANAGER);
    const handleChangeSomeData = jest.fn();
    render(<Navbar hideSidebar={handleChangeSomeData} />);
    expect(screen.getByTestId('navbar-active')).toHaveTextContent('Home');
    expect(screen.getAllByRole('link').length).toEqual(numberOfManagerItems);
  });

  it('should completely match a snapshot', () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.READER);
    const handleChangeSomeData = jest.fn();
    render(<Navbar hideSidebar={handleChangeSomeData} />);
    expect(screen.getByTestId('navbar')).toMatchSnapshot();
  });

  it('should change active tab properly', () => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.READER);
    const handleChangeSomeData = jest.fn();
    render(<Navbar hideSidebar={handleChangeSomeData} />);
    const libraryTab = document.querySelector('[data-testid="navbar-regular"]');
    expect(libraryTab).toHaveTextContent('Library');
    act(() => {
      libraryTab?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(libraryTab).toHaveAttribute('primary', 'true');
  });
});
