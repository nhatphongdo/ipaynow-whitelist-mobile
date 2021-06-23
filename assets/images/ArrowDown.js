import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowDown = props => {
  const { width, height, start, end, offsets, colors, fill, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 15, height / 9);
  } else if (width) {
    ratio = width / 15;
  } else if (height) {
    ratio = height / 9;
  }
  return (
    <Svg width={15 * ratio} height={9 * ratio} {...others}>
      <Path
        d="M5.613 7.934L.481 2.806A1.628 1.628 0 0 1 .497.481.793.793 0 0 1 .678.332a1.662 1.662 0 0 1 2.176.2l4.568 4.566L12.039.481a1.627 1.627 0 0 1 2.325.016 1.805 1.805 0 0 1 .165.181 1.664 1.664 0 0 1-.216 2.177L9.236 7.934a2.558 2.558 0 0 1-3.623 0z"
        fill={fill}
        scale={ratio}
      />
    </Svg>
  );
};

export default ArrowDown;
