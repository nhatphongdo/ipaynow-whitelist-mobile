import ThemeStyle from "../assets/themes/ThemeStyle";

let _colorfulLightTheme = null;
let _colorfulDarkTheme = null;
let _simpleLightTheme = null;
let _simpleDarkTheme = null;

let _currentTheme;

function setTheme(theme) {
    _currentTheme = theme;
}

function getTheme() {
    return _currentTheme;
}

function getThemeStyle() {
    switch (_currentTheme) {
        // Support only 1 theme for now
        // case 'colorful-dark':
        //     if (!_colorfulDarkTheme) {
        //         _colorfulDarkTheme = ThemeStyle('colorful-dark');
        //     }
        //     return _colorfulDarkTheme;
        // case 'simple-light':
        //     if (!_simpleLightTheme) {
        //         _simpleLightTheme = ThemeStyle('simple-light');
        //     }
        //     return _simpleLightTheme;
        // case 'simple-dark':
        //     if (!_simpleDarkTheme) {
        //         _simpleDarkTheme = ThemeStyle('simple-dark');
        //     }
        //     return _simpleDarkTheme;
        // case "colorful-light":
        //     if (!_colorfulLightTheme) {
        //         _colorfulLightTheme = ThemeStyle("colorful-light");
        //     }
        //     return _colorfulLightTheme;
        default:
            if (!_simpleLightTheme) {
                _simpleLightTheme = ThemeStyle("simple-light");
            }
            return _simpleLightTheme;
    }
}

export default {
    setTheme,
    getTheme,
    getThemeStyle
};
