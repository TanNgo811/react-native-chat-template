import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function LeftBack(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color ? color : '#fff'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LeftBack;
