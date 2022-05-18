import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSidebarStatus } from '../../store/slices/sidebarSlice';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledBurgerOff = styled.div`
  display: none;

  span {
    display: block;
    height: 0.125rem;
    width: ${dimensions.xl_3};
    border-radius: 5px;
    background-color: ${colors.accent_color};
    margin-bottom: -2px;
  }

  span:nth-of-type(1) {
    transform: rotate(-45deg);
  }

  span:nth-of-type(2) {
    transform: rotate(45deg);
  }

  @media (max-width: ${dimensions.tablet_width}) {
    display: block;
  }
`;

const BurgerOff = () => {
  const dispatch = useAppDispatch();
  const hideSidebar = () => {
    dispatch(setSidebarStatus(false));
  };

  return (
    <StyledBurgerOff onClick={hideSidebar}>
      <span></span>
      <span></span>
    </StyledBurgerOff>
  );
};

export default BurgerOff;
