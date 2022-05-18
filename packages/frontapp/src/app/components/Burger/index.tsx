import { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSidebarStatus } from '../../store/slices/sidebarSlice';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledBurger = styled.div`
  display: none;
  margin-top: ${dimensions.xl_2};

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

const Burger: FC = () => {
  const dispatch = useAppDispatch();
  const showSidebar = () => {
    dispatch(setSidebarStatus(true));
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
