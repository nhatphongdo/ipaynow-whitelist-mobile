import React from "react";
import { Share } from "react-native";
import { connect } from "react-redux";
import { connectStyle, Container, Content, Label, Grid, Col, Row } from "native-base";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import ReferralUser from "./ReferralUser";
import ReferralList from "./ReferralList";
import Button from "../shared/Button";
import { getReferralInfo } from "../../stores/account/actions";
import { formatReward, formatPercentage, formatNumber } from "../../common/helper";

class ReferralScreen extends React.Component {
  state = {
    bonus: 0,
    level1: [],
    level2: [],
    level1Bonus: 0,
    level2Bonus: 0
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const result = await this.props.getReferralInfo();
    if (!result.error) {
      this.setState({
        bonus: result.result.bonus,
        level1: result.result.level1,
        level2: result.result.level2,
        level1Bonus: result.result.level1Bonus,
        level2Bonus: result.result.level2Bonus
      });
    }
  };

  onInviteFriends = async () => {
    try {
      const result = await Share.share(
        {
          title: translate("Join Ruby ecosystem now with iPayNow Ruby mobile app"),
          message: translate(
            "You are invited to join Ruby ecosystem with iPayNow Ruby mobile app with referral UID {0}",
            this.props.account.accountNumber
          )
        },
        {
          subject: translate(
            "You are invited to join Ruby ecosystem with iPayNow Ruby mobile app with referral UID {0}",
            this.props.account.accountNumber
          )
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const styles = this.props.style;
    const ReferralIcon = ThemeService.getThemeStyle().variables.referralIcon;

    return (
      <Screen title={translate("REFERRAL")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<ReferralIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}>
              <Label>{translate("My current referral rewards")}</Label>
              <StyledText full center spaceTop style={styles.score}>
                {formatReward(this.state.bonus)}
              </StyledText>
              <Label spaceTop smallSpaceBottom>
                {translate("My network")}
              </Label>
              <Grid>
                <Col style={{ flex: 0, marginRight: ThemeService.getThemeStyle().variables.smallSpace }}>
                  <Row style={styles.row} />
                  <Row style={styles.row}>
                    <StyledText center>{`${translate("Level 1")}\n<color ${ThemeService.getThemeStyle().variables.brandInfo}><b>${formatPercentage(
                      this.state.level1Bonus, 4
                    )}</b></color>\n<color ${ThemeService.getThemeStyle().variables.secondaryTextColor}><b>✕ ${formatNumber(
                      this.state.level1.length
                    )}</b></color>`}</StyledText>
                  </Row>
                  <Row style={styles.row}>
                    <StyledText center>{`${translate("Level 2")}\n<color ${ThemeService.getThemeStyle().variables.brandInfo}><b>${formatPercentage(
                      this.state.level2Bonus, 4
                    )}</b></color>\n<color ${ThemeService.getThemeStyle().variables.secondaryTextColor}><b>✕ ${formatNumber(
                      this.state.level2.length
                    )}</b></color>`}</StyledText>
                  </Row>
                </Col>
                <Col>
                  <Row style={styles.row}>
                    <ReferralUser />
                  </Row>
                  <Row style={styles.row}>
                    <ReferralList level={1} data={this.state.level1} />
                  </Row>
                  <Row style={styles.row}>
                    <ReferralList level={2} data={this.state.level2} />
                  </Row>
                </Col>
              </Grid>
              <Button primary spaceTop onPress={this.onInviteFriends}>
                {translate("INVITE FRIENDS")}
              </Button>
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
      </Screen>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 0
  }
};

const mapStateToProps = state => {
  const { account } = state;
  return { account };
};

const mapDispatchToProps = dispatch => {
  return {
    getReferralInfo: () => dispatch(getReferralInfo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Referral", styles)(ReferralScreen));
