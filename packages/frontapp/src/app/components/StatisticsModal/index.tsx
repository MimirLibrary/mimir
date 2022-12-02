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
  align-self: center;
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
`;

const ButtonsWrapper = styled.div`
  flex-direction: column-reverse;
  bottom: 3rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${dimensions.xs_2};
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
  margin-bottom: -10rem;
  margin-top: -10px;
`;

const LegendWrapper = styled.div`
  display: flex;
  top: 18rem;
  align-items: center;
  justify-content: space-between;
  gap: ${dimensions.xl_2};
  margin-bottom: -10px;

  @media (max-width: ${dimensions.tablet_width}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: ${dimensions.base};
    margin-left: 2rem;
  } ;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${dimensions.xs_2};
`;

const LegendSubItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
`;

const LegendSubItemName = styled.div`
  font: ${colors.main_black};
  font-size: ${dimensions.sm};
  line-height: 16px;
`;

const LegendSubItemNumber = styled.div`
  font: ${colors.main_black};
  font-size: ${dimensions.xs};
  line-height: 16px;
`;

const LegendColor = styled.div`
  width: ${dimensions.base};
  height: ${dimensions.base};
  border-radius: 50%;
  flex-shrink: 0;
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
            <LegendSubItem>
              <LegendSubItemName>{t('Statuses.Free')}</LegendSubItemName>
              <LegendSubItemNumber>{NUMBER_OF_FREE_BOOKS}</LegendSubItemNumber>
            </LegendSubItem>
          </LegendItem>
          <LegendItem data-testid="statistics-claimed">
            <LegendColor color={colors.accent_color}></LegendColor>
            <LegendSubItem>
              <LegendSubItemName>{t('Statuses.Claimed')}</LegendSubItemName>
              <LegendSubItemNumber>
                {NUMBER_OF_CLAIMED_BOOKS}
              </LegendSubItemNumber>
            </LegendSubItem>
          </LegendItem>
          <LegendItem data-testid="statistics-overdue">
            <LegendColor color={colors.problem_red}></LegendColor>
            <LegendSubItem>
              <LegendSubItemName>{t('Statuses.Overdue')}</LegendSubItemName>
              <LegendSubItemNumber>
                {NUMBER_OF_OVERDUE_BOOKS}
              </LegendSubItemNumber>
            </LegendSubItem>
          </LegendItem>
          <LegendItem data-testid="statistics-pending">
            <LegendColor color={colors.gray_additional}></LegendColor>
            <LegendSubItem>
              <LegendSubItemName>{t('Statuses.Pending')}</LegendSubItemName>
              <LegendSubItemNumber>
                {NUMBER_OF_PENDING_BOOKS}
              </LegendSubItemNumber>
            </LegendSubItem>
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
