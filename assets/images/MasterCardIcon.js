import React from "react";
import Svg, { Path } from "react-native-svg";

const MasterCardIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 27, height / 18);
    } else if (width) {
        ratio = width / 27;
    } else if (height) {
        ratio = height / 18;
    }
    return (
        <Svg width={27 * ratio} height={18 * ratio} {...others}>
            <Path fill="#ff5f00" d="M9.844 3.081h7.054v11.521H9.844z" scale={ratio} />
            <Path
                d="M10.571 8.842a7.314 7.314 0 0 1 2.8-5.759 7.326 7.326 0 1 0 0 11.521 7.315 7.315 0 0 1-2.8-5.762z"
                fill="#eb001b"
                scale={ratio}
            />
            <Path
                d="M24.523 13.383v-.236h.1v-.049h-.242v.049h.1v.236zm.47 0v-.285h-.073l-.085.2-.085-.2h-.077v.285h.053v-.216l.079.185h.055l.079-.185v.216zM25.224 8.842a7.327 7.327 0 0 1-11.855 5.76 7.327 7.327 0 0 0 0-11.521A7.326 7.326 0 0 1 25.224 8.84z"
                fill="#f79e1b"
                scale={ratio}
            />
        </Svg>
    );
};

export default MasterCardIcon;
