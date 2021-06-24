import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NavigationService from '../../services/NavigationService'
import HomeScreen from '../home/HomeScreen'
import NewUserScreen from '../init/NewUserScreen'
import CreateWalletScreen from '../init/CreateWalletScreen'
import ConfirmWalletScreen from '../init/ConfirmWalletScreen'
import RestoreWalletScreen from '../init/RestoreWalletScreen'
import PinCodeScreen from '../init/PinCodeScreen'
import SendScreen from '../wallet/SendScreen'
import ReceiveScreen from '../wallet/ReceiveScreen'
import EarnScreen from '../wallet/EarnScreen'
import BuyRewardScreen from '../wallet/BuyRewardScreen'
import DepositScreen from '../wallet/DepositScreen'
import GamesScreen from '../game/GamesScreen'
import LuckyDrawDetailScreen from '../game/LuckyDrawDetailScreen'
import LuckyDrawPlayScreen from '../game/LuckyDrawPlayScreen'
import RollingDicePlayScreen from '../game/RollingDicePlayScreen'
import LeaderboardsScreen from '../game/LeaderboardsScreen'
import ReferralScreen from '../profile/ReferralScreen'
import RatesScreen from '../market/RatesScreen'
import StoreScreen from '../market/StoreScreen'
import MerchantsScreen from '../market/MerchantsScreen'
import MerchantDetailScreen from '../market/MerchantDetailScreen'
import ExchangeScreen from '../market/ExchangeScreen'
import HistoryScreen from '../profile/HistoryScreen'
import ProfileScreen from '../profile/ProfileScreen'
import MallScreen from '../mall/MallScreen'
import NotificationsScreen from '../profile/NotificationsScreen'
import AddReferralScreen from '../init/AddReferralScreen'
import TradesScreen from '../market/TradesScreen'
import TradeDetailScreen from '../market/TradeDetailScreen'

const MainAppStack = createStackNavigator()
const MainApp = ({ landing }) => (
  <MainAppStack.Navigator
    initialRouteName={landing || 'Home'}
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainAppStack.Screen name='Home' component={HomeScreen} />
    <MainAppStack.Screen name='Send' component={SendScreen} />
    <MainAppStack.Screen name='Receive' component={ReceiveScreen} />
    <MainAppStack.Screen name='Earn' component={EarnScreen} />
    <MainAppStack.Screen name='BuyReward' component={BuyRewardScreen} />
    <MainAppStack.Screen name='Deposit' component={DepositScreen} />
    <MainAppStack.Screen name='Games' component={GamesScreen} />
    <MainAppStack.Screen name='LuckyDrawDetail' component={LuckyDrawDetailScreen} />
    <MainAppStack.Screen name='LuckyDrawPlay' component={LuckyDrawPlayScreen} />
    <MainAppStack.Screen name='RollingDicePlay' component={RollingDicePlayScreen} />
    <MainAppStack.Screen name='Leaderboards' component={LeaderboardsScreen} />
    <MainAppStack.Screen name='Referral' component={ReferralScreen} />
    <MainAppStack.Screen name='Rates' component={RatesScreen} />
    <MainAppStack.Screen name='Store' component={StoreScreen} />
    <MainAppStack.Screen name='Merchants' component={MerchantsScreen} />
    <MainAppStack.Screen name='MerchantDetail' component={MerchantDetailScreen} />
    <MainAppStack.Screen name='Exchange' component={ExchangeScreen} />
    <MainAppStack.Screen name='History' component={HistoryScreen} />
    <MainAppStack.Screen name='Profile' component={ProfileScreen} />
    <MainAppStack.Screen name='Notifications' component={NotificationsScreen} />
    <MainAppStack.Screen name='Mall' component={MallScreen} />
    <MainAppStack.Screen name='Trades' component={TradesScreen} />
    <MainAppStack.Screen name='TradeDetail' component={TradeDetailScreen} />
  </MainAppStack.Navigator>
)

const InitAppStack = createStackNavigator()
const InitApp = ({ landing }) => (
  <InitAppStack.Navigator initialRouteName={landing || 'NewUser'} headerMode='none'>
    <InitAppStack.Screen name='NewUser' component={NewUserScreen} />
    <InitAppStack.Screen name='CreateWallet' component={CreateWalletScreen} />
    <InitAppStack.Screen name='ConfirmWallet' component={ConfirmWalletScreen} />
    <InitAppStack.Screen name='RestoreWallet' component={RestoreWalletScreen} />
    <InitAppStack.Screen name='AddReferral' component={AddReferralScreen} />
  </InitAppStack.Navigator>
)

const AppStack = createStackNavigator()
const AppNavigator = ({ initialRoute, landing = undefined }) => (
  <NavigationContainer ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}>
    <AppStack.Navigator
      initialRouteName={initialRoute || 'MainApp'}
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <AppStack.Screen name='MainApp'>{(props) => <MainApp landing={landing} />}</AppStack.Screen>
      <AppStack.Screen name='InitApp'>{(props) => <InitApp landing={landing} />}</AppStack.Screen>
      <AppStack.Screen name='PinCode' component={PinCodeScreen} />
      <AppStack.Screen name='VerifyWallet' component={CreateWalletScreen} />
      <AppStack.Screen name='ConfirmVerifyWallet' component={ConfirmWalletScreen} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
