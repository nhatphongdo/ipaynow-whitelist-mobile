import React from "react";
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from "react-native-svg";

const Eth = props => {
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
        <Path fill="#f7931a" d="M252.16,159A128,128,0,1,1,159,3.84,128,128,0,0,1,252.16,159Z" />
        <Path
          fill="#fff"
          d="M184.45,109.76c2.55-17-10.42-26.19-28.16-32.3l5.76-23.07L148,50.89l-5.61,22.47c-3.69-.92-7.48-1.79-11.25-2.65l5.63-22.61-14-3.5L117,67.66l-28.33-7-3.73,15S95.35,78,95.13,78.18c5.69,1.42,6.72,5.19,6.54,8.17L85.91,149.56c-.7,1.73-2.46,4.32-6.43,3.33.14.2-10.21-2.56-10.21-2.56l-7,16.1,28.29,7.14-5.81,23.34,14,3.5,5.76-23.09c3.84,1,7.55,2,11.19,2.91l-5.74,23,14,3.5,5.81-23.3c23.95,4.53,42,2.71,49.54-18.94,6.11-17.44-.3-27.5-12.91-34.07,9.18-2.12,16.09-8.16,17.94-20.63m-32.09,45c-4.35,17.44-33.71,8-43.24,5.65l7.72-30.92c9.52,2.37,40.05,7.08,35.52,25.27m4.35-45.25c-4,15.87-28.4,7.8-36.33,5.83l7-28.06c7.94,2,33.47,5.68,29.34,22.22"
        />
      </G>
      <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
      <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
    </Svg>
  );
};

export default Eth;
