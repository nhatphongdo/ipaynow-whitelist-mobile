import _ from "lodash";
import { StyleSheet } from "react-native";

const TextStylePropTypes = require("react-native/Libraries/DeprecatedPropTypes/DeprecatedTextStylePropTypes");
const ViewStylePropTypes = require("react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes");

const mapPropsToStyleNames = (styleNames, props) => {
    const keys = _.keys(props);
    const values = _.values(props);

    _.forEach(keys, (key, index) => {
        if (values[index]) {
            styleNames.push(key);
        }
    });

    return styleNames;
};

const computeProps = (incomingProps, defaultProps) => {
    // External props has a higher precedence
    let computedProps = {};

    incomingProps = _.clone(incomingProps);
    delete incomingProps.children;

    const incomingPropsStyle = incomingProps.style;
    delete incomingProps.style;

    if (incomingProps) {
        _.assign(computedProps, defaultProps, incomingProps);
    } else {
        computedProps = defaultProps;
    }
    // Pass the merged Style Object instead
    if (incomingPropsStyle) {
        let computedPropsStyle = {};
        computedProps.style = {};
        if (Array.isArray(incomingPropsStyle)) {
            _.forEach(incomingPropsStyle, style => {
                if (typeof style === "number") {
                    _.merge(computedPropsStyle, StyleSheet.flatten(style));
                } else {
                    _.merge(computedPropsStyle, style);
                }
            });
        } else if (typeof incomingPropsStyle === "number") {
            computedPropsStyle = StyleSheet.flatten(incomingPropsStyle);
        } else {
            computedPropsStyle = incomingPropsStyle;
        }

        _.merge(computedProps.style, defaultProps.style, computedPropsStyle);
    }
    // console.log("computedProps ", computedProps);
    return computedProps;
};

const getProps = (props, defaultProps = {}) => {
    if (Array.isArray(props.style)) {
        const flattenedStyle = props.style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
        return computeProps({ ...props, style: flattenedStyle }, defaultProps);
    }

    return computeProps(props, defaultProps);
};

const checkPropsType = (propsType, props) => {
    let newProps = {};
    for (const key in propsType) {
        if (props.hasOwnProperty(key)) {
            newProps[key] = props[key];
        }
    }
    return newProps;
};

export { mapPropsToStyleNames, computeProps, getProps, checkPropsType, TextStylePropTypes, ViewStylePropTypes };
