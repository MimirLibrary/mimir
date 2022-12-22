import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const NotFoundWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bg_secondary};
  margin: 30px 0px 30px 0px;
  max-width: 1015px;
  width: 100%;
  height: 448px;
  border-radius: 10px;
  box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
`;

const WarningMessage = styled.div`
  width: 508px;
  height: 76px;
  margin-bottom: 16px;
  font-family: 'Bitter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  text-transform: uppercase;
`;

const BodyMessage = styled.div`
  margin-bottom: 16px;
  width: 508px;
  height: 50px;
  padding: 0 4% 0 4%;
  font-size: 16px;
  font-weight: 300;
  line-height: 25px;
  text-align: center;
  color: ${colors.main_black};
`;

const SvgIconWrapper = styled.div`
  width: 260px;
`;

interface INotFoundWindow {
  withButton?: JSX.Element;
}
export const NotFoundWindow: FC<INotFoundWindow> = ({ withButton }) => {
  return (
    <NotFoundWindowWrapper>
      <WarningMessage>We couldn't find any book for this search</WarningMessage>
      <BodyMessage>
        Please check your request for errors or search using a different name
      </BodyMessage>
      <SvgIconWrapper>{withButton}</SvgIconWrapper>
    </NotFoundWindowWrapper>
  );
};
