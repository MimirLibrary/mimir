import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const CloseIcon: React.FC<SvgIconProps> = ({
                                                   style,
                                                   color = Color.ACCENT_BLUE_100,
                                                 }) => {
  return (
    <Svg
      {...style}
      width={style?.width || 45}
      height={style?.height || 45}
      viewBox={style?.viewBox || '0 0 45 45'}
      fill={style?.fill || 'none'}>
      <Path
        d="M34.315 8.707a1 1 0 0 1 1.414 1.414L11.121 34.727a1 1 0 1 1-1.414-1.413L34.315 8.707Z"
        fill={color}
      />
      <Path
        d="M9.707 8.708a1 1 0 0 1 1.414 0L35.73 33.312a1 1 0 1 1-1.414 1.415L9.707 10.122a1 1 0 0 1 0-1.414Z"
        fill={color}
      />
    </Svg>
  );
};
