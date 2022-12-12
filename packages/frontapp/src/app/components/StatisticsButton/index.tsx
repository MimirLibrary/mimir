import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC, useState } from 'react';
import { ReactComponent as Statistic } from '../../../assets/Vector.svg';
import StatisticsModal from '../StatisticsModal';
import { RolesTypes } from '@mimir/global-types';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IProps {
  active: boolean;
}

const StyledStatisticsButton = styled.button<IProps>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  stroke: ${(props) => (props.active ? colors.accent_color : 'black')};
  display: none;

  @media (max-width: ${dimensions.tablet_width}) {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  } ;
`;

export const StatisticsButton: FC = () => {
  const { userRole } = useAppSelector((state) => state.user);
  const [active, setActive] = useState(false);
  return (
    <>
      <StyledStatisticsButton active={active} onClick={() => setActive(true)}>
        <Statistic />
      </StyledStatisticsButton>
      {userRole === RolesTypes.MANAGER ? (
        <StatisticsModal isActive={active} setIsActive={setActive} />
      ) : null}
    </>
  );
};
