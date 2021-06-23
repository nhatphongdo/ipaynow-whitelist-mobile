import React from "react";
import Svg, { Path } from "react-native-svg";

const DropdownIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 10, height / 6);
    } else if (width) {
        ratio = width / 10;
    } else if (height) {
        ratio = height / 6;
    }
    return (
        <Svg width={10 * ratio} height={6 * ratio} {...others}>
            <Path d="M5 6L0 0h10z" fill={fill} scale={ratio} />
        </Svg>
    );
};

export default DropdownIcon;
