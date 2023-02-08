import React, { FC } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

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

export const Textarea: FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return <StyledTextArea {...props} />;
};
