import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function LeftArrow(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M12.917 15.833L7.083 10l5.834-5.833"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LeftArrow;
