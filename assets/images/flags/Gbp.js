import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Gbp = props => {
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
                <Path fill="#fff" d="M-128 0h511.731v255.971H-128z" />
                <Path d="M102.277 153.506v102.465h51.179V153.506h230.276v-51.174H153.456V0h-51.179v102.332H-128v51.173z" fill="#cf142b" />
                <Path
                    d="M170.521 82.858V0H336.2zM170.521 173.113v82.858H336.2zM85.211 173.113v82.858H-80.472zM85.211 82.858V0H-80.472zM-128 23.795v61.527H-4.97zM383.732 23.795v61.527H260.7zM383.732 232.176v-61.527H260.7zM-128 232.176v-61.527H-4.971z"
                    fill="#00247d"
                />
                <Path
                    d="M383.732 0h-28.423L185 85.322h28.423L384 0M70.729 170.645H42.306L-128 255.967h28.423L71 170.645M14.109 85.388h28.423L-128 0v14.31zM241.532 170.612h-28.423L383.641 256v-14.31z"
                    fill="#cf142b"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Gbp;
