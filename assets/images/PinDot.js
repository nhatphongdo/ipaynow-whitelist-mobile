import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Circle, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PinDot = props => {
    const { width, height, start, end, offsets, colors, fill = '#fff', stroke = '#62C0B3', ...others } = props
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
            <Defs>
                <LinearGradient id="prefix__b" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G data-name="Group 2173" scale={ratio}>
                <Circle cx="15" cy="15" r="13" fill={fill} stroke={stroke} strokeWidth="2" />
            </G>
        </Svg>
    );
};

export default PinDot;
