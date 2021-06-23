import React from "react";
import Svg, { Path, G } from "react-native-svg";

const LuckyDrawGameIcon = props => {
    const { width, height, start, end, offsets, colors, ...others } = props;
    let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / 47, height / 47);
    } else if (width) {
        ratio = width / 47;
    } else if (height) {
        ratio = height / 47;
    }
    return (
        <Svg width={47 * ratio} height={47 * ratio} {...others}>
            <G scale={ratio}>
                <Path
                    d="M41.925 26.953v4.492a2.994 2.994 0 0 1-2.995 2.995h-2.994v-2.995h2.246a.751.751 0 0 0 .749-.749v-2.995a.751.751 0 0 0-.749-.749h-2.246v-2.994h2.995a2.994 2.994 0 0 1 2.994 2.995z"
                    fill="#fcd770"
                />
                <Path d="M35.937 23.958v20.214a1.5 1.5 0 0 1-1.5 1.5H4.495a1.5 1.5 0 0 1-1.5-1.5v-22.46h32.942z" fill="#e6e9ed" />
                <Path
                    d="M32.942 26.206a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5zM26.953 26.206a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"
                    fill="#ef7385"
                />
                <Path d="M17.968 24.706h2.995v2.995h-2.995z" fill="#fcd770" />
                <Path d="M11.979 24.706h2.995v2.995h-2.995zM8.984 24.706h2.995v2.995H8.984zM5.989 24.706h2.995v2.995H5.989z" fill="#b4dd7f" />
                <Path d="M45.669 8.984a2.246 2.246 0 1 1-2.246-2.246 2.246 2.246 0 0 1 2.246 2.246z" fill="#fcd770" />
                <Path d="M35.937 3.743v17.968H2.995V3.743z" fill="#ef7385" />
                <G fill="#ffeaa7">
                    <Path d="M14.974 6.738h8.984v11.979h-8.984z" />
                    <Path d="M5.99 6.738h8.984v11.979H5.99zM23.958 6.738h8.984v11.979h-8.984zM38.183 1.498v1.5a.751.751 0 0 1-.749.749H1.498a.751.751 0 0 1-.749-.752v-1.5a.751.751 0 0 1 .749-.746h35.936a.751.751 0 0 1 .749.749z" />
                </G>
                <Path d="M28.449 30.696v.067l-17.968-.067H5.989v11.979h26.952V30.696z" fill="#b4dd7f" />
                <Path d="M23.958 35.789v2.987a11.238 11.238 0 0 1-4.492.906v-2.993a11.391 11.391 0 0 0 4.492-.9z" fill="#ffc729" />
                <Path d="M19.466 36.685v2.995a11.238 11.238 0 0 1-4.492-.906v-2.995a11.264 11.264 0 0 0 4.492.906z" fill="#fcd770" />
                <Path
                    d="M25.305 30.696h3.145v.067h-.067a6.984 6.984 0 0 1-4.425 5.024 11.392 11.392 0 0 1-4.492.9 11.263 11.263 0 0 1-4.492-.906 6.956 6.956 0 0 1-4.44-5.083h3.085c.569 1.535 2.815 2.995 5.847 2.995s5.278-1.462 5.839-2.997z"
                    fill="#fcd770"
                />
                <Path
                    d="M13.618 30.696h11.687c-.562 1.535-2.808 2.995-5.84 2.995s-5.278-1.46-5.847-2.995zM23.958 35.787a6.984 6.984 0 0 0 4.425-5.024h.067v2.181c0 2.493-1.812 4.672-4.492 5.832zM10.533 30.696a6.956 6.956 0 0 0 4.44 5.083v2.995c-2.68-1.16-4.492-3.339-4.492-5.832v-2.246z"
                    fill="#ffeaa7"
                />
                <Path d="M46.418 8.984a2.995 2.995 0 1 0-3.743 2.888v2.748a2.234 2.234 0 0 1-1.241 2.009l-1.181.591a3.723 3.723 0 0 0-2.069 3.348v2.641h-1.5V4.492h.749a1.5 1.5 0 0 0 1.5-1.5V1.5a1.5 1.5 0 0 0-1.5-1.5H1.5A1.5 1.5 0 0 0 0 1.5V3a1.5 1.5 0 0 0 1.5 1.5h.749v39.68a2.249 2.249 0 0 0 2.246 2.246h29.944a2.249 2.249 0 0 0 2.246-2.246v-8.992h2.246a3.748 3.748 0 0 0 3.743-3.743v-4.493a3.75 3.75 0 0 0-2.995-3.668v-2.716a2.234 2.234 0 0 1 1.241-2.009l1.181-.591a3.723 3.723 0 0 0 2.069-3.348v-2.748a2.991 2.991 0 0 0 2.248-2.888zM36.685 27.7h1.5v3h-1.5zM1.5 1.5h35.934V3H1.5zm33.69 2.995v16.468H3.743V4.492zm-.749 40.429H4.492a.75.75 0 0 1-.749-.749V22.46h31.445v21.712a.75.75 0 0 1-.749.749zm6.738-17.968v4.492a2.249 2.249 0 0 1-2.246 2.246h-2.248v-1.5h1.5a1.5 1.5 0 0 0 1.5-1.5V27.7a1.5 1.5 0 0 0-1.5-1.5h-1.5v-1.5h2.246a2.249 2.249 0 0 1 2.246 2.252zm2.246-16.471a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.502 1.496z" />
                <Path d="M33.691 19.465V5.989H5.241v13.476zm-17.968-1.5V7.489h7.487v10.479zm16.471 0h-7.487V7.489h7.487zM6.741 7.489h7.487v10.479H6.741z" />
                <Path d="M8.235 8.984v2.246h1.5v-.746h1.447l-2.147 5.724 1.4.526 2.293-6.117V8.984zM17.22 8.984v2.246h1.5v-.746h1.447l-2.148 5.727 1.4.526 2.293-6.117V8.984zM27.704 11.23v-.746h1.447l-2.148 5.727 1.4.526 2.293-6.117V8.984h-4.492v2.246zM5.241 43.423h28.45V29.947H5.241zm14.225-8.984c3.15 0 5.434-1.426 6.319-2.995h1.647c-.925 2.609-4.168 4.492-7.966 4.492s-7.045-1.88-7.967-4.492h1.642c.981 1.785 3.481 2.995 6.325 2.995zm-4.416-2.992h8.825a6.612 6.612 0 0 1-4.409 1.5 6.539 6.539 0 0 1-4.416-1.5zm-.825 4.81v1.3a6.021 6.021 0 0 1-2.83-3.425 9.045 9.045 0 0 0 2.83 2.122zm1.5.6a12.153 12.153 0 0 0 2.995.552v1.5a10.576 10.576 0 0 1-2.995-.633zm4.492.552a12.149 12.149 0 0 0 2.995-.555v1.419a10.538 10.538 0 0 1-2.995.633zm4.492-1.158a9.1 9.1 0 0 0 2.831-2.12 6.018 6.018 0 0 1-2.831 3.43zM6.741 31.447h2.995v1.5c0 4.128 4.366 7.487 9.733 7.487s9.733-3.358 9.733-7.487v-1.5h2.995v10.481H6.741zM31.444 23.958a2.246 2.246 0 1 0 2.246 2.246 2.249 2.249 0 0 0-2.246-2.246zm0 2.995a.749.749 0 1 1 .749-.749.75.75 0 0 1-.749.749zM25.455 28.45a2.246 2.246 0 1 0-2.246-2.246 2.249 2.249 0 0 0 2.246 2.246zm0-2.995a.749.749 0 1 1-.749.749.75.75 0 0 1 .749-.746zM15.722 23.958H5.241v4.492h10.481zm-4.492 1.5v1.5h-1.5v-1.5zm-4.492 0h1.5v1.5H6.741zm7.487 1.5h-1.5v-1.5h1.5zM21.712 23.958H17.22v4.492h4.492zm-1.5 2.995h-1.5v-1.5h1.5z" />
            </G>
        </Svg>
    );
};

export default LuckyDrawGameIcon;
