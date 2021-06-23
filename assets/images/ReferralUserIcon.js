import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const ReferralUserIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 32, height / 29);
    } else if (width) {
        ratio = width / 32;
    } else if (height) {
        ratio = height / 29;
    }
    return (
        <Svg width={32 * ratio} height={29 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M32.956 18.9L27.4 9.289A4.39 4.39 0 0 0 23.578 7.1H12.467a4.42 4.42 0 0 0-3.823 2.222L3.088 18.93a4.43 4.43 0 0 0 0 4.412l5.555 9.607a4.42 4.42 0 0 0 3.823 2.222h11.112a4.42 4.42 0 0 0 3.822-2.222l5.555-9.607a4.491 4.491 0 0 0 .001-4.442zm-14.934-5.624a3.464 3.464 0 1 1-3.464 3.464 3.445 3.445 0 0 1 3.464-3.464zm5.686 14.215a.62.62 0 0 1-.621.621H12.924a.62.62 0 0 1-.621-.621v-.425a5.69 5.69 0 0 1 5.687-5.686 5.69 5.69 0 0 1 5.686 5.686v.425z"
                transform="translate(-2.5 -7.1)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
        </Svg>
    );
};

export default ReferralUserIcon;
