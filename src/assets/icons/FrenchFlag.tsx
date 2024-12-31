import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export const FlagFranceIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill='none' {...props}>
    <G clipPath='url(#clip)'>
      <Rect width={7.33} height={22} fill='#0055A4' />
      <Rect x={7.33} width={7.34} height={22} fill='#FFFFFF' />
      <Rect x={14.67} width={7.33} height={22} fill='#EF4135' />
    </G>
    <Defs>
      <ClipPath id='clip'>
        <Path fill='#fff' d='M0 0h22v22H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);
