import React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import DonateBook from '../components/DonateBook';

const Wrapper = styled.section``;

const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 3.5rem;
`;

const TitleInfo = styled.h1`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
`;

const SubTitle = styled.h3`
  font-weight: 300;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
`;

const DonateToLibrary = () => {
  return (
    <Wrapper>
      <WrapperInfo>
        <TitleInfo>
          Are you planning to donate something to the library?
        </TitleInfo>
        <SubTitle>
          Fill in the required* fields or try to scan the code
        </SubTitle>
      </WrapperInfo>
      <DonateBook />
    </Wrapper>
  );
};

export default DonateToLibrary;
