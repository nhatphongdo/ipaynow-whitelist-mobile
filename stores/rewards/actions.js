import { REWARD_INFO_CHANGED, EARN_PERIODS_CHANGED } from "./constants";
import { BASE_API_URL } from "../../constants/Constants";
import Axios from "axios";
import { sign } from "../../common/helper";

/* Events */
const rewardInfoChanged = payload => ({ type: REWARD_INFO_CHANGED, payload: payload });
const earnPeriodChanged = payload => ({ type: EARN_PERIODS_CHANGED, payload: payload });

/* Actions */
export const getRewardInfo = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return getState().reward;
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/rewards/info",
        {
          nonce,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );

      dispatch(rewardInfoChanged(response.data));
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return getState().reward;
    }
  };
};

export const getEarnPeriods = () => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/earns");
      dispatch(earnPeriodChanged(response.data));
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return [];
    }
  };
};

export const applyEarn = (id, amount) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id, amount }));

      const response = await Axios.post(
        BASE_API_URL + "/earns/apply",
        {
          nonce,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );
      dispatch(rewardInfoChanged(response.data));
      return { error: null, result: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { error: err.response.data.message, result: null };
      } else {
        console.log(err);
        return { error: err.message, result: null };
      }
    }
  };
};

export const claimDailyBonus = (id, amount) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/interests/claim",
        {
          nonce,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );
      return { error: null, result: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { error: err.response.data.message, result: null };
      } else {
        console.log(err);
        return { error: err.message, result: null };
      }
    }
  };
};
