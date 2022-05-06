import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const HomeIcon: React.FC<SvgIconProps> = ({
  style,
  color = Color.ACCENT_BLACK_100,
}) => {
  return (
    <Svg
      {...style}
      width={style?.width || 32}
      height={style?.height || 32}
      viewBox={style?.viewBox || '0 0 32 32'}
      fill={style?.fill || 'none'}>
      <Path
        fill={color}
        d="M15.612.214a1.01 1.01 0 00-1.242 0L0 11.419l1.243 1.572L3 11.621V24a2.004 2.004 0 002 2h20a2.004 2.004 0 002-2V11.63L28.757 13 30 11.428 15.612.214zM17 24h-4v-8h4v8zm2 0v-8a2.002 2.002 0 00-2-2h-4a2.002 2.002 0 00-2 2v8H5V10.062l10-7.79 10 7.8V24h-6z"
      />
    </Svg>
  );
};
