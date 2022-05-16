import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSidebarStatus } from '../../store/slices/sidebarSlice';

const StyledBurgerOff = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    height: 2px;
    width: 30px;
    border-radius: 5px;
    background-color: blue;
    margin-bottom: -2px;
  }

  span:nth-child(1) {
    transform: rotate(-45deg);
  }

  span:nth-child(2) {
    transform: rotate(45deg);
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
