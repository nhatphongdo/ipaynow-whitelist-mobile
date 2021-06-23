import React from "react";
import Svg, { Path } from "react-native-svg";

const RightChevron = props => {
    const { width, height, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 14, height / 42);
    } else if (width) {
        ratio = width / 14;
    } else if (height) {
        ratio = height / 42;
    }
    return (
        <Svg width={14 * ratio} height={42 * ratio} {...others}>
            <Path
                d="M.953 41.55a.954.954 0 0 1-.825-1.43L11.3 20.778.128 1.431A.954.954 0 1 1 1.78.477l11.443 19.822a.95.95 0 0 1 0 .954L1.779 41.078a.953.953 0 0 1-.826.472z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default RightChevron;
