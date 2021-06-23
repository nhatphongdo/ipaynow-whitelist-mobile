import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const TimeBadge = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 72, height / 17);
    } else if (width) {
        ratio = width / 72;
    } else if (height) {
        ratio = height / 17;
    }
    return (
        <Svg width={72 * ratio} height={17 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G transform="translate(-3.394 -38.93)" fill="url(#prefix__a)" scale={ratio}>
                <Path
                    data-name="Path 1457"
                    d="M70.348 43.732h-3.15a1.549 1.549 0 0 1-1.547-1.547v-1.708H12.708v1.705a1.549 1.549 0 0 1-1.547 1.55H8.012c-1.653 0-3.071 2.035-3.071 3.7s1.417 3.7 3.071 3.7h3.15a1.549 1.549 0 0 1 1.547 1.547v1.706h52.943v-1.708a1.549 1.549 0 0 1 1.547-1.545h3.15c1.653 0 3.071-2.035 3.071-3.7s-1.419-3.7-3.072-3.7z"
                />
                <Path
                    data-name="Path 1458"
                    d="M70.348 42.183H67.2V38.93H11.161v3.253H8.012c-2.55 0-4.618 2.7-4.618 5.247s2.067 5.247 4.618 5.247h3.15v3.253H67.2v-3.253h3.15c2.55 0 4.618-2.7 4.618-5.247s-2.068-5.247-4.62-5.247zm0 9.524H67.2a.972.972 0 0 0-.971.971v2.282H12.133v-2.283a.972.972 0 0 0-.971-.971h-3.15c-2.019 0-3.646-2.34-3.646-4.276s1.626-4.276 3.646-4.276h3.15a.972.972 0 0 0 .971-.971V39.9h54.1v2.281a.972.972 0 0 0 .971.971h3.15c2.02 0 3.646 2.34 3.646 4.276s-1.632 4.278-3.652 4.278z"
                />
            </G>
        </Svg>
    );
};

export default TimeBadge;
