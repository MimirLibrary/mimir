import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export interface IButtonProps {
  svgComponent?: JSX.Element;
  invert?: boolean;
  transparent?: boolean;
  secondary?: boolean;
  warning?: boolean;
  value: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const ButtonContainer = styled.button<IButtonProps>`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ transparent, warning }) =>
    transparent
      ? colors.bg_secondary
      : warning
      ? colors.problem_red
      : colors.accent_color};
  border-radius: ${dimensions.xl_3};
  height: ${dimensions.xl_10};
  width: 100%;
  border: 2px solid
    ${({ transparent, secondary, warning }) =>
      transparent
        ? secondary
          ? colors.dropdown_gray
          : colors.accent_color
        : warning
        ? colors.problem_red
        : 'transparent'};

  &:hover {
    background-color: ${({ transparent, warning }) =>
      warning || transparent ? colors.bg_secondary : colors.hover_color};
    border: 2px solid
      ${({ transparent, secondary, warning }) =>
        warning
          ? colors.problem_red
          : transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : 'transparent'};

    svg {
      fill: ${({ transparent, secondary, warning }) =>
        warning
          ? colors.problem_red
          : transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }

    span {
      color: ${({ transparent, secondary, warning }) =>
        warning
          ? colors.problem_red
          : transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }
  }

  &:active {
    background-color: ${({ transparent, warning }) =>
      warning
        ? colors.problem_red
        : transparent
        ? colors.bg_secondary
        : colors.pressed_color};
    border: 2px solid
      ${({ transparent, secondary, warning }) =>
        transparent
          ? secondary
            ? warning
              ? colors.problem_red
              : colors.main_gray
            : colors.hover_color
          : 'transparent'};

    svg {
      fill: ${({ transparent, secondary, warning }) =>
        transparent
          ? secondary
            ? warning
              ? colors.bg_secondary
              : colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }

    span {
      color: ${({ transparent, secondary, warning }) =>
        transparent
          ? secondary
            ? warning
              ? colors.bg_secondary
              : colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }
  }

  &:disabled {
    background: ${colors.dropdown_gray};
    cursor: default;
  }

  svg {
    fill: ${({ transparent, secondary }) =>
      transparent
        ? secondary
          ? colors.dropdown_gray
          : colors.hover_color
        : colors.bg_secondary};
    height: auto;
    max-width: ${dimensions.xl_2};
  }

  span {
    font-size: ${dimensions.base};
    font-weight: 700;
    line-height: ${dimensions.xl};
    color: ${({ transparent, secondary }) =>
      transparent
        ? secondary
          ? colors.dropdown_gray
          : colors.hover_color
        : colors.bg_secondary};
    ${({ invert, svgComponent }) =>
      svgComponent
        ? invert
          ? `margin-right: ${dimensions.xs_1};`
          : `margin-left: ${dimensions.xs_1}`
        : ''}
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
      {props.invert ? (
        <>
          <span>{props.value}</span>
          {props.svgComponent}
        </>
      ) : (
        <>
          {props.svgComponent}
          <span>{props.value}</span>
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
