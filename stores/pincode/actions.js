import moment from "moment";
import CryptoJS from "crypto-js";
import { MAX_FAIL_ATTEMPTS, LOCK_TIME, PINCODE_CHANGED, EXPIRED_TIME } from "./constants";
import { getPinCode, getEncryptedData, setEncryptedData, setPinCode, getDefaultHashed } from "../storage/actions";
import { clone } from "../../common/helper";

const savePinCode = async (getState, newState) => {
  const state = Object.assign({}, getState().pincode, newState);
  await setPinCode(state);
};

const getHashedPin = pin => {
  return CryptoJS.PBKDF2(pin, "FsJj%9mgP@mTARJ0%yTF").toString();
};

/* Events */
const pinCodeChanged = pinCode => ({ type: PINCODE_CHANGED, payload: pinCode });

/* Actions */
export const initPinCode = () => {
  return async (dispatch, getState) => {
    // Load pin code settings
    let pinCode = await getPinCode();
    if (!pinCode.enabled) {
      await savePinCode(getState, pinCode);
      dispatch(pinCodeChanged(pinCode));
      return pinCode;
    }

    // pinCode.valid = null;
    pinCode.currentPin = [];
    // pinCode.failAttempts = 0;
    // pinCode.expiredTime = 0;

    // Check fail attempts
    if (pinCode.failAttempts >= MAX_FAIL_ATTEMPTS) {
      pinCode.lockTime = moment()
        .add(LOCK_TIME, "minutes")
        .valueOf();
      pinCode.failAttempts = 0;
    }

    // Check lock time
    if (pinCode.lockTime < moment().valueOf()) {
      // Unlock
      pinCode.lockTime = 0;
    }

    if (pinCode.storedPin && pinCode.storedPin.length > 0) {
      const storedPinCode = Array.isArray(pinCode.storedPin) ? pinCode.storedPin.join("") : pinCode.storedPin.toString();
      pinCode.hashedPin = getHashedPin(storedPinCode);
      const data = await getEncryptedData(pinCode.hashedPin);
      if (data === null) {
        // Error
        pinCode.storedPin = [];
      }
    }

    await savePinCode(getState, pinCode);
    dispatch(pinCodeChanged(pinCode));
    return pinCode;
  };
};

export const verifyPin = (pin, saveState = true) => {
  return async (dispatch, getState) => {
    if (typeof pin === "undefined" || !pin) {
      return false;
    }
    const inputPinCode = Array.isArray(pin) ? pin.join("") : pin.toString();
    const hashedSecret = getHashedPin(inputPinCode);

    const savedPinCode = await getPinCode();
    const result = hashedSecret === savedPinCode.hashedPin;

    const pinCodeState =
      result === true
        ? {
            currentPin: clone(pin),
            valid: true,
            failAttempts: 0,
            expiredTime: moment()
              .add(EXPIRED_TIME, "minutes")
              .valueOf()
          }
        : {
            valid: false,
            failAttempts: saveState ? (savedPinCode.failAttempts < MAX_FAIL_ATTEMPTS ? savedPinCode.failAttempts + 1 : 0) : savedPinCode.failAttempts,
            lockTime:
              savedPinCode.failAttempts < MAX_FAIL_ATTEMPTS
                ? savedPinCode.lockTime
                : moment()
                    .add(LOCK_TIME, "minutes")
                    .valueOf()
          };
    await savePinCode(getState, pinCodeState);
    await dispatch(pinCodeChanged(pinCodeState));
    return result;
  };
};

export const isNeedToVerifyPinCode = () => {
  return async (dispatch, getState) => {
    const pinCode = getState().pincode;
    if (pinCode === null || typeof pinCode === "undefined" || typeof pinCode !== "object") {
      return true;
    }

    if (!pinCode.enabled) {
      return false;
    }

    try {
      if (pinCode.expiredTime < moment().valueOf()) {
        pinCode.currentPin = [];
        pinCode.expiredTime = 0;
        pinCode.valid = false;
        await savePinCode(getState, pinCode);
        dispatch(pinCodeChanged(pinCode));
        return true;
      }

      if (!pinCode.valid) {
        pinCode.currentPin = [];
        pinCode.expiredTime = 0;
        pinCode.valid = false;
        await savePinCode(getState, pinCode);
        dispatch(pinCodeChanged(pinCode));
        return true;
      }

      // Check if current hashed pin is valid
      if (pinCode.hashedPin) {
        const data = await getEncryptedData(pinCode.hashedPin);
        if (data === null) {
          // Error
          return true;
        }
      }

      return false;
    } catch (err) {
      console.log(err);
      return true;
    }
  };
};

export const updatePin = pin => {
  return async (dispatch, getState) => {
    if (typeof pin === "undefined" || !pin) {
      return false;
    }
    const inputPinCode = Array.isArray(pin) ? pin.join("") : pin.toString();
    const hashedSecret = getHashedPin(inputPinCode);

    // Re-encrypt the saved valued with new pin
    const savedPinCode = await getPinCode();
    const data = await getEncryptedData(savedPinCode.hashedPin || getDefaultHashed());
    if (data === null) {
      // Error
      return false;
    }
    const result = await setEncryptedData(data, hashedSecret);
    if (!result) {
      return false;
    }

    const pinCodeState = {
      enabled: true,
      currentPin: clone(pin),
      valid: true,
      expiredTime: moment()
        .add(EXPIRED_TIME, "minutes")
        .valueOf(),
      hashedPin: hashedSecret,
      storedPin: savedPinCode.storedPin && savedPinCode.storedPin.length > 0 ? pin : []
    };
    await savePinCode(getState, pinCodeState);
    dispatch(pinCodeChanged(pinCodeState));
    return true;
  };
};

export const storePinCode = pin => {
  return async (dispatch, getState) => {
    // Load pin code settings
    let pinCode = await getPinCode();
    pinCode.storedPin = pin;
    await savePinCode(getState, pinCode);
    dispatch(pinCodeChanged(pinCode));
    return pinCode;
  };
};
