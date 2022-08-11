import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  getDateOfEarlier,
  isOverdueToday,
} from '../../models/helperFunctions/converTime';
import { IOverdueItem } from '../../types';

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
  margin-bottom: ${dimensions.xs_2};
`;

const TitleName = styled.h5`
  display: inline-block;
  color: ${colors.problem_red};
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  margin-right: ${dimensions.base};
  margin-left: 0.2rem;
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
  item: IOverdueItem | null;
}

const OverdueCard: FC<IOverdueCard> = ({
  backgroundColor = `${colors.bg_secondary}`,
  item,
}) => {
  return (
    <Wrapper background={backgroundColor}>
      <WrapperInfo>
        <Title>"{item?.material.title}"</Title>
        <TitleName>{item?.person.username}</TitleName>
        {isOverdueToday(item?.created_at) ? null : (
          <StyledTime>{getDateOfEarlier(item?.created_at)}</StyledTime>
        )}
      </WrapperInfo>
      <ButtonActive>Remind</ButtonActive>
    </Wrapper>
  );
};

export default OverdueCard;
