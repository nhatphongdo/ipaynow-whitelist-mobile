import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SelectedPinDot = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 75, height / 73);
    } else if (width) {
        ratio = width / 75;
    } else if (height) {
        ratio = height / 73;
    }
    return (
        <Svg width={75 * ratio} height={73 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__b" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G data-name="Group 2173" scale={ratio}>
                <G transform="matrix(1 0 0 1 -.005 .002)" filter="url(#prefix__a)">
                    <Path
                        data-name="Path 1309"
                        d="M25.107 34.627H12.844a6.772 6.772 0 0 1-5.823-3.349L.889 20.663a6.755 6.755 0 0 1 0-6.7L7.021 3.349A6.709 6.709 0 0 1 12.844 0h12.263a6.772 6.772 0 0 1 5.823 3.349l6.132 10.563a6.755 6.755 0 0 1 0 6.7L30.93 31.278a6.709 6.709 0 0 1-5.823 3.349z"
                        transform="rotate(30 -4.005 59.693)"
                        fill="url(#prefix__b)"
                    />
                </G>
                <Path
                    data-name="Path 1310"
                    d="M11.852 0A5.775 5.775 0 0 0 6.9 2.834L.773 13.449a5.582 5.582 0 0 0 0 5.668L6.9 29.732a5.712 5.712 0 0 0 4.947 2.834h12.268a5.775 5.775 0 0 0 4.947-2.834l6.132-10.615a5.582 5.582 0 0 0 0-5.668L29.062 2.834A5.712 5.712 0 0 0 24.115 0z"
                    transform="rotate(30 -6.328 61.062)"
                    fill="url(#prefix__b)"
                />
            </G>
            <Path
                data-name="Path 1296"
                d="M25.415 35.052H13a6.855 6.855 0 0 1-5.894-3.39L.9 20.916a6.838 6.838 0 0 1 0-6.781L7.107 3.39A6.791 6.791 0 0 1 13 0h12.415a6.855 6.855 0 0 1 5.894 3.39l6.207 10.693a6.838 6.838 0 0 1 0 6.781l-6.207 10.8a6.791 6.791 0 0 1-5.894 3.388zM13 .991A5.846 5.846 0 0 0 7.994 3.86L1.786 14.6a5.651 5.651 0 0 0 0 5.738l6.208 10.749A5.782 5.782 0 0 0 13 33.956h12.415a5.846 5.846 0 0 0 5.007-2.869l6.207-10.745a5.651 5.651 0 0 0 0-5.738L30.422 3.86A5.782 5.782 0 0 0 25.415.991z"
                transform="rotate(30 -3.59 59.26)"
                fill="url(#prefix__b)"
                scale={ratio}
            />
        </Svg>
    );
};

export default SelectedPinDot;
