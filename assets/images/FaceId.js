import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const FaceId = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 60, height / 60);
    } else if (width) {
        ratio = width / 60;
    } else if (height) {
        ratio = height / 60;
    }
    return (
        <Svg width={60 * ratio} height={60 * ratio} {...others}>
            <Defs>
                <LinearGradient id="prefix__a" x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} gradientUnits="objectBoundingBox">
                    {colors.map((color, index) => (
                        <Stop key={index} offset={offsets ? offsets[index] : index} stopColor={color} />
                    ))}
                </LinearGradient>
            </Defs>
            <G scale={ratio}>
                <Path
                    fill="url(#prefix__a)"
                    d="M184.097495,67.0927835 L191.175258,67.0927835 C195.445501,67.0927835 198.907216,70.5544994 198.907216,74.8247423 L198.907216,82.3772954 C198.907216,83.231344 199.59956,83.9236872 200.453608,83.9236872 C201.307657,83.9236872 202,83.231344 202,82.3772954 L202,74.8247423 C202,68.8464022 197.153598,64 191.175258,64 L184.097495,64 C183.243447,64 182.551103,64.6923432 182.551103,65.5463918 C182.551103,66.4004403 183.243447,67.0927835 184.097495,67.0927835 Z M198.907216,106.097495 L198.907216,113.175258 C198.907216,117.445501 195.445501,120.907216 191.175258,120.907216 L184.180855,120.907216 C183.326807,120.907216 182.634464,121.59956 182.634464,122.453608 C182.634464,123.307657 183.326807,124 184.180855,124 L191.175258,124 C197.153598,124 202,119.153598 202,113.175258 L202,106.097495 C202,105.243447 201.307657,104.551103 200.453608,104.551103 C199.59956,104.551103 198.907216,105.243447 198.907216,106.097495 Z M159.986469,120.907216 L152.824742,120.907216 C148.554499,120.907216 145.092784,117.445501 145.092784,113.175258 L145.092784,106.155485 C145.092784,105.301436 144.40044,104.609093 143.546392,104.609093 C142.692343,104.609093 142,105.301436 142,106.155485 L142,113.175258 C142,119.153598 146.846402,124 152.824742,124 L159.986469,124 C160.840518,124 161.532861,123.307657 161.532861,122.453608 C161.532861,121.59956 160.840518,120.907216 159.986469,120.907216 Z M179.72768,105.00371 C180.445399,104.317659 181.591936,104.334517 182.288541,105.041363 C182.985146,105.748208 182.968029,106.877374 182.250309,107.563425 C179.575465,110.120245 176.123868,111.4 172,111.4 C167.876132,111.4 164.424535,110.120245 161.749691,107.563425 C161.031971,106.877374 161.014854,105.748208 161.711459,105.041363 C162.408064,104.334517 163.554601,104.317659 164.27232,105.00371 C166.246427,106.890711 168.787493,107.832867 172,107.832867 C175.212507,107.832867 177.753573,106.890711 179.72768,105.00371 Z M173.126433,84.1 C174.161175,84.1 175,84.9281946 175,85.9498245 L175,85.9498245 L175,95.74992 L174.997615,95.8432369 C174.826523,99.1875471 172.896458,101.2 169.673567,101.2 C168.638825,101.2 167.8,100.371805 167.8,99.3501755 C167.8,98.3285457 168.638825,97.500351 169.673567,97.500351 C170.797276,97.500351 171.173056,97.1205433 171.252865,95.7010528 L171.252865,95.7010528 L171.252865,85.9498245 C171.252865,84.9281946 172.09169,84.1 173.126433,84.1 Z M183.7,84.1 C184.694113,84.1 185.5,84.936883 185.5,85.9692304 L185.5,85.9692304 L185.5,90.3307696 C185.5,91.363117 184.694113,92.2 183.7,92.2 C182.705887,92.2 181.9,91.363117 181.9,90.3307696 L181.9,90.3307696 L181.9,85.9692304 C181.9,84.936883 182.705887,84.1 183.7,84.1 Z M160.3,84.1 C161.294113,84.1 162.1,84.936883 162.1,85.9692304 L162.1,85.9692304 L162.1,90.3307696 C162.1,91.363117 161.294113,92.2 160.3,92.2 C159.305887,92.2 158.5,91.363117 158.5,90.3307696 L158.5,90.3307696 L158.5,85.9692304 C158.5,84.936883 159.305887,84.1 160.3,84.1 Z M159.933916,64 C160.787964,64 161.480308,64.6923432 161.480308,65.5463918 C161.480308,66.4004403 160.787964,67.0927835 159.933916,67.0927835 L159.933916,67.0927835 L152.824742,67.0927835 C148.554499,67.0927835 145.092784,70.5544994 145.092784,74.8247423 L145.092784,74.8247423 L145.092784,82.1157378 C145.092784,82.9697863 144.40044,83.6621295 143.546392,83.6621295 C142.692343,83.6621295 142,82.9697863 142,82.1157378 L142,82.1157378 L142,74.8247423 C142,68.8464022 146.846402,64 152.824742,64 L152.824742,64 Z"
                    transform="translate(-142 -64)"
                />
            </G>
        </Svg>
    );
};

export default FaceId;