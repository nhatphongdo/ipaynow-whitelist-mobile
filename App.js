import React from 'react'
import { Image, Alert as SystemAlert, BackHandler, StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import * as Notifications from 'expo-notifications'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { StyleProvider, connectStyle, View } from 'native-base'
import AnimatedProgressWheel from 'react-native-progress-wheel'
import i18n from 'i18n-js'
import store from './stores'
import ThemeService from './services/ThemeService'
import Alert from './components/shared/Alert'
import TopAlert from './components/shared/TopAlert'
import AppNavigator from './components/navigation/AppNavigator'
import { initPinCode } from './stores/pincode/actions'
import { getCryptoWallet } from './stores/wallet/actions'
import { initDatabase, clear } from './stores/storage/actions'
import { updateRates } from './stores/rates/actions'
import { loadSettings, getSetting } from './stores/settings/actions'
import { register, login, saveAccount, loadAccount } from './stores/account/actions'
import { generateKeyPair } from './common/helper'
import { translate } from './constants/Languages'
import Socket from './services/Socket'
import { STORAGE_SETTINGS } from './stores/storage/constants'
import Storage from './common/storage'
import { getNotification } from './stores/account/actions'
import DropdownAlertService from './services/DropdownAlertService'
import StyledText from './components/shared/StyledText'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      splashBottomLine: null,
      isSplashReady: false,
      isAppReady: false,
      progress: 0,
      route: 'InitApp',
      theme: ThemeService.getThemeStyle(),
    }

    this._bootstrap()

    this.storeUnsubscribe = store.subscribe(() => {
      if (store.getState().settings.theme !== ThemeService.getTheme()) {
        ThemeService.setTheme(store.getState().settings.theme)
        this.setState({
          theme: ThemeService.getThemeStyle(),
        })
      }
    })
  }

  componentWillUnmount() {
    this.storeUnsubscribe()
  }

  _bootstrap = async () => {
    const settings = await Storage.getItem(STORAGE_SETTINGS, {})
    ThemeService.setTheme(settings.theme)
    this.setState({
      theme: ThemeService.getThemeStyle(),
    })

    this._notificationSubscription = Notifications.addNotificationReceivedListener(this._handleNotification)
  }

  _handleNotification = async (notification) => {
    console.log(notification)
    if (notification.origin === 'received' && notification.data.id) {
      const result = await store.dispatch(getNotification(notification.data.id))
      if (!result.error) {
        DropdownAlertService.show(DropdownAlertService.INFO, result.result.title, result.result.message)
      }
    }
  }

  render() {
    const styles = this.props.style

    const Background = this.state.theme.variables.mainBackground

    // if (this.state.theme.name === "colorful-dark" || this.state.theme.name === "simple-dark") {
    //   StatusBar.setBarStyle("light-content");
    // } else {
    //   StatusBar.setBarStyle("dark-content");
    // }
    StatusBar.setBarStyle('light-content')

    if (!this.state.isSplashReady && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={() => {
            this.setState({ isSplashReady: true })
          }}
          autoHideSplash={false}
        />
      )
    }

    if (!this.state.isAppReady) {
      return (
        <StyleProvider style={this.state.theme}>
          <Background style={styles.splashContainer}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Image style={styles.logo} source={this.state.theme.variables.largeLogo} onLoad={this._cacheResourcesAsync} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <AnimatedProgressWheel
                size={80}
                width={10}
                color={'white'}
                fullColor={this.state.theme.variables.brandPrimary}
                progress={this.state.progress}
                backgroundColor={this.state.theme.variables.brandSecondary}
              />
            </View>
            <View
              style={{
                flex: 0,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: this.state.theme.variables.footerHeight,
              }}
            >
              {/* <Image style={styles.bottomLine} source={this.state.splashBottomLine} /> */}
              <StyledText h4 center bold='medium'>{`${translate('Copyright')} 2021 <color ${
                this.state.theme.variables.brandPrimary
              }>ipaynow.io</color>`}</StyledText>
              <StyledText h4 center bold='medium' smallSpaceTop spaceLeft spaceRight>
                {translate('A decentralized loyalty wallet')}
              </StyledText>
            </View>
          </Background>
        </StyleProvider>
      )
    }

    return (
      <Provider store={store}>
        <StyleProvider style={this.state.theme}>
          <View style={styles.container}>
            <AppNavigator initialRoute={this.state.route} />
            <Alert />
            <TopAlert />
          </View>
        </StyleProvider>
      </Provider>
    )
  }

  _cacheSplashResourcesAsync = async () => {
    await Asset.loadAsync([
      require('./assets/images/logo.png'),

      /* require("./assets/images/splash-bottom-line.png"),
      require("./assets/images/splash-bottom-line.kr.png"),
      require("./assets/images/splash-bottom-line.jp.png"),
      require("./assets/images/splash-bottom-line.vn.png"),
      require("./assets/images/splash-bottom-line.cn.png"),

      require("./assets/images/splash-bottom-line-dark-color.png"),
      require("./assets/images/splash-bottom-line-dark-color.kr.png"),
      require("./assets/images/splash-bottom-line-dark-color.jp.png"),
      require("./assets/images/splash-bottom-line-dark-color.vn.png"),
      require("./assets/images/splash-bottom-line-dark-color.cn.png"),

      require("./assets/images/splash-bottom-line-light-simple.png"),
      require("./assets/images/splash-bottom-line-light-simple.kr.png"),
      require("./assets/images/splash-bottom-line-light-simple.jp.png"),
      require("./assets/images/splash-bottom-line-light-simple.vn.png"),
      require("./assets/images/splash-bottom-line-light-simple.cn.png"),

      require("./assets/images/splash-bottom-line-dark-simple.png"),
      require("./assets/images/splash-bottom-line-dark-simple.kr.png"),
      require("./assets/images/splash-bottom-line-dark-simple.jp.png"),
      require("./assets/images/splash-bottom-line-dark-simple.vn.png"),
      require("./assets/images/splash-bottom-line-dark-simple.cn.png") */
    ])
    await Font.loadAsync({
      exo: require('./assets/fonts/Exo-Regular.ttf'),
      'exo-bold': require('./assets/fonts/Exo-Bold.ttf'),
      'exo-medium': require('./assets/fonts/Exo-Medium.ttf'),
    })

    /* let splashBottomLine = require("./assets/images/splash-bottom-line.png");
    const settings = await Storage.getItem(STORAGE_SETTINGS, {});
    if (settings.language === "en") {
      if (settings.theme === "colorful-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line.png");
      } else if (settings.theme === "colorful-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-color.png");
      } else if (settings.theme === "simple-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line-light-simple.png");
      } else if (settings.theme === "simple-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-simple.png");
      }
    } else if (settings.language === "kr") {
      if (settings.theme === "colorful-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line.kr.png");
      } else if (settings.theme === "colorful-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-color.kr.png");
      } else if (settings.theme === "simple-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line-light-simple.kr.png");
      } else if (settings.theme === "simple-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-simple.kr.png");
      }
    } else if (settings.language === "jp") {
      if (settings.theme === "colorful-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line.jp.png");
      } else if (settings.theme === "colorful-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-color.jp.png");
      } else if (settings.theme === "simple-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line-light-simple.jp.png");
      } else if (settings.theme === "simple-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-simple.jp.png");
      }
    } else if (settings.language === "vn") {
      if (settings.theme === "colorful-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line.vn.png");
      } else if (settings.theme === "colorful-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-color.vn.png");
      } else if (settings.theme === "simple-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line-light-simple.vn.png");
      } else if (settings.theme === "simple-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-simple.vn.png");
      }
    } else if (settings.language === "cn") {
      if (settings.theme === "colorful-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line.cn.png");
      } else if (settings.theme === "colorful-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-color.cn.png");
      } else if (settings.theme === "simple-light") {
        splashBottomLine = require("./assets/images/splash-bottom-line-light-simple.cn.png");
      } else if (settings.theme === "simple-dark") {
        splashBottomLine = require("./assets/images/splash-bottom-line-dark-simple.cn.png");
      }
    }
    this.setState({ splashBottomLine }); */
  }

  _cacheResourcesAsync = async () => {
    await SplashScreen.hideAsync()

    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/shadow.png'),
        require('./assets/images/shadow-light.png'),
        require('./assets/images/membership-icon.png'),
        require('./assets/images/special-format-icon.png'),
        require('./assets/images/close-light.png'),
        require('./assets/images/close-dark.png'),
        require('./assets/images/hdn-coin.png'),
      ]),
    ])
    this.setState({ progress: 5 })

    // Reset data
    const settings = await store.dispatch(getSetting())
    if (settings.firstTime) {
      // Clear
      await store.dispatch(clear())
    }

    // Load data
    await store.dispatch(loadSettings())
    i18n.locale = store.getState().settings.language
    this.setState({ progress: 10 })
    await store.dispatch(initPinCode())
    this.setState({ progress: 15 })
    await store.dispatch(getCryptoWallet())
    this.setState({ progress: 25 })
    await store.dispatch(initDatabase())
    this.setState({ progress: 35 })
    await store.dispatch(updateRates())
    this.setState({ progress: 45 })

    // Personal init
    // Load saved data
    const account = await store.dispatch(loadAccount())
    this.setState({ progress: 50 })

    if (!account.privateKey || !account.publicKey) {
      // Generate client key pair if needed
      const keys = await generateKeyPair()
      account.privateKey = keys.privateKey
      account.publicKey = keys.publicKey
      await store.dispatch(saveAccount(account))
      this.setState({ progress: 70 })
    }

    if (store.getState().wallet.cryptoWallet) {
      // Try to login
      const profile = await store.dispatch(login())
      this.setState({ progress: 80 })

      if (!profile) {
        // Not yet created or failed then try to register
        const regResult = await store.dispatch(register())
        if (!regResult) {
          // Register failed
          SystemAlert.alert(
            translate('Error'),
            translate(
              'Failed to register you with our system Please close application and try again after a moment or contact our staff for support'
            ),
            [{ text: translate('OK'), onPress: () => BackHandler.exitApp() }],
            { cancelable: false }
          )
          return
        }
      } else {
        // Update to local store
        const result = await store.dispatch(saveAccount(profile))
      }
      this.setState({ progress: 90 })

      // Connect socket
      Socket.setStore(store)
      await Socket.connect()
      this.setState({ progress: 100 })
    }

    this.setState({
      isAppReady: true,
      progress: 100,
      route: store.getState().wallet.cryptoWallet ? 'MainApp' : 'InitApp',
    })
  }

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error)
  }
}

const styles = {
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
    width: ThemeService.getThemeStyle().variables.deviceWidth / 2,
    height: ((ThemeService.getThemeStyle().variables.deviceWidth / 2) * 591) / 699,
  },
  bottomLine: {
    resizeMode: 'contain',
  },
}

export default connectStyle('iPayNow.App', styles)(App)
