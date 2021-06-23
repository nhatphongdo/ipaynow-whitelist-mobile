import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Nine = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 65, height / 89);
    } else if (width) {
        ratio = width / 65;
    } else if (height) {
        ratio = height / 89;
    }
    return (
        <Svg width={65 * ratio} height={89 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" y1="117.2%" x2="50%" y2="-9.1%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.489" stopColor="#fff" />
                    <Stop offset="0.936" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M222.241 344.516a31.649 31.649 0 0 1 3.907 40.891L208.7 417.542a12.272 12.272 0 0 1-10.645 6.2 11.214 11.214 0 0 1-8.488-3.637 11.436 11.436 0 0 1-3.234-7.815 12.187 12.187 0 0 1 1.886-6.468l4.312-7.005a33.216 33.216 0 0 1-18.121-11.25 32.079 32.079 0 0 1 2.29-43.048 32.041 32.041 0 0 1 45.541 0zm-28.834 16.572a8.469 8.469 0 0 0-2.695 6.13 8.678 8.678 0 0 0 2.627 6.131 9 9 0 0 0 6.2 2.492 8.8 8.8 0 0 0 6.062-2.492 8.252 8.252 0 0 0-.067-12.261 8.618 8.618 0 0 0-12.126 0z"
                fill="url(#prefix__a)"
                transform="translate(-167.201 -335.017)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Nine;
