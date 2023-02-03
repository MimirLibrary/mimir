import React, { FC } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

interface IInput {
  value?: string;
  handler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const StyledTextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  min-height: 10rem;
  resize: none;
  text-align: justify;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.lg};
`;

export const Textarea: FC<IInput> = ({ value, handler, placeholder }) => {
  return (
    <StyledTextArea
      value={value || ''}
      onChange={handler}
      placeholder={placeholder}
    />
  );
};
