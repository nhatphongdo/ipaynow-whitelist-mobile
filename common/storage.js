import { AsyncStorage } from "react-native";
import * as SecureStore from "expo-secure-store";

async function setItem(key, value, secured = false) {
    if (typeof value === "object" || Array.isArray(value)) {
        value = JSON.stringify(value);
    } else if (typeof value === "function") {
        value = value();
    } else if (typeof value !== "string") {
        value = value.toString();
    }
    if (secured) {
        return await SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    }
    return await AsyncStorage.setItem(key, value);
}

async function getItem(key, defaultValue = null, secured = false, keepAsString = false) {
    let value = null;
    if (secured) {
        value = await SecureStore.getItemAsync(key);
    } else {
        value = await AsyncStorage.getItem(key);
    }
    value = value || defaultValue;
    if (value && value !== "" && !keepAsString) {
        try {
            if (/^-?\d+$/.test(value)) {
                let number = parseInt(value);
                if (!isNaN(number)) {
                    return number;
                }
            } else if (/^-?\d+\.?\d*$/.test(value)) {
                let number = parseFloat(value);
                if (!isNaN(number)) {
                    return number;
                }
            }

            let json = JSON.parse(value);
            return json;
        } catch (e) {
            return value;
        }
    }
    return value;
}

async function removeItem(key, secured = false) {
    if (secured) {
        return await SecureStore.deleteItemAsync(key);
    }
    return await AsyncStorage.removeItem(key);
}

export default {
    setItem,
    getItem,
    removeItem
};
