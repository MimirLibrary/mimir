import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ChangeEvent, FC } from 'react';

const Label = styled.label`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${colors.description_gray};
  color: ${colors.description_gray};
  border-radius: 100px;
  white-space: nowrap;
  margin-bottom: ${dimensions.xs_2};
  padding: ${dimensions.xs_1} ${dimensions.base};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
  cursor: pointer;
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + label {
    border: 1px solid ${colors.accent_color};
    background-color: ${colors.bg_secondary};
    color: ${colors.accent_color};
    transition: all 0.2s;
  }
`;

interface ILabeledCheckbox {
  id: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledCheckbox: FC<ILabeledCheckbox> = ({
  id,
  value,
  disabled,
  checked,
  onChange,
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
      />
      <Label htmlFor={id}>{value}</Label>
    </div>
  );
};

export default LabeledCheckbox;
