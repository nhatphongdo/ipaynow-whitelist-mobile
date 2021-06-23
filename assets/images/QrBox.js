import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const QrBox = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 153, height / 153);
    } else if (width) {
        ratio = width / 153;
    } else if (height) {
        ratio = height / 153;
    }
    return (
        <Svg width={153 * ratio} height={153 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M142.979 0H8.857A8.857 8.857 0 0 0 0 8.857v134.122a9.267 9.267 0 0 0 9.272 9.272h133.87a9.267 9.267 0 0 0 9.272-9.272V9.272A9.407 9.407 0 0 0 142.979 0zm-7.995 143.5H17.429a8.636 8.636 0 0 1-8.629-8.638V17.14a8.637 8.637 0 0 1 8.629-8.64h117.555a8.637 8.637 0 0 1 8.631 8.644v117.718a8.636 8.636 0 0 1-8.631 8.638z"
                fill="url(#prefix__a)"
                scale={ratio}
            />
        </Svg>
    );
};

export default QrBox;
