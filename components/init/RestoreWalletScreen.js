import React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { connectStyle, Container, Content, Item, Input, Spinner } from "native-base";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import Button from "../shared/Button";
import StyledText from "../shared/StyledText";
import { restoreCryptoWallet, saveCryptoWallet } from "../../stores/wallet/actions";
import { ChoosePinCode } from "./PinCodeScreen";
import DropdownAlertService from "../../services/DropdownAlertService";
import { setSetting } from "../../stores/settings/actions";

const TotalWords = 12;
const AllowMoreWords = 24;

class RestoreWalletScreen extends React.Component {
  state = {
    confirming: false,
    confirmInput: "", //"method draw network arm knife glide series argue fitness health raven unaware",
    confirmWordsCount: 0
  };

  _countWords = text => {
    const words = text.split(/[\s]+/);
    const valid = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i] != "") {
        valid.push(words[i].toLowerCase());
      }
    }
    return valid;
  };

  setConfirmInput = text => {
    const words = this._countWords(text);

    if (words.length > TotalWords && words.length !== AllowMoreWords) {
      return;
    }

    this.setState({
      confirmInput: text,
      confirmWordsCount: words.length
    });
  };

  onConfirm = () => {
    // Validate the words
    const words = this._countWords(this.state.confirmInput.trim());
    if (words.length < TotalWords) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate("Word phrases are not correct"));
      return;
    }

    this.setState({ confirming: true });

    // Save wallet
    setTimeout(this._restoreWallet, 100);
  };

  _restoreWallet = async () => {
    const wallet = await this.props.restoreCryptoWallet(this.state.confirmInput.trim());
    if (wallet === null) {
      DropdownAlertService.show(
        DropdownAlertService.ERROR,
        translate("Error"),
        translate("Cannot complete wallet restoration right now Please try again after a moment")
      );
      this.setState({ confirming: false });
      return;
    }

    const result = await this.props.saveCryptoWallet();
    if (!result) {
      DropdownAlertService.show(
        DropdownAlertService.ERROR,
        translate("Error"),
        translate("Cannot complete wallet restoration right now Please try again after a moment")
      );
      this.setState({ confirming: false });
      return;
    }

    this.props.setSetting({
      secretWordsConfirmed: true
    });

    this.props.navigation.navigate("PinCode", {
      type: ChoosePinCode,
      onChooseSuccess: (result, pin) => {
        // Check if this user is already has referral
        if (this.props.account.father || this.props.account.grandFather) {
          // Move to Home
          this.props.navigation.navigate("Home");
          return;
        }

        // Move to Referral
        this.props.navigation.navigate("AddReferral");
      }
    });
  };

  render() {
    const styles = this.props.style;

    return (
      <Screen disableTopBackground disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.smallLogo} />
            <StyledText largeSpaceBottom center>
              {translate("Input the 12 words to recover existing wallet")}
            </StyledText>
            <Item regular style={styles.inputContainer}>
              <Input multiline value={this.state.confirmInput} onChangeText={text => this.setConfirmInput(text)} />
            </Item>
            <StyledText style={styles.countWords}>
              {`${this.state.confirmWordsCount}/${TotalWords} ${this.state.confirmWordsCount <= 1 ? translate("word") : translate("words")}`}
            </StyledText>
            <Button
              full
              veryLargeSpaceTop
              onPress={this.onConfirm}
              primary={this.state.confirmWordsCount >= TotalWords}
              disabled={this.state.confirmWordsCount < TotalWords || this.state.confirming}
            >
              {!this.state.confirming && <StyledText>{translate("CONFIRM")}</StyledText>}
              {this.state.confirming && <Spinner color="#fff" />}
            </Button>
          </Content>
        </Container>
      </Screen>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 0,
    alignItems: "center"
  },
  logo: {
    resizeMode: "contain"
  }
};

const mapStateToProps = state => {
  const { wallet, account } = state;
  return { wallet, account };
};

const mapDispatchToProps = dispatch => {
  return {
    setSetting: settings => dispatch(setSetting(settings)),
    restoreCryptoWallet: mnemonic => dispatch(restoreCryptoWallet(mnemonic)),
    saveCryptoWallet: () => dispatch(saveCryptoWallet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.RestoreWallet", styles)(RestoreWalletScreen));
