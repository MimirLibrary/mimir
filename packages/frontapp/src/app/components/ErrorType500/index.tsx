import React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { ReactComponent as CryingMimir } from '../../../assets/CryingMimir.svg';
import { WrapperInfo } from '../DonateBookFlow';
import { BookHolder } from '../BookInfo';
const StyledHeader = styled.h1`
  font-size: ${dimensions.xl_4};
`;
const StyledSubHeader = styled.h2`
  margin-top: ${dimensions.base};
  font-weight: 300;
  line-height: 1.5;
  font-size: ${dimensions.base};
`;
const StyledDiv = styled.div`
  width: 40rem;
`;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ErrorType500 = () => {
  return (
    <WrapperInfo>
      <BookHolder>
        <StyledWrapper>
          <StyledDiv>
            <StyledHeader>OOPS SORRY!</StyledHeader>
            <StyledHeader> SOMETHING WENT WRONG!</StyledHeader>
            <StyledSubHeader>
              It seems the action failed. Please try again later <br /> We will
              try to fix this error
            </StyledSubHeader>
          </StyledDiv>
          <CryingMimir />
        </StyledWrapper>
      </BookHolder>
    </WrapperInfo>
  );
};

export default ErrorType500;
