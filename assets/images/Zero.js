import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Zero = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 69, height / 90);
    } else if (width) {
        ratio = width / 69;
    } else if (height) {
        ratio = height / 90;
    }
    return (
        <Svg width={69 * ratio} height={90 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" y1="5.3%" x2="50%" y2="112.3%" gradientUnits="objectBoundingBox">
                    <Stop offset="0.021" stopColor="#fff" />
                    <Stop offset="0.603" stopColor="#fff" />
                    <Stop offset="1" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M334.62 343.707a34.771 34.771 0 0 0-47.764 0c-6.535 6.4-10.375 15.494-10.375 26.476V388.1c0 10.981 3.84 19.941 10.375 26.34a34.592 34.592 0 0 0 47.764 0c6.467-6.4 10.307-15.359 10.307-26.34v-17.917c0-10.983-3.84-20.009-10.307-26.476zm-13.81 44.6c0 4.648-1.147 7.815-3.5 9.634a10.069 10.069 0 0 1-6.536 1.886c-2.828 0-5.052-.606-6.6-1.886-2.358-1.819-3.57-5.053-3.57-9.634v-18.326c0-4.649 1.212-7.883 3.57-9.769a12.769 12.769 0 0 1 13.137 0c2.357 1.886 3.5 5.5 3.5 10.146z"
                fill="url(#prefix__a)"
                transform="translate(-276.481 -334.208)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Zero;
