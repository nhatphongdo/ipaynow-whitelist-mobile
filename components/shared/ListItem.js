import React from "react";
import { Platform } from "react-native";
import { connectStyle, View, Thumbnail } from "native-base";
import ThemeService from "../../services/ThemeService";
import StyledText from "./StyledText";
import Button from "./Button";
import { translate } from "../../constants/Languages";
import Blockie from "./Blockie";
import BoxShadow from "./BoxShadow";

class ListItem extends React.Component {
  static DefaultFloatBar(item, buttonCallback) {
    const Hexagon = ThemeService.getThemeStyle().variables.hexagon;
    const StarIcon = ThemeService.getThemeStyle().variables.starIcon;

    return (
      <View row>
        {false && (
          <Button
            // shadow={Platform.OS === "ios"}
            tinySpaceRight
            style={{
              width: 36,
              height: 36,
              minHeight: 36,
              borderRadius: 18,
              backgroundColor: "#fff",
              alignSelf: "center"
            }}
            onPress={() => buttonCallback && buttonCallback(0, item)}
          >
            <StarIcon width={24} fill={item.featured ? "url(#prefix__a)" : "none"} />
          </Button>
        )}
        <Button
          primary
          small
          // shadow={Platform.OS === "ios"}
          style={{
            alignSelf: "center"
          }}
          onPress={() => buttonCallback && buttonCallback(0, item)}
        >
          {/* <Hexagon colors={["#00e6b4", "#18c9e3"]} fill="url(#prefix__c)" height={60} onPress={() => buttonCallback && buttonCallback(0, item)} /> */}
          <StyledText
            h4
            // style={{
            //   position: "absolute",
            //   color: "#fff",
            //   lineHeight: 60,
            //   fontFamily: ThemeService.getThemeStyle().variables.fontFamilyBold
            // }}
          >
            {translate("BUY")}
          </StyledText>
        </Button>
      </View>
    );
  }

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

  render() {
    const {
      highlight,
      horizontal,
      containerStyle,
      leftStyle,
      centerStyle,
      rightStyle,
      mainTextStyle,
      subTextStyle,
      floatBarStyle,
      mainNumberOfLines,
      subNumberOfLines,
      clickable,
      avatar,
      blockie,
      icon,
      leftText,
      mainText,
      subText,
      number,
      star,
      floatBar
    } = this.props;
    const styles = this.props.style;
    const Hexagon = ThemeService.getThemeStyle().variables.hexagon;
    const StarIcon = ThemeService.getThemeStyle().variables.starIcon;
    let shadowOpt = {
      width: this.state.width,
      height: this.state.height,
      color: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".shadow"].shadowColor,
      border: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".shadow"].shadowRadius,
      opacity: 0.2,
      x: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".shadow"].shadowOffset.width,
      y: ThemeService.getThemeStyle()["NativeBase.ViewNB"][".shadow"].shadowOffset.height,
      radius: ThemeService.getThemeStyle().variables.borderRadiusBase,
      style: {
        position: "absolute"
      }
    };

    // Predefined style
    const itemRight = number ? { width: 44 } : star !== undefined ? { width: 30 } : {};

    const Container = clickable ? Button : View;
    let Wrapper = props => (
      <Container
        // shadow
        tinySpaceBottom
        style={[styles.item, containerStyle, highlight ? styles.highlight : {}]}
        onPress={clickable && this.props.onPress ? this.props.onPress : null}
      >
        {props.children}
      </Container>
    );
    if (Platform.OS === "android") {
      if (clickable) {
        Wrapper = props => (
          <View>
            {/* <BoxShadow setting={shadowOpt} /> */}
            <Button
              //   smallSpaceBottom
              style={[styles.item, containerStyle, highlight ? styles.highlight : {}]}
              // onLayout={this.onLayout.bind(this)}
              onPress={this.props.onPress}
            >
              {props.children}
            </Button>
            {floatBar && <View style={[styles.floatBar, floatBarStyle]}>{typeof floatBar === "function" ? floatBar() : floatBar}</View>}
          </View>
        );
      } else {
        Wrapper = props => (
          <Container>
            {/* <BoxShadow setting={shadowOpt} /> */}
            <View
              // smallSpaceBottom
              style={[styles.item, containerStyle, highlight ? styles.highlight : {}]}
              onLayout={this.onLayout.bind(this)}
            >
              {props.children}
            </View>
            {floatBar && <View style={[styles.floatBar, floatBarStyle]}>{typeof floatBar === "function" ? floatBar() : floatBar}</View>}
          </Container>
        );
      }
    }

    return (
      <Wrapper>
        {(avatar || blockie || icon) && (
          <View style={[styles.itemLeft, leftStyle]}>
            {avatar && <Thumbnail square style={styles.itemAvatar} source={avatar} />}
            {blockie && <Blockie size={10} scale={5} seed={blockie} />}
            {icon}
          </View>
        )}
        {(mainText || subText) && (
          <View row={horizontal} style={[styles.itemCenter, centerStyle, horizontal ? { alignItems: "center" } : {}]}>
            {mainText && (
              <StyledText
                smallSpaceRight
                secondary
                h3
                flexFull
                bold="bold"
                numberOfLines={mainNumberOfLines}
                adjustsFontSizeToFit
                style={[styles.mainText, mainTextStyle]}
              >
                {mainText}
              </StyledText>
            )}
            {subText && (
              <StyledText numberOfLines={subNumberOfLines} adjustsFontSizeToFit style={[styles.subText, subTextStyle]}>
                {subText}
              </StyledText>
            )}
          </View>
        )}
        {(number || star !== undefined) && (
          <View style={[styles.itemRight, itemRight, rightStyle]}>
            {number && (
              <View shadow style={styles.itemNumber}>
                {/* <Hexagon colors={["#00e6b4", "#18c9e3"]} fill="url(#prefix__c)" height={40} /> */}
                <StyledText style={styles.itemNumberText} adjustsFontSizeToFit numberOfLines={1}>
                  {number}
                </StyledText>
              </View>
            )}
            {star !== undefined && (
              <Button style={styles.itemStar}>
                <StarIcon fill={star ? "url(#prefix__a)" : "none"} />
              </Button>
            )}
          </View>
        )}
        {this.props.children}
        {Platform.OS === "ios" && floatBar && (
          <View style={[styles.floatBar, floatBarStyle]}>{typeof floatBar === "function" ? floatBar() : floatBar}</View>
        )}
      </Wrapper>
    );
  }
}

const styles = {};

export default connectStyle("iPayNow.ListItem", styles)(ListItem);
