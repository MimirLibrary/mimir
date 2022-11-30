import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as Cross } from '../../../assets/Close.svg';

export const ModalBackground = styled.div<{ visible: boolean }>`
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
  opacity: ${(props) => (props.visible ? '1' : '0')};
  pointer-events: ${(props) => (props.visible ? 'all' : 'none')};
  transition: opacity 0.3s;
  transform: ${(props) => (props.visible ? 'scale(1)' : 'scale(0)')};

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    padding-top: 5rem;
  }
  @media (max-width: ${dimensions.phone_width}) {
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
export const ContentModal = styled.div`
  padding: ${dimensions.base_3};
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xl_10};
  transition: 0.4s all;
  max-width: ${dimensions.tablet_width};
  width: 100%;
  margin: auto;
  position: relative;
  @media (max-width: ${dimensions.phone_width}) {
    padding: ${dimensions.xl} ${dimensions.xs_2};
    border-radius: ${dimensions.base_2};
    margin: 0;
  }
`;

interface IPropsModal {
  visible: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IPropsModal> = ({ visible, setActive, children }) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <ModalBackground visible={visible} onClick={closeModal}>
      <ContentModal onClick={(e) => e.stopPropagation()}>
        {children}
        <StyledCross
          fill={`${colors.accent_color}`}
          width={43}
          height={43}
          onClick={closeModal}
        />
      </ContentModal>
    </ModalBackground>
  );
};

export default Modal;
