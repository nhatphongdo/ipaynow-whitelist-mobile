import React from 'react';
import Svg, { Defs, ClipPath, Circle, Path, RadialGradient, Stop, G, Ellipse } from 'react-native-svg';

const Aud = props => {
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
                <ClipPath id="prefix__b">
                    <Path transform="translate(-78)" fill="none" d="M0 0h256v128H0z" />
                </ClipPath>
                <ClipPath id="prefix__c">
                    <Path d="M-78 0v64h298.667v64H178zm256 0H50v149.334H-78V128z" fill="none" />
                </ClipPath>
                <RadialGradient id="prefix__d" cx={128} cy={128} r={128} gradientUnits="userSpaceOnUse">
                    <Stop offset={0} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.613} stopColor="#130c0e" stopOpacity={0.0} />
                    <Stop offset={0.805} stopColor="#130c0e" stopOpacity={0.0} />
                    <Stop offset={0.93} stopColor="#130c0e" stopOpacity={0.0} />
                    <Stop offset={1} stopColor="#130c0e" stopOpacity={0.1} />
                </RadialGradient>
            </Defs>
            <G clipPath="url(#prefix__a)" scale={ratio}>
                <Path fill="#00008b" d="M-78 0h512v256H-78z" />
                <G clipPath="url(#prefix__b)">
                    <Path d="M-78 0l256 128m0-128L-78 128" stroke="#fff" strokeWidth={30} />
                </G>
                <G clipPath="url(#prefix__c)">
                    <Path d="M-78 0l256 128m0-128L-78 128" stroke="red" strokeWidth={16} />
                </G>
                <Path d="M50 0v149.334M-78 64h298.667" stroke="#fff" strokeWidth={40} />
                <Path d="M50 0v137M-78 64h265" stroke="red" strokeWidth={24} />
                <Path d="M-78 128h256V0h85.333v170.667H-78z" fill="#00008b" />
                <Path
                    d="M50 153.6l7.4 23.024 22.617-8.566L66.639 188.2l20.8 12.343-24.094 2.1 3.316 23.957L50 209.067 33.339 226.6l3.318-23.956-24.094-2.1 20.8-12.343-13.385-20.143 22.622 8.566zM306 195.048l3.526 10.963 10.77-4.079-6.373 9.593 9.9 5.877-11.473 1 1.58 11.408-7.93-8.349-7.934 8.348 1.58-11.408-11.473-1 9.9-5.877-6.373-9.593 10.77 4.079zM242 93.714l3.526 10.964L256.3 100.6l-6.373 9.593 9.9 5.877-11.473 1 1.58 11.408-7.934-8.351-7.934 8.348 1.58-11.408-11.473-1 9.9-5.877-6.373-9.59 10.77 4.079zM306 24.381l3.526 10.964 10.77-4.079-6.373 9.592 9.9 5.878-11.473 1 1.58 11.408-7.93-8.35-7.934 8.348 1.58-11.408-11.473-1 9.9-5.878-6.373-9.59 10.77 4.079zM362.889 76.648l3.526 10.963 10.77-4.079-6.373 9.593 9.9 5.877-11.473 1 1.58 11.408-7.934-8.347-7.934 8.347 1.584-11.41-11.474-1 9.9-5.877-6.374-9.593 10.771 4.079zM331.6 128l2.786 6.831 7.359.54-5.636 4.761 1.761 7.164-6.27-3.889-6.27 3.889 1.761-7.164-5.636-4.761 7.358-.54z"
                    fill="#fff"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__d)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Aud;
