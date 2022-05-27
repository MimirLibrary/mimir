import React from 'react';
import Svg, { Path, G, Circle, Defs, ClipPath } from 'react-native-svg';
import { Color } from '../../config/designTokens';
import { SvgIconProps } from './types';

export const NotificationIcon: React.FC<SvgIconProps> = ({
  style,
  color = Color.ACCENT_BLACK_100,
}) => {
  return (
    <Svg
      {...style}
      width={style?.width || 32}
      height={style?.height || 32}
      viewBox={style?.viewBox || '0 0 32 32'}
      fill={style?.fill || 'none'}
    >
      <G clipPath="url(#clip0_331_1392)">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M13.766 26.808c.69.77 1.577 1.192 2.497 1.192h.001c.924 0 1.815-.423 2.507-1.193a1 1 0 011.487 1.338C19.18 29.341 17.763 30 16.264 30h-.002c-1.495-.001-2.91-.66-3.983-1.856a.998.998 0 01.075-1.41.997.997 0 011.412.074zm2.563-25.475c5.927 0 9.909 4.616 9.909 8.927 0 2.217.564 3.157 1.162 4.155.592.984 1.263 2.101 1.263 4.213-.465 5.396-6.099 5.836-12.334 5.836-6.234 0-11.869-.44-12.329-5.75-.004-2.198.667-3.315 1.259-4.3l.209-.351c.514-.885.953-1.847.953-3.803 0-4.31 3.982-8.927 9.909-8.927zm0 2c-4.66 0-7.908 3.651-7.908 6.927 0 2.772-.769 4.053-1.449 5.184-.545.908-.976 1.625-.976 3.184.223 2.515 1.883 3.836 10.333 3.836 8.404 0 10.116-1.38 10.338-3.923-.004-1.472-.435-2.189-.98-3.097-.68-1.13-1.45-2.412-1.45-5.184 0-3.276-3.247-6.927-7.907-6.927z"
          clipRule="evenodd"
        />
        <Circle cx="25" cy="7" r="5" fill={Color.TEXT_ERROR} />
      </G>
      <Defs>
        <ClipPath id="clip0_331_1392">
          <Path fill={color} d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
