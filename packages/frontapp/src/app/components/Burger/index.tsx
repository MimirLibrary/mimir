import { Dispatch, FC, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface IProps {
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
}

const StyledBurger = styled.div`
  display: none;
  margin-top: ${dimensions.xl_2};
  cursor: pointer;

  @media (max-width: ${dimensions.tablet_width}) {
    display: block;
    transform: translateY(-50%);
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

const Burger: FC<IProps> = ({ setSidebarActive }) => {
  const showSidebar = () => {
    setSidebarActive(true);
  };
  return (
    <StyledBurger onClick={showSidebar}>
      <span></span>
      <span></span>
      <span></span>
    </StyledBurger>
  );
};

export default Burger;
