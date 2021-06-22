import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function CheckedRound(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.333a6.667 6.667 0 100 13.334A6.667 6.667 0 008 1.333zm0 2a4.667 4.667 0 110 9.334 4.667 4.667 0 010-9.334z"
        fill="#BC2C3D"
      />
    </Svg>
  );
}

export default CheckedRound;
