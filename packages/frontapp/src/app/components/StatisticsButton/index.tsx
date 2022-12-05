import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Statistic } from '../../../assets/Vector.svg';
import { RoutesTypes } from '../../../utils/routes';
import StatisticsModal from '../StatisticsModal';

interface IProps {
  active: boolean;
}

const StyledStatisticsButton = styled.button<IProps>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  stroke: ${(props) => (props.active ? colors.accent_color : 'black')};

  @media (max-width: ${dimensions.tablet_width}) {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  } ;
`;

export const StatisticsButton: FC = () => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  return (
    <>
      <StyledStatisticsButton active={active} onClick={() => setActive(true)}>
        <Statistic />
      </StyledStatisticsButton>
      {location.pathname === RoutesTypes.READERS ? (
        () => <></>
      ) : (
        <StatisticsModal isActive={active} setIsActive={setActive} />
      )}
    </>
  );
};
