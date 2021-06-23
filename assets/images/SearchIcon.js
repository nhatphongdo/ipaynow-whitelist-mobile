import React from "react";
import Svg, { G, Path } from "react-native-svg";

const SearchIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 20, height / 20);
    } else if (width) {
        ratio = width / 20;
    } else if (height) {
        ratio = height / 20;
    }
    return (
        <Svg width={20 * ratio} height={20 * ratio} {...others}>
            <G fill={fill} scale={ratio}>
                <Path d="M12.278 2.106A7.192 7.192 0 1 0 2.107 12.277 7.192 7.192 0 0 0 12.278 2.106zm-1.254 8.918a5.418 5.418 0 1 1 1.587-3.832 5.381 5.381 0 0 1-1.587 3.832zM19.557 17.746l-4.669-4.668a1.281 1.281 0 1 0-1.811 1.811l4.669 4.668a1.281 1.281 0 0 0 1.811-1.811z" />
            </G>
        </Svg>
    );
};

export default SearchIcon;
