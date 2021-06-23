import React from "react";
import Svg, { G, Path } from "react-native-svg";

const FilterIcon = props => {
  const { width, height, start, end, offsets, colors, stroke, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 18, height / 16);
  } else if (width) {
    ratio = width / 18;
  } else if (height) {
    ratio = height / 16;
  }
  return (
    <Svg width={18 * ratio} height={16 * ratio} {...others}>
      <G stroke={stroke} scale={ratio}>
        <Path d="M.764 2.454h4.331a1.671 1.671 0 1 0 0-.528H.764a.264.264 0 1 0 0 .528zm5.978-1.407A1.143 1.143 0 1 1 5.6 2.19a1.143 1.143 0 0 1 1.142-1.143zM.764 7.906h8.551a1.671 1.671 0 1 0 0-.528H.764a.264.264 0 0 0 0 .528zm10.2-1.407A1.143 1.143 0 1 1 9.82 7.642a1.143 1.143 0 0 1 1.143-1.143zM6.742 11.422a1.672 1.672 0 0 0-1.648 1.407H.764a.264.264 0 1 0 0 .528h4.331a1.669 1.669 0 1 0 1.647-1.935zm0 2.813a1.143 1.143 0 1 1 1.143-1.143 1.143 1.143 0 0 1-1.143 1.143zM17.117 12.829h-7.21a.264.264 0 1 0 0 .528h7.21a.264.264 0 1 0 0-.528zM9.908 2.455h7.21a.264.264 0 1 0 0-.528h-7.21a.264.264 0 1 0 0 .528zM17.117 7.378h-3.165a.264.264 0 0 0 0 .528h3.165a.264.264 0 0 0 0-.528z" />
      </G>
    </Svg>
  );
};

export default FilterIcon;
