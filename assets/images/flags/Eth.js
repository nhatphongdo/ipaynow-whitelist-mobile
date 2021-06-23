import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Eth = props => {
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
                <RadialGradient id="prefix__b" cx={128} cy={128} r={128} gradientUnits="userSpaceOnUse">
                    <Stop offset={0} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.613} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.805} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.93} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={1} stopColor="#130c0e" stopOpacity={0.1} />
                </RadialGradient>
            </Defs>
            <G clipPath="url(#prefix__a)" scale={ratio}>
                <Path fill="#4e8ee9" d="M-64 0h384v256H-64z" />
                <Path d="M128.123 24l-1.4 4.761V166.9l1.4 1.4 64.123-37.9z" fill="#343434" />
                <Path d="M128.123 24L64 130.4l64.123 37.9V24z" fill="#8c8c8c" />
                <Path d="M128.122 180.44l-.789.962v49.208l.789 2.306 64.161-90.36z" fill="#3c3c3b" />
                <Path d="M128.123 232.915v-52.476L64 142.555z" fill="#8c8c8c" />
                <Path d="M128.123 168.299l64.122-37.9-64.122-29.146z" fill="#141414" />
                <Path d="M64 130.392l64.122 37.9v-67.041z" fill="#393939" />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Eth;
