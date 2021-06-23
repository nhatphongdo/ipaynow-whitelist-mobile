import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const KeypadBackground = props => {
    const { width, height, start, end, offsets, colors, fill = "#fff", ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 140, height / 140);
    } else if (width) {
        ratio = width / 140;
    } else if (height) {
        ratio = height / 140;
    }
    return (
        <Svg width={140 * ratio} height={140 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__b" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G scale={ratio}>
                <Rect width="140" height="140" x="0" y="0" rx="25" fill={fill} />
            </G>
        </Svg>
    );
};

export default KeypadBackground;
