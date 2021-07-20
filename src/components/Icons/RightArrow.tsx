import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function RightArrow(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M5.164 13.173a.54.54 0 01-.054-.715l.054-.061L9.649 8 5.164 3.603a.54.54 0 01-.054-.714l.054-.062a.568.568 0 01.729-.053l.062.053 4.881 4.785a.54.54 0 01.054.715l-.054.061-4.88 4.785a.568.568 0 01-.792 0z"
        fill="#200E32"
      />
    </Svg>
  );
}

export default RightArrow;
