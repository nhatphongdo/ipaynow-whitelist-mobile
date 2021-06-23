import { DATABASE_LOADED, CONTACT_LOADED, CONTACT_UPDATED, CONTACT_REMOVED, TRANSACTION_LOADED, CLEARED } from './constants';
import { clone } from '../../common/helper';

const INITIAL_STATE = {
    database: null,

    contacts: [],
    transactions: {}
};

export default StorageReducer = (state = INITIAL_STATE, action) => {
    let newState = {
        ...state,
        contacts: clone(state.contacts)
    };
    switch (action.type) {
        case DATABASE_LOADED:
            newState.database = action.payload;
            return newState;

        case CONTACT_LOADED:
            if (action.payload) {
                const len = newState.contacts.length;
                for (let i = 0; i < action.payload.length; i++) {
                    let found = false;
                    for (let j = 0; j < len; j++) {
                        if (newState.contacts[j].walletAddress.toLowerCase() === action.payload[i].walletAddress.toLowerCase()) {
                            // Exist
                            newState.contacts[j] = action.payload[i];
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        // Not exist, add
                        newState.contacts.push(action.payload[i]);
                    }
                }
                newState.contacts.sort(function(a, b) {
                    if (a.userId > b.userId) {
                        return 1;
                    } else if (a.userId < b.userId) {
                        return -1;
                    }

                    return a.name > b.name;
                });
            }
            return newState;

        case CONTACT_UPDATED:
            // Update in list
            if (action.payload) {
                let found = false;
                for (let i = 0; i < newState.contacts.length; i++) {
                    if (newState.contacts[i].walletAddress.toLowerCase() === action.payload.walletAddress.toLowerCase()) {
                        found = true;
                        newState.contacts[i] = action.payload;
                        break;
                    }
                }
                if (!found) {
                    // New
                    newState.contacts.push(action.payload);
                    newState.contacts.sort(function(a, b) {
                        if (a.userId > b.userId) {
                            return 1;
                        } else if (a.userId < b.userId) {
                            return -1;
                        }

                        return a.name > b.name;
                    });
                }
            }
            return newState;

        case CONTACT_REMOVED:
            // Update in list
            if (action.payload) {
                for (let i = 0; i < newState.contacts.length; i++) {
                    if (newState.contacts[i].walletAddress === action.payload.walletAddress) {
                        newState.contacts.splice(i, 1);
                        break;
                    }
                }
            }
            return newState;

        case TRANSACTION_LOADED:
            if (action.payload) {
                const keys = Object.keys(action.payload);
                for (let i = 0; i < keys.length; i++) {
                    if (action.payload[keys[i]].length === 0) {
                        if (newState.transactions.hasOwnProperty(keys[i])) {
                            continue;
                        } else {
                            newState.transactions[keys[i]] = [];
                        }
                    }
                    newState.transactions[keys[i]] = action.payload[keys[i]];
                }
            }
            return newState;

        case CLEARED:
            newState.contacts = [];
            newState.transactions = {};
            return newState;

        default:
            return state;
    }
};
