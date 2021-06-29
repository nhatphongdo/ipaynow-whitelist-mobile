import Axios from 'axios'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import numeral from 'numeral'
import { CRYPTO_WALLET_CHANGED, CRYPTO_WALLET_INFO_CHANGED } from './constants'
import { setEncryptedData, getEncryptedData, getDefaultHashed } from '../storage/actions'
import { DEBUG, BASE_API_URL, INFURA_PROJECT_ID } from '../../constants/Constants'
import { register } from '../account/actions'
import { sign } from '../../common/helper'

/* Events */
const cryptoWalletChanged = (wallet) => ({ type: CRYPTO_WALLET_CHANGED, payload: wallet })
const cryptoWalletInfoChanged = (info) => ({ type: CRYPTO_WALLET_INFO_CHANGED, payload: info })

const TOKEN_DECIMAL_DIGITS = 8

/* Actions */
export const createCryptoWallet = (options) => {
  return async (dispatch, getState) => {
    try {
      let wallet = ethers.Wallet.createRandom(options)
      const provider = new ethers.providers.InfuraProvider(DEBUG ? 'ropsten' : 'homestead', INFURA_PROJECT_ID)
      wallet = wallet.connect(provider)

      dispatch(cryptoWalletChanged(wallet))
      return wallet
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const restoreCryptoWallet = (mnemonic, options) => {
  return async (dispatch, getState) => {
    if (!mnemonic) {
      return null
    }

    if (!options) {
      options = {}
    }

    try {
      let wallet = ethers.Wallet.fromMnemonic(mnemonic.toLowerCase(), options.path, ethers.wordlists.en)
      const provider = new ethers.providers.InfuraProvider(DEBUG ? 'ropsten' : 'homestead', INFURA_PROJECT_ID)
      wallet = wallet.connect(provider)

      dispatch(cryptoWalletChanged(wallet))
      return wallet
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const saveCryptoWallet = () => {
  return async (dispatch, getState) => {
    // Check if crypto wallet exists
    if (!getState().wallet.cryptoWallet) {
      return false
    }

    // Get pincode
    let hashed = getState().pincode.hashedPin || getDefaultHashed()

    // Save
    let encryptedData = await getEncryptedData(hashed)
    if (encryptedData === null) {
      // Error
      return false
    }
    encryptedData.cryptoPrivateKey = getState().wallet.cryptoWallet.privateKey
    encryptedData.cryptoMnemonic = getState().wallet.cryptoMnemonic
    const result = await setEncryptedData(encryptedData, hashed)

    // Register with server
    const regResult = await dispatch(register())
    if (!regResult) {
      return false
    }

    return result
  }
}

export const getCryptoWallet = () => {
  return async (dispatch, getState) => {
    // Get pincode
    let hashed = getState().pincode.hashedPin || getDefaultHashed()

    let encryptedData = await getEncryptedData(hashed)
    if (encryptedData === null || !encryptedData.cryptoPrivateKey) {
      // Error
      return null
    }

    try {
      const provider = new ethers.providers.InfuraProvider(DEBUG ? 'ropsten' : 'homestead', INFURA_PROJECT_ID)
      const wallet = new ethers.Wallet(encryptedData.cryptoPrivateKey, provider)
      if (encryptedData.cryptoMnemonic) {
        dispatch(
          cryptoWalletChanged({
            wallet,
            mnemonic: encryptedData.cryptoMnemonic,
          })
        )
      } else {
        dispatch(cryptoWalletChanged(wallet))
      }
      return wallet
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const getWalletInfo = () => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return null
    }

    try {
      const address = getState().wallet.cryptoAddress
      const wallet = getState().wallet.cryptoWallet
      const token = getState().wallet.tokenContract

      // Get balance
      const tokenBalance = await token.balanceOf(address)
      const ethBalance = await wallet.getBalance()

      const state = {
        tokenBalance: numeral(ethers.utils.formatUnits(tokenBalance, TOKEN_DECIMAL_DIGITS)).value(),
        ethBalance: numeral(ethers.utils.formatEther(ethBalance)).value(),
      }

      dispatch(cryptoWalletInfoChanged(state))
      return state
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

const takeLeftMostDecimalDigits = (number, digits) => {
  const parts = number.split('.')
  if (parts.length !== 2) {
    return number
  }
  const fraction = parts[1].substr(0, digits)
  if (!fraction) {
    return parts[0]
  }
  return `${parts[0]}.${fraction}`
}

export const estimateGas = (to, amount, isToken = true) => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return 0
    }

    const weiAmount = isToken
      ? ethers.utils.parseUnits(takeLeftMostDecimalDigits(amount, TOKEN_DECIMAL_DIGITS), TOKEN_DECIMAL_DIGITS)
      : ethers.utils.parseEther(amount)
    try {
      let gasPrice = await getState().wallet.cryptoWallet.provider.getGasPrice()
      if (isToken) {
        gasPrice = gasPrice.mul(await getState().wallet.tokenContract.estimateGas.transfer(to, weiAmount))
      } else {
        gasPrice = gasPrice.mul(
          await getState().wallet.cryptoWallet.provider.estimateGas({
            to,
            value: weiAmount,
          })
        )
      }
      return numeral(ethers.utils.formatEther(gasPrice)).value()
    } catch (err) {
      console.log(err)
      return 0
    }
  }
}

export const getBlockNumber = () => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return 0
    }

    try {
      return await getState().wallet.cryptoWallet.provider.getBlockNumber()
    } catch (err) {
      console.log(err)
      return 0
    }
  }
}

export const getTransaction = (id) => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return null
    }

    try {
      return await getState().wallet.cryptoWallet.provider.getTransaction(id)
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const getTransactionReceipt = (id) => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return null
    }

    try {
      return await getState().wallet.cryptoWallet.provider.getTransactionReceipt(id)
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const sendToken = (to, amount) => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return { error: 'Wallet is not initialized correctly.', result: null }
    }

    const weiAmount = ethers.utils.parseUnits(takeLeftMostDecimalDigits(amount, TOKEN_DECIMAL_DIGITS), TOKEN_DECIMAL_DIGITS)
    try {
      const result = await getState().wallet.tokenContract.transfer(to, weiAmount)
      return { error: null, result }
    } catch (err) {
      console.log(err)
      return { error: err.message, result: null }
    }
  }
}

export const sendEth = (to, amount) => {
  return async (dispatch, getState) => {
    if (!getState().wallet.cryptoWallet || !getState().wallet.tokenContract) {
      return { error: 'Wallet is not initialized correctly.', result: null }
    }

    const weiAmount = ethers.utils.parseEther(amount)
    try {
      const result = await getState().wallet.cryptoWallet.sendTransaction({ to, value: weiAmount })
      return { error: null, result }
    } catch (err) {
      console.log(err)
      return { error: err.message, result: null }
    }
  }
}

export const submitTransaction = (txHash, toAddress, amount, isEth, type) => {
  return async (dispatch, getState) => {
    if (!getState().account.token) {
      return { error: 'You need to login to proceed', result: null }
    }

    try {
      const nonce = new Date().getTime()
      const signature = await sign(
        getState().account.privateKey,
        getState().account.serverPublicKey,
        JSON.stringify({ nonce, txHash, toAddress, amount, isEth, type })
      )

      const response = await Axios.post(
        BASE_API_URL + '/transactions/send',
        {
          nonce,
          signature,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().account.token}`,
          },
        }
      )
      return { error: null, result: response.data }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        return { error: err.response.data.message, result: null }
      } else {
        console.log(err)
        return { error: err.message, result: null }
      }
    }
  }
}
