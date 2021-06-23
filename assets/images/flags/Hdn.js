import React from "react";
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Image } from "react-native-svg";

const Hdn = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 256, height / 256);
  } else if (width) {
    ratio = width / 256;
  } else if (height) {
    ratio = height / 256;
  }
  return (
    <Svg width={256 * ratio} height={256 * ratio} {...others}>
      <Defs>
        <ClipPath id="prefix__a">
          <Circle cx={128} cy={128} r={128} fill="none" />
        </ClipPath>
        <RadialGradient id="prefix__b" cx={128} cy={128} r={128} gradientUnits="userSpaceOnUse">
          <Stop offset={0} stopColor="#130c0e" stopOpacity={0} />
          <Stop offset={0.613} stopColor="#130c0e" stopOpacity={0} />
          <Stop offset={0.805} stopColor="#130c0e" stopOpacity={0} />
          <Stop offset={0.93} stopColor="#130c0e" stopOpacity={0} />
          <Stop offset={1} stopColor="#130c0e" stopOpacity={0.1} />
        </RadialGradient>
      </Defs>
      <G clipPath="url(#prefix__a)" scale={ratio}>
        <Image x="15" y="15" width="227" height="227" preserveAspectRatio="xMidYMid slice" href={require("../hdn-coin.png")} />
      </G>
      <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
    </Svg>
  );
};

export default Hdn;
