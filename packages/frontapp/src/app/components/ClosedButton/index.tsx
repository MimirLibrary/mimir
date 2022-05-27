import { Dispatch, FC, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const StyledClosedButton = styled.div`
  display: none;
  cursor: pointer;

  span {
    display: block;
    height: 0.125rem;
    width: ${dimensions.xl_3};
    border-radius: 0.3rem;
    background-color: ${colors.accent_color};
    margin-bottom: -0.125rem;
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

interface IProps {
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
}

const ClosedButton: FC<IProps> = ({ setSidebarActive }) => {
  const hideSidebar = () => {
    setSidebarActive(false);
  };

  return (
    <StyledClosedButton onClick={hideSidebar}>
      <span></span>
      <span></span>
    </StyledClosedButton>
  );
};

export default ClosedButton;
