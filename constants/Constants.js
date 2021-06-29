export const DEBUG = true

export const TOKEN_ADDRESS = DEBUG ? '0x168Ff259978c68b4C1C003259E6eFEC991bE2369' : '0xdAC17F958D2ee523a2206206994597C13D831ec7'
export const TX_EXPLORER_URL = DEBUG ? 'https://ropsten.etherscan.io/tx/' : 'https://etherscan.io/tx/'

const LOCAL = true
export const BASE_API_URL = DEBUG ? (LOCAL ? 'http://192.168.68.105:8000' : 'https://api.haladinar.io') : 'https://api.haladinar.io'
export const BASE_SOCKET_URL = DEBUG ? (LOCAL ? 'http://192.168.68.105:8000' : 'https://api.haladinar.io') : 'https://api.haladinar.io'

export const CENTRAL_WALLET = DEBUG ? '0xc1fE2b823bC920df811298911f48af3431BB971a' : '0x99D72C025DBDA9916788995a24D8c32d580AeAE6'

export const INFURA_PROJECT_ID = '170cffb4b9b74e4fb41d8eab000d2a00'
