
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const UpArrowIcon: React.FC<SvgIconProps> = ({
                                                       style,
                                                       color = Color.ACCENT_BLUE_100,
                                                     }) => {
  return (
    <Svg
      {...style}
      width={style?.width || 25}
      height={style?.height || 25}
      viewBox={style?.viewBox || '0 0 25 25'}
      fill={style?.fill || 'none'}>
      <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 23.438a.781.781 0 0 0 .781-.781V4.23l4.916 4.917a.782.782 0 1 0 1.106-1.106l-6.25-6.25a.78.78 0 0 0-1.106 0l-6.25 6.25a.782.782 0 1 0 1.106 1.106L11.72 4.23v18.427a.781.781 0 0 0 .781.78Z"
          fill={color}
          />
    </Svg>
  );
};
