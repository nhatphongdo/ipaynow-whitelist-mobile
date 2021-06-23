import React from "react";
import Svg, { Path } from "react-native-svg";

const LeftChevron = props => {
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
                d="M12.398 0a.954.954 0 0 1 .825 1.43L2.051 20.772l11.172 19.347a.954.954 0 1 1-1.652.954L.128 21.251a.95.95 0 0 1 0-.954L11.572.472A.953.953 0 0 1 12.398 0z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default LeftChevron;
