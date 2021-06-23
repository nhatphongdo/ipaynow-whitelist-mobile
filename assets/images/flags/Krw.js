import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Krw = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 256, height / 256);
    } else if (width) {
        ratio = width / 256;
    } else if (height) {
        ratio = height / 256;
    }
    return (
        <Svg width={256 * ratio} height={256 * ratio} {...others}>
            <Defs>
                <ClipPath id="prefix__a">
                    <Circle cx={128} cy={128} r={128} fill="none" />
                </ClipPath>
                <RadialGradient id="prefix__b" cx={128} cy={128} r={128} gradientUnits="objectBoundingBox">
                    <Stop offset={0} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.613} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.805} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.93} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={1} stopColor="#130c0e" stopOpacity={0.1} />
                </RadialGradient>
            </Defs>
            <G clipPath="url(#prefix__a)" scale={ratio}>
                <Path fill="#fff" d="M-64 0h384v256H-64z" />
                <Path d="M23.994 88.709l27.735-41.603 27.735 18.49L51.729 107.2z" />
                <Path
                    fill="#fff"
                    d="M28.616 96.798l32.357-48.536 3.467 2.311L32.083 99.11zM39.017 103.732l32.358-48.537 3.467 2.312-32.358 48.536z"
                />
                <Path d="M176.536 190.404l27.735-41.603 27.735 18.49-27.735 41.603z" />
                <Path
                    fill="#fff"
                    d="M181.159 198.493l32.357-48.536 3.467 2.311-32.357 48.536zM191.559 205.427l32.375-48.533 3.467 2.313-32.375 48.533z"
                />
                <Path fill="#fff" d="M185.781 169.025l2.313-3.467 34.667 23.125-2.313 3.467z" />
                <Circle cx={50} cy={50} r={50} transform="rotate(-4.869 1006.317 -828.303)" fill="#c60c30" />
                <Path d="M86.4 100.265A25 25 0 1 0 128 128a25 25 0 1 1 41.6 27.735 50 50 0 1 1-83.2-55.47" fill="#003478" />
                <Path d="M23.994 167.291l27.735-18.49 27.735 41.603-27.735 18.49z" />
                <Path fill="#fff" d="M28.616 159.202l3.467-2.311 32.357 48.536-3.467 2.311zM39.017 152.268l3.467-2.311 32.357 48.536-3.467 2.311z" />
                <Path d="M176.536 65.596l27.735-18.49 27.735 41.603-27.735 18.49z" />
                <Path fill="#fff" d="M181.159 57.507l3.467-2.311 32.358 48.536-3.467 2.312zM191.559 50.573l3.467-2.313L227.4 96.793l-3.467 2.313z" />
                <Path fill="#fff" d="M185.781 86.975l34.67-23.11 2.312 3.466-34.67 23.111z" />
                <Path d="M198.493 75.997l6.933-4.625 4.625 6.933-6.933 4.625z" />
                <Path fill="#fff" d="M43.639 181.736l13.868-9.245 2.311 3.468-13.868 9.244z" />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Krw;
