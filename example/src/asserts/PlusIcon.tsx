import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <Path
        d="M14.167 6.667H.833a.833.833 0 100 1.666h13.334a.833.833 0 000-1.666z"
        fill={color ? color : '#FFF'}
      />
      <Path
        d="M8.333 14.167V.833a.833.833 0 00-1.667 0v13.334a.833.833 0 001.667 0z"
        fill={color ? color : '#FFF'}
      />
    </Svg>
  );
}

export default PlusIcon;
