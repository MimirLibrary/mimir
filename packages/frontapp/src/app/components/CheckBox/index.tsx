import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC } from 'react';

const StyledCheckBox = styled.input`
  width: ${dimensions.xl_2};
  height: ${dimensions.xl_2};
  accent-color: ${colors.accent_color};
`;
interface ICheckBoxProps {
  name?: string;
  type?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
const CheckBox: FC<ICheckBoxProps> = ({
  name,
  type,
  disabled,
  checked,
  value,
  onChange,
  onMouseDown,
}) => {
  return (
    <StyledCheckBox
      name={name}
      value={value}
      type={type || 'checkbox'}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      onMouseDown={onMouseDown}
    />
  );
};
export default CheckBox;
