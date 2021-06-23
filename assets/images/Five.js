import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Five = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 63, height / 90);
    } else if (width) {
        ratio = width / 63;
    } else if (height) {
        ratio = height / 90;
    }
    return (
        <Svg width={63 * ratio} height={90 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="47.3%" y1="0.7%" x2="52%" y2="118.8%" gradientUnits="objectBoundingBox">
                    <Stop offset="0.223" stopColor="#fff" />
                    <Stop offset="0.651" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M69.341 287.292a31.563 31.563 0 0 1-11.25-12.463A13.866 13.866 0 0 1 56 267.621a10.85 10.85 0 0 1 3.166-7.545 12 12 0 0 1 8.758-3.571 12.407 12.407 0 0 1 10.779 6.2l.606 1.281c1.684 2.9 3.3 4.244 6.467 4.244 3.234 0 5.052-.135 6.6-1.146 1.819-1.145 2.695-3.3 2.695-7.275a5.079 5.079 0 0 0-3.234-4.918 8.628 8.628 0 0 0-2.223-.674l-1.145-.135H68.264a11.986 11.986 0 0 1-8.354-3.5 11.085 11.085 0 0 1-3.436-8.287l-.269-27.621a11.593 11.593 0 0 1 3.57-8.084 12.945 12.945 0 0 1 8.219-3.57h33.482a11.946 11.946 0 0 1 8.421 3.637 12.754 12.754 0 0 1 3.5 8.691 11.4 11.4 0 0 1-3.5 8.286 12.1 12.1 0 0 1-8.421 3.3H80.322v3.233h5.727c8.892 0 17.178 2.695 23.174 7.613a26.766 26.766 0 0 1 9.7 21.289 33.239 33.239 0 0 1-33.145 33.01 29.869 29.869 0 0 1-16.437-4.787z"
                fill="url(#prefix__a)"
                transform="translate(-56.003 -203.016)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Five;
