export const DEBUG = false

export const TOKEN_ADDRESS = DEBUG ? '0x168Ff259978c68b4C1C003259E6eFEC991bE2369' : '0xdAC17F958D2ee523a2206206994597C13D831ec7'
export const TX_EXPLORER_URL = DEBUG ? 'https://ropsten.etherscan.io/tx/' : 'https://etherscan.io/tx/'

const LOCAL = false
export const BASE_API_URL = DEBUG ? (LOCAL ? 'http://192.168.68.105:8000' : 'https://iswop.ipaynow.io') : 'https://iswop.ipaynow.io'
export const BASE_SOCKET_URL = DEBUG ? (LOCAL ? 'http://192.168.68.105:8000' : 'https://iswop.ipaynow.io') : 'https://iswop.ipaynow.io'

export const CENTRAL_WALLET = DEBUG ? '0x0F6cb703b00d73c55200a749B59c1125e95c8ae5' : '0x1d21586bcd5a12811396645ebe58d8714ba85df8'

export const INFURA_PROJECT_ID = '170cffb4b9b74e4fb41d8eab000d2a00'
