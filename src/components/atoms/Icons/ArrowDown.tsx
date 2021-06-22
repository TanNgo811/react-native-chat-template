import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ArrowDown(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M7.667 1.333h.667c.184 0 .333.15.333.334v10.78l2.96-2.967a.333.333 0 01.473 0l.467.473a.333.333 0 010 .474L8.48 14.52a.5.5 0 01-.353.147h-.253a.513.513 0 01-.354-.147l-4.086-4.093a.333.333 0 010-.473l.473-.474a.327.327 0 01.467 0l2.96 2.967V1.667c0-.184.149-.334.333-.334z"
        fill={color ? color : '#fff'}
      />
    </Svg>
  );
}

export default ArrowDown;
