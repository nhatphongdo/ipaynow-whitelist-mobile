import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Eur = props => {
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
                <Path fill="#0e1b8d" d="M-64 0h384v256H-64z" />
                <G fill="#ffdc3c">
                    <Path d="M227.83 76.327l-9.826 7.252 3.662 11.05-9.749-6.557-9.744 6.555 3.662-11.05-9.826-7.25h12.224l3.685-11.135 3.689 11.135zM132.7 220.74l-3.685-11.145-3.685 11.145h-12.228l9.826 7.248-3.657 11.054 9.753-6.57 9.745 6.57-3.667-11.054 9.821-7.248zm95.527-96.322l-3.676-11.14-3.689 11.14H208.63l9.826 7.252-3.653 11.05 9.749-6.566 9.745 6.566-3.671-11.05 9.835-7.252zm-16.31 59.516l9.749 6.566-3.662-11.054 9.826-7.248h-12.223l-3.689-11.145-3.685 11.145h-12.224l9.826 7.248-3.662 11.054zm-31.668 23.58l-3.689-11.145-3.685 11.145h-12.223l9.826 7.252-3.662 11.05 9.753-6.57 9.745 6.57-3.667-11.05 9.826-7.252zM50.805 179.445l9.821-7.248H48.403l-3.694-11.145-3.675 11.145H28.801l9.822 7.248-3.658 11.054 9.754-6.566 9.745 6.566zM73.857 48.213l-3.653 11.054 9.749-6.566 9.745 6.566-3.662-11.054 9.826-7.248H83.638l-3.684-11.138-3.689 11.14H64.044zM48.403 76.327l-3.694-11.135-3.685 11.135H28.801l9.822 7.257-3.658 11.043 9.754-6.557 9.745 6.557-3.657-11.045 9.821-7.257zm-16.934 59.827l9.74 6.566-3.653-11.054 9.817-7.248H35.159l-3.7-11.14-3.685 11.14H15.552l9.826 7.248-3.662 11.054zm52.169 71.36l-3.685-11.145-3.689 11.145h-12.22l9.817 7.252-3.653 11.05 9.749-6.57 9.745 6.57-3.662-11.05 9.826-7.252zM182.146 48.213l3.658 11.054-9.744-6.561-9.746 6.561 3.658-11.054-9.831-7.248h12.224l3.694-11.14 3.685 11.14h12.224zM144.925 28.099l-9.825 7.25 3.66 11.051-9.746-6.557-9.746 6.557 3.66-11.051-9.825-7.25h12.224l3.687-11.139 3.7 11.139z" />
                </G>
            </G>
            <Circle cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse cx={95} cy={60} rx={95} ry={60} transform="translate(33 6)" fill="#fff" opacity={0.3} scale={ratio} />
        </Svg>
    );
};

export default Eur;
