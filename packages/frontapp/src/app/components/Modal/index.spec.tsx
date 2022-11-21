import Modal from './index';
import { render } from '../../../helpers/customRender';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('modal-window', () => {
  it('should render', () => {
    render(<Modal active={true} setActive={jest.fn()} />);
    expect(screen.getByRole('document')).toBeInTheDocument();
  });
  it("shouldn't render", () => {
    render(<Modal active={false} setActive={jest.fn()} />);
    expect(screen.queryByRole('document')).not.toBeInTheDocument();
  });
  it('should close', () => {
    let active = true;

    const mockSetActive = jest.fn(() => {
      active = false;
    });

    render(<Modal active={active} setActive={mockSetActive} />);

    expect(screen.getByRole('document')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    mockSetActive();

    expect(screen.queryByRole('document')).not.toBeInTheDocument();
  });
});
