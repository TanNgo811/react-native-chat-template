import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function PhotoSquareOutline(props: SvgProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.25 4.583c0-1.012-.82-1.833-1.833-1.833H4.583c-1.012 0-1.833.82-1.833 1.833v12.834c0 1.012.82 1.833 1.833 1.833h12.834c1.012 0 1.833-.82 1.833-1.833V4.583zm-1.833 10.835a.458.458 0 01-.816.294l-3.667-4.584a.449.449 0 00-.357-.174.44.44 0 00-.358.174l-2.099 2.64a.44.44 0 01-.358.175.467.467 0 01-.366-.184l-.917-1.247a.495.495 0 00-.376-.183.467.467 0 00-.366.183l-2.329 3.19a.44.44 0 01-.366.184.449.449 0 01-.459-.458V4.582h12.834v10.835zm-7.334-6.71a1.375 1.375 0 11-2.75 0 1.375 1.375 0 012.75 0z"
        fill="#BC2C3D"
      />
    </Svg>
  );
}

export default PhotoSquareOutline;
