import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const SearchIcon: React.FC<SvgIconProps> = ({
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
        fillRule="evenodd"
        d="M15.652 2.667c7.16 0 12.984 5.824 12.984 12.984 0 3.378-1.297 6.459-3.418 8.771l4.174 4.166a.999.999 0 01-.706 1.708 1 1 0 01-.707-.292l-4.225-4.213a12.92 12.92 0 01-8.102 2.845c-7.16 0-12.986-5.825-12.986-12.985 0-7.16 5.826-12.984 12.986-12.984zm0 2c-6.058 0-10.986 4.926-10.986 10.984 0 6.057 4.928 10.985 10.986 10.985 6.056 0 10.984-4.928 10.984-10.985 0-6.058-4.928-10.984-10.984-10.984z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
