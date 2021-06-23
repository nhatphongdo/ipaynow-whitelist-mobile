export const DEBUG = false

export const TOKEN_ADDRESS = DEBUG ? '0x48881da3CF2a49cF4Be16A1806A599d93fC26b37' : '0xfe73a07fa11ba0a8480159f405d35d0b55f826e8'
export const TX_EXPLORER_URL = DEBUG ? 'https://ropsten.etherscan.io/tx/' : 'https://etherscan.io/tx/'

const LOCAL = false
export const BASE_API_URL = DEBUG ? (LOCAL ? 'http://127.0.0.1:8000' : 'https://api.haladinar.io') : 'https://api.haladinar.io'
export const BASE_SOCKET_URL = DEBUG ? (LOCAL ? 'http://127.0.0.1:8000' : 'https://api.haladinar.io') : 'https://api.haladinar.io'

export const CENTRAL_WALLET = DEBUG ? '0x0F6cb703b00d73c55200a749B59c1125e95c8ae5' : '0x99D72C025DBDA9916788995a24D8c32d580AeAE6'
