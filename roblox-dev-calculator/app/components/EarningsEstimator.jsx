'use client'

import { useState } from "react"
import { getGenreRate, robuxToUsdConversion } from '../server'

export default function EarningsEstimator() {
  const [genre, setGenre] = useState('rpg')
  const [visits, setVisits] = useState(0)
  const [displayVisits, setDisplayVisits] = useState('')
  const [earnings, setEarnings] = useState('0.00')

  const genres = [
    { value: 'rpg', label: 'RPG' },
    { value: 'mmorpg', label: 'MMORPG' },
    { value: 'anime', label: 'Anime' },
    { value: 'fps', label: 'FPS' },
    { value: 'simulator', label: 'Simulator' },
    { value: 'brainrot', label: 'Brainrot' },
    { value: 'parkour', label: 'Parkour' }
  ]

  const abbreviateNumber = (num) => {
    if (num >= 1e33) return (num / 1e33).toFixed(2) + 'D'
    if (num >= 1e30) return (num / 1e30).toFixed(2) + 'N'
    if (num >= 1e27) return (num / 1e27).toFixed(2) + 'O'
    if (num >= 1e24) return (num / 1e24).toFixed(2) + 'Sp'
    if (num >= 1e21) return (num / 1e21).toFixed(2) + 'Sx'
    if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi'
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa'
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
    return num.toString()
  }

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

  const calculateEarnings = async (visitCount, genreType) => {
    if (!visitCount || isNaN(visitCount) || visitCount <= 0) {
      setEarnings('0.00')
      return
    }

    const genreRate = await getGenreRate(genreType)
    const robuxEarned = visitCount * genreRate
    const robuxAfterTax = robuxEarned * 0.7
    const usdEarnings = await robuxToUsdConversion(robuxAfterTax)
    
    setEarnings(usdEarnings.toFixed(2))
  }

  const handleVisitsChange = async (value) => {
    setDisplayVisits(value)
    const numValue = parseInput(value)
    setVisits(numValue)
    await calculateEarnings(numValue, genre)
  }

  const handleGenreChange = async (value) => {
    setGenre(value)
    await calculateEarnings(visits, value)
  }

  return (
    <section className="mb-12">
      <div className="bg-bgCard border-2 border-borderColor rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(91,141,255,0.25)] transition-all duration-500">
        <div className="bg-gradient-to-r from-accent via-accentDark to-accent px-6 py-6 flex justify-between items-center">
          <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-lg">Game Earnings Estimator</h3>
          <span className="bg-white/25 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">estimation</span>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Game Genre</label>
              <select 
                value={genre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="w-full px-4 py-4 bg-bgInput border-2 border-borderColor rounded-xl text-textPrimary font-bold focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(91,141,255,0.25)] transition-all duration-300 cursor-pointer"
              >
                {genres.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Visits</label>
              <input 
                type="text" 
                value={displayVisits}
                onChange={(e) => handleVisitsChange(e.target.value)}
                className="w-full px-4 py-4 bg-bgInput border-2 border-borderColor rounded-xl text-textPrimary font-bold focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(91,141,255,0.25)] transition-all duration-300" 
                placeholder="e.g., 10000 or 10K" 
              />
            </div>
          </div>
          <div className="bg-gradient-to-br from-bgInput to-bgCardHover border-2 border-accent/50 px-8 py-8 rounded-2xl text-center shadow-[0_0_30px_rgba(91,141,255,0.2)]">
            <div className="text-sm text-textSecondary mb-3 font-bold uppercase tracking-wider">Estimated Earnings</div>
            <div className="text-5xl font-black text-accent">${abbreviateNumber(earnings)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}