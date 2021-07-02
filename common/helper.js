import numeral from 'numeral'
import i18n from 'i18n-js'
import moment from 'moment/min/moment-with-locales'
import RSAKey from 'react-native-rsa'
import Crypto from './crypto'
import { translate } from '../constants/Languages'
import { AVAILABLE_LANGUAGES } from '../stores/settings/constants'
import { BASE_API_URL } from '../constants/Constants'

// Fixed the bug of formating low exponential number, like 1e-7
numeral._.toFixed = function(value, maxDecimals, roundingFunction, optionals) {
  var splitValue = value.toString().split('.'),
    minDecimals = maxDecimals - (optionals || 0),
    boundedPrecision,
    optionalsRegExp,
    power,
    output

  // Use the smallest precision value possible to avoid errors from floating point representation
  if (splitValue.length === 2) {
    boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals)
  } else {
    boundedPrecision = minDecimals
  }

  power = Math.pow(10, boundedPrecision)

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  value = String(value).indexOf('e') >= 0 ? value : roundingFunction(value + 'e+' + boundedPrecision) / power
  output = value.toFixed(boundedPrecision)
  // output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

  if (optionals > maxDecimals - boundedPrecision) {
    optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$')
    output = output.replace(optionalsRegExp, '')
  }

  return output
}

export function removeItem(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      array.splice(i, 1)
      break
    }
  }
}

export function clone(source) {
  if (!source) {
    return source
  }

  if (Array.isArray(source)) {
    let target = []
    for (let i = 0; i < source.length; i++) {
      if (typeof source[i] === 'object') {
        target[i] = clone(source[i])
      } else {
        target[i] = source[i]
      }
    }
    return target
  }

  let target = {}
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (typeof source[prop] === 'object') {
        target[prop] = clone(source[prop])
      } else {
        target[prop] = source[prop]
      }
    }
  }
  return target
}

export function isValidEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function equals(obj1, obj2) {
  if (typeof obj1 !== typeof obj2) {
    // Must have same type first
    return false
  }
  if (obj1 === null || obj2 === null) {
    // If null, compare both with null
    return obj1 === obj2
  }
  if (typeof obj1 === 'undefined') {
    // If one is undefined, must be equal
    return true
  }
  if (typeof obj1 === 'bigint' || typeof obj1 === 'boolean' || typeof obj1 === 'number' || typeof obj1 === 'string') {
    // If primitive type, compare value
    return obj1 === obj2
  }
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    // Must be same array or not
    return false
  }
  if (Array.isArray(obj1) && obj1.length !== obj2.length) {
    // If array, must have same length
    return false
  }

  if (Array.isArray(obj1)) {
    // Compare each element in array
    for (let i = 0; i < obj1.length; i++) {
      if (!equals(obj1[i], obj2[i])) {
        return false
      }
    }
    return true
  }

  if (typeof obj1 === 'function') {
    // Compare both functions
    var func1 = obj1.toString()
    var func2 = obj2.toString()
    return func1 == func2
  }

  if (typeof obj1 === 'object') {
    for (let prop in obj1) {
      // Check property exists on both objects
      if (!obj2.hasOwnProperty(prop)) {
        return false
      }

      if (!equals(obj1[prop], obj2[prop])) {
        return false
      }
    }

    // Check object 2 for any extra properties
    for (let prop in obj2) {
      if (!obj1.hasOwnProperty(prop)) {
        return false
      }
    }

    return true
  }

  // Other cases
  return false
}

export const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

export function shuffle(array) {
  if (array === undefined || !array) {
    return array
  }

  // Leave original untouch
  let copy = clone(array)
  var len = copy.length,
    temp,
    i

  // While there remain elements to shuffle…
  while (len) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * len--)

    // And swap it with the current element.
    temp = copy[len]
    copy[len] = copy[i]
    copy[i] = temp
  }

  return copy
}

export function toFirstLetterCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function padLeftZeros(value, length) {
  let str = value.toString()
  while (str.length < length) str = '0' + str
  return str
}

export function formatNumber(number, format) {
  const negative = (number.value ? number.value() : number) < 0
  return numeral(number).format(format || '0,0', negative ? Math.ceil : Math.floor)
}

