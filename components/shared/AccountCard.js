import React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { connectStyle, View } from "native-base";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import ThemeService from "../../services/ThemeService";
import StyledText from "./StyledText";
import { translate } from "../../constants/Languages";
import { formatCurrency, formatTimeTo, formatUserId } from "../../common/helper";
import Button from "./Button";
import { getWalletInfo } from "../../stores/wallet/actions";
import Blockie from "./Blockie";
import { getRewardInfo } from "../../stores/rewards/actions";
import { convertRateSync } from "../../stores/rates/actions";
import { SUPPORTED_CURRENCIES, HDN, ETH, REWARD } from "../../stores/rates/constants";
import Eye from "../../assets/images/Eye";
import NoEye from "../../assets/images/NoEye";
import { setSetting } from "../../stores/settings/actions";

class AccountCard extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      qrShowing: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    setTimeout(this._bootstrap, 100);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _bootstrap = async () => {
    if (!this._isMounted) {
      return;
    }

    // Load crypto balance
    await this.props.getWalletInfo();

    // Load reward info
    await this.props.getRewardInfo();
  };

  toggleVisible = async () => {
    await this.props.setSetting({
      visibleWallet: !this.props.settings.visibleWallet
    });
  };

  render() {
    const { small, hideToken, hideReward, hideWallet } = this.props;
    const styles = this.props.style;
    const Background = View; //ThemeService.getThemeStyle().variables.primaryBackground;
    const IdIcon = ThemeService.getThemeStyle().variables.idIcon;
    const LockIcon = ThemeService.getThemeStyle().variables.lockIcon;
    const TimerIcon = ThemeService.getThemeStyle().variables.timerIcon;
    const ScanQrIcon = ThemeService.getThemeStyle().variables.scanQrIcon;
    const QrBox = ThemeService.getThemeStyle().variables.qrBox;
    const QrLabel = ThemeService.getThemeStyle().variables.qrLabel;

    const token = HDN;
    const tokenBalance = this.props.wallet.tokenBalance;

    const shadow =
      ThemeService.getThemeStyle().name === "colorful-dark" || ThemeService.getThemeStyle().name === "simple-dark"
        ? require("../../assets/images/shadow-light.png")
        : require("../../assets/images/shadow.png");

    return (
      <View style={styles.container}>
        {/* <Image style={styles.shadow} source={shadow} /> */}
        <Background shadow style={styles.card}>
          <View style={styles.left}>
            {!hideToken && (
              <View style={styles.row}>
                <StyledText style={styles.label}>{translate("Wallet")}</StyledText>
                <Button smallSpaceLeft style={styles.eye} onPress={this.toggleVisible}>
                  {this.props.settings.visibleWallet && <NoEye />}
                  {!this.props.settings.visibleWallet && <Eye />}
                </Button>
              </View>
            )}
            {!hideToken && (
              <StyledText h3 bold="medium" style={styles.value} adjustsFontSizeToFit numberOfLines={1}>
                {!this.props.settings.visibleWallet
                  ? "❉ ❉ ❉ ❉ ❉ ❉"
                  : formatCurrency(
                      convertRateSync(this.props.rates.rates, token, this.props.settings.currency, tokenBalance),
                      this.props.settings.culture,
                      this.props.settings.currency,
                      true,
                      false
                    )}
              </StyledText>
            )}
            {!hideToken && this.props.settings.visibleWallet && (
              <StyledText style={styles.exchange} adjustsFontSizeToFit numberOfLines={1}>
                {formatCurrency(tokenBalance, this.props.settings.culture, token, true, false)}
              </StyledText>
            )}
            {!hideReward && (
              <StyledText smallSpaceTop style={styles.label}>
                {translate("Reward")}
              </StyledText>
            )}
            {!hideReward && (
              <StyledText h3 bold="medium" style={styles.value} adjustsFontSizeToFit numberOfLines={1}>
                {formatCurrency(this.props.reward.balance, this.props.settings.culture, REWARD, false, false)}
              </StyledText>
            )}
            {!hideWallet && (
              <StyledText smallSpaceTop style={styles.label}>
                {translate("Gas Fee")}
              </StyledText>
            )}
            {!hideWallet && (
              <StyledText h3 bold="medium" style={styles.value} adjustsFontSizeToFit numberOfLines={1}>
                {!this.props.settings.visibleWallet
                  ? "❉ ❉ ❉ ❉ ❉ ❉"
                  : formatCurrency(
                      convertRateSync(this.props.rates.rates, ETH, this.props.settings.currency, this.props.wallet.ethBalance),
                      this.props.settings.culture,
                      this.props.settings.currency,
                      true,
                      false
                    )}
              </StyledText>
            )}
            {!hideWallet && this.props.settings.visibleWallet && (
              <StyledText style={styles.exchange} adjustsFontSizeToFit numberOfLines={1}>
                {formatCurrency(this.props.wallet.ethBalance, this.props.settings.culture, ETH)}
              </StyledText>
            )}
          </View>
          <View style={styles.right}>
            {!small && (
              <Button style={styles.code} onPress={() => this.setState({ qrShowing: true })}>
                <Blockie size={10} scale={5} seed={this.props.wallet.cryptoAddress} />
              </Button>
            )}
            {!small && (
              <View style={styles.row}>
                <StyledText style={styles.info}>{formatUserId(this.props.account.accountNumber)}</StyledText>
                <IdIcon style={styles.icon} />
              </View>
            )}
            {!small && this.props.reward.lock && (
              <View style={styles.row}>
                <StyledText style={styles.info}>{formatCurrency(this.props.reward.lock.amount)}</StyledText>
                <LockIcon style={styles.icon} />
              </View>
            )}
            {!small && this.props.reward.lock && (
              <View style={styles.row}>
                <StyledText style={styles.info}>{formatTimeTo(this.props.reward.lock.endedOn)}</StyledText>
                <TimerIcon style={styles.icon} />
              </View>
            )}
            {this.props.account.membership && (
              <View style={styles.membership}>
                <StyledText adjustsFontSizeToFit numberOfLines={1}>{`<color ${ThemeService.getThemeStyle().variables.membershipLabel}><b>${translate(
                  "Member"
                )}: </b></color> <color ${"#fff"}><strong>${this.props.account.membership}</strong></color>`}</StyledText>
              </View>
            )}
            <StyledText
              smallSpaceTop={!!this.props.account.membership}
              spaceTop={!this.props.account.membership}
              style={[styles.info, { marginRight: 0 }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {SUPPORTED_CURRENCIES[this.props.settings.currency].name}
            </StyledText>
          </View>
        </Background>
        {false && !small && (
          <Button style={styles.scanButton}>
            <ScanQrIcon />
          </Button>
        )}
        <Modal
          isVisible={this.state.qrShowing}
          animationIn="bounceIn"
          animationOut="bounceOut"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          avoidKeyboard={true}
          backdropOpacity={0.9}
          style={ThemeService.getThemeStyle().modalScreen}
          onBackdropPress={() => this.setState({ qrShowing: false })}
        >
          <View style={styles.center}>
            <View spaceTop style={styles.qrBox}>
              {/* <View style={[styles.absolute, { backgroundColor: "#fff", padding: 15 }]}> */}
              <QRCode value={formatUserId(this.props.account.accountNumber)} size={200} />
              {/* </View> */}
              {/* <QrBox /> */}
            </View>
            <View style={styles.qrLabel}>
              <QrLabel />
              <StyledText h4 white style={[styles.absolute, styles.qrLabelText]}>
                {translate("Scan me")}
              </StyledText>
            </View>
            <StyledText success spaceTop h4>
              {`${translate("My referral ID")}: <strong>${formatUserId(this.props.account.accountNumber)}</strong>`}
            </StyledText>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  shadow: {
    flex: 1,
    resizeMode: "contain",
    position: "absolute",
    zIndex: 0
  },
  container: {
    flex: 0,
    overflow: "hidden"
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  absolute: {
    position: "absolute"
  },
  qrBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20
  },
  qrLabel: {
    alignItems: "center",
    justifyContent: "center"
  },
  qrLabelText: {
    top: 15,
    lineHeight: 40
  }
};

const mapStateToProps = state => {
  const { settings, wallet, reward, account, rates } = state;
  return { settings, wallet, reward, account, rates };
};

const mapDispatchToProps = dispatch => {
  return {
    getWalletInfo: () => dispatch(getWalletInfo()),
    getRewardInfo: () => dispatch(getRewardInfo()),
    setSetting: settings => dispatch(setSetting(settings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.AccountCard", styles)(AccountCard));
