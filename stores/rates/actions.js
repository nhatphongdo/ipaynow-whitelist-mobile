import Axios from 'axios'
import { USDT, USD } from './constants'
import { updateRate, getRates, clearRates } from '../storage/actions'
import { BASE_API_URL } from '../../constants/Constants'

/* Events */

/* Actions */
export const updateRates = () => {
  return async (dispatch, getState) => {
    // Load from database
    await dispatch(getRates())

    // Check to see update needed
    if (getState().rates.needToUpdate) {
      try {
        const response = await Axios.get(BASE_API_URL + '/rates')
        if (response.data) {
          dispatch(clearRates())
          for (let i = 0; i < response.data.length; i++) {
            dispatch(updateRate(response.data[i].baseCurrency, response.data[i].foreignCurrency, response.data[i].rate, response.data[i].source))
          }
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(err)
        }
      }
    }
  }
}

export const convertRateSync = (rates, from, to, amount, source = 'CMC') => {
  if (!from || !to || !amount) {
    return amount
  }

  rates = rates[source]

  if (!rates) {
    return amount
  }

  // if (from.toLowerCase() === RUBY.toLowerCase()) {
  //   from = USD;
  // }
  // if (to.toLowerCase() === RUBY.toLowerCase()) {
  //   to = USD;
  // }

  if (rates[from.toLowerCase()] && rates[from.toLowerCase()][to.toLowerCase()]) {
    return amount * rates[from.toLowerCase()][to.toLowerCase()]
  } else if (rates[to.toLowerCase()] && rates[to.toLowerCase()][from.toLowerCase()]) {
    return amount / rates[to.toLowerCase()][from.toLowerCase()]
  }

  // Convert to base currency
  if (Object.keys(rates).length === 0) {
    return amount
  }

  const base = 'eth' //Object.keys(rates)[0];
  let fromRate = rates[base][from.toLowerCase()]
  let toRate = rates[base][to.toLowerCase()]
  if (!fromRate || !toRate) {
    // For non-official supported currencies like REWARD / POINT
    for (let baseCurrency in rates) {
      if ((!fromRate && rates[baseCurrency][from.toLowerCase()]) || (!toRate && rates[baseCurrency][to.toLowerCase()])) {
        if (!fromRate) {
          fromRate = rates[baseCurrency][from.toLowerCase()] * rates[base][baseCurrency]
        }
        if (!toRate) {
          toRate = rates[baseCurrency][to.toLowerCase()] * rates[base][baseCurrency]
        }
      }
    }
    if (!fromRate || !toRate) {
      return amount
    }
  }

  // amount usd -> x vnd
  // a usd / eth
  // b vnd / eth
  // => x = amount * b / a
  return amount * (toRate / fromRate)
}

export const convertRate = (from, to, amount, source = 'CMC') => {
  return async (dispatch, getState) => {
    return convertRateSync(getState().rates.rates, from, to, amount, source)
  }
}
