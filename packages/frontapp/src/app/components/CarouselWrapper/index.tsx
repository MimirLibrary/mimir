import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import SliderButtons from './SliderButtons';

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 2rem;
  z-index: 2;
  padding: 0 ${dimensions.base};
`;

const CustomSwiper = styled(Swiper)`
  height: fit-content;
  min-height: 280px;
  width: 100%;
  position: relative;

  .swiper-wrapper {
    margin-top: 6rem;
  }

  .swiper-slide {
    width: auto;
  }
`;

interface ICarouselWrapperProps {
  header?: any;
  slides?: any;
}

const CarouselWrapper: FC<ICarouselWrapperProps> = ({ header, slides }) => {
  return (
    <CustomSwiper
      // autoHeight={true}
      // observer={true}
      // observeParents={true}
      breakpoints={{
        // when window width is >= 0px
        0: {
          slidesPerView: 3,
        },
        // when window width is >= 640px
        480: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 4,
        },
        1440: {
          slidesPerView: 5,
        },
      }}
    >
      <HeaderWrapper>{header}</HeaderWrapper>
      {/* <SliderButtons /> */}
      {slides}
    </CustomSwiper>
  );
};

export default CarouselWrapper;
