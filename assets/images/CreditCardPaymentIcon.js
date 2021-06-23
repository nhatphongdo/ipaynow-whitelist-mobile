import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const CreditCardPaymentIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 19, height / 13);
    } else if (width) {
        ratio = width / 19;
    } else if (height) {
        ratio = height / 13;
    }
    return (
        <Svg width={19 * ratio} height={13 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M2.79 0h12.48a2.8 2.8 0 0 1 2.79 2.79v6.97a2.8 2.8 0 0 1-2.79 2.79H2.79A2.8 2.8 0 0 1 0 9.761V2.79A2.8 2.8 0 0 1 2.79 0zm5.091 8l-5.09-.013A.609.609 0 0 1 2.8 6.766l5.09.013A.608.608 0 0 1 7.881 8zm5.879-.705a1.386 1.386 0 1 1-.949 2.4 1.386 1.386 0 1 1 0-2.02 1.379 1.379 0 0 1 .949-.376zm-5.879 2.871l-5.09-.013A.609.609 0 0 1 2.8 8.935l5.09.014a.608.608 0 0 1-.008 1.217zm9.155-4.653H1.025v4.248a1.772 1.772 0 0 0 1.765 1.766h12.48a1.772 1.772 0 0 0 1.766-1.766V5.513zM1.025 2.928h16.011V2.79a1.772 1.772 0 0 0-1.766-1.765H2.79A1.772 1.772 0 0 0 1.025 2.79v.138z"
                fill="url(#prefix__a)"
                scale={ratio}
            />
        </Svg>
    );
};

export default CreditCardPaymentIcon;
