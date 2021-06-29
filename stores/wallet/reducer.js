import '@ethersproject/shims'
import { ethers } from 'ethers'
import { CRYPTO_WALLET_CHANGED, ABI, CRYPTO_WALLET_INFO_CHANGED } from './constants'
import { TOKEN_ADDRESS } from '../../constants/Constants'
import { CLEARED } from '../storage/constants'

const INITIAL_STATE = {
  cryptoWallet: null,
  cryptoAddress: '',
  cryptoMnemonic: null,
  tokenContract: null,

  tokenBalance: 0,
  ethBalance: 0,
}

export default WalletReducer = (state = INITIAL_STATE, action) => {
  let newState = { ...state }
  switch (action.type) {
    case CRYPTO_WALLET_CHANGED:
      if (action.payload.wallet) {
        newState.cryptoWallet = action.payload.wallet
        newState.cryptoAddress = action.payload.wallet.address
      } else {
        newState.cryptoWallet = action.payload
        newState.cryptoAddress = action.payload.address
      }
      if (action.payload.mnemonic) {
        newState.cryptoMnemonic = action.payload.mnemonic
      }

      newState.tokenContract = new ethers.Contract(TOKEN_ADDRESS, ABI, newState.cryptoWallet)
      return newState

    case CRYPTO_WALLET_INFO_CHANGED:
      newState.tokenBalance = action.payload.tokenBalance
      newState.ethBalance = action.payload.ethBalance
      return newState

    case CLEARED:
      return INITIAL_STATE

    default:
      return state
  }
}
