import React from "react";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";

const BitcoinIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 18, height / 13);
    } else if (width) {
        ratio = width / 18;
    } else if (height) {
        ratio = height / 13;
    }
    return (
        <Svg width={18 * ratio} height={13 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Rect width={17.931} height={12.551} rx={4} fill="url(#prefix__a)" scale={ratio} />
            <Path
                d="M9.515 8.103h.14a1.441 1.441 0 0 0 .66-.136.911.911 0 0 0 .17-.111.822.822 0 0 0 .3-.672.769.769 0 0 0-.3-.639.912.912 0 0 0-.175-.107 1.513 1.513 0 0 0-.651-.124h-.835v1.789h.689zm-.016-2.925h.017a1.107 1.107 0 0 0 .729-.229.747.747 0 0 0 .071-.068.8.8 0 0 0 .2-.563.641.641 0 0 0-.2-.5 1.242 1.242 0 0 0-.8-.246h-.692v1.609h.672zM6.275 9.229v-1.08h.612a.411.411 0 0 0 .411-.412v-3.8a.411.411 0 0 0-.411-.412h-.612V2.443h1.94v-.907h.8v.907h.5v-.907h.8v.935a2.6 2.6 0 0 1 1.2.389 1.34 1.34 0 0 1 .609 1.173 1.388 1.388 0 0 1-.372.96 1.951 1.951 0 0 1-.949.573v.023a1.882 1.882 0 0 1 1.157.535 1.5 1.5 0 0 1 .433 1.084 1.811 1.811 0 0 1-.667 1.479 2.56 2.56 0 0 1-1.412.528v.926h-.8v-.912h-.5v.907h-.8v-.907z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default BitcoinIcon;
