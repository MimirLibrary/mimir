import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const FilterIcon: React.FC<SvgIconProps> = ({
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.184 18.277c2.288 0 4.15 1.852 4.15 4.128s-1.862 4.128-4.15 4.128c-2.29 0-4.152-1.852-4.152-4.128s1.863-4.128 4.152-4.128Zm0 2c-1.187 0-2.152.955-2.152 2.128 0 1.175.965 2.128 2.152 2.128a2.14 2.14 0 0 0 2.15-2.128 2.141 2.141 0 0 0-2.15-2.128Zm-9.744 1.18a1 1 0 0 1 0 2h-8.4a1 1 0 0 1 0-2h8.4ZM8.15 5.333c2.29 0 4.151 1.853 4.151 4.13 0 2.275-1.861 4.126-4.15 4.126C5.863 13.589 4 11.739 4 9.462c0-2.276 1.863-4.129 4.15-4.129Zm0 2c-1.185 0-2.15.955-2.15 2.13 0 1.173.965 2.126 2.15 2.126 1.187 0 2.151-.953 2.151-2.127s-.964-2.129-2.15-2.129Zm17.438 1.2a1 1 0 0 1 0 2h-8.4a1 1 0 0 1 0-2h8.4Z"
          fill={color}
          />
    </Svg>
  );
};
