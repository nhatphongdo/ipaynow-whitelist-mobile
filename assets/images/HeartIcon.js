import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const HeartIcon = props => {
    const { width, height, start, end, offsets, colors, stroke, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 23, height / 19);
    } else if (width) {
        ratio = width / 23;
    } else if (height) {
        ratio = height / 19;
    }
    return (
        <Svg width={23 * ratio} height={19 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M15.668,30.745l-.1-.045C15.136,30.506,5,25.9,5,20.054l.008-.246a6.287,6.287,0,0,1,10.66-4.651,6.285,6.285,0,0,1,10.657,4.752l.011.145C26.335,25.9,16.2,30.507,15.768,30.7Z"
                transform="translate(-4.375 -12.76)"
                fill={fill}
                stroke={stroke}
                strokeWidth={1.25}
                scale={ratio}
            />
        </Svg>
    );
};

export default HeartIcon;
