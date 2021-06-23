import React from "react";
import { connect } from "react-redux";
import { connectStyle, View } from "native-base";
import ThemeService from "../../services/ThemeService";
import StyledText from "../shared/StyledText";
import { translate } from "../../constants/Languages";

class ReferralUser extends React.Component {
  render() {
    let colors = [
      ["#ff5b7f", "#fc9970"],
      ["#00e6b4", "#18c9e3"],
      ["#191660", "#191660"]
    ];
    let start = ["50%", "0%"];
    let end = ["50%", "100%"];
    if (ThemeService.getThemeStyle().name === "colorful-dark") {
      colors = [
        ["#3f5cc8", "#e12160"],
        ["#77a5f8", "#d5a3ff"],
        ["#191660", "#6e00ff"]
      ];
      start = ["0%", "0%"];
      end = ["100%", "100%"];
    } else if (ThemeService.getThemeStyle().name === "simple-dark") {
      colors = [
        ["#f58d4e", "#f58d4e"],
        ["#15bdd8", "#15bdd8"],
        ["#1aa68c", "#1aa68c"]
      ];
    } else if (ThemeService.getThemeStyle().name === "simple-light") {
      colors = [
        ["#f58d4e", "#f58d4e"],
        ["#15bdd8", "#15bdd8"],
        ["#191660", "#191660"]
      ];
    }

    const { level = 0, name } = this.props;
    const ReferralUserIcon = ThemeService.getThemeStyle().variables.referralUserIcon;

    return (
      <View center tinySpaceLeft tinySpaceRight>
        <ReferralUserIcon colors={colors[level]} start={start} end={end} />
        <StyledText tinySpaceTop tiny info>
          {name || translate("Me")}
        </StyledText>
      </View>
    );
  }
}

const styles = {};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.ReferralUser", styles)(ReferralUser));
