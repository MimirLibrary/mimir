import { FC, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { createPortal } from 'react-dom';
import { ReactComponent as Cross } from '../../../assets/Close.svg';

interface IStyleProps {
  active: boolean;
}

export const WrapperModal = styled.div<IStyleProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.active ? '1' : '0')};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
  transition: 0.3s;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  @media (max-width: ${dimensions.tablet_width}) {
    padding-top: 5rem;
  }
  @media (max-width: ${dimensions.phone_width}) {
    height: 100%;
    align-items: flex-end;
  }
`;

const StyledCross = styled(Cross)`
  cursor: pointer;
  position: absolute;
  right: 4%;
  top: 2.6rem;
  @media (max-width: ${dimensions.phone_width}) {
    display: none;
  }
`;
export const ContentModal = styled.div<IStyleProps>`
  padding: ${dimensions.base_3};
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xl_10};
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0)')};
  transition: 0.4s all;
  max-width: ${dimensions.tablet_width};
  width: 100%;
  margin: auto;
  @media (max-width: ${dimensions.phone_width}) {
    max-height: 100%;
    padding: ${dimensions.xl} ${dimensions.xs_2};
    border-radius: ${dimensions.base_2} ${dimensions.base_2} 0 0;
    margin: 0;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
`;

export interface IPropsModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IPropsModal> = ({ active, setActive, children }) => {
  const element = useMemo(() => document.createElement('div'), []);

  const closeModalDarkPlace = () => {
    setActive(false);
  };

  useEffect(() => {
    const modalRootElement = document.querySelector('#modal');
    if (active) {
      document.body.style.overflow = 'hidden';
      modalRootElement?.appendChild(element);
      return () => {
        modalRootElement?.removeChild(element);
      };
    } else {
      document.body.style.overflow = '';
    }
    return;
  }, [active]);

  return createPortal(
    <WrapperModal active={active} onClick={closeModalDarkPlace} role="document">
      <ContentModal active={active} onClick={(e) => e.stopPropagation()}>
        {children}
        <StyledCross
          fill={`${colors.accent_color}`}
          width={43}
          height={43}
          onClick={() => setActive(false)}
          role="button"
        />
      </ContentModal>
    </WrapperModal>,
    element
  );
};

export default Modal;
