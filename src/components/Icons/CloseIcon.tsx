import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function CloseIcon(props: SvgProps) {
  const { color } = props;

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.85 16.44a.5.5 0 010 .71l-.7.7a.5.5 0 01-.71 0L12 13.41l-4.44 4.44a.5.5 0 01-.71 0l-.7-.7a.5.5 0 010-.71L10.59 12 6.15 7.56a.5.5 0 010-.71l.7-.7a.5.5 0 01.71 0L12 10.59l4.44-4.44a.5.5 0 01.71 0l.7.7a.5.5 0 010 .71L13.41 12l4.44 4.44z"
        fill={color ? color : '#BC2C3D'}
      />
    </Svg>
  );
}

export default CloseIcon;
