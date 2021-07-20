import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

function ArrowForward(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <Circle cx={18} cy={18} r={18} fill={color ? color : '#BC2C3D'} />
      <Path
        d="M9.667 18.417v-.834c0-.23.186-.416.416-.416h13.475l-3.708-3.7a.416.416 0 010-.592l.592-.583a.416.416 0 01.591 0L26.15 17.4a.625.625 0 01.183.442v.316a.642.642 0 01-.183.442l-5.117 5.108a.416.416 0 01-.591 0l-.592-.591a.408.408 0 010-.584l3.708-3.7H10.083a.417.417 0 01-.416-.416z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ArrowForward;
