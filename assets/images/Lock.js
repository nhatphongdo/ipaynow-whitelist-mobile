import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const Lock = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 107, height / 130);
    } else if (width) {
        ratio = width / 107;
    } else if (height) {
        ratio = height / 130;
    }
    return (
        <Svg width={107 * ratio} height={130 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G data-name="Group 2413" fill="url(#prefix__a)" scale={ratio}>
                <Path
                    data-name="Path 1799"
                    d="M57.944 60.032a4.716 4.716 0 0 0-9.433 0 4.9 4.9 0 0 0 2.156 4.043l-1.348 9.972H57l-1.348-9.972a4.7 4.7 0 0 0 2.292-4.043z"
                />
                <Path data-name="Path 1800" d="M53.226 28.231a9.748 9.748 0 0 0-9.7 9.7v7.95h19.539v-7.95a9.956 9.956 0 0 0-9.839-9.7z" />
                <Path
                    data-name="Path 1801"
                    d="M102.009 14.35L59.831 1.011a22.517 22.517 0 0 0-13.341 0L4.312 14.35A6.23 6.23 0 0 0 0 20.28v15.9a111.642 111.642 0 0 0 47.568 91.363 9.588 9.588 0 0 0 11.05 0 110.612 110.612 0 0 0 35.036-39.887 110.61 110.61 0 0 0 12.667-51.476v-15.9a6.064 6.064 0 0 0-4.312-5.93zM76 82.941H30.32V45.884h6.2v-7.95a16.71 16.71 0 1 1 33.419 0v7.95h6.2v37.057z"
                />
            </G>
        </Svg>
    );
};

export default Lock;
