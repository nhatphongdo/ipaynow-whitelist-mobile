import React from "react";
import Svg, { G, Path } from "react-native-svg";

const DeleteIcon = props => {
    const { width, height, start, end, offsets, colors, stroke, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 10, height / 12);
    } else if (width) {
        ratio = width / 10;
    } else if (height) {
        ratio = height / 12;
    }
    return (
        <Svg width={10 * ratio} height={12 * ratio} {...others}>
            <G fill="none" stroke={stroke} scale={ratio}>
                <Path
                    d="M8.446 3.327l-.313 7.509a.718.718 0 0 1-.711.681h-5.46a.718.718 0 0 1-.711-.681L.938 3.327"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.853}
                />
                <Path d="M4.692 4.01v5.8M2.815 4.01l.171 5.8M6.569 4.01l-.171 5.8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.682} />
                <Path d="M.427 1.877h8.53" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.853} />
                <Path d="M2.986 1.621l.177-.622a.837.837 0 0 1 .76-.572h1.538a.837.837 0 0 1 .76.572l.177.622" strokeWidth={0.853} />
            </G>
        </Svg>
    );
};

export default DeleteIcon;
