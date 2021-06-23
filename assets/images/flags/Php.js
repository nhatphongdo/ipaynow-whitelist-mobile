import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Php = props => {
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
                <Path fill="#0038a8" d="M0 0h512v256H0z" />
                <Path fill="#ce1126" d="M0 128h512v128H0z" />
                <Path d="M221.7 128L0 256V0" fill="#fff" />
                <Circle cx={25.6} cy={25.6} r={25.6} transform="translate(54.044 102.4)" fill="#fcd116" />
                <Path
                    d="M25.6 128l3.324 3.324L79.644 128l-50.72-3.324zM31.289 134.366L34 137.079 79.644 128zM31.289 121.634L34 118.921 79.644 128zM41.429 89.785v4.7L79.644 128 46.131 89.785zM40.95 98.309v3.837L79.644 128zM49.953 89.306h3.837L79.644 128zM79.644 73.956L76.32 77.28 79.644 128l3.325-50.72zM73.278 79.644l-2.712 2.713L79.644 128zM86.011 79.644l2.712 2.713L79.644 128zM117.859 89.785h-4.7L79.644 128l38.215-33.514zM109.336 89.306H105.5L79.644 128zM118.338 98.309v3.837L79.644 128zM133.689 128l-3.325-3.324L79.644 128l50.72 3.324zM128 121.634l-2.713-2.713L79.644 128zM128 134.366l-2.713 2.713L79.644 128zM117.859 166.216v-4.7L79.644 128l33.514 38.216zM118.338 157.691v-3.837L79.644 128zM109.336 166.694H105.5L79.644 128zM79.644 182.044l3.325-3.324L79.644 128l-3.324 50.72zM86.011 176.356l2.712-2.713L79.644 128zM73.278 176.356l-2.712-2.713L79.644 128zM41.429 166.216h4.7L79.644 128l-38.215 33.514zM49.953 166.694h3.837L79.644 128zM40.95 157.691v-3.837L79.644 128zM6 37.444l10.1 1.271 2.32 9.917 4.331-9.218 10.148.858-7.423-6.972 3.952-9.387-8.922 4.912-7.706-6.654 1.914 10zM6 218.556l8.714 5.271-1.914 10 7.706-6.659 8.922 4.912-3.952-9.38 7.428-6.968-10.148.858-4.331-9.217-2.32 9.917zM170.374 119.641l5.817 8.359-5.817 8.36 9.748-2.949 6.153 8.116.207-10.182L196.1 128l-9.62-3.344-.207-10.182-6.153 8.116z"
                    fill="#fcd116"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Php;
