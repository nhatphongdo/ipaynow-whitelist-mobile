import { clone } from "../../common/helper";
import { SETTINGS_CHANGED, AVAILABLE_THEMES, AVAILABLE_LANGUAGES } from "./constants";
import { CENTRAL_WALLET } from "../../constants/Constants";
import { CLEARED } from "../storage/constants";

const INITIAL_STATE = {
  // Local
  language: "en",
  culture: AVAILABLE_LANGUAGES.en.culture,
  currency: "USD",
  country: "Vietnam",
  theme: Object.keys(AVAILABLE_THEMES)[0],
  hardwareAuthEnabled: false,
  alwaysVerifyBeforeSend: false,
  lastDailyBonusTime: 0,
  secretWordsConfirmed: false,
  visibleWallet: true,

  // Server
  centralWallet: CENTRAL_WALLET,
  buyRewardOptions: [100, 500, 1000, 5000, 8000, 10000],
  buyRewardRatio: 5,
  depositOptions: [100, 200, 500, 1000],
  rewardRebateRate: 0,
  interestThresholdSend: 10,
  googleMapApiKey: "AIzaSyBXzqDhJBMbGaZAX5mzabOH13PumgSc2bk",
  storeWallet: CENTRAL_WALLET,
  escrowWallet: CENTRAL_WALLET,
  exchangeFee: 0
};

export default SettingsReducer = (state = INITIAL_STATE, action) => {
  let newState = clone(state);
  switch (action.type) {
    case SETTINGS_CHANGED:
      Object.assign(newState, action.payload);
      return newState;

    case CLEARED:
      return INITIAL_STATE;

    default:
      return state;
  }
};
