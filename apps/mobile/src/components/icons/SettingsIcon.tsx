import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Color} from '../../config/designTokens';
import {SvgIconProps} from './types';

export const SettingsIcon: React.FC<SvgIconProps> = ({
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
        d="M16.907 2c1.04 0 2.05.397 2.775 1.088.723.694 1.122 1.647 1.092 2.613.002.218.08.47.219.69.23.364.595.62 1.028.726.432.1.886.046 1.27-.166 1.859-.988 4.224-.396 5.285 1.32l.905 1.458c.023.04.043.077.06.117.962 1.69.32 3.818-1.466 4.79-.26.14-.47.334-.615.569a1.49 1.49 0 00-.175 1.193c.117.405.394.742.785.95.88.472 1.538 1.266 1.801 2.184.263.916.12 1.91-.393 2.73l-.964 1.495c-1.062 1.697-3.427 2.285-5.266 1.296a1.828 1.828 0 00-.81-.21h-.01c-.419 0-.85.167-1.164.457-.318.296-.492.69-.489 1.11-.01 1.985-1.745 3.59-3.868 3.59h-1.819c-2.133 0-3.868-1.613-3.868-3.599a1.38 1.38 0 00-.22-.718 1.67 1.67 0 00-1.021-.74 1.789 1.789 0 00-1.266.157 4.189 4.189 0 01-2.967.331c-.98-.258-1.826-.885-2.323-1.716l-.907-1.455c-1.061-1.714-.43-3.91 1.408-4.899.521-.28.845-.8.845-1.36s-.324-1.083-.845-1.362c-1.84-.995-2.47-3.196-1.41-4.91L3.5 8.225C4.546 6.531 6.912 5.934 8.758 6.92c.25.14.524.21.801.212.905 0 1.661-.694 1.676-1.548-.006-.942.393-1.846 1.12-2.529A3.983 3.983 0 0115.088 2h1.82zm0 2.027h-1.819c-.45 0-.871.163-1.19.458-.316.296-.488.69-.486 1.108-.03 1.976-1.765 3.566-3.866 3.566a3.959 3.959 0 01-1.886-.49c-.791-.418-1.825-.16-2.288.59l-.983 1.504c-.45.727-.174 1.688.627 2.122 1.19.64 1.931 1.835 1.931 3.116 0 1.28-.742 2.474-1.934 3.116-.797.43-1.073 1.385-.611 2.128l.916 1.47c.227.38.597.654 1.025.766.427.111.897.064 1.29-.139a4.032 4.032 0 011.92-.478c.333 0 .665.039.99.12.982.246 1.834.857 2.34 1.677.328.515.51 1.116.515 1.73 0 .878.758 1.582 1.69 1.582h1.82c.927 0 1.685-.7 1.69-1.563-.007-.954.394-1.861 1.127-2.544a3.945 3.945 0 012.744-1.05 4.18 4.18 0 011.862.479c.809.431 1.84.174 2.308-.569l.964-1.496c.215-.344.278-.777.163-1.175a1.577 1.577 0 00-.781-.95c-.897-.48-1.538-1.256-1.803-2.186a3.391 3.391 0 01.393-2.728 3.71 3.71 0 011.41-1.31c.787-.428 1.063-1.386.605-2.131a.743.743 0 01-.05-.094l-.851-1.373c-.463-.75-1.494-1.008-2.303-.58a4.045 4.045 0 01-2.912.375c-.998-.24-1.834-.828-2.355-1.658a3.273 3.273 0 01-.522-1.738 1.55 1.55 0 00-.478-1.18 1.76 1.76 0 00-1.212-.475zm-.903 7.397c2.71 0 4.916 2.054 4.916 4.577s-2.205 4.574-4.916 4.574c-2.71 0-4.916-2.051-4.916-4.574 0-2.523 2.205-4.577 4.916-4.577zm0 2.027c-1.51 0-2.738 1.144-2.738 2.55 0 1.405 1.228 2.547 2.738 2.547s2.738-1.142 2.738-2.547c0-1.406-1.228-2.55-2.738-2.55z"
      />
      <Path
        stroke={color}
        d="M16.907 2c1.04 0 2.05.397 2.775 1.088.723.694 1.122 1.647 1.092 2.613.002.218.08.47.219.69.23.364.595.62 1.028.726.432.1.886.046 1.27-.166 1.859-.988 4.224-.396 5.285 1.32l.905 1.458c.023.04.043.077.06.117.962 1.69.32 3.818-1.466 4.79-.26.14-.47.334-.615.569a1.49 1.49 0 00-.175 1.193c.117.405.394.742.785.95.88.472 1.538 1.266 1.801 2.184.263.916.12 1.91-.393 2.73l-.964 1.495c-1.062 1.697-3.427 2.285-5.266 1.296a1.828 1.828 0 00-.81-.21h-.01c-.419 0-.85.167-1.164.457-.318.296-.492.69-.489 1.11-.01 1.985-1.745 3.59-3.868 3.59h-1.819c-2.133 0-3.868-1.613-3.868-3.599a1.38 1.38 0 00-.22-.718 1.67 1.67 0 00-1.021-.74 1.789 1.789 0 00-1.266.157 4.189 4.189 0 01-2.967.331c-.98-.258-1.826-.885-2.323-1.716l-.907-1.455c-1.061-1.714-.43-3.91 1.408-4.899.521-.28.845-.8.845-1.36s-.324-1.083-.845-1.362c-1.84-.995-2.47-3.196-1.41-4.91L3.5 8.225C4.546 6.531 6.912 5.934 8.758 6.92c.25.14.524.21.801.212.905 0 1.661-.694 1.676-1.548-.006-.942.393-1.846 1.12-2.529A3.983 3.983 0 0115.088 2h1.82zm0 2.027h-1.819c-.45 0-.871.163-1.19.458-.316.296-.488.69-.486 1.108-.03 1.976-1.765 3.566-3.866 3.566a3.959 3.959 0 01-1.886-.49c-.791-.418-1.825-.16-2.288.59l-.983 1.504c-.45.727-.174 1.688.627 2.122 1.19.64 1.931 1.835 1.931 3.116 0 1.28-.742 2.474-1.934 3.116-.797.43-1.073 1.385-.611 2.128l.916 1.47c.227.38.597.654 1.025.766.427.111.897.064 1.29-.139a4.032 4.032 0 011.92-.478c.333 0 .665.039.99.12.982.246 1.834.857 2.34 1.677.328.515.51 1.116.515 1.73 0 .878.758 1.582 1.69 1.582h1.82c.927 0 1.685-.7 1.69-1.563-.007-.954.394-1.861 1.127-2.544a3.945 3.945 0 012.744-1.05 4.18 4.18 0 011.862.479c.809.431 1.84.174 2.308-.569l.964-1.496c.215-.344.278-.777.163-1.175a1.577 1.577 0 00-.781-.95c-.897-.48-1.538-1.256-1.803-2.186a3.391 3.391 0 01.393-2.728 3.71 3.71 0 011.41-1.31c.787-.428 1.063-1.386.605-2.131a.743.743 0 01-.05-.094l-.851-1.373c-.463-.75-1.494-1.008-2.303-.58a4.045 4.045 0 01-2.912.375c-.998-.24-1.834-.828-2.355-1.658a3.273 3.273 0 01-.522-1.738 1.55 1.55 0 00-.478-1.18 1.76 1.76 0 00-1.212-.475zm-.903 7.397c2.71 0 4.916 2.054 4.916 4.577s-2.205 4.574-4.916 4.574c-2.71 0-4.916-2.051-4.916-4.574 0-2.523 2.205-4.577 4.916-4.577zm0 2.027c-1.51 0-2.738 1.144-2.738 2.55 0 1.405 1.228 2.547 2.738 2.547s2.738-1.142 2.738-2.547c0-1.406-1.228-2.55-2.738-2.55z"
      />
    </Svg>
  );
};