import { render } from 'packages/frontapp/src/helpers/customRender';
import { fireEvent, screen } from '@testing-library/react';
import { RadioButton, RadioGroup } from './index';

describe('Radio Group', () => {
  const options = [
    { name: 'UK', value: 'London' },
    { name: 'France', value: 'Paris' },
  ];

  it('should render correct label tags', () => {
    render(<RadioGroup name="city" options={options} />);

    expect(screen.getByLabelText('UK')).toBeInTheDocument();
    expect(screen.getByLabelText('France')).toBeInTheDocument();
  });

  it('should change the value when clicked on another button', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup
        name="city"
        defaultValue="London"
        options={options}
        onChange={handleChange}
      />
    );

    const firstInput = screen.getByDisplayValue('London') as HTMLInputElement;
    const secondInput = screen.getByDisplayValue('Paris') as HTMLInputElement;

    expect(firstInput).toBeChecked();
    expect(secondInput).not.toBeChecked();
    fireEvent.click(secondInput);
    expect(firstInput).not.toBeChecked();
    expect(secondInput).toBeChecked();
  });
});

describe('Radio Button', () => {
  it('should render correct label tag', () => {
    render(
      <RadioButton id="London" name="city" value="London" label="London" />
    );
    expect(screen.getByLabelText('London')).toBeInTheDocument();
  });

  it('should be checked when clicked', () => {
    const { container } = render(
      <RadioButton id="London" name="city" value="London" label="London" />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it('should be disabled', () => {
    const { container } = render(
      <RadioButton
        id="London"
        name="city"
        value="London"
        disabled
        label="London"
      />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
