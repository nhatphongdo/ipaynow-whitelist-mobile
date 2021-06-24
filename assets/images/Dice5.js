import React from "react";
import Svg, { G, Path } from "react-native-svg";

const Dice5 = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 80, height / 80);
    } else if (width) {
        ratio = width / 80;
    } else if (height) {
        ratio = height / 80;
    }
    return (
        <Svg width={80 * ratio} height={80 * ratio} {...others}>
            <G scale={ratio}>
                <Path
                    d="M71.256 78.25H39.78c-3.863 0-6.995-2.447-6.995-5.464V7.213c0-3.018 3.132-5.464 6.995-5.464h31.476c3.863 0 6.995 2.447 6.995 5.464v65.573c0 3.018-3.132 5.464-6.995 5.464"
                    fill="#ffa800"
                />
                <Path
                    d="M40.22 78.25H8.744c-3.863 0-6.995-2.447-6.995-5.464V7.213c0-3.018 3.132-5.464 6.995-5.464H40.22c3.863 0 6.995 2.447 6.995 5.464v65.573c0 3.018-3.132 5.464-6.995 5.464"
                    fill="#fff"
                />
                <Path
                    d="M67.725 78.25H12.276a5.375 5.375 0 0 1-5.281-5.464V7.213a5.375 5.375 0 0 1 5.281-5.463h55.449a5.375 5.375 0 0 1 5.284 5.463v65.573a5.375 5.375 0 0 1-5.284 5.464"
                    fill="#ffe100"
                />
                <Path d="M31.153 24.158a6.995 6.995 0 1 1-6.995-6.995 7 7 0 0 1 6.995 6.995" fill="#f80" />
                <Path
                    d="M26.221 24.158c0 3.863-1.957 6.995-4.372 6.995s-4.372-3.132-4.372-6.995 1.957-6.995 4.372-6.995 4.372 3.132 4.372 6.995"
                    fill="#ffa800"
                />
                <Path d="M62.836 24.158a6.995 6.995 0 1 1-6.995-6.995 6.995 6.995 0 0 1 6.995 6.995" fill="#f80" />
                <Path
                    d="M58.488 24.158c0 3.863-1.957 6.995-4.372 6.995s-4.372-3.132-4.372-6.995 1.957-6.995 4.372-6.995 4.372 3.132 4.372 6.995"
                    fill="#ffa800"
                />
                <Path d="M46.994 40a6.995 6.995 0 1 1-6.995-6.995A7 7 0 0 1 46.994 40" fill="#f80" />
                <Path
                    d="M42.354 40c0 3.863-1.957 6.995-4.372 6.995S33.61 43.863 33.61 40s1.957-6.995 4.372-6.995 4.372 3.132 4.372 6.995"
                    fill="#ffa800"
                />
                <Path d="M31.153 55.842a6.995 6.995 0 1 1-6.995-6.995 6.995 6.995 0 0 1 6.995 6.995" fill="#f80" />
                <Path
                    d="M26.221 55.842c0 3.863-1.957 6.995-4.372 6.995s-4.372-3.132-4.372-6.995 1.957-6.995 4.372-6.995 4.372 3.132 4.372 6.995"
                    fill="#ffa800"
                />
                <Path d="M62.836 55.842a6.995 6.995 0 1 1-6.995-6.995 6.995 6.995 0 0 1 6.995 6.995" fill="#f80" />
                <Path
                    d="M58.488 55.842c0 3.863-1.957 6.995-4.372 6.995s-4.372-3.132-4.372-6.995 1.957-6.995 4.372-6.995 4.372 3.132 4.372 6.995"
                    fill="#ffa800"
                />
                <Path d="M73.103 80H6.896c-3.8 0-6.9-2.778-6.9-6.193V29.219a1.315 1.315 0 0 1 1.379-1.239 1.315 1.315 0 0 1 1.379 1.239v44.588a3.948 3.948 0 0 0 4.142 3.716h66.207a3.948 3.948 0 0 0 4.138-3.716v-4.954a1.387 1.387 0 0 1 2.759 0v4.954C79.996 77.221 76.906 80 73.103 80zM78.62 52.02a1.314 1.314 0 0 1-1.379-1.239V6.193a3.948 3.948 0 0 0-4.138-3.716H6.897a3.948 3.948 0 0 0-4.138 3.716v4.954a1.315 1.315 0 0 1-1.379 1.239 1.315 1.315 0 0 1-1.383-1.239V6.193c0-3.415 3.1-6.193 6.9-6.193h66.206c3.8 0 6.9 2.778 6.9 6.193v44.588a1.314 1.314 0 0 1-1.383 1.239zM3.497 18.14a1.749 1.749 0 1 1-1.749-1.749 1.749 1.749 0 0 1 1.749 1.749M79.999 61.858a1.749 1.749 0 1 1-1.749-1.749 1.749 1.749 0 0 1 1.749 1.749" />
                <Path d="M40 48.743a8.743 8.743 0 1 1 8.743-8.742A8.753 8.753 0 0 1 40 48.743zm0-13.988a5.246 5.246 0 1 0 5.246 5.246A5.252 5.252 0 0 0 40 34.751zM24.374 64.37a8.743 8.743 0 1 1 8.74-8.739 8.753 8.753 0 0 1-8.74 8.739zm0-13.989a5.246 5.246 0 1 0 5.243 5.25 5.252 5.252 0 0 0-5.243-5.25zM24.374 33.115a8.743 8.743 0 1 1 8.743-8.743 8.753 8.753 0 0 1-8.743 8.743zm0-13.989a5.246 5.246 0 1 0 5.246 5.246 5.252 5.252 0 0 0-5.246-5.246zM55.629 64.37a8.743 8.743 0 1 1 8.742-8.739 8.753 8.753 0 0 1-8.742 8.739zm0-13.989a5.246 5.246 0 1 0 5.245 5.25 5.252 5.252 0 0 0-5.245-5.25zM55.629 33.115a8.743 8.743 0 1 1 8.743-8.743 8.753 8.753 0 0 1-8.743 8.743zm0-13.989a5.246 5.246 0 1 0 5.246 5.246 5.252 5.252 0 0 0-5.246-5.246z" />
                <Path d="M75.192 71.255H13.114a4.376 4.376 0 0 1-4.372-4.372V13.55a1.75 1.75 0 0 1 3.5 0v53.333a.876.876 0 0 0 .874.874h62.078a1.75 1.75 0 0 1 0 3.5z" />
                <Path d="M68 71.261h-4.558a1.3 1.3 0 1 1 0-2.6H68a.652.652 0 0 0 .651-.651v-56a.652.652 0 0 0-.651-.651H12a.652.652 0 0 0-.651.651v5.851a1.3 1.3 0 0 1-2.6 0V12a3.26 3.26 0 0 1 3.256-3.256h56A3.259 3.259 0 0 1 71.261 12v56A3.259 3.259 0 0 1 68 71.261z" />
                <Path d="M12.24 22.241a1.749 1.749 0 1 0-1.749 1.749 1.749 1.749 0 0 0 1.749-1.749" />
            </G>
        </Svg>
    );
};

export default Dice5;