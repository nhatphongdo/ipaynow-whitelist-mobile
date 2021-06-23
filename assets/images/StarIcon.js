import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const StarIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 21, height / 20);
    } else if (width) {
        ratio = width / 21;
    } else if (height) {
        ratio = height / 20;
    }
    return (
        <Svg width={21 * ratio} height={20 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M21.043 8.562A2.02 2.02 0 0 0 19.2 7.287l-4.389-.64-1.969-3.978a2.016 2.016 0 0 0-1.784-1.361 2.018 2.018 0 0 0-1.781 1.363L7.311 6.647l-4.389.64a2.016 2.016 0 0 0-1.847 1.275 2.019 2.019 0 0 0 .743 2.116L5 13.775l-.756 4.375a2.229 2.229 0 0 0 .373 1.9 1.964 1.964 0 0 0 2.512.2l3.929-2.064 3.929 2.065a2.753 2.753 0 0 0 1.27.354 1.593 1.593 0 0 0 1.242-.551 2.225 2.225 0 0 0 .371-1.9l-.75-4.375 3.177-3.1a2.018 2.018 0 0 0 .746-2.117zm-1.682 1.156l-3.429 3.342a.668.668 0 0 0-.192.593l.81 4.722a1.082 1.082 0 0 1-.079.807.99.99 0 0 1-.862-.125l-4.238-2.229a.664.664 0 0 0-.624 0l-4.239 2.23a1.02 1.02 0 0 1-.864.125 1.088 1.088 0 0 1-.078-.807l.81-4.722a.668.668 0 0 0-.192-.593L2.756 9.718c-.339-.331-.448-.612-.405-.743s.3-.3.762-.363l4.741-.688a.671.671 0 0 0 .506-.366l2.12-4.294c.42-.849.742-.849 1.16 0l2.119 4.294a.666.666 0 0 0 .506.366L19 8.613c.467.068.72.231.762.363s-.062.411-.401.742z"
                transform="translate(-1 -1.308)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M18.587 8.328l-3.543 3.453a.69.69 0 0 0-.2.613l.837 4.879a1.118 1.118 0 0 1-.082.834 1.023 1.023 0 0 1-.891-.129l-4.379-2.3a.686.686 0 0 0-.644 0l-4.38 2.3a1.054 1.054 0 0 1-.892.129 1.124 1.124 0 0 1-.08-.834l.837-4.879a.69.69 0 0 0-.2-.613L1.428 8.328c-.351-.342-.463-.632-.419-.768s.3-.3.787-.376l4.9-.711a.693.693 0 0 0 .522-.378l2.191-4.437c.434-.877.766-.877 1.2 0L12.8 6.095a.688.688 0 0 0 .522.378l4.9.712c.482.071.744.238.787.376s-.07.425-.422.767z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default StarIcon;
