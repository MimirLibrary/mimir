import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC } from 'react';

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
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const LabeledCheckbox: FC<ILabeledCheckbox> = ({
  id,
  value,
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
      <Label htmlFor={id}>{value}</Label>
    </div>
  );
};

export default LabeledCheckbox;
