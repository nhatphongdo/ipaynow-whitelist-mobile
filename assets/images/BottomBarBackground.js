import React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const BottomBarBackground = props => {
    const { width, height, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 460, height / 131);
    } else if (width) {
        ratio = width / 460;
    } else if (height) {
        ratio = height / 131;
    }
    return (
        <Svg width={460 * ratio} height={131 * ratio} {...others}>
            <Defs />
            <G filter="url(#prefix__a)" scale={ratio}>
                <Path
                    d="M437.163 116.646H22.5V31.5h148.487a18.036 18.036 0 0 1 9.718 3.977 74.187 74.187 0 0 1 8.666 8.132l1 1.043c3.071 3.18 5.726 6.269 8.294 9.255 9 10.472 16.115 18.744 31.56 18.939h.543c14.4 0 20.9-7.454 29.138-16.892 2.9-3.323 5.9-6.758 9.566-10.3a101.1 101.1 0 0 1 10.912-9.573c3.875-2.762 7.288-4.2 10.741-4.525.181-.018.364-.038.544-.059h145.494v85.148z"
                    fill={fill}
                />
            </G>
        </Svg>
    );
};

export default BottomBarBackground;
