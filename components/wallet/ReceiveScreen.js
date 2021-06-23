import React from "react";
import { connect } from "react-redux";
import { Share, Clipboard } from "react-native";
import { connectStyle, Container, Content, View, Item, Label, Input } from "native-base";
import QRCode from "react-native-qrcode-svg";
import numeral from "numeral";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import Button from "../shared/Button";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import DropdownAlertService from "../../services/DropdownAlertService";
import { formatCrypto, formatCurrency } from "../../common/helper";
import { convertRate } from "../../stores/rates/actions";
import { HDN } from "../../stores/rates/constants";

class ReceiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      currency: props.settings.currency,
      qrText: props.wallet.cryptoAddress
    };
  }

  onAmountChanged = async value => {
    this.setState({ amount: value });
    let amountValue = numeral(value);
    if (isNaN(amountValue.value()) || amountValue.value() === null) {
      // This is not valid amount
      amountValue = numeral(0);
    }

    // Convert to token
    if (this.state.currency !== HDN) {
      amountValue = numeral(await this.props.convertRate(this.state.currency, HDN, amountValue.value()));
    }

    const text = "ethereum:" + this.props.wallet.cryptoAddress + "?value=" + formatCrypto(amountValue, false);
    this.setState({ qrText: text });
  };

  onCurrencyChanged = async () => {
    let amount = "";
    let amountValue = numeral(this.state.amount);
    if (isNaN(amountValue.value()) || amountValue.value() === null) {
      amount = this.state.amount;
    } else {
      if (this.state.currency === HDN) {
        amount = formatCurrency(await this.props.convertRate(HDN, this.props.settings.currency, amountValue.value()));
      } else {
        amount = formatCrypto(await this.props.convertRate(this.state.currency, HDN, amountValue.value()));
      }
    }

    if (this.state.currency === HDN) {
      this.setState({ currency: this.props.settings.currency }, () => this.onAmountChanged(amount));
    } else {
      this.setState({ currency: HDN }, () => this.onAmountChanged(amount));
    }
  };

  onShare = async () => {
    if (this.state.qrText) {
      try {
        const result = await Share.share(
          {
            title: translate("This is my wallet address"),
            message: this.props.wallet.cryptoAddress
          },
          {
            subject: translate("This is my wallet address")
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  onCopy = async () => {
    if (this.state.qrText) {
      await Clipboard.setString(this.props.wallet.cryptoAddress);
      DropdownAlertService.show(
        DropdownAlertService.SUCCESS,
        translate("Copied!"),
        translate("Your wallet address is copied to clipboard successfully")
      );
    }
  };

  render() {
    const styles = this.props.style;
    const ReceiveIcon = ThemeService.getThemeStyle().variables.receiveIcon;
    const QrBox = ThemeService.getThemeStyle().variables.qrBox;
    const QrLabel = ThemeService.getThemeStyle().variables.qrLabel;

    return (
      <Screen title={translate("RECEIVE")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<ReceiveIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate("RECEIVE")}>
              <Item stackedLabel underline transparent>
                <Label>{`${translate("Amount")} (${this.state.currency})`}</Label>
                <View smallSpaceTop smallSpaceBottom style={styles.row}>
                  <Button tiny tinySpaceRight onPress={this.onCurrencyChanged}>
                    {this.state.currency}
                  </Button>
                  <Input flexFull keyboardType="numeric" value={this.state.amount} onChangeText={text => this.onAmountChanged(text)} />
                </View>
              </Item>
              <View style={styles.center}>
                <View spaceTop style={styles.qrBox}>
                  {/* <View style={[styles.absolute, { backgroundColor: "#fff", padding: 15 }]}> */}
                  <QRCode value={this.state.qrText} size={200} />
                  {/* </View> */}
                  {/* <QrBox /> */}
                </View>
                <View style={styles.qrLabel}>
                  <QrLabel />
                  <StyledText h4 style={[styles.absolute, styles.qrLabelText]}>
                    {translate("Scan me")}
                  </StyledText>
                </View>
                <StyledText important smallSpaceTop>
                  {this.props.wallet.cryptoAddress}
                </StyledText>
              </View>
              <View spaceTop style={[styles.row, styles.evenSpace]}>
                <Button primary tinySpaceRight flexFull onPress={this.onShare}>
                  {translate("SHARE")}
                </Button>
                <Button secondary tinySpaceLeft flexFull onPress={this.onCopy}>
                  {translate("COPY")}
                </Button>
              </View>
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
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  evenSpace: {
    justifyContent: "space-between"
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
    justifyContent: "center"
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
  const { wallet, settings } = state;
  return { wallet, settings };
};

const mapDispatchToProps = dispatch => {
  return {
    convertRate: (from, to, amount) => dispatch(convertRate(from, to, amount))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Receive", styles)(ReceiveScreen));
