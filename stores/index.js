import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AlertReducer from './alert/reducer'
import SettingsReducer from './settings/reducer'
import PinCodeReducer from './pincode/reducer'
import WalletReducer from './wallet/reducer'
import StorageReducer from './storage/reducer'
import RewardReducer from './rewards/reducer'
import RatesReducer from './rates/reducer'
import AccountReducer from './account/reducer'
import GamesReducer from './game/reducer'
import MarketReducer from './market/reducer'

const store = createStore(
  combineReducers({
    storage: StorageReducer,
    alert: AlertReducer,
    settings: SettingsReducer,
    pincode: PinCodeReducer,
    wallet: WalletReducer,
    reward: RewardReducer,
    rates: RatesReducer,
    account: AccountReducer,
    games: GamesReducer,
    market: MarketReducer,
  }),
  applyMiddleware(thunk)
)

export default store
