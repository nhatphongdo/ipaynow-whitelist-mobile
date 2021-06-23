import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Eight = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 62, height / 90);
    } else if (width) {
        ratio = width / 62;
    } else if (height) {
        ratio = height / 90;
    }
    return (
        <Svg width={62 * ratio} height={90 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="44.6%" y1="-36%" x2="51.8%" y2="99.7%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.589" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M387.409 283.116a30.553 30.553 0 0 1-9.1-21.828c0-8.016 3.37-15.022 9.231-20.614a19.063 19.063 0 0 1-4.178-12.126 25.243 25.243 0 0 1 7.748-18.459 25.981 25.981 0 0 1 35.637 0 25.243 25.243 0 0 1 7.748 18.459 18.723 18.723 0 0 1-3.975 11.587c6.131 5.592 9.7 12.8 9.7 21.153a30.786 30.786 0 0 1-9.1 21.828 31.281 31.281 0 0 1-21.9 9.027 30.761 30.761 0 0 1-21.811-9.027zm26.678-16.977a6.231 6.231 0 0 0 2.088-4.851 7.052 7.052 0 0 0-2.088-4.985 6.644 6.644 0 0 0-4.852-2.088 6.5 6.5 0 0 0-4.849 2.156 7.107 7.107 0 0 0-2.022 4.917 6.6 6.6 0 0 0 6.871 6.8 7.063 7.063 0 0 0 4.852-1.949zm-.135-39.477a4.787 4.787 0 0 0-1.482-3.571 5.158 5.158 0 0 0-8.692 3.638 4.553 4.553 0 0 0 1.551 3.435 5.1 5.1 0 0 0 8.623-3.5z"
                fill="url(#prefix__a)"
                transform="translate(-378.313 -203.016)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Eight;
