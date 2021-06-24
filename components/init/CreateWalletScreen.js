import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Spinner } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'
import { createCryptoWallet } from '../../stores/wallet/actions'
import DropdownAlertService from '../../services/DropdownAlertService'

class CreateWalletScreen extends React.Component {
  state = {
    verifying: this.props.route.params?.verifying || false,
    creating: true,
    words: Array(12).fill(''),
  }

  componentDidMount() {
    setTimeout(this._bootstrap, 100)
  }

  _bootstrap = async () => {
    if (this.state.verifying) {
      const words = this.props.wallet.cryptoMnemonic.split(' ')
      this.setState({ creating: false, words: words })
    } else {
      const wallet = await this.props.createCryptoWallet()
      if (wallet === null) {
        DropdownAlertService.show(
          DropdownAlertService.ERROR,
          translate('Error'),
          translate('Cannot create crypto wallet right now Please try again after a moment')
        )
        this.props.navigation.goBack()
        return
      }
      this.setState({ creating: false, words: wallet.mnemonic.split(' ') })
    }
  }

  onConfirm = () => {
    if (this.state.verifying) {
      this.props.navigation.navigate('ConfirmVerifyWallet', {
        verifying: true,
      })
    } else {
      this.props.navigation.navigate('ConfirmWallet')
    }
  }

  render() {
    const styles = this.props.style

    return (
      <Screen disableTopBackground disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.smallLogo} />
            <StyledText largeSpaceBottom center>
              {translate(
                "Write down the words below in order and keep them private and secure You won't be able to restore your wallet or recover your funds if you lose them"
              )}
            </StyledText>
            {this.state.creating && <Spinner color={ThemeService.getThemeStyle().variables.brandPrimary} />}
            {!this.state.creating && (
              <View style={styles.list}>
                {this.state.words.map((word, index) => (
                  <Button key={index} primary disabled style={styles.button}>
                    {`${index + 1}. ${word}`}
                  </Button>
                ))}
              </View>
            )}
            {!this.state.creating && (
              <Button primary full veryLargeSpaceTop onPress={this.onConfirm}>
                {translate('NEXT')}
              </Button>
            )}
          </Content>
        </Container>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state) => {
  const { wallet } = state
  return { wallet }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCryptoWallet: (options) => dispatch(createCryptoWallet(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.CreateWallet', styles)(CreateWalletScreen))
