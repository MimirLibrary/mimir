import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useEffect, useState } from 'react';

enum LabelPosition {
  Left = 'left',
  Right = 'right',
}

const RadioInput = styled.input`
  margin: 0;
  width: ${dimensions.base_2};
  height: ${dimensions.base_2};
  accent-color: ${colors.accent_color};
  cursor: pointer;

  &:disabled {
    cursor: auto;
    pointer-events: none;
  }

  &:disabled + label {
    cursor: auto;
    pointer-events: none;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${dimensions.xs_2};
`;

const Label = styled.label<{ labelPosition: string }>`
  font-weight: 300;
  cursor: pointer;
  order: ${({ labelPosition }) =>
    labelPosition === LabelPosition.Left
      ? -1
      : labelPosition === LabelPosition.Right
      ? 1
      : 0};
`;

interface IRadioButton {
  id?: string;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  value: string;
  labelPosition?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RadioButton: React.FC<IRadioButton> = ({
  id,
  name,
  disabled,
  checked,
  label,
  value,
  onChange,
  labelPosition = LabelPosition.Right,
}) => {
  return (
    <RadioWrapper>
      <RadioInput
        id={id}
        name={name}
        value={value}
        type="radio"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Label labelPosition={labelPosition} htmlFor={id}>
        {label}
      </Label>
    </RadioWrapper>
  );
};

enum RadioGroupOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

const RadioGroupWrapper = styled.div<{ orientation: string }>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === RadioGroupOrientation.Horizontal ? 'row' : 'column'};
  align-items: center;
  gap: ${dimensions.base};
  flex-wrap: wrap;
`;

interface IRadioGroup {
  orientation?: string;
  defaultValue?: string;
  name: string;
  options: { name: string; value: string }[];
  onChange?: (value: string) => void;
  reset?: boolean;
}

export const RadioGroup: React.FC<IRadioGroup> = ({
  name,
  options,
  onChange,
  orientation = 'horizontal',
  defaultValue = '',
  reset,
}) => {
  const [checkedValue, setCheckedValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  useEffect(() => {
    reset && setCheckedValue(defaultValue);
  }, [reset, defaultValue]);

  return (
    <RadioGroupWrapper orientation={orientation}>
      {options?.map((option) => (
        <RadioButton
          id={option.value}
          key={option.value}
          checked={checkedValue === option.value}
          name={name}
          value={option.value}
          label={option.name}
          onChange={handleChange}
        />
      ))}
    </RadioGroupWrapper>
  );
};
