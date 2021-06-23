import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Twd = props => {
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
                <Path fill="#ec1e24" d="M0 0h384v256H0z" />
                <Path fill="#2b2f83" d="M0 0h192v128H0z" />
                <Path d="M95.969 87.911a23.923 23.923 0 1 0-23.922-23.923 23.923 23.923 0 0 0 23.922 23.923z" fill="#fff" />
                <Path
                    d="M101.583 37.044l-5.614-20.95-5.627 21a27.34 27.34 0 0 1 11.241-.05zM87.359 37.847L72.022 22.51l5.628 21a27.342 27.342 0 0 1 9.709-5.663zM75.442 45.654l-20.95-5.613 15.374 15.374a27.351 27.351 0 0 1 5.576-9.761zM69.025 58.374l-20.95 5.614 21 5.628a27.327 27.327 0 0 1-.05-11.242zM69.828 72.6L54.491 87.936l21-5.628a27.318 27.318 0 0 1-5.663-9.708zM77.636 84.516l-5.615 20.951L87.4 90.092a27.326 27.326 0 0 1-9.764-5.576zM90.356 90.933l5.613 20.95 5.628-21a27.322 27.322 0 0 1-11.241.05zM104.58 90.13l15.337 15.337-5.627-21a27.341 27.341 0 0 1-9.71 5.663zM116.5 82.322l20.951 5.615-15.378-15.376a27.319 27.319 0 0 1-5.573 9.761zM122.914 69.6l20.951-5.613-21-5.629a27.31 27.31 0 0 1 .049 11.242zM122.111 55.378l15.338-15.337-21 5.627a27.326 27.326 0 0 1 5.662 9.71zM114.3 43.461l5.615-20.952-15.372 15.376a27.294 27.294 0 0 1 9.757 5.576z"
                    fill="#fff"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Twd;
