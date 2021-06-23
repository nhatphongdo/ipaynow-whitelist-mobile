import moment from "moment";
import CryptoJS from "crypto-js";
import * as SQLite from "expo-sqlite";
import i18n from "i18n-js";
import Storage from "../../common/storage";
import {
  STORAGE_PIN_CODE,
  STORAGE_SECURE,
  DATABASE_LOADED,
  CONTACT_LOADED,
  CONTACT_UPDATED,
  CONTACT_REMOVED,
  TRANSACTION_UPDATED,
  TRANSACTION_REMOVED,
  TRANSACTION_LOADED,
  STORAGE_ACCOUNT,
  STORAGE_SECURE_ACCOUNT,
  CLEARED,
  STORAGE_LATEST_UPDATED_TRANSACTIONS,
  STORAGE_SETTINGS
} from "./constants";
import { DEFAULT_PINCODE } from "../pincode/constants";
import { RATES_LOADED, RATES_UPDATED, RATES_REMOVED, RATES_CLEARED } from "../rates/constants";
import { clone, generateKeyPair } from "../../common/helper";

/* Methods */
export const getDefaultHashed = () => {
  return CryptoJS.PBKDF2("iP$yN0w", "p$W#^*0Mn1B%WJBchC^6").toString();
};

export const getPinCode = async () => {
  let pinCode = await Storage.getItem(STORAGE_PIN_CODE, DEFAULT_PINCODE, true);
  if (typeof pinCode !== "object") {
    pinCode = DEFAULT_PINCODE;
  }
  return pinCode;
};

export const setPinCode = async pinCode => {
  await Storage.setItem(STORAGE_PIN_CODE, pinCode, true);
};

export const getAccount = async () => {
  let account = await Storage.getItem(STORAGE_ACCOUNT, {}, false);
  const secure = await Storage.getItem(STORAGE_SECURE_ACCOUNT, {}, true);
  Object.assign(account, secure);
  return account;
};

export const setAccount = async account => {
  let temp = clone(account);
  delete temp.privateKey;
  delete temp.publicKey;
  await Storage.setItem(STORAGE_ACCOUNT, temp, false);

  const secure = {
    privateKey: account.privateKey,
    publicKey: account.publicKey
  };
  await Storage.setItem(STORAGE_SECURE_ACCOUNT, secure, true);
};

export const setEncryptedData = async (data, hashed, name = STORAGE_SECURE) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), hashed).toString();
    await Storage.setItem(name, encrypted, true);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getEncryptedData = async (hashed, name = STORAGE_SECURE) => {
  try {
    const encrypted = await Storage.getItem(name, "", true);
    if (encrypted === "") {
      // No data
      return {};
    }

    const result = CryptoJS.AES.decrypt(encrypted, hashed).toString(CryptoJS.enc.Utf8);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const clear = () => {
  return async (dispatch, getState) => {
    await Storage.removeItem(STORAGE_PIN_CODE, true);
    await Storage.removeItem(STORAGE_ACCOUNT, false);
    await Storage.removeItem(STORAGE_SECURE_ACCOUNT, true);
    await Storage.removeItem(STORAGE_SECURE, true);
    await Storage.removeItem(STORAGE_LATEST_UPDATED_TRANSACTIONS, false);
    await Storage.removeItem(STORAGE_SETTINGS, false);

    await dispatch(cleared());

    i18n.locale = getState().settings.language;

    // Remove db
    try {
      const db = getState().storage.database;
      if (db) {
        db.transaction(
          tx => {
            tx.executeSql("delete from contacts");
            tx.executeSql("delete from transactions");
          },
          err => console.log(err)
        );
      }
    } catch (err) {
      console.log(err);
    }

    let account = {};
    const keys = await generateKeyPair();
    account.privateKey = keys.privateKey;
    account.publicKey = keys.publicKey;
    const merge = Object.assign(getState().account, account);
    await setAccount(merge);
  };
};

/* Events */
const databaseLoaded = database => ({ type: DATABASE_LOADED, payload: database });
const contactLoaded = payload => ({ type: CONTACT_LOADED, payload: payload });
const contactUpdated = payload => ({ type: CONTACT_UPDATED, payload: payload });
const contactRemoved = payload => ({ type: CONTACT_REMOVED, payload: payload });
const transactionLoaded = payload => ({ type: TRANSACTION_LOADED, payload: payload });
const transactionUpdated = payload => ({ type: TRANSACTION_UPDATED, payload: payload });
const transactionRemoved = payload => ({ type: TRANSACTION_REMOVED, payload: payload });
const ratesLoaded = payload => ({ type: RATES_LOADED, payload: payload });
const ratesUpdated = payload => ({ type: RATES_UPDATED, payload: payload });
const ratesRemoved = payload => ({ type: RATES_REMOVED, payload: payload });
const ratesCleared = payload => ({ type: RATES_CLEARED, payload: {} });
const cleared = payload => ({ type: CLEARED, payload: payload });

/* Actions */
const _initDatabase = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("ipaynow.db");

    // Create tables if they do not exist
    db.transaction(
      tx => {
        tx.executeSql("create table if not exists contacts (id integer primary key not null, name text, user_id text, wallet_address text);");
        tx.executeSql(
          "create table if not exists transactions (id integer primary key not null, to_address text, amount real, description text, type text, tx_hash text, created_on int);"
        );
        tx.executeSql(
          "create table if not exists rates (id integer primary key not null, foreign_currency text, base_currency text, rate real, source text, updated_on int);"
        );
      },
      err => reject(err),
      () => {
        // Modify tables
        db.transaction(
          tx => {
            tx.executeSql("alter table transactions add column unit text default null;");
          },
          err => resolve(db),
          () => resolve(db)
        );
      }
    );
  });
