import React from "react";
import Svg, { G, Path } from "react-native-svg";

const LockIcon = props => {
    const { width, height, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 12, height / 17);
    } else if (width) {
        ratio = width / 12;
    } else if (height) {
        ratio = height / 17;
    }
    return (
        <Svg width={12 * ratio} height={17 * ratio} {...others}>
            <G fill={fill} scale={ratio}>
                <Path d="M10.494 4.664a4.664 4.664 0 0 0-9.328 0v2.22a5.8 5.8 0 1 0 10.449 3.475 5.691 5.691 0 0 0-1.166-3.475v-2.22zM5.83.919a3.751 3.751 0 0 1 3.745 3.745V5.9A5.772 5.772 0 0 0 5.83 4.532 5.863 5.863 0 0 0 2.085 5.9V4.664A3.751 3.751 0 0 1 5.83.919zm0 14.328a4.888 4.888 0 1 1 4.888-4.888 4.9 4.9 0 0 1-4.888 4.888z" />
                <Path d="M5.852 8.229a1.275 1.275 0 0 0-.605 2.4v2.377h1.188v-2.355a1.274 1.274 0 0 0 .718-1.144 1.3 1.3 0 0 0-1.301-1.278z" />
            </G>
        </Svg>
    );
};

export default LockIcon;
