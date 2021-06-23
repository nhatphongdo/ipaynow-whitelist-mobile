import React from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { connectStyle, View } from "native-base";
import ThemeService from "../../services/ThemeService";
import NavigationService from "../../services/NavigationService";
import { getProps, checkPropsType, ViewStylePropTypes } from "../../common/themes";
import StyledText from "./StyledText";
import Button from "./Button";
import BoxShadow from "./BoxShadow";

class GroupBox extends React.Component {
  state = {
    width: null,
    height: null
  };

  onLayout(event) {
    if (this.state.width && this.state.height) {
      return;
    }

    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  }

  onBack = () => {
    NavigationService.goBack();
  };

  render() {
    const props = getProps(this.props);
    const styles = props.style;
    const viewStyle = checkPropsType(ViewStylePropTypes, styles);
    const Background = ThemeService.getThemeStyle().variables.groupBoxHeaderBackground;
    const BackIcon = ThemeService.getThemeStyle().variables.backIcon;

    let bigLightShadowOpt = {
      width: this.state.width,
      height: this.state.height,
      color: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".bigLightShadow"].shadowColor,
      border: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".bigLightShadow"].shadowRadius,
      opacity: 0.5,
      x: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".bigLightShadow"].shadowOffset.width,
      y: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".bigLightShadow"].shadowOffset.height,
      radius: styles.container.borderRadius || ThemeService.getThemeStyle().variables.borderRadiusBase,
      style: {
        position: "absolute"
      }
    };

    return (
      <View
        bigLightShadow
        // style={[viewStyle, styles.container, this.props.icon || this.props.title ? {} : styles.noHeader]}
        style={[viewStyle, styles.container]}
        // onLayout={Platform.OS === "android" ? this.onLayout.bind(this) : null}
      >
        {/* {Platform.OS === "android" && <BoxShadow setting={bigLightShadowOpt} />} */}
        {/* <View style={[styles.content, this.props.icon || this.props.title ? {} : styles.contentNoHeader, this.props.fullHeight ? { flex: 1 } : {}]}> */}
        <View style={[styles.content, this.props.fullHeight ? { flex: 1 } : {}]}>
          {this.props.children}
          {/* {this.props.allowToBack && (
            <Button style={styles.backButton} onPress={this.onBack}>
              <BackIcon />
            </Button>
          )}
          {this.props.rightButton && <View style={styles.rightButton}>{this.props.rightButton}</View>} */}
        </View>
        {/* {(this.props.icon || this.props.title) && (
          <View shadow style={styles.headerContainer}>
            <Background style={styles.header}>
              {this.props.icon}
              <StyledText
                style={styles.headerTitle}
                numberOfLines={this.props.lines || this.props.icon ? 1 : 0}
                adjustsFontSizeToFit={this.props.icon ? true : false}
              >
                {this.props.title}
              </StyledText>
            </Background>
          </View>
        )} */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  backButton: {
    position: "absolute"
  }
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.GroupBox", styles)(GroupBox));
