import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';

const NotFoundWindowWrapper = styled.div`
  background-color: ${colors.bg_secondary};
  margin: 30px 0 30px 0;
  max-width: 1015px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 25% 120px 25%;

  @media (max-width: ${dimensions.tablet_width}) {
    padding: 60px 0 80px 0;
  }
`;

const WarningMessage = styled.div`
  margin-bottom: 16px;
  font-family: ${fonts.secondary};
  font-style: normal;
  font-weight: 700;
  font-size: ${dimensions.base_2};
  line-height: 38px;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: ${dimensions.tablet_width}) {
    padding: 20px 16px 0 16px;
    font-size: ${dimensions.xl_2};
    line-height: 29px;
  }
`;

const BodyMessage = styled.div`
  margin-bottom: 16px;
  padding: 0 4% 0 4%;
  font-size: ${dimensions.base};
  font-weight: 300;
  line-height: 25px;
  text-align: center;
  color: ${colors.main_black};

  @media (max-width: ${dimensions.tablet_width}) {
    font-size: ${dimensions.sm};
    line-height: 18px;
    width: 100%;
    padding: 0 40px 0 40px;
  }
`;

const SvgIconWrapper = styled.div`
  width: 260px;
`;

interface INotFoundWindow {
  withButton?: JSX.Element;
  searchEntity?: string;
}
export const NotFoundWindow: FC<INotFoundWindow> = ({
  withButton,
  searchEntity,
}) => {
  return (
    <NotFoundWindowWrapper>
      <MessageContainer>
        <WarningMessage>
          We couldn't find any {searchEntity} for this search
        </WarningMessage>
        <BodyMessage>
          Please check your request for errors or search using a different name
        </BodyMessage>
        <SvgIconWrapper>{withButton}</SvgIconWrapper>
      </MessageContainer>
    </NotFoundWindowWrapper>
  );
};
