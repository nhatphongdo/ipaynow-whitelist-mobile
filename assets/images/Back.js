import React from "react";
import Svg, { Defs, Circle, G, Use, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Back = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
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
      <Defs>
        <Circle id="prefix__b" cx={12} cy={12} r={12} />
      </Defs>
      <G fill="none" fillRule="evenodd" scale={ratio}>
        <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
        <Use fill="#FFF" xlinkHref="#prefix__b" />
        <Path
          fill="#000"
          d="M15.09 8.111a.734.734 0 10-1.038-1.038L9.644 11.48a.735.735 0 00-.022 1.016l4.04 4.408a.735.735 0 001.083-.993l-3.565-3.89 3.91-3.91z"
        />
      </G>
    </Svg>
  );
};

export default Back;
