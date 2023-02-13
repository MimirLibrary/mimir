import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { FC } from 'react';

interface IProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 0.12rem;
  font-size: ${dimensions.base};

  @media (max-width: ${dimensions.tablet_width}) {
    margin-left: -${dimensions.xl};
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Input: FC<IProps> = ({
  value,
  onChange,
  type,
  placeholder,
  className,
  required,
  minLength,
  maxLength,
}) => {
  return (
    <StyledInput
      className={className}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

export default Input;
