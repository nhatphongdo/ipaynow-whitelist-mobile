import { RATES_LOADED, RATES_UPDATED, RATES_REMOVED, RATES_CLEARED } from "./constants";
import { clone } from "../../common/helper";

const INITIAL_STATE = {
  needToUpdate: true,

  rates: {}
};

export default RatesReducer = (state = INITIAL_STATE, action) => {
  let newState = clone(state);
  switch (action.type) {
    case RATES_LOADED:
      if (action.payload) {
        for (let i = 0; i < action.payload.length; i++) {
          const quote = action.payload[i];
          const rate = {};
          rate[quote.foreignCurrency.toLowerCase()] = quote.rate;
          const rates = Object.assign({}, newState.rates[quote.source] && newState.rates[quote.source][quote.baseCurrency.toLowerCase()], rate);
          // Assign to base currency object
          const base = {};
          base[quote.baseCurrency.toLowerCase()] = rates;
          newState.rates[quote.source] = Object.assign({}, newState.rates[quote.source], base);
        }
      }
      return newState;

    case RATES_UPDATED:
      // Update in list
      if (action.payload) {
        const rate = {};
        rate[action.payload.foreignCurrency.toLowerCase()] = action.payload.rate;
        const rates = Object.assign(
          {},
          newState.rates[action.payload.source] && newState.rates[action.payload.source][action.payload.baseCurrency.toLowerCase()],
          rate
        );
        // Assign to base currency object
        const base = {};
        base[action.payload.baseCurrency.toLowerCase()] = rates;
        newState.rates[action.payload.source] = Object.assign({}, newState.rates[action.payload.source], base);
      }
      return newState;

    case RATES_REMOVED:
      // Update in list
      if (action.payload) {
        if (
          newState.rates[action.payload.source] &&
          newState.rates[action.payload.source][action.payload.baseCurrency.toLowerCase()] &&
          newState.rates[action.payload.source][action.payload.baseCurrency.toLowerCase()][action.payload.foreignCurrency.toLowerCase()]
        ) {
          delete newState.rates[action.payload.source][action.payload.baseCurrency.toLowerCase()][action.payload.foreignCurrency.toLowerCase()];
        }
      }
      return newState;

    case RATES_CLEARED:
      // Update in list
      newState.rates = {};
      return newState;

    default:
      return state;
  }
};
