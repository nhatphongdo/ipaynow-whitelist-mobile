import React from "react";
import Svg, { G, Path } from "react-native-svg";

const CheckBoxIcon = props => {
    const { width, height, start, end, offsets, colors, fill, checked, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 22, height / 22);
    } else if (width) {
        ratio = width / 22;
    } else if (height) {
        ratio = height / 22;
    }
    return (
        <Svg width={22 * ratio} height={22 * ratio} {...others}>
            <G fill={fill} scale={ratio}>
                <Path d="M20.608 5.419a6.669 6.669 0 0 0-3.824-4.61A21.706 21.706 0 0 0 10.577 0a20.737 20.737 0 0 0-6.183.808A6.664 6.664 0 0 0 .548 5.419a21.038 21.038 0 0 0-.546 5.135 21.038 21.038 0 0 0 .546 5.135 6.7 6.7 0 0 0 3.846 4.631 21.706 21.706 0 0 0 6.205.808 20.737 20.737 0 0 0 6.183-.808 6.619 6.619 0 0 0 3.826-4.61 21.038 21.038 0 0 0 .546-5.135 21.1 21.1 0 0 0-.546-5.156zm-1.005 5.135a19.563 19.563 0 0 1-.5 4.807 5.246 5.246 0 0 1-2.884 3.518 18.854 18.854 0 0 1-5.637.7 18.745 18.745 0 0 1-5.637-.7 5.2 5.2 0 0 1-2.884-3.54 19.155 19.155 0 0 1-.5-4.785 19.563 19.563 0 0 1 .5-4.807A5.246 5.246 0 0 1 4.94 2.229a18.854 18.854 0 0 1 5.637-.7 18.6 18.6 0 0 1 5.637.721 5.177 5.177 0 0 1 2.884 3.518 19.268 19.268 0 0 1 .503 4.785z" />
                {checked && <Path d="M9.157 11.929L6.535 9.307l-1.355 1.36 3.977 3.977 6.817-6.817-1.355-1.36z" />}
            </G>
        </Svg>
    );
};

export default CheckBoxIcon;
