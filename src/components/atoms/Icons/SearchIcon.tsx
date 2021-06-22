import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SearchIcon(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M9.063 15.625a6.562 6.562 0 100-13.125 6.562 6.562 0 000 13.125z"
        stroke={color ? color : '#979797'}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d="M13.75 13.75l3.75 3.75"
        stroke={color ? color : '#979797'}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SearchIcon;
