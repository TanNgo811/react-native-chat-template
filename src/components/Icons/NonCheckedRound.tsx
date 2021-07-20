import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function NonCheckedRound(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8 16A8 8 0 108 0a8 8 0 000 16zm0-1.333A6.667 6.667 0 118 1.333a6.667 6.667 0 010 13.334z"
        fill="#BC2C3D"
      />
    </Svg>
  );
}

export default NonCheckedRound;
