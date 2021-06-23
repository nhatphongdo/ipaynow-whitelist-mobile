import React from "react";
import Svg, { G, Path } from "react-native-svg";

const HomeIconDark = props => {
  const { width, height, start, end, offsets, colors, fill, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 26, height / 26);
  } else if (width) {
    ratio = width / 26;
  } else if (height) {
    ratio = height / 26;
  }
  return (
    <Svg width={26 * ratio} height={26 * ratio} {...others}>
      <G scale={ratio}>
        <Path
          fill={fill}
          fillOpacity=".3"
          d="M2.5998,0 L10.3998,0 C11.8358,0 12.9998,1.164 12.9998,2.6 L12.9998,13 C12.9998,14.436 11.8358,15.6 10.3998,15.6 L2.5998,15.6 C1.1638,15.6 -0.0002,14.436 -0.0002,13 L-0.0002,2.6 C-0.0002,1.164 1.1638,0 2.5998,0"
        />
        <G transform="translate(0 5)">
          <Path
            fill={fill}
            d="M20.8,13.2002 C22.236,13.2002 23.4,12.0362 23.4,10.5992 C23.4,9.1642 22.236,8.0002 20.8,8.0002 C19.364,8.0002 18.2,9.1642 18.2,10.5992 C18.2,12.0362 19.364,13.2002 20.8,13.2002 M2.6,0.2002 L23.4,0.2002 C24.836,0.2002 26,1.3642 26,2.8002 L26,18.4002 C26,19.8362 24.836,21.0002 23.4,21.0002 L2.6,21.0002 C1.164,21.0002 0,19.8362 0,18.4002 L0,2.8002 C0,1.3642 1.164,0.2002 2.6,0.2002"
          />
        </G>
      </G>
    </Svg>
  );
};

export default HomeIconDark;
