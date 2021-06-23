import React from "react";
import { TouchableWithoutFeedback, Platform } from "react-native";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View } from "native-base";
import Lottie from "lottie-react-native";
import moment from "moment";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as WebBrowser from "expo-web-browser";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import Button from "../shared/Button";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";
import TabNavigation from "../shared/TabNavigation";
import BannerSlider from "./BannerSlider";
import { isNeedToVerifyPinCode } from "../../stores/pincode/actions";
import { claimDailyBonus } from "../../stores/rewards/actions";
import { setSetting } from "../../stores/settings/actions";
import { formatCrypto } from "../../common/helper";
import DropdownAlertService from "../../services/DropdownAlertService";
import { showAlert } from "../../stores/alert/actions";
import Socket from "../../services/Socket";
import { updatePushNotificationToken } from "../../stores/account/actions";

const HexWidth = (ThemeService.getThemeStyle().variables.deviceWidth - ThemeService.getThemeStyle().variables.screenPadding * 2) / 3;
const HexHeight = (HexWidth / 162) * 150;
const IconSize = 40;

const Badge = props => {
  const Background = ThemeService.getThemeStyle().variables.badgeBackground;
  return (
    <Background style={props.styles.badge}>
      <StyledText style={props.styles.badgeText} numberOfLines={1}>
        {props.children}
      </StyledText>
    </Background>
  );
};

const HexButton = props => {
  const { styles, icon, badge, children, onPress, left, center, right, lines, ...others } = props;
  const Hexagon = ThemeService.getThemeStyle().variables.hexagon;
  return (
    <Button onPress={onPress} {...others}>
      {/* <Hexagon onPress={onPress} width={HexWidth} /> */}
      <View shadow style={styles.feature}>
        {icon}
        <StyledText style={styles.featureTitle} numberOfLines={lines || 1}>
          {children}
        </StyledText>
        {badge && <Badge styles={styles}>{badge}</Badge>}
      </View>
    </Button>
  );
};

class HomeScreen extends React.Component {
  state = {
    touching: false,
    confirming: false,
    animationEnded: false,
    earnedBonus: 0,
    hideVerify: false
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const needToVerifyPin = await this.props.isNeedToVerifyPinCode();
    if (needToVerifyPin) {
      this.props.navigation.navigate("PinCode");
    }

    if (!Socket.isConnected()) {
      await Socket.connect();
    }

    this.registerForPushNotifications();
  };

  registerForPushNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    await this.props.updatePushNotificationToken(token);
  };

  onReceive = () => {
    this.props.navigation.navigate("Receive");
  };

  onSend = () => {
    this.props.navigation.navigate("Send");
  };

  onRates = () => {
    this.props.navigation.navigate("Rates");
  };

  onStore = () => {
    this.props.navigation.navigate("Store");
  };

  onEarn = () => {
    this.props.navigation.navigate("Earn");
  };

  onReferral = () => {
    this.props.navigation.navigate("Referral");
  };

  onNotification = () => {
    this.props.navigation.navigate("Notifications");
  };

  onGames = () => {
    this.props.navigation.navigate("Games");
  };

  onMerchants = () => {
    this.props.navigation.navigate("Merchants");
  };

  onDeposit = () => {
    // await WebBrowser.openBrowserAsync("https://ipaynow.io/topup.html");
    this.props.navigation.navigate("Deposit");
  };

  onBuyReward = () => {
    this.props.navigation.navigate("BuyReward");
  };

  onExchangeRequest = () => {
    this.props.navigation.navigate("Trades");
  };

  onGiftPressed = async () => {
    this.setState({ confirming: true });
    const result = await this.props.claimDailyBonus();
    if (result.error) {
      await this.onClose();
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate(result.error));
      return;
    }

    this.setState({ earnedBonus: result.result.amount, touching: true, animationEnded: false });
  };

  onClose = async () => {
    // Set latest time
    await this.props.setSetting({
      lastDailyBonusTime: moment()
        .utc()
        .startOf("day")
        .valueOf()
    });
    // Reset state
    this.setState({
      touching: false,
      confirming: false,
      animationEnded: false
    });
  };

  onVerify = () => {
    this.props.navigation.navigate("VerifyWallet", {
      verifying: true
    });
  };

  onCancel = () => {
    this.setState({
      hideVerify: true
    });
  };

  render() {
    const styles = this.props.style;
    const ReceiveIcon = ThemeService.getThemeStyle().variables.receiveIcon;
    const SendIcon = ThemeService.getThemeStyle().variables.sendIcon;
    const RatesIcon = ThemeService.getThemeStyle().variables.ratesIcon;
    const DepositIcon = ThemeService.getThemeStyle().variables.depositIcon;
    const StoreIcon = ThemeService.getThemeStyle().variables.storeIcon;
    const EarnIcon = ThemeService.getThemeStyle().variables.earnIcon;
    const ReferralIcon = ThemeService.getThemeStyle().variables.referralIcon;
    const NotificationIcon = ThemeService.getThemeStyle().variables.notificationIcon;
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon;
    const MerchantsIcon = ThemeService.getThemeStyle().variables.merchantsIcon;
    const BuyRewardIcon = ThemeService.getThemeStyle().variables.buyRewardIcon;
    const RequestIcon = ThemeService.getThemeStyle().variables.requestIcon;

    return (
      <Screen disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <BannerSlider style={styles.banners} />
            <View style={styles.featureList}>
              <View row flexFull>
                <HexButton left styles={styles} onPress={this.onReceive} icon={<ReceiveIcon height={IconSize} />}>
                  {translate("RECEIVE")}
                </HexButton>
                <HexButton center styles={styles} onPress={this.onSend} icon={<SendIcon height={IconSize} />}>
                  {translate("SEND")}
                </HexButton>
                <HexButton right styles={styles} onPress={this.onBuyReward} lines={2} icon={<BuyRewardIcon height={IconSize} />}>
                  {this.props.settings.language.toLowerCase() !== "en" ? translate("BUY REWARDS") : translate("BUY REWARDS").replace(" ", "\n")}
                </HexButton>
              </View>

              <View row flexFull>
                <HexButton left styles={styles} onPress={this.onDeposit} icon={<DepositIcon height={IconSize} />}>
                  {translate("DEPOSIT")}
                </HexButton>
                <HexButton center styles={styles} onPress={this.onEarn} icon={<EarnIcon height={IconSize} />}>
                  {translate("EARN")}
                </HexButton>
                <HexButton right styles={styles} onPress={this.onRates} icon={<RatesIcon height={IconSize} />}>
                  {translate("RATES")}
                </HexButton>
              </View>

              <View row flexFull>
                <HexButton left styles={styles} onPress={this.onStore} icon={<StoreIcon height={IconSize} />}>
                  {translate("STORE")}
                </HexButton>
                <HexButton center styles={styles} onPress={this.onGames} icon={<GamesIcon height={IconSize} />}>
                  {translate("GAMES")}
                </HexButton>
                <HexButton right styles={styles} onPress={this.onReferral} icon={<ReferralIcon height={IconSize} />}>
                  {translate("REFERRAL")}
                </HexButton>
              </View>

              <View row flexFull>
                <HexButton left styles={styles} onPress={this.onNotification} icon={<NotificationIcon height={IconSize} />}>
                  {translate("NOTICE")}
                </HexButton>
                <HexButton
                  center
                  styles={styles}
                  onPress={this.onMerchants}
                  icon={<MerchantsIcon height={IconSize} />}
                  lines={this.props.settings.language.toLowerCase() !== "en" ? 2 : 1}
                >
                  {translate("MERCHANTS")}
                </HexButton>
                <HexButton right styles={styles} onPress={this.onExchangeRequest} lines={2} icon={<RequestIcon height={IconSize} />}>
                  {this.props.settings.language.toLowerCase() !== "en" ? translate("OTC REQUEST") : translate("OTC REQUEST").replace(" ", "\n")}
                </HexButton>
              </View>
            </View>
            {!this.props.settings.secretWordsConfirmed && !this.state.hideVerify && (
              <View spaceTop shadow box highlight padder>
                <StyledText h4 white>
                  {translate(
                    "You did not verify the secret 12 words yet If you forget these 12 words you will lose your wallet and its fund forever Do you want to verify now"
                  )}
                </StyledText>
                <View row spaceTop>
                  <Button primary flexFull smallSpaceLeft smallSpaceRight onPress={this.onVerify}>
                    {translate("CONFIRM")}
                  </Button>
                  <Button thirdary flexFull smallSpaceLeft smallSpaceRight onPress={this.onCancel}>
                    {translate("CLOSE")}
                  </Button>
                </View>
              </View>
            )}
          </Content>
        </Container>
        <TabNavigation />
        {this.props.reward.balance > 0 &&
          this.props.settings.lastDailyBonusTime <
            moment()
              .utc()
              .startOf("day")
              .valueOf() && (
            <View style={styles.absoluteFill}>
              {!this.state.touching && !this.state.confirming && (
                <TouchableWithoutFeedback onPress={this.onGiftPressed} disabled={this.state.confirming}>
                  <Lottie
                    style={styles.animation}
                    source={require("../../assets/animations/restless-gift.json")}
                    speed={1}
                    autoPlay={true}
                    loop={true}
                  />
                </TouchableWithoutFeedback>
              )}
              {!this.state.touching && !this.state.confirming && (
                <StyledText pink h4 bold="medium" style={styles.text}>
                  {translate("Touch to open your bonus")}
                </StyledText>
              )}
              {!this.state.touching && this.state.confirming && (
                <TouchableWithoutFeedback onPress={this.onGiftPressed} disabled={this.state.confirming}>
                  <Lottie
                    style={styles.animation}
                    source={require("../../assets/animations/happy-gift.json")}
                    speed={1}
                    autoPlay={true}
                    loop={true}
                  />
                </TouchableWithoutFeedback>
              )}
              {this.state.touching && !this.state.animationEnded && (
                <Lottie
                  style={ThemeService.getThemeStyle().animation}
                  source={require("../../assets/animations/confetti.json")}
                  speed={0.5}
                  autoPlay={true}
                  loop={false}
                  onAnimationFinish={() => this.setState({ animationEnded: true })}
                />
              )}
              {Platform.OS === "ios" && this.state.touching && !this.state.animationEnded && (
                <Lottie
                  style={[ThemeService.getThemeStyle().animation, { height: ThemeService.getThemeStyle().variables.deviceHeight / 2 }]}
                  source={require("../../assets/animations/exploding-ribbon-and-confetti.json")}
                  speed={0.8}
                  autoPlay={true}
                  loop={false}
                />
              )}
              {this.state.touching && (
                <StyledText spaceLeft spaceRight pink large bold="bold">
                  {translate("Congratulations")}
                </StyledText>
              )}
              {this.state.touching && (
                <StyledText spaceTop spaceLeft spaceRight white h3 center bold="bold">
                  {translate("You gain {0} Ruby for today bonus Let's come back tomorrow to earn more bonus", formatCrypto(this.state.earnedBonus))}
                </StyledText>
              )}
              {this.state.touching && (
                <Button spaceTop spaceBottom thirdary onPress={this.onClose}>
                  {translate("Close")}
                </Button>
              )}
              {this.state.touching && (
                <StyledText spaceTop spaceLeft spaceRight note center bold="medium">
                  {translate(
                    "Only {0} Ruby and above will be credited If less, it will be accumulated",
                    formatCrypto(this.props.settings.interestThresholdSend)
                  )}
                </StyledText>
              )}
            </View>
          )}
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
  },
  absolute: {
    position: "absolute",
    width: HexWidth,
    height: HexHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  animation: {
    position: "absolute"
  },
  text: {
    position: "absolute",
    textAlign: "center",
    top: (ThemeService.getThemeStyle().variables.deviceHeight * 2) / 3
  }
};

const mapStateToProps = state => {
  const { settings, reward } = state;
  return { settings, reward };
};

const mapDispatchToProps = dispatch => {
  return {
    isNeedToVerifyPinCode: () => dispatch(isNeedToVerifyPinCode()),
    claimDailyBonus: () => dispatch(claimDailyBonus()),
    setSetting: settings => dispatch(setSetting(settings)),
    showAlert: config => dispatch(showAlert(config)),
    updatePushNotificationToken: token => dispatch(updatePushNotificationToken(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Home", styles)(HomeScreen));
