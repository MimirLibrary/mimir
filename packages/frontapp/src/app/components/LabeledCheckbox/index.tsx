import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC, useState } from 'react';

const Label = styled.label`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${colors.description_gray};
  color: ${colors.description_gray};
  border-radius: 100px;
  white-space: nowrap;
  padding: ${dimensions.xs_1} ${dimensions.base};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  @media (max-width: ${dimensions.phone_width}) {
    padding: ${dimensions.xs_2} ${dimensions.xs};
  }
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + label {
    border: 1px solid ${colors.accent_color};
    background-color: ${colors.bg_secondary};
    color: ${colors.accent_color};
  }

  &:disabled {
    cursor: auto;
    pointer-events: none;
  }

  &:disabled + label {
    cursor: auto;
    pointer-events: none;
  }
`;

interface ILabeledCheckbox {
  id: string;
  name: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const LabeledCheckbox: FC<ILabeledCheckbox> = ({
  id,
  value,
  name,
  disabled,
  checked,
  onChange,
  onMouseDown,
}) => {
  return (
    <div>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        id={id}
        value={value}
        onMouseDown={onMouseDown}
      />
      <Label htmlFor={id}>{name}</Label>
    </div>
  );
};

const LabeledCheckboxGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${dimensions.base};
  flex-wrap: wrap;
`;
interface ILabeledCheckboxGroup {
  orientation?: string;
  defaultValue: Array<string>;
  name: string;
  options: { name: string; value: string }[];
  onChange?: (value: Array<string>) => void;
  shouldReset?: boolean;
}

const LabeledCheckboxGroup: React.FC<ILabeledCheckboxGroup> = ({
  defaultValue,
  options,
  onChange,
}) => {
  const [checkedValues, setCheckedValues] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkedValues.some((value) => value === e.target.value)
      ? setCheckedValues((prev) =>
          prev?.filter((value) => value !== e.target.value)
        )
      : setCheckedValues((prev) => [...prev, e.target.value]);
    onChange && onChange(checkedValues);
  };

  return (
    <LabeledCheckboxGroupWrapper>
      {options?.map((option) => (
        <LabeledCheckbox
          id={option.value}
          name={option.name}
          value={option.value}
          key={option.value}
          checked={checkedValues.some((value) => value === option.value)}
          onChange={handleChange}
        />
      ))}
    </LabeledCheckboxGroupWrapper>
  );
};

export default LabeledCheckbox;
