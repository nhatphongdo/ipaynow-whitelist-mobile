import { translate } from '../../constants/Languages'
import Eth from '../../assets/images/flags/Eth'
import Ruby from '../../assets/images/flags/Ruby'
import Usd from '../../assets/images/flags/Usd'
import Aud from '../../assets/images/flags/Aud'
import Cad from '../../assets/images/flags/Cad'
import Chf from '../../assets/images/flags/Chf'
import Cny from '../../assets/images/flags/Cny'
import Eur from '../../assets/images/flags/Eur'
import Gbp from '../../assets/images/flags/Gbp'
import Hkd from '../../assets/images/flags/Hkd'
import Idr from '../../assets/images/flags/Idr'
import Inr from '../../assets/images/flags/Inr'
import Jpy from '../../assets/images/flags/Jpy'
import Krw from '../../assets/images/flags/Krw'
import Mmk from '../../assets/images/flags/Mmk'
import Myr from '../../assets/images/flags/Myr'
import Nzd from '../../assets/images/flags/Nzd'
import Php from '../../assets/images/flags/Php'
import Rub from '../../assets/images/flags/Rub'
import Thb from '../../assets/images/flags/Thb'
import Twd from '../../assets/images/flags/Twd'
import Vnd from '../../assets/images/flags/Vnd'
import Khr from '../../assets/images/flags/Khr'
import Sgd from '../../assets/images/flags/Sgd'
import Usdt from '../../assets/images/flags/Usdt'
import Btc from '../../assets/images/flags/Btc'

export const USDT = 'USDT'
export const REWARD = 'REWARD'
export const ETH = 'ETH'
export const USD = 'USD'

export const SUPPORTED_CURRENCIES = {
  BTC: {
    name: translate('Bitcoin (BTC)'),
    picker: translate('BTC (Bitcoin)'),
    image: Btc,
  },
  ETH: {
    name: translate('Ethereum (ETH)'),
    picker: translate('ETH (Ethereum)'),
    image: Eth,
  },
  USDT: {
    name: translate('USDT (ERC20)'),
    picker: translate('USDT (ERC20)'),
    image: Usdt,
  },
  USD: {
    name: translate('US Dollar (USD)'),
    picker: translate('USD (US Dollar)'),
    image: Usd,
  },
  AUD: {
    name: translate('Australian Dollar ($)'),
    picker: translate('AUD (Australian Dollar)'),
    image: Aud,
  },
  KHR: {
    name: translate('Cambodian Riel (៛)'),
    picker: translate('KHR (Cambodian Riel)'),
    image: Khr,
  },
  CAD: {
    name: translate('Canadian Dollar ($)'),
    picker: translate('CAD (Canadian Dollar)'),
    image: Cad,
  },
  CNY: {
    name: translate('Chinese Yuan (¥)'),
    picker: translate('CNY (Chinese Yuan)'),
    image: Cny,
  },
  EUR: {
    name: translate('Euro (€)'),
    picker: translate('EUR (Euro)'),
    image: Eur,
  },
  HKD: {
    name: translate('Hong Kong Dollar ($)'),
    picker: translate('HKD (Hong Kong Dollar)'),
    image: Hkd,
  },
  INR: {
    name: translate('Indian Rupee (₹)'),
    picker: translate('INR (Indian Rupee)'),
    image: Inr,
  },
  IDR: {
    name: translate('Indonesian Rupiah (Rp)'),
    picker: translate('IDR (Indonesian Rupiah)'),
    image: Idr,
  },
  JPY: {
    name: translate('Japanese Yen (¥)'),
    picker: translate('JPY (Japanese Yen)'),
    image: Jpy,
  },
  MYR: {
    name: translate('Malaysian Ringgit (RM)'),
    picker: translate('MYR (Malaysian Ringgit)'),
    image: Myr,
  },
  MMK: {
    name: translate('Myanma Kyat (Ks)'),
    picker: translate('MMK (Myanma Kyat)'),
    image: Mmk,
  },
  TWD: {
    name: translate('New Taiwan Dollar ($)'),
    picker: translate('TWD (New Taiwan Dollar)'),
    image: Twd,
  },
  NZD: {
    name: translate('New Zealand Dollar ($)'),
    picker: translate('NZD (New Zealand Dollar)'),
    image: Nzd,
  },
  PHP: {
    name: translate('Philippine Peso (₱)'),
    picker: translate('PHP (Philippine Peso)'),
    image: Php,
  },
  GBP: {
    name: translate('Pound Sterling (£)'),
    picker: translate('GBP (Pound Sterling)'),
    image: Gbp,
  },
  RUB: {
    name: translate('Russian Ruble (₽)'),
    picker: translate('RUB (Russian Ruble)'),
    image: Rub,
  },
  SGD: {
    name: translate('Singapore Dollar ($)'),
    picker: translate('SGD (Singapore Dollar)'),
    image: Sgd,
  },
  KRW: {
    name: translate('South Korean Won (₩)'),
    picker: translate('KRW (South Korean Won)'),
    image: Krw,
  },
  CHF: {
    name: translate('Swiss Franc (Fr)'),
    picker: translate('CHF (Swiss Franc)'),
    image: Chf,
  },
  THB: {
    name: translate('Thai Baht (฿)'),
    picker: translate('THB (Thai Baht)'),
    image: Thb,
  },
  VND: {
    name: translate('Vietnamese Dong (₫)'),
    picker: translate('VND (Vietnamese Dong)'),
    image: Vnd,
  },
}

export const SUPPORTED_SOURCES = {
  CMC: {
    name: 'CoinMarketCap',
  },
}

export const RATES_LOADED = 'RATES_LOADED'
export const RATES_UPDATED = 'RATES_UPDATED'
export const RATES_REMOVED = 'RATES_REMOVED'
export const RATES_CLEARED = 'RATES_CLEARED'
