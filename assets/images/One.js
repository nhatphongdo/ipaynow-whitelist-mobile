import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const One = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 40, height / 89);
    } else if (width) {
        ratio = width / 40;
    } else if (height) {
        ratio = height / 89;
    }
    return (
        <Svg width={40 * ratio} height={89 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="121.8%" y1="-50.8%" x2="15.1%" y2="106.7%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.589" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M74.933 143.831a12.3 12.3 0 0 1-3.638-8.623V91.284a12.667 12.667 0 0 1-3.84.607 11.5 11.5 0 0 1-7.949-3.234 11.669 11.669 0 0 1-3.638-8.557A12 12 0 0 1 62 69.592L76.617 60.9a13.752 13.752 0 0 1 7.006-1.819 10.914 10.914 0 0 1 8.084 3.3 12.314 12.314 0 0 1 3.436 8.084v.067l.067.135v64.538a12.191 12.191 0 0 1-3.233 8.623 11.041 11.041 0 0 1-8.354 3.5 12.328 12.328 0 0 1-8.69-3.497z"
                fill="url(#prefix__a)"
                transform="translate(-55.868 -59.083)"
                scale={ratio}
            />
        </Svg>
    );
};

export default One;