export function formatUserId(id) {
  return formatNumber(id, '0')
}

export function formatPercentage(num, fractions = 2, omitFractionsIfNotExist = true) {
  if (!fractions) {
    fractions = 0
  }
  let fractionFormat = omitFractionsIfNotExist ? '[.]' : '.'
  fractionFormat += omitFractionsIfNotExist ? '[' + padLeftZeros(0, fractions) + ']' : padLeftZeros(0, fractions)
  return formatNumber(num, fractions <= 0 ? '0%' : '0' + fractionFormat + '%')
}

export function formatCrypto(number, readable = true) {
  return formatNumber(number, readable ? '0,0[.][000000000000000000]' : '0[.][000000000000000000]')
}

export function formatReward(number, readable = true) {
  return formatNumber(number, readable ? '0,0[.][00000]' : '0[.][00000]')
}

export function formatRate(number) {
  return formatNumber(number, '0,0[.][00000000]')
}

export function formatCurrency(number, culture = 'en-US', currencyCode = '', includedCurrencyCode = true, omitFractionsIfNotExist = true) {
  number = numeral(number)
  let money = ''
  if (['vnd', 'krw', 'jpy', 'twd'].indexOf(currencyCode.toLowerCase()) >= 0) {
    // Non-decimal currency
    money = formatNumber(number, '0,0')
  } else if (['eth', 'hdn'].indexOf(currencyCode.toLowerCase()) >= 0) {
    // Crypto uses 5 digits decimal
    money = formatNumber(number, omitFractionsIfNotExist ? '0,0.[00000]' : '0,0.00000')
  } else if (['reward'].indexOf(currencyCode.toLowerCase()) >= 0) {
    // Crypto uses 3 digits decimal
    money = formatNumber(number, omitFractionsIfNotExist ? '0,0.[000]' : '0,0.000')
  } else {
    // Default, 2 digits decimal
    money = formatNumber(number, omitFractionsIfNotExist ? '0,0.[00]' : '0,0.00')
  }

  // Format currency code based on culture
  if (['eth', 'ruby', 'hdn', 'reward', 'usdt'].indexOf(currencyCode.toLowerCase()) >= 0) {
    // Always postfix
    if (currencyCode.toLowerCase() === 'reward' && number.value() > 1) {
      currencyCode = 'REWARDS'
    }
    return money + (includedCurrencyCode && currencyCode ? ' ' + translate(currencyCode) : '')
  } else {
    // Temporary ignore culture
    return (includedCurrencyCode && currencyCode ? currencyCode + ' ' : '') + money
  }
}

export function formatTime(time, format) {
  if (!moment(time).isValid()) {
    return ''
  }
  return moment(time)
    .locale((AVAILABLE_LANGUAGES[i18n.locale] && AVAILABLE_LANGUAGES[i18n.locale].moment) || 'en')
    .format(format || 'DD/MM/YYYY HH:mm:ss')
}

export function formatFullTime(time, twentyFourHour = true) {
  return formatTime(time, twentyFourHour ? 'HH:mm:ss' : 'hh:mm:ss a')
}

export function formatShortTime(time, twentyFourHour = true) {
  return formatTime(time, twentyFourHour ? 'HH:mm' : 'hh:mm a')
}

export function formatShortDate(time) {
  return formatTime(time, 'DD/MM')
}

export function formatFullDate(time, includeDayOfWeek = true) {
  return formatTime(time, includeDayOfWeek ? 'dddd, LL' : 'LL')
}

export function formatShortMonth(time) {
  return formatTime(time, 'MM/YYYY')
}

export function formatFullMonth(time) {
  return formatTime(time, 'MMMM, YYYY')
}

export function formatTimeTo(destination, suffix = true) {
  if (!moment(destination).isValid()) {
    return ''
  }
  return moment()
    .locale((AVAILABLE_LANGUAGES[i18n.locale] && AVAILABLE_LANGUAGES[i18n.locale].moment) || 'en')
    .to(moment(destination), suffix)
}

export function formatTimeAgo(source, suffix = true) {
  if (!moment(source).isValid()) {
    return ''
  }
  return moment(source)
    .locale((AVAILABLE_LANGUAGES[i18n.locale] && AVAILABLE_LANGUAGES[i18n.locale].moment) || 'en')
    .fromNow(suffix)
}

