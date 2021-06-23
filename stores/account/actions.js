import Axios from "axios";
import CryptoJS from "crypto-js";
import { PROFILE_CHANGED } from "./constants";
import { BASE_API_URL } from "../../constants/Constants";
import moment from "moment";
import {
  setAccount,
  getAccount,
  removeTransaction,
  getTransactions,
  updateTransaction,
  getContacts,
  updateContact,
  removeContact
} from "../storage/actions";
import { publicKeyToPem, sign } from "../../common/helper";
import Storage from "../../common/storage";
import { STORAGE_LATEST_UPDATED_TRANSACTIONS, STORAGE_LATEST_UPDATED_CONTACTS } from "../storage/constants";

/* Methods */
export function convertResponseToUser(data) {
  const state = {};

  if (data.jwt) {
    state.token = data.jwt;
  }
  if (data.serverPublicKey) {
    state.serverPublicKey = data.serverPublicKey;
  }
  Object.assign(state, data.user);

  // Remap some types
  state.confirmed = state.confirmed === true || state.confirmed === 1;
  delete state.created_at;
  state.createdOn = moment(data.user.created_at).valueOf();
  state.isMerchant = state.isMerchant === true || state.isMerchant === 1;
  delete state.updated_at;
  state.updatedOn = moment(data.user.updated_at).valueOf();
  if (state.applyMerchantTime) {
    state.applyMerchantTime = moment(state.applyMerchantTime).valueOf();
  }
  state.blocked = state.blocked === true || state.blocked === 1;

  return state;
}

/* Events */
export const profileChanged = payload => ({ type: PROFILE_CHANGED, payload: payload });

/* Actions */
export const loadAccount = () => {
  return async (dispatch, getState) => {
    // Load normal data
    let account = await getAccount();
    dispatch(profileChanged(account));
    return account;
  };
};

export const saveAccount = account => {
  return async (dispatch, getState) => {
    // Merge
    const merge = Object.assign(getState().account, account);
    await setAccount(merge);
    return true;
  };
};

export const register = () => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet) {
      return null;
    }

    try {
      const username = getState().wallet.cryptoWallet.address;
      const password = getState().wallet.cryptoWallet.privateKey;
      const hashedPassword = CryptoJS.HmacSHA512(password, "QB#p!X1#QwdBYOP@b2#c").toString();
      const nonce = new Date().getTime();
      const publicKey = publicKeyToPem(getState().account.publicKey);
      const signature = await getState().wallet.cryptoWallet.signMessage(
        JSON.stringify({
          nonce,
          publicKey
        })
      );

      const response = await Axios.post(BASE_API_URL + "/auth/local/register", {
        username,
        password: hashedPassword,
        walletAddress: username,
        publicKey,
        nonce,
        signature
      });

      const state = convertResponseToUser(response.data);
      dispatch(profileChanged(state));
      await dispatch(saveAccount(state));
      return state;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return null;
    }
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet) {
      return null;
    }

    try {
      const username = getState().wallet.cryptoWallet.address;
      const password = getState().wallet.cryptoWallet.privateKey;
      const hashedPassword = CryptoJS.HmacSHA512(password, "QB#p!X1#QwdBYOP@b2#c").toString();
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(BASE_API_URL + "/auth/local", {
        identifier: username,
        password: hashedPassword,
        nonce,
        signature
      });
      const state = convertResponseToUser(response.data);
      dispatch(profileChanged(state));
      return state;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return null;
    }
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return null;
    }

    try {
      const response = await Axios.get(BASE_API_URL + "/account/profile", {
        headers: {
          Authorization: `Bearer ${getState().account.token}`
        }
      });
      const state = convertResponseToUser({ user: response.data });
      dispatch(profileChanged(state));
      return state;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return null;
    }
  };
};

export const addReferral = id => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id }));

      const response = await Axios.post(
        BASE_API_URL + "/account/addreferral",
        {
          id,
          nonce,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );
      await dispatch(profileChanged(response.data));
      return { error: null, result: getState().account };
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

export const getReferralInfo = id => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, id }));

      const response = await Axios.post(
        BASE_API_URL + "/account/referralinfo",
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

export const getHistory = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const latestTime = await Storage.getItem(STORAGE_LATEST_UPDATED_TRANSACTIONS, 0);
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, latestUpdated: latestTime })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/history",
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

      // Update transactions
      for (let i = 0; i < response.data.items.length; i++) {
        if (response.data.items[i].status === "Failed") {
          // Remove
          await dispatch(removeTransaction(response.data.items[i].txHash.toString()));
        } else {
          await dispatch(
            updateTransaction(
              response.data.items[i].toAddress,
              response.data.items[i].amount,
              response.data.items[i].unit,
              response.data.items[i].description,
              response.data.items[i].type,
              response.data.items[i].txHash.toString(),
              moment(response.data.items[i].createdOn).valueOf()
            )
          );
        }
      }

      // Reload transactions
      const result = await dispatch(getTransactions());
      await Storage.setItem(STORAGE_LATEST_UPDATED_TRANSACTIONS, response.data.updatedTime);
      return { error: null, result: result };
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

