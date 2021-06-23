import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Sgd = props => {
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
                <Path fill="#ed2939" d="M0 0h384v128H0z" />
                <Path fill="#fff" d="M0 128h384v128H0zM131.705 64a48.134 48.134 0 1 1-48.134-48.133A48.133 48.133 0 0 1 131.705 64z" />
                <Path d="M146.83 64a45.488 45.488 0 1 1-45.488-45.488A45.488 45.488 0 0 1 146.83 64z" fill="#ed2939" />
                <Path
                    d="M89.528 65.161l-6.538-5.016-6.537 5.019 2.516-8.089-6.559-4.986 8.094.018 2.483-8.1 2.486 8.1 8.094-.02-6.558 4.988zM140.834 65.161l-6.539-5.016-6.537 5.019 2.517-8.089-6.559-4.986 8.094.018 2.483-8.1 2.485 8.1 8.1-.02-6.558 4.988zM115.207 46.12l-6.538-5.02-6.537 5.019 2.516-8.089-6.559-4.986 8.094.018 2.483-8.1 2.486 8.1 8.094-.02-6.558 4.988zM99.128 95.628l-6.538-5.016-6.537 5.018 2.516-8.088-6.559-4.986 8.094.017 2.483-8.1 2.486 8.1 8.094-.02-6.558 4.987zM131.234 95.628l-6.539-5.016-6.537 5.018 2.517-8.088-6.559-4.986 8.094.017 2.483-8.1 2.485 8.1 8.095-.02-6.558 4.988z"
                    fill="#fff"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Sgd;
