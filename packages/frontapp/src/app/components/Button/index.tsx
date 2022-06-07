import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export interface IButtonProps {
  svgComponent?: JSX.Element;
  transparent?: boolean;
  value: string;
  onClick?: () => void;
}

const ButtonContainer = styled.div<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ transparent }) =>
    transparent ? colors.bg_secondary : colors.accent_color};
  border-radius: ${dimensions.xl_3};
  height: 3.125rem;
  width: 100%;
  border: 2px solid
    ${({ transparent }) => (transparent ? colors.accent_color : 'transparent')};

  svg {
    fill: ${({ transparent }) =>
      transparent ? colors.accent_color : colors.bg_secondary};
    height: auto;
    max-width: 18.5px;
    margin-right: ${dimensions.xs_1};
  }

  span {
    font-weight: 700;
    line-height: ${dimensions.xl};
    color: ${({ transparent }) =>
      transparent ? colors.accent_color : colors.bg_secondary};
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