export const updateProfile = (fullName, email, availability, contactNumber, paymentInfo, language) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, fullName, email, availability, contactNumber, paymentInfo, language })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/update",
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

      // Reload profile
      dispatch(profileChanged(response.data));
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

export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/categories");
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

export const upload = (files, field) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      var data = new FormData();
      if (files) {
        files.forEach(item => {
          if (!item) {
            return;
          }
          let fileParts = item.split("/");
          data.append("files", {
            uri: item,
            name: fileParts[fileParts.length - 1],
            type: "image/jpeg"
          });
        });
      }
      data.append("refId", getState().account.id);
      data.append("ref", "user");
      data.append("source", "users-permissions");
      data.append("field", field);
      const response = await fetch(BASE_API_URL + "/account/upload", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getState().account.token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });

      const json = await response.json();
      if (response.ok) {
        return { error: null, result: json };
      }
      return { error: json.message, result: null };
    } catch (err) {
      console.log(err);
      return { error: err.message, result: null };
    }
  };
};

export const updateMerchant = (name, logo, address, country, location, phone, description, service, category, images) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      if (logo && logo.toLowerCase().indexOf("file://") === 0) {
        const uploadResult = await dispatch(upload([logo], "vendorLogo"));
        if (!uploadResult.error) {
          logo = uploadResult.result[0].url;
        } else {
          logo = null;
        }
      }
      if (images) {
        const keepImages = images.filter(item => item && item.toLowerCase().indexOf("file://") !== 0);
        images = images.filter(item => item && item.toLowerCase().indexOf("file://") === 0);
        if (images.length > 0) {
          const uploadResult = await dispatch(upload(images, "vendorImages"));
          if (!uploadResult.error) {
            images = keepImages.concat(uploadResult.result.map(item => item.url));
          } else {
            images = keepImages;
          }
        } else {
          images = keepImages;
        }
      }

      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({
          nonce
        })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/merchant",
        {
          name,
          oldLogo: getState().account.vendorLogo,
          logo,
          address,
          country,
          addressLocation: location,
          contactNumber: phone,
          service,
          description,
          oldImages: getState().account.vendorImages,
          images,
          category,
          nonce,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );

      // Reload profile
      dispatch(profileChanged(response.data));
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

export const cancelMerchant = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({
          nonce
        })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/cancelMerchant",
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

      // Reload profile
      dispatch(profileChanged(response.data));
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

export const getMerchants = (search, country, category) => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/account/merchants", {
        params: {
          search,
          country,
          category
        }
      });
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

export const getMerchant = id => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.get(BASE_API_URL + "/account/merchants/" + id);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
      return null;
    }
  };
};

export const reviewMerchant = (id, title, content, rates) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, title, content, rates })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/merchants/" + id + "/review",
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

export const updatePushNotificationToken = token => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, token }));

      const response = await Axios.post(
        BASE_API_URL + "/account/updatePushToken",
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

      // Reload profile
      dispatch(profileChanged(response.data));
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

export const getNotification = id => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/notifications/" + id,
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

export const getNotifications = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/notifications",
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

export const readAllNotifications = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/notifications/read",
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

export const loadContacts = () => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const latestTime = await Storage.getItem(STORAGE_LATEST_UPDATED_CONTACTS, 0);
      const nonce = new Date().getTime();
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, latestUpdated: latestTime })
      );

      const response = await Axios.post(
        BASE_API_URL + "/account/contacts",
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

      // Update contacts
      for (let i = 0; i < response.data.items.length; i++) {
        await dispatch(updateContact(response.data.items[i].name, response.data.items[i].accountNumber || "", response.data.items[i].walletAddress));
      }

      // Reload contact
      const result = await dispatch(getContacts());
      await Storage.setItem(STORAGE_LATEST_UPDATED_CONTACTS, response.data.updatedTime);
      return { error: null, result: result };
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

export const uploadContact = (name, walletAddress) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce, name }));

      const response = await Axios.post(
        BASE_API_URL + "/account/updateContact",
        {
          nonce,
          walletAddress,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );

      // Reload contacts
      await dispatch(updateContact(response.data.name, response.data.contactId || "", response.data.walletAddress));
      const result = await dispatch(getContacts());

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

export const deleteContact = walletAddress => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: "You need to login to proceed", result: null };
    }

    try {
      const nonce = new Date().getTime();
      const signature = await sign(getState().account.privateKey, getState().account.serverPublicKey, JSON.stringify({ nonce }));

      const response = await Axios.post(
        BASE_API_URL + "/account/deleteContact",
        {
          nonce,
          walletAddress,
          signature
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`
          }
        }
      );

      // Reload contacts
      await dispatch(removeContact(walletAddress));
      const result = await dispatch(getContacts());

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
