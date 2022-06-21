import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export interface IButtonProps {
  svgComponent?: JSX.Element;
  transparent?: boolean;
  secondary?: boolean;
  value: string;
  onClick?: () => void;
}

const ButtonContainer = styled.div<IButtonProps>`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ transparent }) =>
    transparent ? colors.bg_secondary : colors.accent_color};
  border-radius: ${dimensions.xl_3};
  height: 3.125rem;
  width: 100%;
  border: 2px solid
    ${({ transparent, secondary }) =>
      transparent
        ? secondary
          ? colors.second_gray
          : colors.accent_color
        : colors.bg_secondary};

  &:hover {
    background-color: ${({ transparent }) =>
      transparent ? colors.bg_secondary : colors.hover_color};
    border: 2px solid
      ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};

    svg {
      fill: ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }

    span {
      color: ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }
  }

  &:active {
    background-color: ${({ transparent }) =>
      transparent ? colors.bg_secondary : colors.pressed_color};
    border: 2px solid
      ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};

    svg {
      fill: ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }

    span {
      color: ${({ transparent, secondary }) =>
        transparent
          ? secondary
            ? colors.main_gray
            : colors.hover_color
          : colors.bg_secondary};
    }
  }

  svg {
    fill: ${({ transparent, secondary }) =>
      transparent
        ? secondary
          ? colors.second_gray
          : colors.hover_color
        : colors.bg_secondary};
    height: auto;
    max-width: 18.5px;
    margin-right: ${dimensions.xs_1};
  }

  span {
    font-weight: 700;
    line-height: ${dimensions.xl};
    color: ${({ transparent, secondary }) =>
      transparent
        ? secondary
          ? colors.second_gray
          : colors.hover_color
        : colors.bg_secondary};
  }
`;

const Button: FC<IButtonProps> = (props) => {
  return (
    <ButtonContainer {...props} onClick={props.onClick}>
      {props.svgComponent}
      <span>{props.value}</span>
    </ButtonContainer>
  );
};

export default Button;
