import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function CheckedIcon(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 8a6 6 0 1112 0A6 6 0 012 8zm5.238 2.01l3.372-3.372a.3.3 0 000-.414l-.318-.318a.3.3 0 00-.42 0L7.028 8.75l-.9-.894a.288.288 0 00-.42 0l-.318.318a.3.3 0 000 .426l1.428 1.41a.288.288 0 00.42 0z"
        fill={color ? color : '#898A8D'}
      />
    </Svg>
  );
}

export default CheckedIcon;
