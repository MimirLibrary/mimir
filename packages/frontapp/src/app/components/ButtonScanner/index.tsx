import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as QrIcon } from '../../../assets/Qrcode.svg';

type IStyledButton = Omit<IButtonScanner, 'onClick'>;

interface IButtonScanner {
  width?: string;
  height?: string;
  margin?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const StyledButtonScanner = styled.button<IStyledButton>`
  width: ${(props) => props.width || `${dimensions.xl_6}`};
  height: ${(props) => props.height || `${dimensions.xl_6}`};
  margin: ${(props) => props.margin || `0`};
  border-radius: 50%;
  background: ${colors.accent_color};
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0 ${dimensions.xs_2};
  :hover {
    background-color: ${colors.hover_color};
  }
`;

const ButtonScanner: FC<IButtonScanner> = (props) => {
  return (
    <StyledButtonScanner {...props} onClick={props.onClick} type={props.type}>
      <QrIcon />
    </StyledButtonScanner>
  );
};

export default ButtonScanner;
