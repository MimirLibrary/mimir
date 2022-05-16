import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setSidebarStatus } from '../../store/slices/sidebarSlice';

const StyledBurger = styled.div`
  display: none;
  margin-top: 25px;

  @media (max-width: 768px) {
    display: block;
    transform: translateY(-50%);
  }

  span {
    display: block;
    height: 4px;
    width: 30px;
    border-radius: 5px;
    background-color: blue;
    margin-bottom: 5px;
  }

  span:nth-child(1) {
    width: 15px;
  }

  span:nth-child(3) {
    width: 25px;
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
