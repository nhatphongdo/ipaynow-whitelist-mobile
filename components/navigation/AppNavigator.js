import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../home/HomeScreen";
import NewUserScreen from "../init/NewUserScreen";
import CreateWalletScreen from "../init/CreateWalletScreen";
import ConfirmWalletScreen from "../init/ConfirmWalletScreen";
import RestoreWalletScreen from "../init/RestoreWalletScreen";
import PinCodeScreen from "../init/PinCodeScreen";
import SendScreen from "../wallet/SendScreen";
import ReceiveScreen from "../wallet/ReceiveScreen";
import EarnScreen from "../wallet/EarnScreen";
import BuyRewardScreen from "../wallet/BuyRewardScreen";
import DepositScreen from "../wallet/DepositScreen";
import GamesScreen from "../game/GamesScreen";
import LuckyDrawDetailScreen from "../game/LuckyDrawDetailScreen";
import LuckyDrawPlayScreen from "../game/LuckyDrawPlayScreen";
import RollingDicePlayScreen from "../game/RollingDicePlayScreen";
import LeaderboardsScreen from "../game/LeaderboardsScreen";
import ReferralScreen from "../profile/ReferralScreen";
import RatesScreen from "../market/RatesScreen";
import StoreScreen from "../market/StoreScreen";
import MerchantsScreen from "../market/MerchantsScreen";
import MerchantDetailScreen from "../market/MerchantDetailScreen";
import ExchangeScreen from "../market/ExchangeScreen";
import HistoryScreen from "../profile/HistoryScreen";
import ProfileScreen from "../profile/ProfileScreen";
import MallScreen from "../mall/MallScreen";
import NotificationsScreen from "../profile/NotificationsScreen";
import AddReferralScreen from "../init/AddReferralScreen";
import TradesScreen from "../market/TradesScreen";
import TradeDetailScreen from "../market/TradeDetailScreen";

const MainApp = landing =>
  createStackNavigator(
    {
      Home: {
        screen: HomeScreen
      },
      Send: {
        screen: SendScreen
      },
      Receive: {
        screen: ReceiveScreen
      },
      Earn: {
        screen: EarnScreen
      },
      BuyReward: {
        screen: BuyRewardScreen
      },
      Deposit: {
        screen: DepositScreen
      },
      Games: {
        screen: GamesScreen
      },
      LuckyDrawDetail: {
        screen: LuckyDrawDetailScreen
      },
      LuckyDrawPlay: {
        screen: LuckyDrawPlayScreen
      },
      RollingDicePlay: {
        screen: RollingDicePlayScreen
      },
      Leaderboards: {
        screen: LeaderboardsScreen
      },
      Referral: {
        screen: ReferralScreen
      },
      Rates: {
        screen: RatesScreen
      },
      Store: {
        screen: StoreScreen
      },
      Merchants: {
        screen: MerchantsScreen
      },
      MerchantDetail: {
        screen: MerchantDetailScreen
      },
      Exchange: {
        screen: ExchangeScreen
      },
      History: {
        screen: HistoryScreen
      },
      Profile: {
        screen: ProfileScreen
      },
      Notifications: {
        screen: NotificationsScreen
      },
      Mall: {
        screen: MallScreen
      },
      Trades: {
        screen: TradesScreen
      },
      TradeDetail: {
        screen: TradeDetailScreen
      }
    },
    {
      initialRouteName: landing || "Home",
      defaultNavigationOptions: {
        header: null
      }
    }
  );

const InitApp = landing =>
  createStackNavigator(
    {
      NewUser: {
        screen: NewUserScreen
      },
      CreateWallet: {
        screen: CreateWalletScreen
      },
      ConfirmWallet: {
        screen: ConfirmWalletScreen
      },
      RestoreWallet: {
        screen: RestoreWalletScreen
      },
      AddReferral: {
        screen: AddReferralScreen
      }
    },
    {
      initialRouteName: landing || "NewUser",
      headerMode: "none"
    }
  );

const AppNavigator = (initialRoute, landing) =>
  createAppContainer(
    createStackNavigator(
      {
        MainApp: {
          screen: MainApp(landing)
        },
        InitApp: {
          screen: InitApp(landing)
        },
        PinCode: {
          screen: PinCodeScreen
        },
        VerifyWallet: {
          screen: CreateWalletScreen
        },
        ConfirmVerifyWallet: {
          screen: ConfirmWalletScreen
        }
      },
      {
        initialRouteName: initialRoute || "MainApp",
        mode: "modal",
        headerMode: "none",
        defaultNavigationOptions: {
          gesturesEnabled: false
        }
      }
    )
  );

export default AppNavigator;
