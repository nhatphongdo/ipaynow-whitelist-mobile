import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const MerchantsIcon = props => {
  const { width, height, start, end, offsets, colors, fill, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 34, height / 28);
  } else if (width) {
    ratio = width / 34;
  } else if (height) {
    ratio = height / 28;
  }
  return (
    <Svg width={34 * ratio} height={28 * ratio} {...others}>
      <Defs>
        <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
          {colors.map((color, index) => (
            <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      <G transform="translate(-1 -1)" fill="url(#prefix__a)" scale={ratio}>
        <G transform="translate(0 .615)">
          <Path
            fill={fill || "#FEA400"}
            fillOpacity=".3"
            d="M1.70065385,24.5843538 L32.2993462,24.5843538 C33.2382692,24.5843538 33.9993462,25.3454308 33.9993462,26.2843538 C33.9993462,27.2245846 33.2382692,27.9856615 32.2993462,27.9856615 L1.70065385,27.9856615 C0.760423077,27.9856615 -0.000653846154,27.2245846 -0.000653846154,26.2843538 C-0.000653846154,25.3454308 0.760423077,24.5843538 1.70065385,24.5843538 M16.9993462,7.58435385 C15.1228077,7.58435385 13.6006538,6.0622 13.6006538,4.18435385 C13.6006538,2.30650769 15.1228077,0.784353846 16.9993462,0.784353846 C18.8785,0.784353846 20.4006538,2.30650769 20.4006538,4.18435385 C20.4006538,6.0622 18.8785,7.58435385 16.9993462,7.58435385"
          />
        </G>
        <Path
          fill={fill || "#FEA400"}
          d="M32.2998692,21.8002615 C32.2998692,13.3499538 25.4501769,6.50026154 16.9998692,6.50026154 C8.55086923,6.50026154 1.70117692,13.3499538 1.70117692,21.8002615 L32.2998692,21.8002615 Z"
        />
      </G>
    </Svg>
  );
};

export default MerchantsIcon;
