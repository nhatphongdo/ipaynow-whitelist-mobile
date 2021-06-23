import React from "react";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";

const BankIcon = props => {
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
                d="M4.682 10.298h8.123a.194.194 0 0 0 .193-.193V8.943a.194.194 0 0 0-.193-.193h-.58v-.967a.194.194 0 0 0-.193-.193h-.1V4.496h.87a.194.194 0 0 0 .193-.193v-.445a.191.191 0 0 0-.113-.175L8.824 1.808a.24.24 0 0 0-.164 0L4.598 3.683a.191.191 0 0 0-.116.174v.445a.194.194 0 0 0 .193.193h.87V7.59h-.1a.194.194 0 0 0-.193.193v.967h-.57a.194.194 0 0 0-.193.193v1.16a.194.194 0 0 0 .193.195zM9.71 8.751v-.968a.194.194 0 0 0-.193-.193h-.1V4.496h1.165V7.59h-.1a.194.194 0 0 0-.193.193v.967zm-2.514 0v-.968a.194.194 0 0 0-.193-.193h-.1V4.496h1.16V7.59h-.1a.194.194 0 0 0-.193.193v.967zm1.837-1.16h-.58V4.496h.58zm-.87.387h1.16v.774H8.166zm2.514 0h1.16v.774h-1.155zm.87-.387h-.58V4.496h.58zM4.882 3.983l3.864-1.789 3.868 1.789v.126H4.882zm1.064.513h.58V7.59h-.584zm-.29 3.481h1.156v.774h-1.16zm-.774 1.16h7.736v.774H4.882z"
                fill={fill}
                scale={ratio}
            />
            <Path
                d="M8.947 3.162a.257.257 0 0 1 .068.186v.058a.267.267 0 0 1-.074.213.363.363 0 0 1-.216.072v.115h-.114v-.114a1.383 1.383 0 0 1-.258-.032v-.158q.12.012.3.012a.273.273 0 0 0 .125-.022.082.082 0 0 0 .042-.079v-.037a.088.088 0 0 0-.026-.068.109.109 0 0 0-.075-.024h-.085a.328.328 0 0 1-.223-.065.269.269 0 0 1-.074-.212v-.049a.269.269 0 0 1 .07-.2.322.322 0 0 1 .206-.079l-.006-.074.107-.032.007.106a1.556 1.556 0 0 1 .246.032v.158q-.186-.012-.28-.012a.229.229 0 0 0-.117.024.093.093 0 0 0-.039.087v.027a.092.092 0 0 0 .029.075.139.139 0 0 0 .089.024h.1a.262.262 0 0 1 .198.068z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default BankIcon;
