import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

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
  margin-bottom: ${dimensions.xl_2};
`;

const WrapperInfo = styled.div``;

const Title = styled.h3`
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  font-weight: 400;
`;

const TitleName = styled.h5`
  display: inline-block;
  color: ${colors.problem_red};
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  margin-right: ${dimensions.base};
`;

const StyledTime = styled.span`
  color: ${colors.main_black};
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
`;

const ButtonActive = styled.button`
  color: ${colors.accent_color};
  font-weight: 500;
  font-size: ${dimensions.base};
  outline: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
  :hover {
    color: ${colors.hover_color};
  }
`;

interface IOverdueCard {
  backgroundColor: string;
}

const OverdueCard: FC<IOverdueCard> = ({
  backgroundColor = `${colors.bg_secondary}`,
}) => {
  return (
    <Wrapper background={backgroundColor}>
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
