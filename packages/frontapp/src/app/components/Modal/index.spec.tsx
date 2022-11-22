import Modal from './index';
import { render } from '../../../helpers/customRender';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

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
    const Wrapper = () => {
      const [active, setActive] = useState(true);
      return <Modal active={active} setActive={setActive} />;
    };

    render(<Wrapper />);
    expect(screen.getByRole('document')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('document')).not.toBeInTheDocument();
  });
});
