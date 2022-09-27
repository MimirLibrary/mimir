import '@testing-library/jest-dom';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import Dropdown from './index';

describe('Dropdown', () => {
  function getDropdown() {
    return screen.getByRole('listbox');
  }
  it('should render', () => {
    render(<Dropdown options={[{ value: 'x' }]} />);
    expect(getDropdown()).toHaveTextContent('Arrow.svg');
    expect(screen.queryByTestId('options')).toBeNull();
  });

  it('should render with placeholder', () => {
    render(<Dropdown placeholder="Holder" options={[{ value: 'x' }]} />);
    expect(screen.getByText('Holder')).toBeTruthy();
    expect(screen.queryByTestId('options')).toBeNull();
  });

  it('should open options when clicked', () => {
    render(<Dropdown options={[{ value: 'x' }]} />);
    const root = getDropdown();
    fireEvent.click(root);
    const optionsEl = screen.getByTestId('options');
    expect(getByRole(optionsEl, 'option')).toHaveTextContent('x');
  });

  it('should close options when clicked again', () => {
    render(<Dropdown options={[{ value: 'x' }]} />);
    const root = getDropdown();
    fireEvent.click(root);
    fireEvent.click(root);
    expect(screen.queryByTestId('options')).toBeNull();
  });

  it('should close options when clicked elsewhere', () => {
    render(<Dropdown options={[{ value: 'x' }]} />);
    const root = getDropdown();
    fireEvent.click(root);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('options')).toBeNull();
  });

  it('should set option using initIndex', () => {
    render(
      <Dropdown
        initIndex={1}
        options={[{ value: 'x' }, { value: 'y' }, { value: 'z' }]}
      />
    );
    expect(getDropdown()).toHaveTextContent('y');
  });

  it('should set option using value', () => {
    render(
      <Dropdown
        value="y"
        options={[{ value: 'x' }, { value: 'y' }, { value: 'z' }]}
      />
    );
    expect(getDropdown()).toHaveTextContent('y');
  });
});
