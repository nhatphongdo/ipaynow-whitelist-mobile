import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Six = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 66, height / 91);
    } else if (width) {
        ratio = width / 66;
    } else if (height) {
        ratio = height / 91;
    }
    return (
        <Svg width={66 * ratio} height={91 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="57.9%" y1="-72.4%" x2="47.4%" y2="108.9%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.589" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M168.616 282.374a32.342 32.342 0 0 1-3.974-41.633l17.785-32.673a12.536 12.536 0 0 1 10.779-6.332 11.463 11.463 0 0 1 8.69 3.705 11.751 11.751 0 0 1 3.233 7.949 12.286 12.286 0 0 1-1.886 6.6l-4.379 7.141a32.817 32.817 0 1 1-30.248 55.241zm29.372-16.909a8.115 8.115 0 0 0 2.695-6.2 8.553 8.553 0 0 0-2.627-6.265 9.122 9.122 0 0 0-12.531 0 8.58 8.58 0 0 0-2.694 6.266 8.182 8.182 0 0 0 2.762 6.2 8.448 8.448 0 0 0 6.13 2.561 8.806 8.806 0 0 0 6.265-2.562z"
                fill="url(#prefix__a)"
                transform="translate(-158.848 -201.736)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Six;