export const initDatabase = () => {
  return async (dispatch, getState) => {
    try {
      const db = await _initDatabase();
      dispatch(databaseLoaded(db));
      return db;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _getContacts = (db, userId) =>
  new Promise((resolve, reject) => {
    if (!db) {
      return reject(Error("Wrong parameters"));
    }

    const userIdNo = parseInt(userId);
    if (!isNaN(userIdNo)) {
      userId = userIdNo.toString();
    }

    db.transaction(
      tx => {
        tx.executeSql(
          userId ? "select * from contacts where user_id = ?" : "select * from contacts",
          [userId],
          (_, { insertId, rowsAffected, rows }) =>
            resolve(
              rows._array.map(item => ({
                name: item.name,
                userId: item.user_id,
                walletAddress: item.wallet_address
              }))
            ),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getContacts = userId => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const contacts = await _getContacts(db, userId);
      dispatch(contactLoaded(contacts));
      return contacts;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _getContactByWalletAddress = (db, walletAddress) =>
  new Promise((resolve, reject) => {
    if (!db || !walletAddress) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "select * from contacts where wallet_address = ?",
          [walletAddress.toLowerCase()],
          (_, { insertId, rowsAffected, rows }) =>
            resolve(
              rows._array.map(item => ({
                name: item.name,
                userId: item.user_id,
                walletAddress: item.wallet_address
              }))
            ),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getContactByWalletAddress = walletAddress => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const contacts = await _getContactByWalletAddress(db, walletAddress);
      dispatch(contactLoaded(contacts));
      return contacts;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _updateContact = (db, name, userId, walletAddress) =>
  new Promise((resolve, reject) => {
    if (!db || !walletAddress) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql("select * from contacts where wallet_address = ?", [walletAddress.toLowerCase()], (_, { insertId, rowsAffected, rows }) => {
          tx.executeSql(
            rows.length === 0
              ? "insert into contacts (name, user_id, wallet_address) values (?, ?, ?)"
              : "update contacts set name = ?, user_id = ? where wallet_address = ?",
            [name, userId, walletAddress.toLowerCase()],
            () =>
              resolve({
                name: name,
                userId: userId,
                walletAddress: walletAddress
              }),
            (_, err) => reject(err)
          );
        });
      },
      err => reject(err)
    );
  });
export const updateContact = (name, userId, walletAddress) => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const contact = await _updateContact(db, name, userId, walletAddress);
      dispatch(contactUpdated(contact));
      return contact;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _removeContact = (db, walletAddress) =>
  new Promise((resolve, reject) => {
    if (!db || !walletAddress) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "delete from contacts where wallet_address = ?",
          [walletAddress.toLowerCase()],
          (_, { insertId, rowsAffected, rows }) =>
            resolve({
              walletAddress: walletAddress
            }),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const removeContact = walletAddress => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const contact = await _removeContact(db, walletAddress);
      dispatch(contactRemoved(contact));
      return contact;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _getTransactions = (db, time) =>
  new Promise((resolve, reject) => {
    if (!db) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          'select strftime("%Y-%m", datetime(created_on / 1000, "unixepoch", "utc")) as month from transactions group by strftime("%Y-%m", datetime(created_on / 1000, "unixepoch", "utc")) order by month desc',
          [],
          (_, { insertId, rowsAffected, rows }) => {
            if (rows.length === 0) {
              return resolve({});
            }
            let result = {};
            for (let i = 0; i < rows._array.length; i++) {
              result[rows._array[i].month] = [];
            }
            time = time || rows._array[0].month;
            tx.executeSql(
              'select * from transactions where strftime("%Y-%m", datetime(created_on / 1000, "unixepoch", "utc")) = ? order by created_on desc',
              [time],
              (_, { insertId, rowsAffected, rows }) => {
                result[time] = rows._array.map(item => ({
                  toAddress: item.to_address,
                  amount: item.amount,
                  unit: item.unit,
                  description: item.description,
                  type: item.type,
                  txHash: item.tx_hash,
                  createdOn: moment(item.created_on)
                }));
                resolve(result);
              },
              (_, err) => reject(err)
            );
          },
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getTransactions = time => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const tx = await _getTransactions(db, time);
      dispatch(transactionLoaded(tx));
      return tx;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _getTransaction = (db, txHash) =>
  new Promise((resolve, reject) => {
    if (!db || !txHash) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "select * from transactions where tx_hash = ?",
          [txHash.toLowerCase()],
          (_, { insertId, rowsAffected, rows }) =>
            resolve(
              rows._array.map(item => ({
                toAddress: item.to_address,
                amount: item.amount,
                unit: item.unit,
                description: item.description,
                type: item.type,
                txHash: item.tx_hash,
                createdOn: moment(item.created_on)
              }))
            ),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getTransaction = txHash => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const tx = await _getTransaction(db, txHash);
      return tx;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _updateTransaction = (db, toAddress, amount, unit, description, type, txHash, time) =>
  new Promise((resolve, reject) => {
    if (!db || !txHash) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql("select * from transactions where tx_hash = ?", [txHash.toLowerCase()], (_, { insertId, rowsAffected, rows }) => {
          time =
            time ||
            moment()
              .utc()
              .valueOf();
          tx.executeSql(
            rows.length === 0
              ? "insert into transactions (to_address, amount, unit, description, type, tx_hash, created_on) values (?, ?, ?, ?, ?, ?, ?)"
              : "update transactions set to_address = ?, amount = ?, unit = ?, description = ?, type = ? where tx_hash = ?",
            rows.length === 0
              ? [toAddress, amount, unit, description, type, txHash.toLowerCase(), time]
              : [toAddress, amount, unit, description, type, txHash.toLowerCase()],
            () =>
              resolve({
                toAddress: toAddress,
                amount: amount,
                unit: unit,
                description: description,
                type: type,
                txHash: txHash,
                createdOn: rows.length === 0 ? moment(time) : moment(rows._array[0].created_on)
              }),
            (_, err) => reject(err)
          );
        });
      },
      err => reject(err)
    );
  });
export const updateTransaction = (toAddress, amount, unit, description, type, txHash, time) => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const tx = await _updateTransaction(db, toAddress, amount, unit, description, type, txHash, time);
      dispatch(transactionUpdated(tx));
      return tx;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _removeTransaction = (db, txHash) =>
  new Promise((resolve, reject) => {
    if (!db || !txHash) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "delete from transactions where tx_hash = ?",
          [txHash.toLowerCase()],
          (_, { insertId, rowsAffected, rows }) =>
            resolve({
              txHash: txHash
            }),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const removeTransaction = txHash => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const tx = await _removeTransaction(db, txHash);
      dispatch(transactionRemoved(tx));
      return tx;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _getRates = (db, source) =>
  new Promise((resolve, reject) => {
    if (!db) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          source ? "select * from rates where source = ?" : "select * from rates",
          [source],
          (_, { insertId, rowsAffected, rows }) =>
            resolve(
              rows._array.map(item => ({
                foreignCurrency: item.foreign_currency,
                baseCurrency: item.base_currency,
                rate: item.rate,
                source: item.source,
                updatedOn: moment(item.updated_on)
              }))
            ),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getRates = source => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const rates = await _getRates(db, source);
      dispatch(ratesLoaded(rates));
      return rates;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _getRate = (db, baseCurrency, foreignCurrency, source) =>
  new Promise((resolve, reject) => {
    if (!db || !baseCurrency || !foreignCurrency) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          source
            ? "select * from rates where base_currency = ? and foreign_currency = ? and source = ?"
            : "select * from rates where base_currency = ? and foreign_currency = ?",
          source ? [baseCurrency.toLowerCase(), foreignCurrency.toLowerCase(), source] : [baseCurrency.toLowerCase(), foreignCurrency.toLowerCase()],
          (_, { insertId, rowsAffected, rows }) =>
            resolve(
              rows._array.map(item => ({
                foreignCurrency: item.foreign_currency,
                baseCurrency: item.base_currency,
                rate: item.rate,
                source: item.source,
                updatedOn: moment(item.updated_on)
              }))
            ),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const getRate = (baseCurrency, foreignCurrency, source) => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const rates = await _getRate(db, baseCurrency, foreignCurrency, source);
      dispatch(ratesLoaded(rates));
      return rates;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};

const _updateRate = (db, baseCurrency, foreignCurrency, rate, source) =>
  new Promise((resolve, reject) => {
    if (!db || !baseCurrency || !foreignCurrency || !rate || !source) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "select * from rates where base_currency = ? and foreign_currency = ? and source = ?",
          [baseCurrency.toLowerCase(), foreignCurrency.toLowerCase(), source],
          (_, { insertId, rowsAffected, rows }) => {
            const time = moment().valueOf();
            tx.executeSql(
              rows.length === 0
                ? "insert into rates (base_currency, foreign_currency, rate, source, updated_on) values (?, ?, ?, ?, ?)"
                : "update rates set base_currency = ?, foreign_currency = ?, rate = ?, source = ?, updated_on = ? where base_currency = ? and foreign_currency = ? and source = ?",
              rows.length === 0
                ? [baseCurrency.toLowerCase(), foreignCurrency.toLowerCase(), rate, source, time]
                : [
                    baseCurrency.toLowerCase(),
                    foreignCurrency.toLowerCase(),
                    rate,
                    source,
                    time,
                    baseCurrency.toLowerCase(),
                    foreignCurrency.toLowerCase(),
                    source
                  ],
              () =>
                resolve({
                  foreignCurrency: foreignCurrency,
                  baseCurrency: baseCurrency,
                  rate: rate,
                  source: source,
                  updatedOn: time
                }),
              (_, err) => reject(err)
            );
          }
        );
      },
      err => reject(err)
    );
  });
export const updateRate = (baseCurrency, foreignCurrency, rate, source) => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const record = await _updateRate(db, baseCurrency, foreignCurrency, rate, source);
      dispatch(ratesUpdated(record));
      return record;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _removeRate = (db, baseCurrency, foreignCurrency, source) =>
  new Promise((resolve, reject) => {
    if (!db || !baseCurrency || !foreignCurrency || !source) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "delete from rates where base_currency = ? and foreign_currency = ? and source = ?",
          [baseCurrency.toLowerCase(), foreignCurrency.toLowerCase(), source],
          (_, { insertId, rowsAffected, rows }) =>
            resolve({
              foreignCurrency: foreignCurrency,
              baseCurrency: baseCurrency,
              source: source
            }),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const removeRate = (baseCurrency, foreignCurrency, source) => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      const rate = await _removeRate(db, baseCurrency, foreignCurrency, source);
      dispatch(ratesRemoved(rate));
      return rate;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const _clearRates = db =>
  new Promise((resolve, reject) => {
    if (!db) {
      return reject(Error("Wrong parameters"));
    }

    db.transaction(
      tx => {
        tx.executeSql(
          "delete from rates",
          [],
          (_, { insertId, rowsAffected, rows }) => resolve(),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
    );
  });
export const clearRates = () => {
  return async (dispatch, getState) => {
    try {
      const db = getState().storage.database;
      await _clearRates(db);
      dispatch(ratesCleared());
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};
