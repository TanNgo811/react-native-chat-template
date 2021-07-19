import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function GraySearchIcon(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.813 2.5a5.313 5.313 0 100 10.625 5.313 5.313 0 000-10.625zM0 7.813a7.813 7.813 0 1115.625 0A7.813 7.813 0 010 7.813z"
        fill={color ? color : '#898A8D'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.616 11.616a1.25 1.25 0 011.768 0l3.75 3.75a1.25 1.25 0 01-1.768 1.768l-3.75-3.75a1.25 1.25 0 010-1.768z"
        fill={color ? color : '#898A8D'}
      />
    </Svg>
  );
}

export default GraySearchIcon;
