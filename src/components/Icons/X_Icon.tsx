import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function X_Icon(props: SvgProps) {
  const { color } = props;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16 8l-8 8M8 8l8 8"
        stroke={color ? color : '#200E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default X_Icon;
