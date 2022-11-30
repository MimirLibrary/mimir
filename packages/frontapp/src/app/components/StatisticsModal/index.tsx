import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import Modal from '../Modal';
import { t } from 'i18next';
import Button from '../Button';
import { useGetAllMaterialsForManagerQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { StatusTypes } from '@mimir/global-types';

interface StatisticsModal {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${dimensions.base_2};
`;

const Title = styled.h1`
  align-self: flex-start;
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${dimensions.base};
`;

const PieChart = styled.figure<{
  free: number;
  claimed: number;
  overdue: number;
  pending: number;
}>`
  justify-self: center;
  background: radial-gradient(
      circle closest-side,
      ${colors.bg_secondary} 0,
      ${colors.bg_secondary} 55%,
      transparent 55%,
      transparent 100%
    ),
    conic-gradient(
      from 270deg,
      ${colors.main_green} 0,
      ${colors.main_green} ${(props) => props.free / 2}%,
      ${colors.accent_color} 0,
      ${colors.accent_color} ${(props) => props.free / 2 + props.claimed / 2}%,
      ${colors.problem_red} 0,
      ${colors.problem_red}
        ${(props) => props.free / 2 + props.claimed / 2 + props.overdue / 2}%,
      ${colors.gray_additional} 0,
      ${colors.gray_additional}
        ${(props) =>
          props.free / 2 +
          props.claimed / 2 +
          props.overdue / 2 +
          props.pending / 2}%,
      ${colors.bg_secondary} 0,
      ${colors.bg_secondary} 100%
    );
  width: 290px;
  height: 290px;
  border-radius: 50%;
  margin: 0;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-bottom: 3rem;
  }
`;

const LegendWrapper = styled.div`
  position: absolute;
  top: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${dimensions.xl_2};

  @media (max-width: ${dimensions.tablet_width}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${dimensions.xs_2};
    margin-left: 3.5rem;
  } ;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${dimensions.xs_2};
`;

const LegendColor = styled.div`
  width: ${dimensions.base};
  height: ${dimensions.base};
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const StatisticsModal: FC<StatisticsModal> = ({ isActive, setIsActive }) => {
  const locations = useAppSelector(locationIds);
  const { data, error } = useGetAllMaterialsForManagerQuery({
    variables: { locations },
    fetchPolicy: 'no-cache',
  });
  const bookItems = data?.getAllMaterials!.map((material) => {
    return { ...material, status: material?.statuses.slice(-1)[0] };
  });

  const NUMBER_OF_ALL_BOOKS =
    bookItems?.filter((item) => item.status?.status).length || 0;
  const NUMBER_OF_FREE_BOOKS =
    bookItems?.filter((item) => item?.status?.status === StatusTypes.FREE)
      .length || 0;
  const NUMBER_OF_CLAIMED_BOOKS =
    bookItems?.filter(
      (item) =>
        item?.status?.status === StatusTypes.BUSY ||
        item?.status?.status === StatusTypes.PROLONG
    ).length || 0;
  const NUMBER_OF_OVERDUE_BOOKS =
    bookItems?.filter((item) => item?.status?.status === StatusTypes.OVERDUE)
      .length || 0;
  const NUMBER_OF_PENDING_BOOKS =
    bookItems?.filter((item) => item?.status?.status === StatusTypes.PENDING)
      .length || 0;

  const STATISTICS = {
    free: Math.round((NUMBER_OF_FREE_BOOKS / NUMBER_OF_ALL_BOOKS) * 100),
    claimed: Math.round((NUMBER_OF_CLAIMED_BOOKS / NUMBER_OF_ALL_BOOKS) * 100),
    overdue: Math.round((NUMBER_OF_OVERDUE_BOOKS / NUMBER_OF_ALL_BOOKS) * 100),
    pending: Math.round((NUMBER_OF_PENDING_BOOKS / NUMBER_OF_ALL_BOOKS) * 100),
  };

  const closeModal = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Modal active={isActive} setActive={setIsActive}>
      <Wrapper>
        <Title>{t('Statistics.Title')}</Title>
        <PieChart
          free={STATISTICS.free}
          claimed={STATISTICS.claimed}
          overdue={STATISTICS.overdue}
          pending={STATISTICS.pending}
          data-testid="statistics-chart"
        ></PieChart>
        <LegendWrapper data-testid="statistics-legend">
          <LegendItem data-testid="statistics-free">
            <LegendColor color={colors.main_green}></LegendColor>
            <span>
              {t('Statuses.Free')} - {NUMBER_OF_FREE_BOOKS}
            </span>
          </LegendItem>
          <LegendItem data-testid="statistics-claimed">
            <LegendColor color={colors.accent_color}></LegendColor>
            <span>
              {t('Statuses.Claimed')} - {NUMBER_OF_CLAIMED_BOOKS}
            </span>
          </LegendItem>
          <LegendItem data-testid="statistics-overdue">
            <LegendColor color={colors.problem_red}></LegendColor>
            <span>
              {t('Statuses.Overdue')} - {NUMBER_OF_OVERDUE_BOOKS}
            </span>
          </LegendItem>
          <LegendItem data-testid="statistics-pending">
            <LegendColor color={colors.gray_additional}></LegendColor>
            <span>
              {t('Statuses.Pending')} - {NUMBER_OF_PENDING_BOOKS}
            </span>
          </LegendItem>
        </LegendWrapper>
        <ButtonsWrapper>
          <Button transparent value="Cancel" onClick={closeModal} />
          <Button value="Ok" onClick={closeModal} />
        </ButtonsWrapper>
      </Wrapper>
    </Modal>
  );
};

export default StatisticsModal;
