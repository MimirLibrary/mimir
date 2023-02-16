import React, { useEffect, useState } from 'react';
import { ReactComponent as ScrollButtonRight } from '../../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../../assets/ArrowButtonLeft.svg';
import { ButtonGroup } from '../../pages/BookPreview';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@mimir/ui-kit';
import { useSwiper } from 'swiper/react';

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

  circle,
  path {
    fill: gray;
  }
`;

export const TestRight = styled(ScrollButtonRight)<{ isDisabled?: boolean }>`
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  ${({ isDisabled }) =>
    isDisabled ? StyledSliderButtonDisabled : StyledSliderButtonActive}
`;
export const TestLeft = styled(ScrollButtonLeft)<{ isDisabled?: boolean }>`
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  ${({ isDisabled }) =>
    isDisabled ? StyledSliderButtonDisabled : StyledSliderButtonActive}
`;

const SliderButtons = () => {
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const swiper = useSwiper();
  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      // no `slides` in swipe
      console.log(swipe);
      setSlideConfig({ isBeginning: swipe.isBeginning, isEnd: swipe.isEnd });
    });
  }, [swiper]);
  return (
    <ButtonGroup>
      <TestLeft
        onClick={() => swiper.slidePrev()}
        isDisabled={slideConfig.isBeginning}
      />
      <TestRight
        onClick={() => swiper.slideNext()}
        isDisabled={slideConfig.isEnd}
      />
    </ButtonGroup>
  );
};

export default SliderButtons;
