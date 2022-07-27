import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';

interface IPropsLoader {
  height: number;
  width: number;
  color: string;
  secondaryColor?: string;
  strokeWidth?: number;
}

const Loader: FC<IPropsLoader> = ({
  color,
  secondaryColor,
  height,
  strokeWidth,
  width,
}) => {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={height}
      width={width}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={1}
      color={color || 'blue'}
      secondaryColor={secondaryColor || 'white'}
    />
  );
};

export default Loader;
