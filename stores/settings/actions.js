import Axios from "axios";
import { SETTINGS_CHANGED } from "./constants";
import { BASE_API_URL } from "../../constants/Constants";
import Storage from "../../common/storage";
import { STORAGE_SETTINGS } from "../storage/constants";

/* Events */
const settingsChanged = payload => ({ type: SETTINGS_CHANGED, payload: payload });

/* Actions */
export const setSetting = settings => {
  return async (dispatch, getState) => {
    let currentSettings = getState().settings;
    Object.assign(currentSettings, settings);
    // Save
    await Storage.setItem(STORAGE_SETTINGS, currentSettings);
    dispatch(settingsChanged(currentSettings));
  };
};

export const loadSettings = () => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/settings");
      const state = await Storage.getItem(STORAGE_SETTINGS, getState().settings);
      for (let i = 0; i < response.data.length; i++) {
        switch (response.data[i].name) {
          case "blockchain.central-wallet":
            state.centralWallet = response.data[i].value;
            break;
          case "buy-reward.options":
            state.buyRewardOptions = response.data[i].value
              .split(",")
              .map(item => parseInt(item))
              .filter(item => !isNaN(item));
            break;
          case "buy-reward.ratio":
            state.buyRewardRatio = parseFloat(response.data[i].value);
            if (isNaN(state.buyRewardRatio)) {
              state.buyRewardRatio = 1;
            }
            break;
          case "reward.rebate-rate":
            state.rewardRebateRate = parseFloat(response.data[i].value);
            if (isNaN(state.rewardRebateRate)) {
              state.rewardRebateRate = 0;
            }
            break;
          case "deposit.options":
            state.depositOptions = response.data[i].value
              .split(",")
              .map(item => parseInt(item))
              .filter(item => !isNaN(item));
            break;
          case "reward.intereset-threshold-send":
            state.interestThresholdSend = parseFloat(response.data[i].value);
            if (isNaN(state.interestThresholdSend)) {
              state.interestThresholdSend = 10;
            }
            break;
          case "global.google-map-api-key":
            state.googleMapApiKey = response.data[i].value;
            break;
          case "store.wallet":
            state.storeWallet = response.data[i].value;
            break;
          case "exchange.escrow-wallet":
            state.escrowWallet = response.data[i].value;
            break;
          case "exchange.fee-rate":
            state.exchangeFee = parseFloat(response.data[i].value);
            if (isNaN(state.exchangeFee)) {
              state.exchangeFee = 0;
            }
            break;
        }
      }

      await dispatch(setSetting(state));
      return state;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return getState().settings;
    }
  };
};

export const getSetting = () => {
  return async (dispatch, getState) => {
    try {
      const state = await Storage.getItem(STORAGE_SETTINGS, getState().settings)
      await dispatch(setSetting(state))
      return state
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
      } else {
        console.log(err)
      }
      return getState().settings
    }
  }
}
