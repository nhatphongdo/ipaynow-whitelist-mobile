import React from "react";
import Svg, { Path } from "react-native-svg";

const RubyIcon = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 25, height / 22);
    } else if (width) {
        ratio = width / 25;
    } else if (height) {
        ratio = height / 22;
    }
    return (
        <Svg width={25 * ratio} height={22 * ratio} {...others}>
            <Path
                d="M23.892 5.486L21.264 1.2A2.5 2.5 0 0 0 19.146 0H5.113a2.463 2.463 0 0 0-2.118 1.2L.367 5.486A2.422 2.422 0 0 0 .52 8.267L10.138 21a2.488 2.488 0 0 0 3.98 0l9.62-12.733a2.461 2.461 0 0 0 .154-2.781zm-3.674-3.649l2.628 4.287c.026.051.026.1.051.153h-5.766l-1.993-5.052h4.031a1.243 1.243 0 0 1 1.049.612zM8.455 6.3l2.016-5.05h3.343l1.99 5.052zm7.425 1.2l-3.75 11.841L8.379 7.5zM4.016 1.837a1.252 1.252 0 0 1 1.072-.612h4.057L7.129 6.277H1.388c.026-.051 0-.1.051-.153zm7.122 18.422L1.49 7.553v-.026h5.613l4.035 12.732zm1.99 0L17.156 7.5h5.613v.026z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default RubyIcon;
