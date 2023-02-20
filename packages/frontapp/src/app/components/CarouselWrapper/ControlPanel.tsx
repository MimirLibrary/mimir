import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { FC, ReactNode } from 'react';

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: ${dimensions.base_2};
  z-index: 2;
  padding: 0 ${dimensions.base};
`;

interface IControlPanelProps {
  title?: ReactNode;
  controlButtons?: ReactNode;
}

const ControlPanel: FC<IControlPanelProps> = ({ title, controlButtons }) => {
  return (
    <HeaderWrapper>
      {title}
      {controlButtons}
    </HeaderWrapper>
  );
};

export default ControlPanel;
