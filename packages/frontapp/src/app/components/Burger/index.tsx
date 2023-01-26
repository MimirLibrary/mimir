import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface IProps {
  showSidebar: () => void;
}

const StyledBurger = styled.div`
  display: none;
  margin-top: ${dimensions.xl_2};
  margin-right: ${dimensions.xs_1};
  cursor: pointer;

  @media (max-width: ${dimensions.laptop_width}) {
    display: block;
    margin: 0;
    transform: translateY(0);

    span:nth-of-type(3) {
      margin-bottom: 0;
    }
  }

  span {
    display: block;
    height: 0.25rem;
    width: ${dimensions.xl_3};
    border-radius: 5px;
    background-color: ${colors.accent_color};
    margin-bottom: 5px;
  }

  span:nth-of-type(1) {
    width: ${dimensions.base};
  }

  span:nth-of-type(3) {
    width: ${dimensions.xl_2};
  }
`;

const Burger: FC<IProps> = ({ showSidebar }) => {
  return (
    <StyledBurger onClick={showSidebar}>
      <span></span>
      <span></span>
      <span></span>
    </StyledBurger>
  );
};

export default Burger;
