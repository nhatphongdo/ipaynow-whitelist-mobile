import React from "react";
import Svg, { G, Path } from "react-native-svg";

const ProfileIconLight = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 24, height / 31);
  } else if (width) {
    ratio = width / 24;
  } else if (height) {
    ratio = height / 31;
  }
  return (
    <Svg width={24 * ratio} height={31 * ratio} {...others}>
      <G data-name="Group 2202" scale={ratio}>
        <Path
          data-name="Path 1415"
          d="M18.503 9.922L9.351 7.054 4.53 11.76a7.282 7.282 0 0 0 13.974-1.838z"
          fill="#fff"
        />
        <Path
          data-name="Path 1416"
          d="M9.371 5.252L18.5 8.113a7.286 7.286 0 0 0-14.516.9 7.44 7.44 0 0 0 .048.814l4.476-4.37a.859.859 0 0 1 .863-.205z"
          fill="#b9cfed"
        />
        <Path
          data-name="Path 1417"
          d="M11.663 18.033a9.887 9.887 0 0 0-9.933 9.57v1.336h19.868v-1.336a9.888 9.888 0 0 0-9.935-9.57z"
          fill="#075aaa"
        />
        <Path
          data-name="Path 1418"
          d="M0 28.939c0-8.638 5.183-12.094 11.23-12.094 5.183 0 8.987 1.753 10.892 5.883a12.116 12.116 0 0 1 .8 2.383 17.136 17.136 0 0 1 .4 3.828 1.727 1.727 0 0 1-1.728 1.728H1.728A1.727 1.727 0 0 1 0 28.939z"
          fill="#b1b9c2"
        />
        <Path
          data-name="Path 1419"
          d="M22.125 22.726a11.875 11.875 0 0 0-6.621-5.752 9.023 9.023 0 1 0-8.124.161 11.867 11.867 0 0 0-6.177 5.592M3.987 9.014a7.286 7.286 0 0 1 14.516-.9L9.374 5.253a.859.859 0 0 0-.862.206l-4.476 4.37a7.44 7.44 0 0 1-.049-.816zm.542 2.747L9.35 7.055l9.152 2.868a7.282 7.282 0 0 1-13.974 1.838z"
          fill="#b1b9c2"
        />
        <Path
          data-name="Path 1420"
          d="M20.262 28.939h-17.2a1.336 1.336 0 0 1-1.336-1.336 9.941 9.941 0 0 1 19.868 0 1.337 1.337 0 0 1-1.332 1.336z"
          fill="#5191cc"
        />
      </G>
      <Path
        data-name="Path 1421"
        d="M21.599 27.603a9.888 9.888 0 0 0-9.935-9.57c-.145 0-.287.016-.431.021v10.885h10.366z"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1422"
        d="M3.987 9.013a7.44 7.44 0 0 0 .048.814l4.476-4.37a.866.866 0 0 1 .429-.225l.4-3.236a7.3 7.3 0 0 0-5.353 7.017z"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1423"
        d="M16.329 19.197a9.932 9.932 0 0 0-9.431.055 17.518 17.518 0 0 0 4.623.545 17.034 17.034 0 0 0 4.808-.6z"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1424"
        d="M18.347 10.737a7.241 7.241 0 0 0 .155-.816L9.35 7.053l-4.821 4.706c.083.2.19.389.289.581L9.35 7.916z"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Line 1"
        fill="#013668"
        d="M11.229 15.981l-.013.324"
        scale={ratio}
      />
    </Svg>
  );
};

export default ProfileIconLight;
