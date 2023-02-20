import { FC, useEffect, useState } from 'react';
import { ReactComponent as ScrollButtonRight } from '../../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../../assets/ArrowButtonLeft.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, dimensions } from '@mimir/ui-kit';
import { useSwiper } from 'swiper/react';

const ButtonGroup = styled.div`
  display: flex;
  gap: ${dimensions.base};

  @media (max-width: ${dimensions.tablet_width}) {
    display: none;
  }
`;

const StyledSliderButtonActive = css`
  cursor: pointer;
  :hover {
    path {
      fill: white;
    }
    circle {
      fill: ${colors.accent_color};
    }
  }

  circle,
  path {
    transition: all 0.3s linear;
  }
`;

const StyledSliderButtonDisabled = css`
  cursor: pointer;

  circle {
    fill: ${colors.bg_gray};
  }
  path {
    fill: ${colors.main_gray};
  }
`;

export const ButtonNext = styled(ScrollButtonRight)<{ isDisabled?: boolean }>`
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  ${({ isDisabled }) =>
    isDisabled ? StyledSliderButtonDisabled : StyledSliderButtonActive}
`;
export const ButtonPrev = styled(ScrollButtonLeft)<{ isDisabled?: boolean }>`
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  ${({ isDisabled }) =>
    isDisabled ? StyledSliderButtonDisabled : StyledSliderButtonActive}
`;

const SliderButtons = () => {
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: false,
  });
  // the hook is not reactive
  const swiper = useSwiper();

  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      setSlideConfig({ isBeginning: swipe.isBeginning, isEnd: swipe.isEnd });
    });
  }, [swiper]);

  return (
    <ButtonGroup>
      <ButtonPrev
        role="button"
        onClick={() => swiper.slidePrev()}
        isDisabled={slideConfig.isBeginning}
      />
      <ButtonNext
        role="button"
        onClick={() => swiper.slideNext()}
        isDisabled={slideConfig.isEnd}
      />
    </ButtonGroup>
  );
};

export default SliderButtons;
