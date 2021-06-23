import React from "react";
import Svg, { Path, G } from "react-native-svg";

const RollingDiceGameIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 49, height / 46);
    } else if (width) {
        ratio = width / 49;
    } else if (height) {
        ratio = height / 46;
    }
    return (
        <Svg width={49 * ratio} height={46 * ratio} {...others}>
            <G scale={ratio}>
                <Path d="M33.73 41.429h1.446a3.122 3.122 0 0 1-3.127 3.127H3.909a3.126 3.126 0 0 1-3.127-3.127z" fill="#cf9e76" />
                <Path
                    d="M43.773.782a3.909 3.909 0 0 1 0 7.817 2.932 2.932 0 0 1-.376-.039h-.008a19.321 19.321 0 0 0-3.486-3.486v-.008a3.038 3.038 0 0 1-.038-.375A3.91 3.91 0 0 1 43.773.782z"
                    fill="#ffeaa7"
                />
                <Path d="M22.668 32.041v9.388H3.908v-18.76h18.76z" fill="#e6e9ed" />
                <Path
                    d="M39.741 33.675l-7.715 7.707-9.349-9.341h-.008v-7.832l7.058-7.058c.274.257.539.515.8.782 5.25 5.244 8.55 11.153 9.214 15.742z"
                    fill="#ccd1d9"
                />
                <Path d="M34.394 28.14a2.345 2.345 0 1 1-2.345-2.345 2.345 2.345 0 0 1 2.345 2.345z" fill="#ef7385" />
                <Path
                    d="M32.026 41.382l7.715-7.707c.375 2.579-.078 4.736-1.484 6.144a6.168 6.168 0 0 1-4.527 1.61h-1.7zM29.727 17.147l-7.058 7.059v-1.54H9.302v-.063c-2.665-5.206-3.1-9.951-.657-12.4l.735-.594c4.151-2.793 12.82.38 20.347 7.538z"
                    fill="#aab2bd"
                />
                <Path
                    d="M47.68 20.996v.75a20.23 20.23 0 0 1-5.425 13.781l-4 4.291c1.407-1.408 1.86-3.565 1.484-6.144-.664-4.589-3.963-10.5-9.208-15.743a53.253 53.253 0 0 0-.8-.782c-7.528-7.16-16.2-10.334-20.348-7.536l5.386-4.346a20.194 20.194 0 0 1 25.138-.2 19.318 19.318 0 0 1 3.486 3.486 20.069 20.069 0 0 1 4.287 12.443z"
                    fill="#ffeaa7"
                />
                <G fill="#fcd770">
                    <Path d="M19.542 36.738a1.563 1.563 0 1 1-1.564-1.563 1.563 1.563 0 0 1 1.564 1.563zM10.162 36.738a1.563 1.563 0 1 1-1.564-1.563 1.563 1.563 0 0 1 1.564 1.563zM14.852 32.048a1.563 1.563 0 1 1-1.564-1.563 1.563 1.563 0 0 1 1.564 1.563zM19.542 27.358a1.563 1.563 0 1 1-1.564-1.563 1.563 1.563 0 0 1 1.564 1.563zM10.162 27.358a1.563 1.563 0 1 1-1.564-1.563 1.563 1.563 0 0 1 1.564 1.563z" />
                </G>
                <Path d="M18.351 5.626l.8 1.345a16.7 16.7 0 0 1 1.489-.781l-.653-1.419a17.924 17.924 0 0 0-1.636.855zM20.812 4.415l.582 1.45c.494-.2 1-.374 1.507-.521l-.438-1.5a18.96 18.96 0 0 0-1.651.571zM23.267 3.627l.368 1.519a16.42 16.42 0 0 1 14.235 3.3l1-1.2a17.82 17.82 0 0 0-15.6-3.617zM45.281 23.162l-1.559-.12c-.039.491-.1.989-.184 1.479l1.54.264c.093-.538.161-1.084.203-1.623zM44.728 26.382l-1.51-.4c-.128.478-.28.956-.452 1.421l1.467.541c.188-.514.354-1.038.495-1.562zM43.597 29.444l-1.411-.671a17.48 17.48 0 0 1-.7 1.313l1.344.8c.276-.471.537-.956.767-1.442z" />
                <Path d="M48.464 4.69a4.687 4.687 0 0 0-9.248-1.09 20.98 20.98 0 0 0-24.94 1.055L8.992 8.924a5.739 5.739 0 0 0-.9.732c-2.444 2.443-2.429 6.962-.01 12.231H3.127v18.76H0v.782a3.913 3.913 0 0 0 3.908 3.908h28.14a3.9 3.9 0 0 0 3.852-3.378 6.143 6.143 0 0 0 2.9-1.587l.017-.021 4-4.292a20.933 20.933 0 0 0 5.637-14.318V21a20.877 20.877 0 0 0-3.6-11.751 4.694 4.694 0 0 0 3.61-4.559zm-4.69-3.127a3.126 3.126 0 0 1 .019 6.251 21.168 21.168 0 0 0-3.144-3.144 3.128 3.128 0 0 1 3.125-3.107zM9.181 10.781l.471-.381c3.6-2.7 11.809.252 18.948 6.771l-5.15 5.151v-.435H9.819c-2.426-4.915-2.671-9.047-.638-11.106zM37.7 39.269a5.248 5.248 0 0 1-3.828 1.374l5.2-5.2a5.31 5.31 0 0 1-1.363 3.818zm-14.25-5.356l6.734 6.734H23.45zm8.576 6.365L23.45 31.7v-7.17l6.282-6.281c.081.08.165.154.246.234 4.922 4.922 8.132 10.564 8.908 14.932zM4.69 23.45h17.2v17.2H4.69zm29.57 18.76a2.35 2.35 0 0 1-2.211 1.563H3.908A2.35 2.35 0 0 1 1.7 42.211zM46.9 21.743a19.376 19.376 0 0 1-5.217 13.251l-1.067 1.145a14.533 14.533 0 0 0-.953-5.924 35.987 35.987 0 0 0-8.58-12.836c-6.218-6.218-13.211-9.711-18.229-9.565l2.4-1.939A19.435 19.435 0 0 1 46.9 21z" />
                <Path d="M10.303 11.867c-1.1 1.1-1.211 3.487-.292 6.379l1.49-.473c-.81-2.551-.615-4.277-.093-4.8a2.538 2.538 0 0 1 1.748-.486 14.372 14.372 0 0 1 6.022 1.8l.707-1.393c-4.195-2.132-8.054-2.554-9.582-1.027zM20.004 14.722q.721.4 1.471.873l.836-1.32a31.466 31.466 0 0 0-1.55-.921zM28.922 28.141a3.127 3.127 0 1 0 3.127-3.127 3.13 3.13 0 0 0-3.127 3.127zm3.127-1.563a1.563 1.563 0 1 1-1.563 1.563 1.565 1.565 0 0 1 1.563-1.564zM8.598 29.704a2.345 2.345 0 1 0-2.345-2.345 2.348 2.348 0 0 0 2.345 2.345zm0-3.127a.782.782 0 1 1-.782.782.782.782 0 0 1 .782-.782zM17.979 29.704a2.345 2.345 0 1 0-2.345-2.345 2.348 2.348 0 0 0 2.345 2.345zm0-3.127a.782.782 0 1 1-.782.782.782.782 0 0 1 .782-.782zM8.598 34.394a2.345 2.345 0 1 0 2.345 2.345 2.348 2.348 0 0 0-2.345-2.345zm0 3.127a.782.782 0 1 1 .782-.782.782.782 0 0 1-.782.782zM17.979 34.394a2.345 2.345 0 1 0 2.345 2.345 2.348 2.348 0 0 0-2.345-2.345zm0 3.127a.782.782 0 1 1 .782-.782.782.782 0 0 1-.782.782zM13.288 29.704a2.345 2.345 0 1 0 2.345 2.345 2.348 2.348 0 0 0-2.345-2.345zm0 3.127a.782.782 0 1 1 .782-.782.782.782 0 0 1-.782.782z" />
            </G>
        </Svg>
    );
};

export default RollingDiceGameIcon;
