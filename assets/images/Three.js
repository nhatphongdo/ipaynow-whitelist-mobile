import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Three = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 67, height / 90);
    } else if (width) {
        ratio = width / 67;
    } else if (height) {
        ratio = height / 90;
    }
    return (
        <Svg width={67 * ratio} height={90 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="71%" y1="-24.8%" x2="28.4%" y2="113.8%" gradientUnits="objectBoundingBox">
                    <Stop offset="0.223" stopColor="#fff" />
                    <Stop offset="0.651" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M281.9 143.36a32.069 32.069 0 0 1-12.6-12.665 14.754 14.754 0 0 1-1.954-7.074 11.63 11.63 0 0 1 3.167-7.612 11.369 11.369 0 0 1 8.69-3.5 12.686 12.686 0 0 1 10.913 6.265c1.55 3.3 5.457 5.457 9.566 5.457a9.927 9.927 0 0 0 6.8-2.694 8.64 8.64 0 0 0 2.763-6.6c0-2.022-.674-3.369-1.954-3.975a12.419 12.419 0 0 0-4.986-.741h-9.9a11.434 11.434 0 0 1-8.219-3.84 11.936 11.936 0 0 1-3.3-8.151 11.608 11.608 0 0 1 3.57-8.489l8.556-7.545h-10.907a12.683 12.683 0 0 1-8.623-3.032 10.606 10.606 0 0 1-3.5-8.017 12.55 12.55 0 0 1 3.5-8.555 12.235 12.235 0 0 1 8.623-3.57h40.555a11.307 11.307 0 0 1 8.22 3.57 12.291 12.291 0 0 1-.27 17.044l-12.329 11.042a26.094 26.094 0 0 1 14.889 24.253 32.3 32.3 0 0 1-4.581 16.707 33.227 33.227 0 0 1-28.833 16.505 35.83 35.83 0 0 1-17.856-4.783z"
                fill="url(#prefix__a)"
                transform="translate(-267.352 -59.016)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Three;
