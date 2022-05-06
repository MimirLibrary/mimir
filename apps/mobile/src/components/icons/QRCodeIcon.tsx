import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const QRCodeIcon: React.FC<SvgIconProps> = ({
  style,
  color = Color.ACCENT_BLACK_100,
}) => {
  return (
    <Svg
      {...style}
      width={style?.width || 24}
      height={style?.height || 24}
      viewBox={style?.viewBox || '0 0 24 24'}
      fill={style?.fill || 'none'}>
      <Path
        fill={color}
        d="M12.38 3.88v7h7v-7h-7zm5.5 5.5h-4v-4h4v4zm-14 1.5h7v-7h-7v7zm1.5-5.5h4v4h-4v-4zm-1.5 14h7v-7h-7v7zm1.5-5.5h4v4h-4v-4zm7-1.5h1.75v1.75h-1.75v-1.75zm3.5 0h1.75v1.75h-1.75v-1.75zm-1.75 1.75h1.75v1.75h-1.75v-1.75zm3.5 0h1.75v1.75h-1.75v-1.75zm-5.25 1.75h1.75v1.75h-1.75v-1.75zm3.5 0h1.75v1.75h-1.75v-1.75zm-1.75 1.75h1.75v1.75h-1.75v-1.75zm3.5 0h1.75v1.75h-1.75v-1.75z"
      />
    </Svg>
  );
};
