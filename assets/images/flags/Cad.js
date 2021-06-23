import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Cad = props => {
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
                <Path fill="red" d="M0 0h256v256H0z" />
                <Path fill="#fff" d="M64 0h128v256H64z" />
                <Path
                    d="M128 76l-8.733 16.288c-.991 1.77-2.766 1.606-4.542.618l-6.325-3.275 4.712 25.019c.991 4.571-2.189 4.571-3.758 2.594l-11.032-12.352-1.792 6.273a2.137 2.137 0 0 1-2.477 1.483L80.1 109.714l3.665 13.323c.785 2.965 1.4 4.192-.792 4.974L78 130.349l24.018 19.509a3.145 3.145 0 0 1 1.093 3.267l-2.1 6.9c8.269-.954 15.679-2.388 23.953-3.271.731-.078 1.954 1.128 1.948 1.974L125.815 184h4.02l-.632-25.219c-.005-.847 1.1-2.106 1.834-2.028 8.274.883 15.685 2.317 23.954 3.271l-2.1-6.9a3.145 3.145 0 0 1 1.093-3.267L178 130.349l-4.973-2.338c-2.189-.782-1.577-2.009-.792-4.974l3.664-13.323-13.952 2.934a2.138 2.138 0 0 1-2.478-1.483l-1.791-6.273-11.033 12.352c-1.57 1.977-4.749 1.977-3.758-2.594l4.713-25.019-6.322 3.275c-1.776.988-3.551 1.152-4.542-.618"
                    fill="red"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Cad;
