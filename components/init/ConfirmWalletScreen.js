import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Input, Spinner } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'
import { shuffle, clone } from '../../common/helper'
import DropdownAlertService from '../../services/DropdownAlertService'
import { saveCryptoWallet } from '../../stores/wallet/actions'
import { ChoosePinCode } from './PinCodeScreen'
import { setSetting } from '../../stores/settings/actions'

const TotalWords = 12

class ConfirmWalletScreen extends React.Component {
  state = {
    verifying: this.props.route.params?.verifying || false,
    confirming: false,
    words: Array(TotalWords).fill(''),
    confirmInput: '',
    confirmWordsCount: 0,
    usedWords: [],
    buttonsValid: Array(TotalWords).fill(true),
    understand: false,
  }

  componentDidMount() {
    const words = this.state.verifying ? this.props.wallet.cryptoMnemonic.phrase.split(' ') : this.props.wallet.cryptoWallet.mnemonic.phrase.split(' ')
    this.setState({ words: shuffle(words) })
  }

  _countWords = (text) => {
    const words = text.split(/[\s]+/)
    const valid = []
    for (let i = 0; i < words.length; i++) {
      if (words[i] != '') {
        valid.push(words[i].toLowerCase())
      }
    }
    return valid
  }

  setConfirmInput = (text, index) => {
    const words = this._countWords(text)

    if (words.length > TotalWords) {
      return
    }

    const buttons = clone(this.state.buttonsValid)
    if (index) {
      buttons[index] = false
    } else {
      // Reset valid based on inputted text
      const cloneWords = this._countWords(text)
      for (let i = 0; i < buttons.length; i++) {
        buttons[i] = true
        let index = cloneWords.indexOf(this.state.words[i])
        if (index >= 0) {
          // Found word
          buttons[i] = false
          cloneWords.splice(index, 1)
        }
      }
    }

    this.setState({
      confirmInput: text,
      confirmWordsCount: words.length,
      usedWords: words,
      buttonsValid: buttons,
    })
  }

  onWordPress = (word, index) => {
    this.setConfirmInput(this.state.confirmInput + (this.state.confirmInput === '' ? '' : ' ') + word, index)
  }

  onUnderstandChanged = (option) => {
    this.setState({ understand: option })
  }

  onConfirm = async () => {
    // Validate the words
    const words = this.state.verifying
      ? this.props.wallet.cryptoMnemonic.phrase.split(' ')
      : this.props.wallet.cryptoWallet.mnemonic.phrase.split(' ')
    if (this.state.usedWords.length < TotalWords) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Word phrases are not correct'))
      return
    }
    let valid = true
    for (let i = 0; i < TotalWords; i++) {
      if (words[i] !== this.state.usedWords[i]) {
        valid = false
        break
      }
    }
    if (!valid) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Word phrases are not correct'))
      return
    }

    this.onNext(true)
  }

  onNext = async (confirmed) => {
    this.setState({ confirming: true })

    if (this.state.verifying) {
      this.props.setSetting({
        secretWordsConfirmed: confirmed === true ? true : false,
      })

      this.props.navigation.navigate('MainApp', { screen: 'Home' })
    } else {
      // Save wallet
      const result = await this.props.saveCryptoWallet()
      if (!result) {
        DropdownAlertService.show(
          DropdownAlertService.ERROR,
          translate('Error'),
          translate('Cannot complete wallet creation right now Please try again after a moment')
        )
        this.setState({ confirming: false })
        return
      }

      this.props.setSetting({
        firstTime: false,
        secretWordsConfirmed: confirmed === true ? true : false,
      })

      this.props.navigation.navigate('PinCode', {
        type: ChoosePinCode,
        onChooseSuccess: (result, pin) => {
          // Move to Referral
          this.props.navigation.navigate('AddReferral')
        },
      })
    }
  }

  render() {
    const styles = this.props.style

    const CheckBoxIcon = ThemeService.getThemeStyle().variables.checkBoxIcon

    return (
      <Screen disableTopBackground disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.smallLogo} />
            <StyledText spaceBottom center>
              {translate('Confirm the words in correct order')}
            </StyledText>
            <Item regular style={styles.inputContainer}>
              <Input multiline value={this.state.confirmInput} onChangeText={(text) => this.setConfirmInput(text)} />
            </Item>
            <StyledText style={styles.countWords}>
              {`${this.state.confirmWordsCount}/${TotalWords} ${this.state.confirmWordsCount <= 1 ? translate('word') : translate('words')}`}
            </StyledText>
            <View spaceTop style={styles.list}>
              {this.state.words.map((word, index) => (
                <Button
                  key={index}
                  primary={this.state.buttonsValid[index]}
                  disabled={!this.state.buttonsValid[index]}
                  style={styles.button}
                  onPress={() => this.onWordPress(word, index)}
                >
                  {word}
                </Button>
              ))}
            </View>
            <Button
              full
              largeSpaceTop
              onPress={this.onConfirm}
              primary={this.state.confirmWordsCount >= TotalWords}
              disabled={this.state.confirmWordsCount < TotalWords || this.state.confirming}
            >
              {!this.state.confirming && <StyledText>{translate('CONFIRM')}</StyledText>}
              {this.state.confirming && <Spinner color='#fff' />}
            </Button>
            <Button full spaceTop onPress={this.onNext} primary={this.state.understand} disabled={!this.state.understand || this.state.confirming}>
              {!this.state.confirming && <StyledText>{translate('BACKUP LATER')}</StyledText>}
              {this.state.confirming && <Spinner color='#fff' />}
            </Button>
            <Button full spaceRight checkbox checked={this.state.understand} onPress={() => this.onUnderstandChanged(!this.state.understand)}>
              <CheckBoxIcon
                fill={
                  this.state.understand
                    ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                    : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                }
                checked={this.state.understand}
              />
              <StyledText>{translate('I will understand I will lose all wallet fund if I lose my secret 12 words')}</StyledText>
            </Button>
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
    setSetting: (settings) => dispatch(setSetting(settings)),
    saveCryptoWallet: () => dispatch(saveCryptoWallet()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.ConfirmWallet', styles)(ConfirmWalletScreen))
