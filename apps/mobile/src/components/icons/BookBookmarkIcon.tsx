import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const BookBookmarkIcon: React.FC<SvgIconProps> = ({
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
        stroke={color}
        d="M26 3.5H9A3.512 3.512 0 005.5 7v21a.5.5 0 00.5.5h18a.5.5 0 000-1H6.5V27A2.512 2.512 0 019 24.5h17a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5zm-11.5 1h7V15l-3.2-2.4a.488.488 0 00-.6 0L14.5 15V4.5zm11 19H9a3.486 3.486 0 00-2.5 1.05V7A2.513 2.513 0 019 4.5h4.5V16a.525.525 0 00.275.45.5.5 0 00.525-.05l3.7-2.775 3.7 2.775a.537.537 0 00.3.1.487.487 0 00.225-.05.524.524 0 00.275-.45V4.5h3v19z"
      />
    </Svg>
  );
};
