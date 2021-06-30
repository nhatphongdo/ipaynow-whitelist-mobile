import React from "react";
import Svg, { G, Path } from "react-native-svg";

const Eye = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 21, height / 14);
  } else if (width) {
    ratio = width / 21;
  } else if (height) {
    ratio = height / 14;
  }
  return (
    <Svg width={21 * ratio} height={14 * ratio} {...others}>
      <G fill='none' fillRule='evenodd' scale={ratio}>
        <Path fill='#62C0B3' d='M0 7s2.864-7 10.5-7C16.227 0 21 7 21 7s-4.773 7-10.5 7C2.864 14 0 7 0 7' />
        <Path fill='#FFF' d='M10.5 10.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7' />
      </G>
    </Svg>
  )
};

export default Eye;
