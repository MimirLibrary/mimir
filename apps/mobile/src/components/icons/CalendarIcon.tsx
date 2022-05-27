import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Color } from '../../config/designTokens';
import { SvgIconProps } from './types';

export const CalendarIcon: React.FC<SvgIconProps> = ({
  style,
  color = Color.ACCENT_BLACK_100,
}) => {
  return (
    <Svg
      {...style}
      width={style?.width || 16}
      height={style?.height || 16}
      viewBox={style?.viewBox || '0 0 16 16'}
      fill={style?.fill || 'none'}
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10.529.667a.5.5 0 01.5.5v.565c.974.066 1.782.4 2.354.973.625.628.954 1.53.95 2.612v6.082c0 2.22-1.41 3.6-3.68 3.6H5.014c-2.27 0-3.68-1.398-3.68-3.651V5.315c0-2.095 1.257-3.44 3.31-3.583v-.565a.5.5 0 011 0v.552h4.385v-.552a.5.5 0 01.5-.5zm2.804 5.936h-11v4.745c0 1.71.952 2.652 2.681 2.652h5.639c1.728 0 2.68-.924 2.68-2.601V6.603zm-2.532 4.194a.5.5 0 11-.503.5c0-.276.22-.5.497-.5h.006zm-2.959 0a.5.5 0 11-.502.5c0-.276.22-.5.496-.5h.006zm-2.964 0a.5.5 0 010 1 .503.503 0 01-.503-.5c0-.276.22-.5.497-.5h.006zm5.923-2.59a.5.5 0 11-.503.5c0-.277.22-.5.497-.5h.006zm-2.959 0a.5.5 0 11-.502.5c0-.277.22-.5.496-.5h.006zm-2.964 0a.5.5 0 010 1 .503.503 0 01-.503-.5c0-.277.22-.5.497-.5h.006zm5.15-5.488H5.644v.642a.5.5 0 01-1 0v-.627c-1.493.126-2.31 1.031-2.31 2.581v.287h11v-.287c.003-.823-.218-1.463-.658-1.903-.385-.387-.95-.618-1.645-.677l-.001.626a.5.5 0 01-1 0v-.642z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
