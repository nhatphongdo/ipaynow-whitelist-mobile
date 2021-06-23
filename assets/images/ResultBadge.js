import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const ResultBadge = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 28, height / 28);
    } else if (width) {
        ratio = width / 28;
    } else if (height) {
        ratio = height / 28;
    }
    return (
        <Svg width={28 * ratio} height={28 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <Path
                d="M437.735 239.47a1.735 1.735 0 1 1 1.735-1.735 1.737 1.737 0 0 1-1.735 1.735zm0-2.314a.578.578 0 1 0 .578.578.579.579 0 0 0-.578-.577z"
                transform="translate(-411.707 -223.275)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M227.735 399.47a1.735 1.735 0 1 1 1.735-1.735 1.737 1.737 0 0 1-1.735 1.735zm0-2.314a.578.578 0 1 0 .578.578.579.579 0 0 0-.578-.577z"
                transform="translate(-213.853 -374.02)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M18.314 20.627a2.314 2.314 0 1 1 2.314-2.314 2.316 2.316 0 0 1-2.314 2.314zm0-3.47a1.157 1.157 0 1 0 1.157 1.157 1.158 1.158 0 0 0-1.157-1.157z"
                transform="translate(-16 -16)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M63.012 319.138h-.007a.578.578 0 0 1-.53-.364l-1.3-3.26-3.26 1.3a.578.578 0 0 1-.746-.765l3.181-7.423a.578.578 0 0 1 .961-.16 9.509 9.509 0 0 0 4.711 2.851.578.578 0 0 1 .388.788l-2.862 6.678a.578.578 0 0 1-.536.355zm-1.519-4.954a.578.578 0 0 1 .537.364l1 2.5 2.054-4.793a10.646 10.646 0 0 1-4.016-2.376l-2.291 5.346 2.5-1a.578.578 0 0 1 .216-.042z"
                transform="translate(-54.739 -291.374)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M297.122 312.444a.578.578 0 0 1-.532-.351l-2.919-6.81a.578.578 0 0 1 .361-.781 9.518 9.518 0 0 0 4.6-3.113.578.578 0 0 1 .981.137l3.357 7.834a.578.578 0 0 1-.746.765l-3.26-1.3-1.3 3.26a.579.579 0 0 1-.53.364zm-2.142-7.044l2.123 4.953 1-2.5a.578.578 0 0 1 .752-.322l2.5 1-2.448-5.711a10.65 10.65 0 0 1-3.927 2.58z"
                transform="translate(-277.566 -284.68)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M77.7 37.4a10.674 10.674 0 1 1 3.156-.474 10.738 10.738 0 0 1-3.156.474zm0-20.244a9.543 9.543 0 1 0 9.544 9.544 9.555 9.555 0 0 0-9.544-9.543z"
                transform="translate(-64.05 -16)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M143.652 99.3a6.652 6.652 0 1 1 6.652-6.652 6.659 6.659 0 0 1-6.652 6.652zm0-12.147a5.495 5.495 0 1 0 5.495 5.495 5.5 5.5 0 0 0-5.495-5.491z"
                transform="translate(-130.001 -81.951)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
            <Path
                d="M188.125 133.765a.579.579 0 0 1-.269-.066l-1.878-.988-1.878.988a.578.578 0 0 1-.839-.61l.359-2.092-1.52-1.481a.578.578 0 0 1 .321-.987l2.1-.305.939-1.9a.578.578 0 0 1 1.037 0l.939 1.9 2.1.305a.578.578 0 0 1 .321.987l-1.52 1.484.359 2.092a.579.579 0 0 1-.57.676zm-4.379-4.259l.9.875a.578.578 0 0 1 .166.512l-.212 1.236 1.11-.584a.578.578 0 0 1 .538 0l1.11.584-.212-1.236a.579.579 0 0 1 .166-.512l.9-.875-1.241-.18a.578.578 0 0 1-.436-.316l-.555-1.125-.555 1.125a.578.578 0 0 1-.435.316z"
                transform="translate(-172.327 -119.637)"
                fill="url(#prefix__a)"
                scale={ratio}
            />
        </Svg>
    );
};

export default ResultBadge;
