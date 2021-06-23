import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Seven = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 66, height / 89);
    } else if (width) {
        ratio = width / 66;
    } else if (height) {
        ratio = height / 89;
    }
    return (
        <Svg width={66 * ratio} height={89 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="54.5%" y1="82.1%" x2="47.6%" y2="-22.4%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.489" stopColor="#fff" />
                    <Stop offset="0.936" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M279.276 287.966a11.35 11.35 0 0 1-3.032-7.814 15.2 15.2 0 0 1 1.685-7.075L301.978 227h-21.22a12.494 12.494 0 0 1-8.758-3.438 11.2 11.2 0 0 1-3.638-8.421 12.421 12.421 0 0 1 3.638-8.623 12.261 12.261 0 0 1 8.758-3.5h41.162a12.418 12.418 0 0 1 12.395 12.328 10.964 10.964 0 0 1-1.954 6.467l-34.02 63.259a12.543 12.543 0 0 1-10.779 6.4 10.649 10.649 0 0 1-8.286-3.506z"
                fill="url(#prefix__a)"
                transform="translate(-268.362 -203.016)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Seven;
