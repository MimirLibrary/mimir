import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC, Dispatch, SetStateAction } from 'react';
import Modal from '../Modal';
import { t } from 'i18next';
import Button from '../Button';

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

const PieChart = styled.figure`
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
      ${colors.main_green} 15%,
      ${colors.accent_color} 0,
      ${colors.accent_color} 45%,
      ${colors.problem_red} 0,
      ${colors.problem_red} 50%,
      ${colors.bg_secondary} 0,
      ${colors.bg_secondary} 100%
    );
  width: 290px;
  height: 290px;
  border-radius: 50%;
  margin: 0;
`;

const LegendWrapper = styled.div`
  position: absolute;
  top: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${dimensions.xl_2};
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
  return (
    <Modal active={isActive} setActive={setIsActive}>
      <Wrapper>
        <Title>{t('Statistics.Title')}</Title>
        <PieChart></PieChart>
        <LegendWrapper>
          <LegendItem>
            <LegendColor color={colors.main_green}></LegendColor>
            <span>On the shelf - 152</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color={colors.accent_color}></LegendColor>
            <span>Claimed - 152</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color={colors.problem_red}></LegendColor>
            <span>Overdue - 152</span>
          </LegendItem>
        </LegendWrapper>
        <ButtonsWrapper>
          <Button value="Ok" />
          <Button transparent value="Cancel" />
        </ButtonsWrapper>
      </Wrapper>
    </Modal>
  );
};

export default StatisticsModal;
