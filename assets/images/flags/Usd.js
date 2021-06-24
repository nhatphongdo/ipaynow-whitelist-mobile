import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Usd = props => {
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
                <Path fill="#fff" d="M0 0h486.4v256H0z" />
                <Path
                    fill="#b22234"
                    d="M0 0h486.4v19.692H0zM0 39.384h486.4v19.692H0zM0 78.769h486.4v19.692H0zM0 118.154h486.4v19.692H0zM0 157.539h486.4v19.692H0zM0 196.923h486.4v19.692H0zM0 236.308h486.4V256H0z"
                />
                <Path fill="#3c3b6e" d="M0 0h194.56v137.846H0z" />
                <Path
                    d="M9.141 11.191l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.775-5.448 4.635-3.367H18.41l-1.77-5.449-1.77 5.448zM41.4 11.191l4.634 3.367-1.77 5.448 4.636-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.734L48.9 5.742l-1.77 5.448zM73.653 11.191l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM105.909 11.191l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM138.165 11.191l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM170.421 11.191l4.635 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.731l-1.77-5.448-1.77 5.448zM25.269 25.015l4.631 3.367-1.77 5.448 4.635-3.367 4.635 3.368-1.77-5.448 4.635-3.367h-5.727l-1.77-5.448L31 25.015zM57.525 25.015l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM89.781 25.015l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM122.037 25.015l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM154.293 25.015l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM9.141 38.839l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.775-5.448 4.635-3.367H18.41l-1.77-5.448-1.77 5.448zM41.4 38.839l4.634 3.367-1.77 5.448 4.636-3.366 4.635 3.367-1.77-5.448L56.4 38.84h-5.734L48.9 33.391l-1.77 5.448zM73.653 38.839l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM105.909 38.839l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM138.165 38.839l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM170.421 38.839l4.635 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.731l-1.77-5.448-1.77 5.448zM25.667 52.709l4.633 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.766 5.448zM57.923 52.709l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM90.179 52.709l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM122.435 52.709l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367H131.7l-1.77-5.448-1.77 5.448zM154.691 52.709l4.635 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.731l-1.77-5.448-1.77 5.448zM9.631 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367H18.9l-1.77-5.448-1.77 5.448zM41.886 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM74.143 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM106.4 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM138.654 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM170.91 66.417l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM9.933 93.627l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.767-5.447 4.635-3.367H19.2l-1.77-5.448-1.77 5.448zM42.189 93.627l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM74.445 93.627l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM106.7 93.627l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM138.957 93.627l4.635 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM171.213 93.627l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM9.539 121.158l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM41.795 121.158l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM74.051 121.158l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM106.307 121.158l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM138.563 121.158l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM170.818 121.158l4.635 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM25.763 79.886l4.637 3.367-1.773 5.447 4.635-3.367L37.9 88.7l-1.77-5.448 4.635-3.367h-5.733l-1.77-5.448-1.77 5.448zM58.019 79.886l4.634 3.367-1.77 5.447 4.635-3.367 4.634 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM90.275 79.886l4.634 3.367-1.77 5.447 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448L96 79.886zM122.531 79.886l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM154.786 79.886l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.366-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM25.667 107.373l4.633 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.729l-1.77-5.448-1.77 5.448zM57.923 107.373l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM90.179 107.373l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448zM122.435 107.373l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367H131.7l-1.77-5.448-1.77 5.448zM154.691 107.373l4.634 3.367-1.77 5.448 4.635-3.367 4.635 3.367-1.77-5.448 4.635-3.367h-5.73l-1.77-5.448-1.77 5.448z"
                    fill="#fff"
                />
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Usd;