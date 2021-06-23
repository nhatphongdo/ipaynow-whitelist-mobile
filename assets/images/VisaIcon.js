import React from "react";
import Svg, { G, Path } from "react-native-svg";

const VisaIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 41, height / 14);
    } else if (width) {
        ratio = width / 41;
    } else if (height) {
        ratio = height / 14;
    }
    return (
        <Svg width={41 * ratio} height={14 * ratio} {...others}>
            <G fill="#0055a5" scale={ratio}>
                <Path d="M17.504 12.882h-3.295L16.268.226h3.3zM11.438.226l-3.141 8.7-.372-1.874-1.109-5.691A1.411 1.411 0 0 0 5.253.221H.06l-.061.214a12.3 12.3 0 0 1 3.447 1.447l2.863 10.995h3.433L14.984.221zM37.353 12.882h3.025L37.74.226h-2.648a1.514 1.514 0 0 0-1.521.943l-4.914 11.713h3.434l.687-1.88h4.189zm-3.626-4.477l1.731-4.736.974 4.736zM28.916 3.27l.47-2.718A9.51 9.51 0 0 0 26.423 0c-1.635 0-5.518.715-5.518 4.19 0 3.27 4.557 3.31 4.557 5.027s-4.087 1.41-5.436.327l-.49 2.841a9.231 9.231 0 0 0 3.719.715c2.248 0 5.641-1.165 5.641-4.332 0-3.29-4.6-3.6-4.6-5.027s3.21-1.248 4.62-.471z" />
            </G>
            <Path
                d="M7.925 7.057L6.816 1.366A1.411 1.411 0 0 0 5.253.226H.06L-.001.44a12.769 12.769 0 0 1 4.89 2.455 9.87 9.87 0 0 1 3.036 4.162z"
                fill="#fc9220"
                scale={ratio}
            />
        </Svg>
    );
};

export default VisaIcon;
