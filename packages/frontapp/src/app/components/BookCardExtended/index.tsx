import React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import src from '../../../assets/MOC-data/BookImage.png';

const Wrapper = styled.div`
  background: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.xl_2};
  display: flex;
  max-width: 300px;
  width: 100%;
`;

const WrapperImg = styled.div`
  img {
    width: 72px;
    height: 115px;
  }
`;

const WrapperDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: ${dimensions.base};
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  margin-bottom: ${dimensions.base};
`;

const TitleGenre = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.description_gray};
  line-height: ${dimensions.base};
  margin-bottom: 0.25rem;
`;

const TitleState = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
`;

const TitleStatus = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
  margin-bottom: 0.25rem;
  span {
    text-decoration: underline;
    color: ${colors.accent_color};
  }
`;

const TitleClaimHistory = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
  margin-top: ${dimensions.xs_2};
  margin-bottom: 0.25rem;
`;

const HistoryBook = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
`;

const BookCardExtended = () => {
  return (
    <Wrapper>
      <WrapperImg>
        <img src={src} alt="book-img" />
      </WrapperImg>
      <WrapperDescription>
        <Title>Angela Carter’s Book of Fairy Tales</Title>
        <TitleGenre>Psychology / Morgan Housel</TitleGenre>
        <TitleState>State:</TitleState>
        <TitleStatus>
          Claim by<span> Maria Karol</span>
        </TitleStatus>
        <TitleClaimHistory>Claim history:</TitleClaimHistory>
        <HistoryBook>was claimed 17 times</HistoryBook>
      </WrapperDescription>
    </Wrapper>
  );
};

export default BookCardExtended;
