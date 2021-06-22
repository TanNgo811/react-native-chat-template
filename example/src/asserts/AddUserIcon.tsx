import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

function AddUserIcon(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Circle cx={14} cy={14} r={14} fill="#898A8D" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.38 14.359c1.785 0 3.216-1.45 3.216-3.258 0-1.809-1.431-3.258-3.216-3.258-1.786 0-3.217 1.45-3.217 3.258s1.431 3.258 3.216 3.258zm0 1.595c-2.623 0-4.862.42-4.862 2.095 0 1.674 2.226 2.108 4.862 2.108 2.621 0 4.86-.419 4.86-2.094 0-1.675-2.225-2.109-4.86-2.109zm6.739-3.518h.78c.32 0 .582.266.582.591 0 .326-.261.591-.582.591h-.78v.763c0 .326-.261.591-.583.591a.588.588 0 01-.582-.59v-.764h-.779a.587.587 0 01-.582-.59c0-.326.26-.591.582-.591h.779v-.763c0-.325.261-.59.582-.59.322 0 .583.265.583.59v.763z"
        fill="#fff"
      />
    </Svg>
  );
}

export default AddUserIcon;
