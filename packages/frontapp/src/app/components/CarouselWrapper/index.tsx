import styled from '@emotion/styled';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper/react';
import ControlPanel from './ControlPanel';
import SliderButtons from './SliderButtons';

import 'swiper/css';

const CustomSwiper = styled(Swiper)`
  height: fit-content;
  min-height: 280px;
  width: 100%;
  position: relative;

  .swiper-wrapper {
    margin-top: 6rem;
  }

  .swiper-slide {
    display: flex;
    width: auto;
    min-height: 100%;
    height: auto;
  }
`;

const SwiperWrapper = styled.div`
  width: 100%;
`;

export interface ICarouselWrapperProps {
  slidesListLength?: number;
  header?: ReactNode;
  slides?: ReactNode;
}

const CarouselWrapper: FC<ICarouselWrapperProps> = ({
  slidesListLength = 0,
  header,
  slides,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const SLIDE_WIDTH = 224;
  const SLIDE_GAP = 32;

  useEffect(() => {
    if (containerRef.current) {
      setSlidesPerView(
        Math.ceil((containerRef.current.clientWidth + SLIDE_GAP) / SLIDE_WIDTH)
      );
    }
  }, [containerRef.current]);

  const shouldShowControls = slidesPerView < slidesListLength;

  return (
    <SwiperWrapper ref={containerRef}>
      <CustomSwiper slidesPerView={slidesPerView} spaceBetween={SLIDE_GAP}>
        <ControlPanel
          title={header}
          controlButtons={shouldShowControls && <SliderButtons />}
        />
        {slides}
      </CustomSwiper>
    </SwiperWrapper>
  );
};

export default CarouselWrapper;
