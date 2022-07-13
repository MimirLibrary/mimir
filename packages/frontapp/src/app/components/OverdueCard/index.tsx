import React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

type WrapperProps = {
  background: string;
};

const Wrapper = styled.div<WrapperProps>`
  border-radius: ${dimensions.xs_1};
  background: ${(props) => props.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${dimensions.base};
`;
const WrapperInfo = styled.div``;

const Title = styled.h3``;

const TitleName = styled.h5`
  display: inline-block;
`;

const StyledTime = styled.span``;

const ButtonActive = styled.button``;

const OverdueCard = () => {
  return (
    <Wrapper background="white">
      <WrapperInfo>
        <Title>"Alice in Wonderland"</Title>
        <TitleName>Ivan Ivanov</TitleName>
        <StyledTime>3h ago</StyledTime>
      </WrapperInfo>
      <ButtonActive>Remind</ButtonActive>
    </Wrapper>
  );
};

export default OverdueCard;
