import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as CryingMimir } from '../../../assets/CryingMimir.svg';
import styled from '@emotion/styled';
import { ReactComponent as ArrowLeft } from '../../../assets/ArrowLeft.svg';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { RoutesTypes } from '../../../utils/routes';

const WrapperInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background: url('../../../assets/startpage-pattern.png');
  height: 100vh;
  justify-content: center;
  padding: 0 ${dimensions.base};
`;

const BookHolder = styled.div`
  max-width: 1140px;
  width: 100%;
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base_2};
  box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
  border-radius: ${dimensions.xs_1};
  height: 700px;
  display: flex;
  justify-content: center;
  position: relative;
  @media (max-width: ${dimensions.tablet_width}) {
    justify-content: start;
  }
`;

const Title = styled.h1`
  font-family: 'Bitter', sans-serif;
  font-weight: 500;
  font-size: ${dimensions.base_2};
  color: ${colors.main_black};
  line-height: 42px;
  position: absolute;
  top: 4rem;
`;
const StyledHeader = styled.h1`
  font-weight: 700;
  color: ${colors.main_black};
  line-height: 58px;
  font-size: ${dimensions.base_3};
  @media (max-width: ${dimensions.tablet_width}) {
    font-size: ${dimensions.base_2};
  }
`;
const StyledSubHeader = styled.h2`
  margin-top: ${dimensions.base};
  font-weight: 300;
  line-height: 1.5;
  font-size: ${dimensions.base};
`;
const StyledDiv = styled.div`
  max-width: 40rem;
  width: 100%;
`;
const StyledWrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: ${dimensions.base};
  max-width: 260px;
  width: 100%;
`;

const StyledCryingMimir = styled(CryingMimir)`
  @media (max-width: ${dimensions.phone_width}) {
    display: none;
  }
`;

const WrapperDesc = styled.div`
  width: 100%;
`;

interface IErrorTypeProps {
  clearErrors?: () => void;
}

const ErrorType500: FC<IErrorTypeProps> = ({ clearErrors }) => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    clearErrors && clearErrors();
    navigate(RoutesTypes.HOME);
  };

  return (
    <WrapperInfo>
      <BookHolder>
        <StyledWrapper>
          <WrapperDesc>
            <Title>MIMIR</Title>
            <StyledDiv>
              <StyledHeader>OOPS SORRY!</StyledHeader>
              <StyledHeader> SOMETHING WENT WRONG!</StyledHeader>
              <StyledSubHeader>
                It seems the action failed. Please try again later <br /> We
                will try to fix this error
              </StyledSubHeader>
              <StyledButton
                value="Go back home"
                onClick={redirectToHome}
                svgComponent={<ArrowLeft />}
              />
            </StyledDiv>
          </WrapperDesc>
          <StyledCryingMimir />
        </StyledWrapper>
      </BookHolder>
    </WrapperInfo>
  );
};

export default ErrorType500;
