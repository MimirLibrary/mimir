import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as LogoSvg } from '../../assets/Mimir.svg';

const StartPageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${colors.light_gray};
  background-image: url('../../assets/bookshelf-pattern.png');
  @media (max-width: ${dimensions.phone_width}) {
    overflow: hidden;
    align-items: flex-end;
  }
`;

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 96%;
  background-color: ${colors.bg_secondary};
  border-radius: 1000px 1000px 0 0;
  box-shadow: ${colors.shadow};
  padding: 0 175px;
  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.sm};
    padding: 0 ${dimensions.base_2};
    margin: 0;
    height: 90%;
  }
`;

const Logo = styled(LogoSvg)`
  width: 12.5rem;
  height: 17.2rem;
`;

const WelcomeHeader = styled.h1`
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: ${dimensions.base_2};
  line-height: 2.6rem;
  color: ${colors.main_black};
  margin-top: ${dimensions.xs};
  margin-bottom: ${dimensions.base};
  text-align: center;
  max-width: 380px;
`;

const StartPageParagraph = styled.p`
  margin-top: 0;
  margin-bottom: ${dimensions.xl_3};
  font-weight: 300;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  text-align: center;

  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.lg};
  }
`;

interface GenericStartPageProps {
  children: React.ReactNode;
}

export const StartPageTemplate: FC<GenericStartPageProps> = ({ children }) => {
  return (
    <StartPageBackground>
      <StartPageContainer>
        <Logo />
        <WelcomeHeader>Welcome to the library MIMIR</WelcomeHeader>
        <StartPageParagraph>Simplify the process of claim</StartPageParagraph>
        {children}
      </StartPageContainer>
    </StartPageBackground>
  );
};
