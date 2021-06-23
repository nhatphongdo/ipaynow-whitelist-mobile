import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowUp = props => {
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
        d="M5.613.755L.481 5.883a1.628 1.628 0 0 0 .016 2.325.793.793 0 0 0 .181.148 1.662 1.662 0 0 0 2.176-.2l4.568-4.565 4.617 4.617a1.627 1.627 0 0 0 2.325-.016 1.805 1.805 0 0 0 .165-.179 1.664 1.664 0 0 0-.216-2.18L9.236.755a2.558 2.558 0 0 0-3.623 0z"
        fill={fill}
        scale={ratio}
      />
    </Svg>
  );
};

export default ArrowUp;
