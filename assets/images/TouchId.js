import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path, G } from "react-native-svg";

const TouchId = props => {
    const { width, height, start, end, offsets, colors, stroke, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 50, height / 59);
    } else if (width) {
        ratio = width / 50;
    } else if (height) {
        ratio = height / 59;
    }
    return (
        <Svg width={50 * ratio} height={59 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G fill="none" fill-rule="evenodd" stroke={stroke} stroke-linecap="round" stroke-linejoin="round" scale={ratio}>
                <Path d="M15.6225,56.792 C18.545,55.0895 20.9,52.392 22.1375,49.2295 C23.715,45.202 23.455,40.4895 21.445,36.662 C20.4025,34.672 18.87,32.777 18.8475,30.5245 C18.82,27.9845 20.92,25.7295 23.375,25.127 C26.67,24.3195 30.2375,26.1845 32.0775,29.047 C33.915,31.912 34.235,35.552 33.6625,38.9145 C33.0925,42.272 31.71,45.4295 30.3375,48.547 C28.85,51.9295 27.3625,55.3095 25.875,58.692" />
                <Path d="M10.697,51.455 C11.722,50.2 12.607,48.845 13.277,47.3775 C14.1995,45.36 14.677,43.055 14.2345,40.845 C13.707,38.2125 11.9445,35.94 10.8795,33.51 C8.3045,27.6525 11.642,21.295 17.2595,18.845 C23.742,16.02 33.3295,17.14 38.132,22.69 C42.247,27.45 41.8845,34.77 40.8945,40.59 C39.7745,47.1675 37.057,53.4775 32.982,58.75" />
                <Path d="M45.3895,49.26525 C47.0795,44.66275 48.1695,39.77775 48.527,35.04775 C48.982,29.02775 48.4545,21.80025 44.587,16.92275 C38.977,9.85275 29.547,8.09775 21.0695,9.71525 C15.9995,10.67775 10.687,13.08025 6.837,16.69775 C2.9345,20.36275 0.5395,25.28025 1.4395,31.21275 C1.8245,33.74275 2.7795,36.14025 3.612,38.55775 C4.442,40.97525 5.162,43.48775 5.047,46.04275" />
                <Path d="M48.75,10.664 C41.95,2.0915 30.52,-0.0335 20.245,1.924 C14.18,3.079 7.825,5.929 3.175,10.2165" />
            </G>
        </Svg>
    );
};

export default TouchId;
