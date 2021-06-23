import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Polygon } from "react-native-svg";

const RatesIcon = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 22, height / 22);
  } else if (width) {
    ratio = width / 22;
  } else if (height) {
    ratio = height / 22;
  }
  return (
    <Svg width={22 * ratio} height={22 * ratio} {...others}>
      <Defs>
        <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
          {colors.map((color, index) => (
            <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      <G fill="none" scale={ratio}>
        <Polygon fill="#00B4FE" points=".458 4.125 11 .458 21.542 4.125" />
        <Polygon points="0 22 22 22 22 0 0 0" />
        <Polygon fill="#00B4FE" points="1.375 17.875 4.125 17.875 4.125 7.792 1.375 7.792" />
        <Polygon fill="#00B4FE" points="17.875 17.875 20.625 17.875 20.625 7.792 17.875 7.792" />
        <Polygon fill="#00B4FE" points="12.375 17.875 15.125 17.875 15.125 7.792 12.375 7.792" />
        <Polygon fill="#00B4FE" points="6.875 17.875 9.625 17.875 9.625 7.792 6.875 7.792" />
        <Polygon fill="#00B4FE" points=".458 21.542 21.542 21.542 21.542 19.708 .458 19.708" />
        <Polygon fill="#00B4FE" points=".458 5.958 21.542 5.958 21.542 4.125 .458 4.125" />
      </G>
    </Svg>
  );
};

export default RatesIcon;
