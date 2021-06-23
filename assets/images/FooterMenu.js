import React from "react";
import Svg, { Defs, ClipPath, Path, LinearGradient, Stop, G, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const FooterMenu = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 460, height / 135);
    } else if (width) {
        ratio = width / 460;
    } else if (height) {
        ratio = height / 135;
    }
    return (
        <Svg width={460 * ratio} height={135 * ratio} {...others}>
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="none" d="M0 0h459.663v134.501H0z" />
                </ClipPath>
                <LinearGradient id="prefix__d" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G clipPath="url(#prefix__a)" scale={ratio}>
                <G filter="url(#prefix__b)">
                    <Path
                        d="M437.163 121.006H22.5V35.86h148.487a18.036 18.036 0 0 1 9.718 3.977 74.187 74.187 0 0 1 8.666 8.132l1 1.043c3.071 3.18 5.726 6.269 8.294 9.255 9 10.472 16.115 18.744 31.56 18.939h.543c14.4 0 20.9-7.454 29.138-16.892 2.9-3.323 5.9-6.758 9.566-10.3a101.1 101.1 0 0 1 10.912-9.573c3.875-2.762 7.288-4.2 10.741-4.525.181-.018.364-.038.544-.059h145.494v85.148z"
                        fill={fill}
                    />
                </G>
                <G transform="translate(-.001)" filter="url(#prefix__c)">
                    <Circle cx={29.856} cy={29.856} r={29.856} transform="translate(200.53 6)" fill="url(#prefix__d)" />
                </G>
            </G>
        </Svg>
    );
};

export default FooterMenu;
