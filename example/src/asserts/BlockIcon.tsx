import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function BlockIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.113 1.333h5.78c2.26 0 3.774 1.586 3.774 3.946v5.448c0 2.353-1.514 3.94-3.774 3.94h-5.78c-2.26 0-3.78-1.587-3.78-3.94V5.279c0-2.36 1.52-3.946 3.78-3.946zm4.894 8.666a.579.579 0 000-.819L8.82 7.993l1.187-1.187a.587.587 0 000-.826.586.586 0 00-.827 0L8 7.166 6.813 5.98a.586.586 0 00-.826 0 .587.587 0 000 .826l1.186 1.187-1.186 1.18a.587.587 0 00.413 1c.153 0 .3-.06.413-.174L8 8.82 9.187 10c.113.12.26.173.406.173.154 0 .3-.06.414-.174z"
        fill="#200E32"
      />
    </Svg>
  );
}

export default BlockIcon;
