import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

export const Logo = (props: SvgProps) => (
  <Svg width={50} height={50} fill='none' {...props}>
    <Path
      d='M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 50C55.5228 50 60 45.5228 60 40C60 34.4772 55.5228 30 50 30C44.4772 30 40 34.4772 40 40C40 45.5228 44.4772 50 50 50Z'
      fill='#4CAF50'
    />
    <Path
      d='M40 40C40 34.4772 44.4772 30 50 30C55.5228 30 60 34.4772 60 40C60 45.5228 55.5228 50 50 50C44.4772 50 40 45.5228 40 40Z'
      fill='#4CAF50'
    />
  </Svg>
);
