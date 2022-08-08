import React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { ReactComponent as CryingMimir } from '../../../assets/CryingMimir.svg';
import { WrapperInfo } from '../DonateBookFlow';
import { BookHolder } from '../BookInfo';
const StyledHeader = styled.h1`
  font-size: ${dimensions.base_3};
`;
const StyledSubHeader = styled.h2`
  margin-top: ${dimensions.base};
  font-weight: 300;
  font-size: ${dimensions.base};
`;
const StyledDiv = styled.div`
  flex: 1;
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
            <StyledHeader>OOOPS SORRY SOMETHING WENT WRONG!</StyledHeader>
            <StyledSubHeader>
              It seems the action failed. Please try again later
            </StyledSubHeader>
          </StyledDiv>
          <CryingMimir />
        </StyledWrapper>
      </BookHolder>
    </WrapperInfo>
  );
};

export default ErrorType500;
