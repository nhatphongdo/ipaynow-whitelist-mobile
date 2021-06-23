import Axios from "axios";
import { sign } from "../../common/helper";
import { BASE_API_URL } from "../../constants/Constants";
import { profileChanged, convertResponseToUser } from "../account/actions.js";

/* Actions */
export const getStores = () => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/stores");
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

export const purchase = (id, value) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id, value }));

      const response = await Axios.post(
        BASE_API_URL + "/stores/purchase",
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

export const pay = (id, txHash) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id, txHash }));

      const response = await Axios.post(
        BASE_API_URL + "/stores/pay",
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

      if (response.data.user) {
        dispatch(profileChanged(convertResponseToUser(response.data)));
      }

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

export const createExchange = (amount, type, txHash) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, amount, type, txHash })
      );

      const response = await Axios.post(
        BASE_API_URL + "/exchanges/create",
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

export const getExchanges = () => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/exchanges");
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

export const getTrades = status => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, status }));

      const response = await Axios.post(
        BASE_API_URL + "/trades",
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

export const approve = (id, status) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id, status }));

      const response = await Axios.post(
        BASE_API_URL + "/trades/approve",
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

export const reject = (id, status) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id, status }));

      const response = await Axios.post(
        BASE_API_URL + "/trades/reject",
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

export const getDetail = id => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id }));

      const response = await Axios.post(
        BASE_API_URL + "/trades/detail",
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

export const withdraw = exchangeId => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id: exchangeId }));

      const response = await Axios.post(
        BASE_API_URL + "/exchanges/withdraw",
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