export function formatDuration(destination) {
  if (!moment(destination).isValid()) {
    return '00:00:00'
  }

  const diff = moment(destination).diff(moment())
  if (diff <= 0) {
    return '00:00:00'
  }
  const duration = moment.duration(diff)
  const days = duration.asDays()
  if (days < 1) {
    // No days, return HH:mm:ss
    return padLeftZeros(duration.hours(), 2) + ':' + padLeftZeros(duration.minutes(), 2) + ':' + padLeftZeros(duration.seconds(), 2)
  } else {
    // Has days, return xx days HH:mm:ss
    return (
      padLeftZeros(Math.floor(days), 2) +
      ' ' +
      (days < 2 ? translate('day') : translate('days')) +
      ' ' +
      padLeftZeros(duration.hours(), 2) +
      ':' +
      padLeftZeros(duration.minutes(), 2) +
      ':' +
      padLeftZeros(duration.seconds(), 2)
    )
  }
}

const entropy = 'QaweAM@&HF#mgFi151jN*gaFfMJ'
const crypt = new Crypto({ entropy: entropy })

export const encryptWithPublicKey = (partnerPublicKey, message) =>
  new Promise((resolve, reject) => {
    if (!crypt) {
      return reject('Not initialize yet')
    }

    var encrypted = crypt.encrypt(partnerPublicKey, message)
    resolve(encrypted)
  })

export const decryptWithPrivateKey = (ourPrivateKey, encrypted) =>
  new Promise((resolve, reject) => {
    if (!crypt) {
      return reject('Not initialize yet')
    }

    var decrypted = crypt.decrypt(ourPrivateKey, encrypted)
    resolve(decrypted)
  })

export const sign = (ourPrivateKey, partnerPublicKey, message) =>
  new Promise((resolve, reject) => {
    if (!crypt) {
      return reject('Not initialize yet')
    }

    // Create a signature with ISSUER's private RSA key
    var signature = crypt.signature(ourPrivateKey, message)

    // Encrypt message with RECEIVERS public RSA key and attach the signature
    const encrypted = crypt.encrypt(partnerPublicKey, message, signature)
    resolve(encrypted)
  })

export const verify = (ourPrivateKey, partnerPublicKey, encrypted) =>
  new Promise((resolve, reject) => {
    if (!crypt) {
      return reject('Not initialize yet')
    }

    // Decrypt message with own (RECEIVER) private key
    var decrypted = crypt.decrypt(ourPrivateKey, encrypted)

    // Verify message with ISSUER's public key
    var verified = crypt.verify(partnerPublicKey, decrypted.signature, decrypted.message)
    if (verified) {
      resolve(decrypted.message)
    } else {
      reject('Verified failed')
    }
  })

export const generateKeyPair = () =>
  new Promise((resolve, reject) => {
    var rsa = new RSAKey()
    rsa.generate(1024, '10001')
    var publicKey = JSON.parse(rsa.getPublicString())
    var privateKey = JSON.parse(rsa.getPrivateString())
    privateKey.dP = privateKey.dmp1
    privateKey.dQ = privateKey.dmq1
    privateKey.qInv = privateKey.coeff
    delete privateKey.dmp1
    delete privateKey.dmp2
    delete privateKey.coeff

    resolve({
      publicKey,
      privateKey,
    })
  })

export const publicKeyToPem = (publicKey) => {
  if (!crypt) {
    return reject('Not initialize yet')
  }

  return crypt.publicKeyToPem(publicKey)
}

export const privateKeyToPem = (privateKey) => {
  if (!crypt) {
    return reject('Not initialize yet')
  }

  return crypt.privateKeyToPem(privateKey)
}

export function getImageLink(link) {
  if (!link) {
    return link || ''
  }
  if (Array.isArray(link)) {
    if (link.length > 0) {
      link = link[0]
    } else {
      return null
    }
  }

  const url = link.toLowerCase()
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0 || url.indexOf('file://') === 0) {
    return link
  } else if (url.indexOf('/') === 0) {
    return BASE_API_URL + url
  } else {
    return BASE_API_URL + '/' + url
  }
}
