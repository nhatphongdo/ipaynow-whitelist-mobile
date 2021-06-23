import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';

const QrLabel = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 224, height / 59);
    } else if (width) {
        ratio = width / 224;
    } else if (height) {
        ratio = height / 59;
    }
    return (
        <Svg width={224 * ratio} height={59 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G stroke="rgba(0,0,0,0)" scale={ratio}>
                <Path
                    data-name="QrLabel"
                    d="M-1203.446-387.824h-35a4.546 4.546 0 0 1-4.554-4.554v-32.532a4.546 4.546 0 0 1 4.554-4.554h89.654l14.8-14.8a2.554 2.554 0 0 1 3.578 0l14.8 14.8h90.3a4.315 4.315 0 0 1 4.392 4.554v32.532a4.546 4.546 0 0 1-4.555 4.554h-177.979z"
                    transform="translate(1243.5 445.693)"
                    fill="url(#prefix__a)"
                />
                <Path
                    data-name="Path 1427"
                    d="M11.462 46.74H21.83V29.355H11.462zm6.913-19.113h-3.457v.864h3.457zm2.591-2.592H12.33a3.5 3.5 0 0 0-3.509 3.457v19.113a3.5 3.5 0 0 0 3.509 3.457h8.641a3.5 3.5 0 0 0 3.509-3.457V28.492a3.5 3.5 0 0 0-3.514-3.457zm1.729 22.569a1.713 1.713 0 0 1-1.729 1.727H12.33a1.715 1.715 0 0 1-1.729-1.727V28.492a1.715 1.715 0 0 1 1.729-1.729h8.641a1.715 1.715 0 0 1 1.729 1.729z"
                    fill="#fff"
                />
            </G>
        </Svg>
    );
};

export default QrLabel;
