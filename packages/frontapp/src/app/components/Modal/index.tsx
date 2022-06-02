import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface IStyleProps {
  active: boolean;
}

const WrapperModal = styled.div<IStyleProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.active ? '1' : '0')};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
  transition: 0.3s;
`;

const ContentModal = styled.div<IStyleProps>`
  padding: ${dimensions.xl};
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xl_10};
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0)')};
  transition: 0.4s all;
`;

interface IPropsModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IPropsModal> = ({ active, setActive, children }) => {
  const closeModalDarkPlace = () => {
    setActive(false);
  };

  return (
    <WrapperModal active={active} onClick={closeModalDarkPlace}>
      <ContentModal active={active} onClick={(e) => e.stopPropagation()}>
        {children}
      </ContentModal>
    </WrapperModal>
  );
};

export default Modal;
