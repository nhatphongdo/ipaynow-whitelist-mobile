import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Four = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 66, height / 89);
    } else if (width) {
        ratio = width / 66;
    } else if (height) {
        ratio = height / 89;
    }
    return (
        <Svg width={66 * ratio} height={89 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1="59.3%" y1="11.7%" x2="43%" y2="101.2%" gradientUnits="objectBoundingBox">
                    <Stop offset="0" stopColor="#fff" />
                    <Stop offset="0.489" stopColor="#fff" />
                    <Stop offset="0.936" stopColor="#fff" />
                </LinearGradient>
            </Defs>
            <Path
                d="M413.413 143.9a11.92 11.92 0 0 1-3.57-8.489v-9.094h-20.076a2.761 2.761 0 0 1-.809-.068l-.674-.134a11.931 11.931 0 0 1-9.9-11.655 12.442 12.442 0 0 1 1.347-5.794l15.426-42.508a12.382 12.382 0 0 1 11.453-7.478 11.841 11.841 0 0 1 11.858 11.654 10.248 10.248 0 0 1-1.078 4.649l-11.86 27.148h4.313a12.311 12.311 0 0 1 3.906-8.017 12.183 12.183 0 0 1 8.353-3.166 11.7 11.7 0 0 1 8.084 3.233 12.2 12.2 0 0 1 3.639 8.085 12.115 12.115 0 0 1 10.307 11.991 12.092 12.092 0 0 1-2.963 7.949 11 11 0 0 1-7.344 3.975v9.229a12.081 12.081 0 0 1-3.435 8.489 11.765 11.765 0 0 1-8.354 3.435 12.051 12.051 0 0 1-8.623-3.434z"
                fill="url(#prefix__a)"
                transform="translate(-378.382 -58.679)"
                scale={ratio}
            />
        </Svg>
    );
};

export default Four;
