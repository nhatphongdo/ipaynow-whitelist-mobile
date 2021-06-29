import React from "react";
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const NoEye = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 52, height / 48);
  } else if (width) {
    ratio = width / 52;
  } else if (height) {
    ratio = height / 48;
  }
  return (
    <Svg width={52 * ratio} height={48 * ratio} {...others}>
      <Defs>
        <Path id='prefix__b' d='M.084.874H8.75v7.133H.084z' />
        <Path id='prefix__d' d='M.087.132h12.994v12.993H.087z' />
      </Defs>
      <G fill='none' fillRule='evenodd' filter='url(#prefix__a)' transform='translate(-180 -97)' scale={ratio}>
        <G transform='translate(205 114.243)'>
          <Path fill='#81D8D0' d='M7.182.874A16.351 16.351 0 018.75 2.757S5.17 8.007.875 8.007c-.272 0-.535-.012-.79-.035L7.181.874z' />
        </G>
        <Path
          fill='#81D8D0'
          d='M208.067 112.183l-2.192 2.192A2.625 2.625 0 00203.25 117l-3.04 3.04C198.656 118.604 198 117 198 117s2.147-5.25 7.875-5.25c.758 0 1.494.163 2.192.433'
        />
        <G transform='translate(199.75 110.743)'>
          <Path fill='#81D8D0' fillOpacity={0.3} d='M.087 11.887L11.844.132l1.237 1.237L1.325 13.125z' />
        </G>
      </G>
    </Svg>
  )
};

export default NoEye;
