import React from "react";
import Svg, { G, Path } from "react-native-svg";

const TimerIcon = props => {
    const { width, height, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 13, height / 16);
    } else if (width) {
        ratio = width / 13;
    } else if (height) {
        ratio = height / 16;
    }
    return (
        <Svg width={13 * ratio} height={16 * ratio} {...others}>
            <G fill={fill} scale={ratio}>
                <Path d="M10.544 4.867a.418.418 0 0 1-.3-.714l.717-.717a.419.419 0 1 1 .592.592l-.717.717a.417.417 0 0 1-.292.122z" />
                <Path d="M6.307 15.551a6.307 6.307 0 1 1 6.307-6.307 6.315 6.315 0 0 1-6.307 6.307zm0-11.778a5.471 5.471 0 1 0 5.471 5.471 5.477 5.477 0 0 0-5.471-5.472z" />
                <Path d="M6.323 10.167a.418.418 0 0 1-.418-.418v-4.03a.418.418 0 1 1 .837 0v4.03a.418.418 0 0 1-.419.418zM8.368 2.407H3.753a.418.418 0 0 1-.418-.418V.418a.418.418 0 0 1 .418-.423h4.613a.418.418 0 0 1 .418.418v1.571a.418.418 0 0 1-.416.423zm-4.195-.836h3.78V.837H4.174z" />
            </G>
        </Svg>
    );
};

export default TimerIcon;
