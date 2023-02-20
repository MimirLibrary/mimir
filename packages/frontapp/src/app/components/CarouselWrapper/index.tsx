import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import ControlPanel from './ControlPanel';
import SliderButtons from './SliderButtons';
import { useMediaQuery } from 'react-responsive';

import 'swiper/css';

const DESKTOP_SLIDES_PER_VIEW = 5;
const LAPTOP_SLIDES_PER_VIEW = 4;

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
  const isTabletOrWider = useMediaQuery({ minWidth: dimensions.tablet_width });
  const isLaptopOrWider = useMediaQuery({
    minWidth: dimensions.wide_laptop_width,
  });

  const isButtonNextDisabled = isLaptopOrWider
    ? slidesListLength <= DESKTOP_SLIDES_PER_VIEW
    : isTabletOrWider
    ? slidesListLength <= LAPTOP_SLIDES_PER_VIEW
    : false;

  return (
    <CustomSwiper
      // if width >= tablet_width
      breakpoints={{
        768: {
          slidesPerView: LAPTOP_SLIDES_PER_VIEW,
        },
        // if width >= wide_laptop_width
        1440: {
          slidesPerView: DESKTOP_SLIDES_PER_VIEW,
        },
      }}
    >
      <ControlPanel
        title={header}
        controlButtons={
          <SliderButtons isButtonNextDisabled={isButtonNextDisabled} />
        }
      />
      {slides}
    </CustomSwiper>
  );
};

export default CarouselWrapper;
