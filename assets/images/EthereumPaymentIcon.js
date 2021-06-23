import React from "react";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";

const EthereumIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 18, height / 13);
    } else if (width) {
        ratio = width / 18;
    } else if (height) {
        ratio = height / 13;
    }
    return (
        <Svg width={18 * ratio} height={13 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Rect width={17.931} height={12.551} rx={4} fill="url(#prefix__a)" scale={ratio} />
            <Path
                d="M6.276 7.423L8.866 9v2.1zm5.179 0l-2.59 3.68v-2.1zm-2.59 1.09L6.276 6.878h5.179zm0-6.269l2.59 4.634H6.276z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default EthereumIcon;
