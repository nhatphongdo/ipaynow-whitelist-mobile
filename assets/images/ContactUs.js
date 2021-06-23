import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ContactUs = props => {
    const { width, height, start, end, offsets, colors, fill, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 24, height / 25);
    } else if (width) {
        ratio = width / 24;
    } else if (height) {
        ratio = height / 25;
    }
    return (
        <Svg width={24 * ratio} height={25 * ratio} {...others}>
            <Path
                d="M21.218 8.268a9.714 9.714 0 0 0-19.211 0A3.512 3.512 0 0 0 0 11.425v4.067A3.447 3.447 0 0 0 2.167 18.7a5.933 5.933 0 0 0 5.672 4.2h1.632a1.708 1.708 0 0 0 1.605 1.124h1.445a1.707 1.707 0 0 0 1.712-1.712 1.724 1.724 0 0 0-1.711-1.712h-1.445a1.708 1.708 0 0 0-1.525.936H7.813a4.493 4.493 0 0 1-4.067-2.569 1.7 1.7 0 0 0 1.445-1.686V9.659a1.724 1.724 0 0 0-1.712-1.712 8.324 8.324 0 0 1 16.268 0 1.724 1.724 0 0 0-1.712 1.712v7.572a1.724 1.724 0 0 0 1.712 1.712 3.471 3.471 0 0 0 3.478-3.478v-4.04a3.512 3.512 0 0 0-2.007-3.157z"
                fill={fill}
                scale={ratio}
            />
        </Svg>
    );
};

export default ContactUs;
