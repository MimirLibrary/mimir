import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import SliderButtons from './SliderButtons';

const HeaderWrapper = styled.header`
  display: flex;
  position: absolute;
  right: 0;
  top: -0.5rem;
`;

const CustomSwiper = styled(Swiper)`
  height: fit-content;
  min-height: 280px;
  width: 100%;
  position: relative;

  .swiper-slide {
    width: auto;
  }
`;

interface ICarouselWrapperProps {
  header?: ReactNode;
  slides?: ReactNode;
}

const CarouselWrapper: FC<ICarouselWrapperProps> = ({ children }) => {
  return (
    <CustomSwiper
      // autoHeight={true}
      // observer={true}
      // observeParents={true}
      breakpoints={{
        // when window width is >= 0px
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      <SliderButtons />
      {children}
    </CustomSwiper>
  );
};

export default CarouselWrapper;
