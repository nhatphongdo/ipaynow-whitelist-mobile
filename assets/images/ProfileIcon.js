import React from "react";
import Svg, { G, Path } from "react-native-svg";

const ProfileIcon = props => {
  const { width, height, start, end, offsets, colors, fill, ...others } = props;
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
      <G scale={ratio}>
        <Path
          fill={fill}
          d="M15.62145,19.49925 C18.10695,19.49925 20.12145,17.48475 20.12145,14.99925 C20.12145,12.51525 18.10695,10.49925 15.62145,10.49925 C13.13595,10.49925 11.12145,12.51525 11.12145,14.99925 C11.12145,17.48475 13.13595,19.49925 15.62145,19.49925 L15.62145,19.49925 Z M5.12145,10.02975 L5.12145,4.49925 L10.65195,4.49925 L15.00045,0.15075 L19.34895,4.49925 L26.12145,4.49925 L26.12145,11.27325 L29.84895,14.99925 L26.12145,18.72675 L26.12145,25.49925 L19.34895,25.49925 L15.00045,29.84925 L10.65195,25.49925 L5.12145,25.49925 L5.12145,19.97025 L0.15195,14.99925 L5.12145,10.02975 Z"
        />
      </G>
    </Svg>
  );
};

export default ProfileIcon;
