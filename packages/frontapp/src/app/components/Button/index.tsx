import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export interface IButtonProps {
  svgComponent?: JSX.Element;
  transparent?: boolean;
  value: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const ButtonContainer = styled.button<IButtonProps>`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ transparent }) =>
    transparent ? colors.bg_secondary : colors.accent_color};
  border-radius: ${dimensions.xl_3};
  height: ${dimensions.xl_10};
  width: 100%;
  border: 2px solid
    ${({ transparent }) => (transparent ? colors.accent_color : 'transparent')};

  &:hover {
    background-color: ${({ transparent }) =>
      transparent ? colors.bg_secondary : colors.hover_color};
    border: 2px solid
      ${({ transparent }) => (transparent ? colors.hover_color : 'transparent')};

    svg {
      fill: ${({ transparent }) =>
        transparent ? colors.hover_color : colors.bg_secondary};
    }

    span {
      color: ${({ transparent }) =>
        transparent ? colors.hover_color : colors.bg_secondary};
    }
  }

  &:active {
    background-color: ${({ transparent }) =>
      transparent ? colors.bg_secondary : colors.pressed_color};
    border: 2px solid
      ${({ transparent }) =>
        transparent ? colors.pressed_color : 'transparent'};

    svg {
      fill: ${({ transparent }) =>
        transparent ? colors.pressed_color : colors.bg_secondary};
    }

    span {
      color: ${({ transparent }) =>
        transparent ? colors.pressed_color : colors.bg_secondary};
    }
  }

  svg {
    fill: ${({ transparent }) =>
      transparent ? colors.accent_color : colors.bg_secondary};
    height: auto;
    max-width: 18.5px;
    margin-right: ${dimensions.xs_1};
  }

  span {
    font-size: ${dimensions.base};
    font-weight: 700;
    line-height: ${dimensions.xl};
    color: ${({ transparent }) =>
      transparent ? colors.accent_color : colors.bg_secondary};
  }
`;

const Button: FC<IButtonProps> = (props) => {
  return (
    <ButtonContainer
      {...props}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={props.disabled}
    >
      {props.svgComponent}
      <span>{props.value}</span>
    </ButtonContainer>
  );
};

export default Button;
