import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const StoreIcon = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 30, height / 30);
  } else if (width) {
    ratio = width / 30;
  } else if (height) {
    ratio = height / 30;
  }
  return (
    <Svg width={30 * ratio} height={30 * ratio} {...others}>
      <Defs>
        <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
          {colors.map((color, index) => (
            <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      <G fill="#00E9BE" scale={ratio}>
        <Path
          fillOpacity=".3"
          d="M15.0003,4.59285 L8.6538,12.20985 C8.1228,12.84735 7.1763,12.93285 6.5388,12.40185 C5.9043,11.87235 5.8173,10.92735 6.3468,10.28985 L13.8468,1.28985 C14.4483,0.56985 15.5523,0.56985 16.1538,1.28985 L23.6538,10.28985 C24.1833,10.92735 24.0963,11.87235 23.4603,12.40185 C22.8243,12.93285 21.8778,12.84735 21.3468,12.20985 L15.0003,4.59285 Z"
        />
        <Path d="M15.0003,23.2506 C16.6563,23.2506 18.0003,21.9066 18.0003,20.2506 C18.0003,18.5946 16.6563,17.2506 15.0003,17.2506 C13.3443,17.2506 12.0003,18.5946 12.0003,20.2506 C12.0003,21.9066 13.3443,23.2506 15.0003,23.2506 M2.2503,11.2506 L27.7503,11.2506 C28.5783,11.2506 29.2503,11.9211 29.2503,12.7506 C29.2503,12.9486 29.2113,13.1451 29.1348,13.3266 L23.6553,26.4801 C22.9563,28.1571 21.3168,29.2506 19.5003,29.2506 L10.5003,29.2506 C8.6838,29.2506 7.0443,28.1571 6.3453,26.4801 L0.8658,13.3266 C0.5463,12.5616 0.9078,11.6841 1.6728,11.3646 C1.8558,11.2881 2.0523,11.2506 2.2503,11.2506" />
      </G>
    </Svg>
  );
};

export default StoreIcon;
