import React, { FC } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

interface IInput {
  type?: string;
  value?: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.lg};
`;

export const Input: FC<IInput> = ({ type, value, handler, placeholder }) => {
  return (
    <StyledInput
      type={type ? type : 'text'}
      value={value || ''}
      onChange={handler}
      placeholder={placeholder}
    />
  );
};
