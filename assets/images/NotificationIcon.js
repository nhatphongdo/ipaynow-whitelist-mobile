import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const NotificationIcon = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 31, height / 33);
  } else if (width) {
    ratio = width / 31;
  } else if (height) {
    ratio = height / 33;
  }
  return (
    <Svg width={31 * ratio} height={33 * ratio} {...others}>
      <Defs>
        <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
          {colors.map((color, index) => (
            <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      <G fill="#00B4FE" scale={ratio}>
        <Path d="M25.19,17.26h2.9c3.77-.06,3.78,5.8,0,5.75H2.91A2.89,2.89,0,0,1,0,20.13c0-3.11,3.6-3,5.81-2.87C6.47,10.88,6.35-.31,15.5,0,24.64-.31,24.55,10.89,25.19,17.26ZM15,25h0c5.19-.08,5.19,8.07,0,8s-5.19-8.08,0-8" />
      </G>
    </Svg>
  );
};

export default NotificationIcon;
