import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const DepositIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 29, height / 23);
    } else if (width) {
        ratio = width / 29;
    } else if (height) {
        ratio = height / 23;
    }
    return (
        <Svg width={29 * ratio} height={23 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G fill="url(#prefix__a)" scale={ratio} transform="translate(0 -1)">
                <G transform="translate(0 .762)">
                    <Path
                        fill="#00B4FE"
                        fillOpacity=".5"
                        d="M23.236,7.2949 C23.058,7.2749 22.871,7.2659 22.693,7.2659 C20.746,7.2659 19.016,8.1749 17.889,9.5879 L3.815,13.3629 C3.173,13.5309 2.52,13.1559 2.352,12.5139 L0.791,6.7219 C0.623,6.0789 1.008,5.4169 1.64,5.2489 L7.027,3.8069 L20.182,0.2769 C20.825,0.1089 21.477,0.4849 21.655,1.1279 L22.416,3.9539 L23.207,6.9189 C23.236,7.0479 23.256,7.1769 23.236,7.2949"
                    />
                </G>
                <G transform="translate(0 3.762)">
                    <Path
                        fill="#00B4FE"
                        d="M17.8893,6.5879 C17.0593,7.6259 16.5553,8.9599 16.5553,10.4029 C16.5553,13.7929 19.3023,16.5409 22.6933,16.5409 C23.1373,16.5409 23.5723,16.4909 23.9973,16.3929 L23.9973,17.5989 C23.9973,18.9229 22.9193,19.9999 21.5953,19.9999 L2.4023,19.9999 C1.0773,19.9999 -0.0007,18.9229 -0.0007,17.5989 L-0.0007,3.2079 C-0.0007,1.8839 1.0773,0.8069 2.4023,0.8069 L21.5953,0.8069 C21.8823,0.8069 22.1593,0.8559 22.4153,0.9539 C23.3343,1.2899 23.9973,2.1699 23.9973,3.2079 L23.9973,4.4139 C23.7503,4.3549 23.4933,4.3149 23.2363,4.2949 C23.0583,4.2749 22.8703,4.2659 22.6933,4.2659 C20.7453,4.2659 19.0163,5.1749 17.8893,6.5879"
                    />
                </G>
                <Path
                    fill="#00B4FE"
                    fillOpacity=".5"
                    d="M27.7614,13.2906 L22.5074,13.2906 L23.6364,12.1606 C23.9774,11.8196 23.9774,11.2676 23.6364,10.9256 C23.2954,10.5846 22.7424,10.5846 22.4014,10.9256 L19.7814,13.5466 C19.4404,13.8876 19.4404,14.4396 19.7814,14.7816 L22.4014,17.4016 C22.7424,17.7426 23.2954,17.7426 23.6364,17.4016 C23.9774,17.0616 23.9774,16.5076 23.6364,16.1666 L22.5074,15.0376 L27.7614,15.0376 C28.2434,15.0376 28.6344,14.6456 28.6344,14.1636 C28.6344,13.6816 28.2434,13.2906 27.7614,13.2906"
                />
            </G>
        </Svg>
    );
};

export default DepositIcon;
