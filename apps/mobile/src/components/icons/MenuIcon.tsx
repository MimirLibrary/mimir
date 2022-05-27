import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Color } from '../../config/designTokens';
import { SvgIconProps } from './types';

export const MenuIcon: React.FC<SvgIconProps> = ({
  style,
  color = Color.ACCENT_BLUE_100,
}) => {
  return (
    <Svg
      {...style}
      width={style?.width || 48}
      height={style?.height || 48}
      viewBox={style?.viewBox || '0 0 48 48'}
      fill={style?.fill || 'none'}
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
        d="M7.5 14.5L19.5 14.5"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
        d="M7.5 23.5h31"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
        d="M7.5 32.5L29.5 32.5"
      />
    </Svg>
  );
};
