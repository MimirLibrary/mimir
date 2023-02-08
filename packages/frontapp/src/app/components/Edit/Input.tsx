import { FC } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.lg};
`;

export const Input: FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return <StyledInput {...props} />;
};
