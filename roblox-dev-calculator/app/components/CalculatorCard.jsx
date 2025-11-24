'use client'

import { useState } from 'react'
import { usdToRobuxConversion, robuxToUsdConversion, robuxAfterTax, robuxBeforeTax } from '../server'

const currenciesWithoutDecimals = ['JPY', 'IDR', 'KRW', 'VND']

export default function CalculatorCard({ title, placeholder, resultLabel, conversionType }) {
  const [amount, setAmount] = useState(0)
  const [displayAmount, setDisplayAmount] = useState('')
  const [result, setResult] = useState('0')
  const [currency, setCurrency] = useState('USD')

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' }
  ]

  const currentCurrency = currencies.find(c => c.code === currency)
  const showCurrencySelector = conversionType === 'usdToRobux' || conversionType === 'robuxToUsd'

  const parseInput = (value) => {
    const cleanValue = value.toUpperCase().replace(/[^0-9.KMBTQASPXIOND]/g, '')
    
    if (cleanValue.includes('D')) return parseFloat(cleanValue) * 1e33
    if (cleanValue.includes('N')) return parseFloat(cleanValue) * 1e30
    if (cleanValue.includes('O')) return parseFloat(cleanValue) * 1e27
    if (cleanValue.includes('SP')) return parseFloat(cleanValue) * 1e24
    if (cleanValue.includes('SX')) return parseFloat(cleanValue) * 1e21
    if (cleanValue.includes('QI')) return parseFloat(cleanValue) * 1e18
    if (cleanValue.includes('QA')) return parseFloat(cleanValue) * 1e15
    if (cleanValue.includes('T')) return parseFloat(cleanValue) * 1e12
    if (cleanValue.includes('B')) return parseFloat(cleanValue) * 1e9
    if (cleanValue.includes('M')) return parseFloat(cleanValue) * 1e6
    if (cleanValue.includes('K')) return parseFloat(cleanValue) * 1e3
    
    return parseFloat(cleanValue) || 0
  }


  const formatCurrency = (value, currencyCode) => {
    const num = Number(value)
    if (isNaN(num)) return '0'
    
    const shouldUseDecimals = !currenciesWithoutDecimals.includes(currencyCode)
    const decimals = shouldUseDecimals ? 2 : 0
    
    if (num >= 1e33) return (num / 1e33).toFixed(decimals) + 'D'
    if (num >= 1e30) return (num / 1e30).toFixed(decimals) + 'N'
    if (num >= 1e27) return (num / 1e27).toFixed(decimals) + 'O'
    if (num >= 1e24) return (num / 1e24).toFixed(decimals) + 'Sp'
    if (num >= 1e21) return (num / 1e21).toFixed(decimals) + 'Sx'
    if (num >= 1e18) return (num / 1e18).toFixed(decimals) + 'Qi'
    if (num >= 1e15) return (num / 1e15).toFixed(decimals) + 'Qa'
    if (num >= 1e12) return (num / 1e12).toFixed(decimals) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K'
    
    if (shouldUseDecimals) {
      return num.toFixed(2)
    } else {
      return Math.round(num).toString()
    }
  }

  const handleInputChange = async (value) => {
    setDisplayAmount(value)
    const numValue = parseInput(value)
    setAmount(numValue)
    
    if (!numValue || isNaN(numValue)) {
      setResult('0')
      return
    }

    let calculated = 0

    if (conversionType === 'usdToRobux') {
      calculated = await usdToRobuxConversion(numValue, currency)
    } else if (conversionType === 'robuxToUsd') {
      calculated = await robuxToUsdConversion(numValue, currency)
    } else if (conversionType === 'robuxAfterTax') {
      calculated = await robuxAfterTax(numValue)
    } else if (conversionType === 'robuxBeforeTax') {
      calculated = await robuxBeforeTax(numValue)
    }

    setResult(calculated)
  }

  const handleCurrencyChange = async (newCurrency) => {
    setCurrency(newCurrency)
    
    if (amount && !isNaN(amount)) {
      let calculated = 0

      if (conversionType === 'usdToRobux') {
        calculated = await usdToRobuxConversion(amount, newCurrency)
      } else if (conversionType === 'robuxToUsd') {
        calculated = await robuxToUsdConversion(amount, newCurrency)
      }

      setResult(calculated)
    }
  }

  return (
    <div className="bg-bgCard border-2 border-borderColor rounded-2xl hover:border-accent hover:shadow-[0_8px_30px_rgba(91,141,255,0.25)] hover:-translate-y-2 transition-all duration-150 group overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-bgCard to-bgCardHover px-6 py-6 border-b-2 border-borderColor group-hover:border-accent/50 transition-all duration-300 min-h-[100px] flex items-center">
        <h3 className="text-xl font-black text-primary tracking-tight">{title}</h3>
      </div>
      <div className="p-6 flex-1">
        {showCurrencySelector && (
          <div className="mb-6">
            <label className="block text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Currency</label>
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-4 py-4 bg-bgInput border-2 border-borderColor rounded-xl text-textPrimary font-bold text-lg focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(91,141,255,0.25)] transition-all duration-300"
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Amount</label>
          <input 
            type="text" 
            value={displayAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-4 bg-bgInput border-2 border-borderColor rounded-xl text-textPrimary font-bold text-lg focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(91,141,255,0.25)] transition-all duration-300" 
            placeholder={"e.g., 10000 or 10K"} 
          />
        </div>
        <div className="bg-gradient-to-br from-bgInput to-bgCardHover border-2 border-borderColor px-6 py-5 rounded-xl flex justify-between items-center group-hover:border-accent/50 transition-all duration-300">
          <span className="text-textSecondary font-bold uppercase tracking-wider flex items-center gap-2">
            {(conversionType === 'robuxAfterTax' || conversionType === 'robuxBeforeTax') ? (
              <img src="/robux-icon.webp" className="w-6 h-6" />
            ) : (
              showCurrencySelector && currentCurrency.symbol
            )}
          </span>
          <span className={`font-black text-accent ${result.toString().length > 12 ? 'text-xl' : 'text-3xl'}`}>
            {formatCurrency(result, currency)}
          </span>
        </div>
      </div>
    </div>
  )
}