import React from 'react';
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg';

const Ruby = props => {
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
            <G data-name="Group 2469" scale={ratio}>
                <G data-name="Group 2468">
                    <G data-name="Group 2472" clipPath="url(#prefix__a)">
                        <Path data-name="Rectangle 523" fill="#fff" d="M-64 0h384v256H-64z" />
                        <G data-name="Group 2473">
                            <Path
                                data-name="Path 1801"
                                d="M128.521 203.477L30.004 91.345l35.013-20.851 63.345-18.492 65.312 18.492 33.05 20.459z"
                                fill="#fff"
                            />
                            <Path data-name="Path 1802" d="M33.672 92.266h46.951l46.755 107.772z" fill="#ffaeb5" />
                            <Path data-name="Path 1803" d="M82.722 92.266l45.64 107.772V92.266z" fill="#d6404c" />
                            <Path data-name="Path 1804" d="M129.675 92.266l-.426 107.772 46.589-107.772z" fill="#ba1c2a" />
                            <Path data-name="Path 1805" d="M177.673 92.266L130.46 200.034l93.379-107.768z" fill="#da656e" />
                            <Path data-name="Path 1806" d="M35.509 90.427h43.279l-14.426-18.1z" fill="#f9d4d7" />
                            <Path data-name="Path 1807" d="M65.935 72.328l14.59 18.1 14.525-18.1z" fill="#fa3664" />
                            <Path data-name="Path 1808" d="M96.886 72.328l-14.164 18.1h44.164z" fill="#bc1c2a" />
                            <Path data-name="Path 1809" d="M99.509 72.328l29.738 18.1 28.754-18.1z" fill="#ffadb8" />
                            <Path data-name="Path 1810" d="M160.362 72.328l-28.591 18.1h44.066z" fill="#fd8891" />
                            <Path data-name="Path 1811" d="M162.723 72.328l14.721 18.1 14.459-18.1z" fill="#fffffa" />
                            <Path data-name="Path 1812" d="M193.133 72.328l-14.164 18.1h43.3z" fill="#f32334" />
                            <Path data-name="Path 1813" d="M131.772 54.164l28.853 15.8h27.017z" fill="#c02133" />
                            <Path data-name="Path 1814" d="M99.509 69.967l29.246-16.262 29.246 16.262z" fill="#fc606d" />
                            <Path data-name="Path 1815" d="M72.492 69.967l53.8-15.8-28.754 15.8z" fill="#c02133" />
                        </G>
                    </G>
                </G>
            </G>
            <Circle data-name="Ellipse 56" cx={128} cy={128} r={128} fill="url(#prefix__b)" scale={ratio} />
            <Ellipse
                data-name="Ellipse 57"
                cx={95}
                cy={60}
                rx={95}
                ry={60}
                transform="translate(33 6)"
                fill="#fff"
                opacity={0.3}
                scale={ratio}
            />
        </Svg>
    );
};

export default Ruby;
