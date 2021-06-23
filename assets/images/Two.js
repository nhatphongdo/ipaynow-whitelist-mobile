import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Two = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 62, height / 89);
    } else if (width) {
        ratio = width / 62;
    } else if (height) {
        ratio = height / 89;
    }
    return (
        <Svg width={62 * ratio} height={89 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="82.1%" y1="131.7%" x2="18%" y2="-17.6%" gradientUnits="objectBoundingBox">
                    <Stop offset="0.039" stopColor="#fff" />
                    <Stop offset="0.914" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M170.907 147.334a12.076 12.076 0 0 1-8.556-3.57 11.884 11.884 0 0 1-3.57-8.623 11.129 11.129 0 0 1 3.5-8.488l24.589-28.16c.067 0 .067 0 .067-.067l.068-.068.2-.2.4-.4.606-.539 2.223-2.223a23.928 23.928 0 0 0 4.581-6.063 6.872 6.872 0 0 0 .876-3.234 3.74 3.74 0 0 0-2.089-3.571 7.367 7.367 0 0 0-3.839-.875c-2.9 0-5.12.808-6.4 3.57-1.55 6.535-5.659 9.971-11.587 9.971-3.638 0-6.467-1.078-8.556-3.3a11.881 11.881 0 0 1-3.032-8.219 16.166 16.166 0 0 1 .2-2.493c.74-5.053 3.974-10.509 8.892-14.821a30.759 30.759 0 0 1 20.143-7.478c8.892 0 16.3 2.224 21.692 6.6 5.592 4.649 8.421 11.116 8.421 19.47a30.138 30.138 0 0 1-3.3 14.484c-2.223 4.378-6.063 9.5-11.452 15.225l-8.691 9.162h11.722a12.6 12.6 0 0 1 8.623 3.3 12.2 12.2 0 0 1 0 17.111 12.588 12.588 0 0 1-8.623 3.5z"
                fill="url(#prefix__a)"
                transform="translate(-158.781 -58.476)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Two;
