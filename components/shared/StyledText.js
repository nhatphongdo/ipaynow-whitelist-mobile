import React from 'react';
import { Platform } from 'react-native';
import { connectStyle } from 'native-base';
import ParsedText from './ParsedText';
import { mapPropsToStyleNames, getProps, checkPropsType, TextStylePropTypes } from '../../common/themes';

const BOLD = [
    // 'thin',
    // 'light',
    'medium',
    'bold',
    // 'black',
    'strong', // replace for bold
    'b' // replace for medium
];
const ITALIC = ['italic', 'i'];
const PATTERN = /<((b|i|bold|italic|strong|light|thin|black|color|size)(\b[^>]*))>(.*?)<\/\2>/i;

findFontName = (bold, italic, style) => {
    let name = 'exo';
    if (bold) {
        bold = bold.toLowerCase();
        if (bold === 'b') bold = 'medium';
        if (bold === 'strong') bold = 'bold';
        if (BOLD.indexOf(bold) >= 0) name = name + '-' + bold;
    }
    if (italic && ITALIC.indexOf(italic.toLowerCase()) >= 0) {
        name = name + '-italic';
    }
    if (style && style.fontFamily) {
        return style.fontFamily;
    }
    return name;
};

class StyledText extends React.Component {
    _baseWidth = null;

    state = {
        fontSize: 14
    };

    componentDidMount() {
        const props = getProps(this.props);
        this.setState({ fontSize: props.style.fontSize || 14 });
    }

    onLayout = async event => {
        this._baseWidth = event.nativeEvent.layout.width;
    };

    onTextLayout = event => {
        if (Platform.OS === 'ios' || this.props.adjustsFontSizeToFit !== true || !this.props.numberOfLines === 0) {
            return;
        }

        const lines = event.nativeEvent.lines;
        if (lines.length > this.props.numberOfLines) {
            this.setState({ fontSize: this.state.fontSize - 1 });
            return;
        }
        let maxWidth = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].width > maxWidth) {
                maxWidth = lines[i].width;
            }
        }
        if (this._baseWidth > 0 && maxWidth > this._baseWidth) {
            this.setState({ fontSize: this.state.fontSize - 1 });
            return;
        }
    };

    renderText(matchingString, matches) {
        // let match = matchingString.match(PATTERN); match[0] is full text matched,
        // match[1] is group 1 - tag, match[2] is tag name, match[3] is param, match[4]
        // is content
        let bold = BOLD.indexOf(matches[2].toLowerCase()) >= 0 ? matches[2] : undefined;
        let italic = ITALIC.indexOf(matches[2].toLowerCase()) >= 0 ? matches[2] : undefined;

        // Process other tags
        let color, fontSize;
        if (matches[2].toLowerCase() === 'color') {
            color = matches[3].trim();
        } else if (matches[2].toLowerCase() === 'size') {
            fontSize = parseFloat(matches[3].trim()) || undefined;
        }

        return (
            <StyledText
                {...this.props}
                bold={bold}
                italic={italic}
                style={[
                    this.props.style,
                    {
                        color: color,
                        fontSize: fontSize,
                        fontFamily: findFontName(bold || this.props.bold, italic || this.props.italic, this.props.style)
                    }
                ]}
            >
                {matches[4]}
            </StyledText>
        );
    }

    renderContent(matchingString, matches) {
        return <StyledText {...this.props}>{matches[1]}</StyledText>;
    }

    renderNewLine(matchingString, matches) {
        return '\n';
    }

    render() {
        const props = getProps(this.props);

        const { style, bold, italic, textStyles, onUrlPress, onPhonePress, onEmailPress, ...textProps } = props;

        const textStyle = checkPropsType(TextStylePropTypes, style);

        return (
            <ParsedText
                onLayout={this.onLayout}
                onTextLayout={this.onTextLayout}
                {...textProps}
                parse={[
                    {
                        type: 'url',
                        style: [style.url, (textStyles && textStyles.url) || {}],
                        onPress: onUrlPress
                    },
                    {
                        type: 'phone',
                        style: [style.phone, (textStyles && textStyles.phone) || {}],
                        onPress: onPhonePress
                    },
                    {
                        type: 'email',
                        style: [style.email, (textStyles && textStyles.email) || {}],
                        onPress: onEmailPress
                    },
                    {
                        pattern: /(<br \/>|\\n)/i,
                        renderText: this.renderNewLine.bind(this)
                    },
                    {
                        pattern: /<strike>(.*)<\/strike>/i,
                        style: [style.strikeThrough, (textStyles && textStyles.strikeThrough) || {}],
                        renderText: this.renderContent.bind(this)
                    },
                    {
                        pattern: /<u>(.*)<\/u>/i,
                        style: [style.underline, (textStyles && textStyles.strikeThrough) || {}],
                        renderText: this.renderContent.bind(this)
                    },
                    {
                        pattern: PATTERN,
                        renderText: this.renderText.bind(this)
                    }
                ]}
                style={[
                    textStyle,
                    {
                        fontFamily: findFontName(bold, italic, textStyle),
                        fontSize: this.state.fontSize
                    }
                ]}
            >
                {this.props.children}
            </ParsedText>
        );
    }
}

const styles = {
    url: {
        // textDecorationLine: 'underline'
    },
    email: {
        // textDecorationLine: 'underline'
    },
    phone: {
        // textDecorationLine: 'underline'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    strikeThrough: {
        textDecorationLine: 'line-through'
    }
};

export default connectStyle('iPayNow.StyledText', styles, mapPropsToStyleNames)(StyledText);
