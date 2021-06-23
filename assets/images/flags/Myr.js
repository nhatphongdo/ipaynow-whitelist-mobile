import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Myr = props => {
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
                <Path fill="#cc0001" d="M-30 0h512v256H-30z" />
                <Path
                    fill="#fff"
                    d="M-30 237.714h512V256H-30zM-30 201.143h512v18.286H-30zM-30 164.571h512v18.286H-30zM-30 128h512v18.286H-30zM-30 91.429h512v18.286H-30zM-30 54.857h512v18.286H-30zM-30 18.286h512v18.286H-30z"
                />
                <Path fill="#010066" d="M-30 0h256v146.286H-30z" />
                <Path d="M75.326 18.286a54.857 54.857 0 1 0 29.792 100.977 48.638 48.638 0 1 1 .975-91.6 54.9 54.9 0 0 0-30.767-9.377z" fill="#fc0" />
                <Path
                    d="M166.6 101.7l-23.182-12.1 6.854 24.757-15.507-20.71-4.837 25.206-4.759-25.22L109.6 114.3l6.933-24.735-23.225 12.025 17.251-19.352-26.273 1.009 24.152-10.136L84.318 62.9l26.27 1.088L93.4 44.585l23.184 12.1-6.854-24.757 15.506 20.709 4.838-25.2 4.758 25.22L150.4 31.986l-6.934 24.736L166.692 44.7l-17.251 19.348 26.273-1.009-24.152 10.136 24.12 10.209-26.27-1.084z"
                    fill="#fc0"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Myr;
