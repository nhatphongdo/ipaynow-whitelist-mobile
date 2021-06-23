import React from "react";
import Svg, { G, Path } from "react-native-svg";

const ScanQrIcon = props => {
    const { width, height, fill, ...others } = props;
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
            <G fill={fill} scale={ratio}>
                <Path d="M20.035 9.062H.823a.824.824 0 1 0 0 1.647h19.212a.824.824 0 1 0 0-1.647zM14.275 1.652h2.745a1.647 1.647 0 0 1 1.647 1.647V5.22a.824.824 0 1 0 1.647 0V3.299A3.293 3.293 0 0 0 17.017.005h-2.742a.829.829 0 0 0 0 1.647zM1.372 6.044a.824.824 0 0 0 .823-.823V3.299a1.647 1.647 0 0 1 1.648-1.647h2.745A.829.829 0 0 0 6.778.01a.85.85 0 0 0-.19 0H3.843A3.293 3.293 0 0 0 .549 3.299V5.22a.824.824 0 0 0 .823.824zM6.878 18.119H3.843a1.647 1.647 0 0 1-1.647-1.647v-1.937a.807.807 0 0 0-.807-.807h-.033a.807.807 0 0 0-.807.807v1.938a3.293 3.293 0 0 0 3.294 3.294h3.052a.807.807 0 0 0 .79-.807v-.032a.807.807 0 0 0-.807-.809zM19.487 13.728a.824.824 0 0 0-.823.823v1.921a1.647 1.647 0 0 1-1.647 1.647h-3.02a.824.824 0 1 0 0 1.647h3.019a3.293 3.293 0 0 0 3.294-3.294v-1.921a.824.824 0 0 0-.823-.823z" />
            </G>
        </Svg>
    );
};

export default ScanQrIcon;
