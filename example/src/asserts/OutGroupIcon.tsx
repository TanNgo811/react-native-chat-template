import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function OutGroupIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.246 9.358a.642.642 0 00-.653.642c0 .35.288.642.653.642h5.087v3.983c0 2.042-1.687 3.708-3.773 3.708H5.431c-2.077 0-3.764-1.658-3.764-3.7V5.375c0-2.05 1.695-3.708 3.773-3.708h4.137c2.069 0 3.756 1.658 3.756 3.7v3.991H8.246zm8.112-2.241l2.434 2.425a.636.636 0 010 .908l-2.434 2.425a.646.646 0 01-.45.192.644.644 0 01-.458-1.1l1.334-1.325h-3.45V9.359h3.45L15.45 8.034a.644.644 0 010-.909.636.636 0 01.909-.008z"
        fill="#BC2C3D"
      />
    </Svg>
  );
}

export default OutGroupIcon;
