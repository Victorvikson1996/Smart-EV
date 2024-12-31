import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

export const FlagNigeriaIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#009A49'
        d='M2.444 3.056A2.444 2.444 0 0 0 0 5.5v11a2.444 2.444 0 0 0 2.444 2.444h4.89V3.056h-4.89Z'
      />
      <Path fill='#EEE' d='M7.333 3.056h7.334v15.888H7.333V3.056Z' />
      <Path
        fill='#009A49'
        d='M19.555 3.056h-4.888v15.888h4.888A2.444 2.444 0 0 0 22 16.5v-11a2.444 2.444 0 0 0-2.445-2.444Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h22v22H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);
