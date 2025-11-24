'use server'

const genreRates: { [key: string]: number } = {
  "simulator": 2.0,
  "rpg": 1.5,
  "mmorpg": 1.5,
  "anime": 1.5,
  "fps": 1.2,
  "parkour": 0.6,
  "brainrot": 0.4
}

const devexRate = 0.0038

/* static exchange rates for failure on API only */
const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  IDR: 16400,
  AUD: 1.52,
  CAD: 1.36,
  SGD: 1.34,
  MYR: 4.47,
  PHP: 56.50
}

export async function getExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 3600 }
    })
    const data = await response.json()
    return data.rates
  } catch (error) {
    return exchangeRates
  }
}

export async function usdToRobuxConversion(amount: number, currency: string = 'USD') {
  const rates = await getExchangeRates()
  const usdAmount = amount / rates[currency]
  const robux = usdAmount / devexRate
  return Number(robux.toFixed(2))
}

export async function robuxToUsdConversion(amount: number, currency: string = 'USD') {
  const rates = await getExchangeRates()
  const usdAmount = amount * devexRate
  const convertedAmount = usdAmount * rates[currency]
  return Number(convertedAmount.toFixed(2))
}

export async function robuxAfterTax(amount: number) {
  return Number((amount / 0.7).toFixed(2))
}

export async function robuxBeforeTax(amount: number) {
  return Number((amount * 0.7).toFixed(2))
}

export async function getGenreRate(genreType: string) {
  if (genreRates[genreType]) {
    return genreRates[genreType]
  }
  return 1.0
}