import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as ArrowIcon } from '../../../assets/ArrowUp2.svg';
import { BackSpan } from '../DonateBookFlow';
import { useNavigate } from 'react-router-dom';
import OverdueCard from '../OverdueCard';

const Wrapper = styled.main``;

const WrapperOverdueInstructions = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  line-height: ${dimensions.xl_3};
  font-size: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin: ${dimensions.xl_3} 0 ${dimensions.base} 0;
`;

const SubTitle = styled.h4`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const OverdueList: FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <WrapperOverdueInstructions>
        <BackSpan onClick={goBack}>
          <ArrowIcon /> Back
        </BackSpan>
        <Title>Overdues</Title>
        <SubTitle>The following users have not turned in their books</SubTitle>
      </WrapperOverdueInstructions>
      <OverdueCard />
    </Wrapper>
  );
};

export default OverdueList;
