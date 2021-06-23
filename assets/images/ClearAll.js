import React from "react";
import Svg, { G, Path } from "react-native-svg";

const ClearAll = props => {
  const { width, height, start, end, offsets, colors, fill, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 24, height / 24);
  } else if (width) {
    ratio = width / 24;
  } else if (height) {
    ratio = height / 24;
  }
  return (
    <Svg width={24 * ratio} height={24 * ratio} {...others}>
      <G fill="none" scale={ratio}>
        <Path
          fill="#FFF"
          d="M12.0000923,-9.23076923e-05 C18.6277846,-9.23076923e-05 24.0000923,5.37221538 24.0000923,11.9999077 C24.0000923,18.6276 18.6277846,23.9999077 12.0000923,23.9999077 C5.3724,23.9999077 9.23076923e-05,18.6276 9.23076923e-05,11.9999077 C9.23076923e-05,5.37221538 5.3724,-9.23076923e-05 12.0000923,-9.23076923e-05"
        />
        <Path
          d="M18.31.49a1.37,1.37,0,0,1,2-.16,1.37,1.37,0,0,1,.16,1.95L8.66,16.11a1.37,1.37,0,0,1-2,.14L.46,10.72A1.38,1.38,0,0,1,2.3,8.65l5.17,4.59Zm8,7.79H20.58a1.17,1.17,0,0,1,0-2.34H26.3a1.17,1.17,0,0,1,0,2.34m-2.94,4H17.65a1.17,1.17,0,1,1,0-2.34h5.71a1.17,1.17,0,1,1,0,2.34m-2.94,4H14.71a1.17,1.17,0,0,1,0-2.34h5.71a1.17,1.17,0,0,1,0,2.34"
          fill="#000"
          scale={0.6}
          transform="translate(5 10)"
        />
      </G>
    </Svg>
  );
};

export default ClearAll;
