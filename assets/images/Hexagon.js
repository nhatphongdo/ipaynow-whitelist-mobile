import React from "react";
import Svg, { Defs, ClipPath, Path, LinearGradient, Stop, G } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Hexagon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 162, height / 150);
    } else if (width) {
        ratio = width / 162;
    } else if (height) {
        ratio = height / 150;
    }
    return (
        <Svg width={162 * ratio} height={150 * ratio} {...others}>
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="none" d="M0 0h161.658v149.603H0z" />
                </ClipPath>
                <LinearGradient id="prefix__c" x1={start[0]} x2={end[0]} y2={end[0]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G scale={ratio} clipPath="url(#prefix__a)">
                <G transform="translate(-.005)" filter="url(#prefix__b)">
                    <Path
                        d="M103.076 135.6H58.592a24.564 24.564 0 0 1-21.121-12.149l-22.241-38.5a24.5 24.5 0 0 1 0-24.3l22.242-38.5A24.335 24.335 0 0 1 58.592 10h44.484a24.564 24.564 0 0 1 21.121 12.149l22.242 38.316a24.5 24.5 0 0 1 0 24.3l-22.242 38.69a24.335 24.335 0 0 1-21.121 12.145z"
                        fill={fill}
                    />
                </G>
                <Path
                    d="M58.587 13.551a20.947 20.947 0 0 0-17.943 10.28L18.398 62.334a20.248 20.248 0 0 0 0 20.56l22.242 38.5a20.717 20.717 0 0 0 17.943 10.28h44.484a20.947 20.947 0 0 0 17.943-10.28l22.242-38.5a20.249 20.249 0 0 0 0-20.56l-22.242-38.5a20.717 20.717 0 0 0-17.939-10.283z"
                    fill={fill}
                />
                <Path
                    d="M105.362 143.142H60.333a24.864 24.864 0 0 1-21.379-12.3L16.439 91.869a24.8 24.8 0 0 1 0-24.6L38.953 28.3A24.633 24.633 0 0 1 60.333 16h45.029a24.864 24.864 0 0 1 21.379 12.3l22.515 38.786a24.8 24.8 0 0 1 0 24.6l-22.515 39.164a24.633 24.633 0 0 1-21.379 12.292zM60.333 19.595A21.2 21.2 0 0 0 42.17 30L19.655 68.976a20.5 20.5 0 0 0 0 20.812l22.515 38.974a20.971 20.971 0 0 0 18.163 10.406h45.029a21.2 21.2 0 0 0 18.163-10.406l22.515-38.974a20.5 20.5 0 0 0 0-20.812L123.525 30a20.971 20.971 0 0 0-18.163-10.406z"
                    transform="translate(-2.175 -6.539)"
                    fill="url(#prefix__c)"
                />
            </G>
        </Svg>
    );
};

export default Hexagon;
