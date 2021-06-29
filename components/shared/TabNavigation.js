import React from 'react'
import { connect } from 'react-redux'
import { connectStyle, View } from 'native-base'
import * as WebBrowser from 'expo-web-browser'
import ThemeService from '../../services/ThemeService'
import Button from './Button'
import StyledText from './StyledText'
import { translate } from '../../constants/Languages'
import NavigationService from '../../services/NavigationService'
import { showAlert } from '../../stores/alert/actions'

class TabNavigation extends React.Component {
  onHome = () => {
    NavigationService.navigate('Home')
  }

  onHistory = () => {
    NavigationService.navigate('History')
  }

  onExchange = () => {
    // await WebBrowser.openBrowserAsync("https://ipaynow.io/rubytrade.pdf");
    NavigationService.navigate('Exchange')
  }

  onMall = () => {
    NavigationService.navigate('Merchants')
  }

  onProfile = () => {
    NavigationService.navigate('Profile')
  }

  render() {
    const styles = this.props.style

    const Background = ThemeService.getThemeStyle().variables.footerMenuBackground
    const HistoryIcon = ThemeService.getThemeStyle().variables.historyIcon
    const ExchangeIcon = ThemeService.getThemeStyle().variables.exchangeIcon
    const HomeIcon = ThemeService.getThemeStyle().variables.homeIcon
    const MallIcon = ThemeService.getThemeStyle().variables.mallIcon
    const ProfileIcon = ThemeService.getThemeStyle().variables.profileIcon
    const MerchantsIcon = ThemeService.getThemeStyle().variables.merchantsIconBottom

    return (
      <View style={styles.container}>
        {/* <Background style={styles.background} /> */}
        <View style={styles.menus}>
          <Button style={styles.button} onPress={this.onHome}>
            <HomeIcon height={ThemeService.getThemeStyle().variables.bottomBarIconHeight} />
            <StyledText style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {translate('Home')}
            </StyledText>
          </Button>
          <Button style={styles.button} onPress={this.onHistory}>
            <HistoryIcon height={ThemeService.getThemeStyle().variables.bottomBarIconHeight} />
            <StyledText style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {translate('History')}
            </StyledText>
          </Button>
          <Button style={styles.button} onPress={this.onExchange}>
            <ExchangeIcon height={ThemeService.getThemeStyle().variables.bottomBarIconHeight} />
            <StyledText style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {translate('Exchange')}
            </StyledText>
          </Button>
          <Button style={styles.button} onPress={this.onMall}>
            <MerchantsIcon height={ThemeService.getThemeStyle().variables.bottomBarIconHeight} />
            <StyledText style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {translate('Merchant')}
            </StyledText>
          </Button>
          <Button style={styles.button} onPress={this.onProfile}>
            <ProfileIcon height={ThemeService.getThemeStyle().variables.bottomBarIconHeight} />
            <StyledText style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {translate('Profile')}
            </StyledText>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  menus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
  },
}

const mapStateToProps = (state) => {
  const {} = state
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (config) => dispatch(showAlert(config)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.TabNavigation', styles)(TabNavigation))
