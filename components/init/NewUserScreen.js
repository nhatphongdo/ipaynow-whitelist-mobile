import React from 'react'
import { Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, View, Picker, connectStyle } from 'native-base'
import i18n from 'i18n-js'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import { setSetting } from '../../stores/settings/actions'
import { AVAILABLE_LANGUAGES } from '../../stores/settings/constants'
import { SUPPORTED_CURRENCIES } from '../../stores/rates/constants'
import { alignItems, style, textAlign } from 'styled-system'

class NewUserScreen extends React.Component {
  componentDidMount() {
    if (this.props.wallet.cryptoWallet) {
      this.props.navigation.navigate('MainApp', { screen: 'Home' })
    }
  }

  onCreateWallet = () => {
    this.props.navigation.navigate('CreateWallet')
  }

  onRecoverWallet = () => {
    this.props.navigation.navigate('RestoreWallet')
  }

  onLanguageChange(value) {
    this.props.setSetting({
      language: value,
      culture: AVAILABLE_LANGUAGES[value].culture,
    })
    i18n.locale = value
  }

  onCurrencyChange(value) {
    this.props.setSetting({
      currency: value,
    })
  }

  render() {
    const styles = this.props.style

    const DropdownIcon = ThemeService.getThemeStyle().variables.dropdownIcon

    const languages = Object.keys(AVAILABLE_LANGUAGES)
    const currencies = Object.keys(SUPPORTED_CURRENCIES).filter((item) => item.toLowerCase() !== 'eth')

    return (
      <Screen disableTopBackground disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.above}>
              <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.mediumLogo} />
            </View>
            <View style={styles.below}>
              <Button primary full style={styles.button} onPress={this.onCreateWallet}>
                {translate('CREATE NEW WALLET')}
              </Button>
              <Button primary full style={styles.button} onPress={this.onRecoverWallet}>
                {translate('RECOVER EXISTING WALLET')}
              </Button>
            </View>
            <View spaceTop style={styles.bottom}>
              {Platform.OS === 'android' && (
                <View
                  style={{
                    borderRadius: ThemeService.getThemeStyle().variables.buttonBorderRadius,
                    backgroundColor: {
                      'colorful-light': '#191660',
                      'colorful-dark': '#d5a3ff',
                      'simple-light': '#ffffff',
                      'simple-dark': '#15bdd8',
                    }['simple-light'],
                    flexDirection: 'row',
                    elevation: 6,
                    width: 120,
                    minHeight: ThemeService.getThemeStyle().variables.buttonHeight,
                  }}
                >
                  <Picker
                    mode='dialog'
                    style={{
                      flex: 1,
                      marginHorizontal: ThemeService.getThemeStyle().variables.buttonHorizontalPadding,
                    }}
                    selectedValue={this.props.settings.language}
                    onValueChange={this.onLanguageChange.bind(this)}
                  >
                    {languages.map((item, index) => (
                      <Picker.Item key={index} label={translate(AVAILABLE_LANGUAGES[item].name)} value={item} />
                    ))}
                  </Picker>
                </View>
              )}
              {Platform.OS === 'ios' && (
                <Picker
                  shadow
                  mode='dialog'
                  style={styles.language}
                  iosHeader={translate('Select language')}
                  iosIcon={<DropdownIcon />}
                  dropdownIconColor='62C0B3'
                  textStyle={{ textAlign: 'center' }}
                  headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                  headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                  itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                  selectedValue={this.props.settings.language}
                  onValueChange={this.onLanguageChange.bind(this)}
                >
                  {languages.map((item, index) => (
                    <Picker.Item key={index} label={translate(AVAILABLE_LANGUAGES[item].name)} value={item} />
                  ))}
                </Picker>
              )}
            </View>
            <View spaceTop spaceBottom style={styles.bottom}>
              {Platform.OS === 'android' && (
                <View
                  style={{
                    borderRadius: ThemeService.getThemeStyle().variables.buttonBorderRadius,
                    backgroundColor: {
                      'colorful-light': '#191660',
                      'colorful-dark': '#d5a3ff',
                      'simple-light': '#ffffff',
                      'simple-dark': '#15bdd8',
                    }['simple-light'],
                    flexDirection: 'row',
                    elevation: 6,
                    width: 250,
                    minHeight: ThemeService.getThemeStyle().variables.buttonHeight,
                  }}
                >
                  <Picker
                    mode='dialog'
                    style={{
                      flex: 1,
                      marginHorizontal: ThemeService.getThemeStyle().variables.buttonHorizontalPadding,
                    }}
                    selectedValue={this.props.settings.currency}
                    onValueChange={this.onCurrencyChange.bind(this)}
                  >
                    {currencies.map((item, index) => (
                      <Picker.Item key={index} label={translate(SUPPORTED_CURRENCIES[item].name)} value={item} />
                    ))}
                  </Picker>
                </View>
              )}
              {Platform.OS === 'ios' && (
                <Picker
                  shadow
                  mode='dialog'
                  style={styles.currency}
                  iosHeader={translate('Select currency')}
                  iosIcon={<DropdownIcon />}
                  textStyle={{ textAlign: 'center' }}
                  headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                  headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                  itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                  selectedValue={this.props.settings.currency}
                  onValueChange={this.onCurrencyChange.bind(this)}
                >
                  {currencies.map((item, index) => (
                    <Picker.Item key={index} label={translate(SUPPORTED_CURRENCIES[item].name)} value={item} />
                  ))}
                </Picker>
              )}
            </View>
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
    flex: 1,
  },
  above: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  below: {
    flex: 1,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
}

const mapStateToProps = (state) => {
  const { wallet, settings } = state
  return { wallet, settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSetting: (settings) => dispatch(setSetting(settings)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.NewUser', styles)(NewUserScreen))
