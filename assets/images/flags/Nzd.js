import React from 'react';
import Svg, { Defs, ClipPath, Circle, Path, RadialGradient, Stop, G, Ellipse } from 'react-native-svg';

const Nzd = props => {
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
                    <Path transform="translate(-128)" fill="none" d="M0 0h256v128H0z" />
                </ClipPath>
                <ClipPath id="prefix__c">
                    <Path d="M-128 0L0 64h-128zM0 0h128L0 64zm0 64h128v64zm0 0v64h-128z" fill="none" />
                </ClipPath>
                <RadialGradient id="prefix__d" cx={128} cy={128} r={128} gradientUnits="userSpaceOnUse">
                    <Stop offset={0} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.613} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.805} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={0.93} stopColor="#130c0e" stopOpacity={0} />
                    <Stop offset={1} stopColor="#130c0e" stopOpacity={0.1} />
                </RadialGradient>
            </Defs>
            <G clipPath="url(#prefix__a)" scale={ratio}>
                <Path fill="#00247d" d="M-128 0h512v256h-512z" />
                <G clipPath="url(#prefix__b)">
                    <Path d="M-128 0l256 128m-256 0L128 0" stroke="#fff" strokeWidth={25.6} />
                </G>
                <G clipPath="url(#prefix__c)">
                    <Path d="M-128 0l256 128m-256 0L128 0" stroke="#cc142b" strokeWidth={17.067} />
                </G>
                <Path d="M0 0v128m-128-64h256" stroke="#fff" strokeWidth={42.667} />
                <Path d="M0 0v128m-128-64h256" stroke="#cc142b" strokeWidth={25.6} />
                <Path
                    d="M289.464 89.674l10.654 7.74-4.069 12.524L306.7 102.2l10.653 7.74-4.069-12.524 10.653-7.74h-13.166L306.7 77.15l-4.069 12.524z"
                    fill="#fff"
                />
                <Path
                    d="M296.035 91.809l6.592 4.789-2.518 7.75 6.592-4.79 6.592 4.79-2.518-7.75 6.592-4.789h-8.147l-2.518-7.75-2.518 7.75z"
                    fill="#cc142b"
                />
                <Path
                    d="M236.629 44.906L248.6 53.6l-4.573 14.074L256 58.98l11.972 8.7L263.4 53.6l11.971-8.7h-14.8L256 30.833l-4.573 14.074z"
                    fill="#fff"
                />
                <Path
                    d="M243.2 47.041l7.91 5.747-3.022 9.3L256 56.341l7.911 5.748-3.022-9.3 7.911-5.747h-9.779L256 37.741l-3.022 9.3z"
                    fill="#cc142b"
                />
                <Path
                    d="M177.477 104.419l11.971 8.7-4.573 14.074 11.972-8.7 11.972 8.7-4.573-14.074 11.972-8.7h-14.8l-4.573-14.074-4.573 14.074z"
                    fill="#fff"
                />
                <Path
                    d="M184.048 106.554l7.91 5.747-3.022 9.3 7.911-5.748 7.911 5.748-3.022-9.3 7.911-5.747h-9.779l-3.022-9.3-3.022 9.3z"
                    fill="#cc142b"
                />
                <Path
                    d="M234.5 197.813l13.29 9.656-5.076 15.624L256 213.437l13.29 9.656-5.076-15.624 13.29-9.656h-16.428L256 182.19l-5.076 15.623z"
                    fill="#fff"
                />
                <Path
                    d="M241.067 199.948l9.229 6.705-3.526 10.847 9.23-6.7 9.229 6.706-3.525-10.85 9.229-6.705h-11.408L256 189.1l-3.525 10.85z"
                    fill="#cc142b"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__d)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Nzd;
