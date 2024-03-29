import { fireEvent, screen } from '@testing-library/react';
import { render } from 'packages/frontapp/src/helpers/customRender';
import LabeledCheckbox from './index';

describe('Labeled Checkbox', () => {
  it('should render correct label with args', () => {
    render(<LabeledCheckbox id="1" name="example" value="example" />);
    expect(screen.getByLabelText('example')).toBeInTheDocument();
  });

  it('should be checked when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <LabeledCheckbox
        id="1"
        name="example"
        value="example"
        onChange={() => handleChange()}
      />
    );
    const input = container.querySelector('input');
    expect(input?.checked).toBe(false);
    input && fireEvent.click(input);
    expect(handleChange).toBeCalledTimes(1);
    expect(input?.checked).toBe(true);
  });
});
