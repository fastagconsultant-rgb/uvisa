import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from '../data/countries.js'

const API_BASE = 'https://migrate.vughy.com/visaclapapi_yam/api'

function HeroSection() {
  const navigate = useNavigate()
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [fromSearch, setFromSearch] = useState('')
  const [toSearch, setToSearch] = useState('')
  const [fromCountry, setFromCountry] = useState(null)
  const [toCountry, setToCountry] = useState(null)
  const fromRef = useRef(null)
  const toRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setFromOpen(false)
      if (toRef.current && !toRef.current.contains(e.target)) setToOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filteredFrom = countries.filter(c =>
    c.name.toLowerCase().includes(fromSearch.toLowerCase()) ||
    (c.capital && c.capital.toLowerCase().includes(fromSearch.toLowerCase()))
  ).slice(0, 30)

  const filteredTo = countries.filter(c =>
    c.name.toLowerCase().includes(toSearch.toLowerCase()) ||
    (c.capital && c.capital.toLowerCase().includes(toSearch.toLowerCase()))
  ).slice(0, 30)

  const handleSearch = () => {
    if (fromCountry && toCountry) {
      navigate(`/search?from=${fromCountry.id}&to=${toCountry.id}`)
    }
  }

  const getFlagUrl = (iso2) => `https://flagpedia.net/data/flags/small/${iso2.toLowerCase()}.png`

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-blue-900/40" />

      <div className="relative z-10 text-center px-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Your Journey Begins with <span className="text-red-500">uVisa</span>
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Compare visa requirements, fees, and processing times across 258 countries worldwide
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From Country */}
            <div ref={fromRef} className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide">From</label>
              <button
                onClick={() => { setFromOpen(!fromOpen); setToOpen(false) }}
                className={`w-full h-14 flex items-center gap-3 px-4 border-2 rounded-xl transition-all duration-200 ${fromOpen ? 'border-red-500 shadow-lg shadow-red-100' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {fromCountry ? (
                  <>
                    <img src={getFlagUrl(fromCountry.iso2)} alt={fromCountry.name} className="w-8 h-6 object-cover rounded" />
                    <span className="font-medium text-gray-800">{fromCountry.name}</span>
                  </>
                ) : (
                  <span className="text-gray-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                    Select country
                  </span>
                )}
                <svg className={`w-5 h-5 ml-auto text-gray-400 transition-transform ${fromOpen ? 'rotate-180 text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {fromOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredFrom.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setFromCountry(c); setFromOpen(false); setFromSearch('') }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left ${fromCountry?.id === c.id ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
                      >
                        <img src={getFlagUrl(c.iso2)} alt={c.name} className="w-10 h-7 object-cover rounded shadow-sm" />
                        <div>
                          <div className="font-medium text-gray-800">{c.name}</div>
                          {c.capital && <div className="text-xs text-gray-500">{c.capital}</div>}
                        </div>
                        {fromCountry?.id === c.id && <svg className="w-5 h-5 text-red-500 ml-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Swap indicator */}
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
            </div>

            {/* To Country */}
            <div ref={toRef} className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide">To</label>
              <button
                onClick={() => { setToOpen(!toOpen); setFromOpen(false) }}
                className={`w-full h-14 flex items-center gap-3 px-4 border-2 rounded-xl transition-all duration-200 ${toOpen ? 'border-red-500 shadow-lg shadow-red-100' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {toCountry ? (
                  <>
                    <img src={getFlagUrl(toCountry.iso2)} alt={toCountry.name} className="w-8 h-6 object-cover rounded" />
                    <span className="font-medium text-gray-800">{toCountry.name}</span>
                  </>
                ) : (
                  <span className="text-gray-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                    Select destination
                  </span>
                )}
                <svg className={`w-5 h-5 ml-auto text-gray-400 transition-transform ${toOpen ? 'rotate-180 text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {toOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredTo.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setToCountry(c); setToOpen(false); setToSearch('') }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left ${toCountry?.id === c.id ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
                      >
                        <img src={getFlagUrl(c.iso2)} alt={c.name} className="w-10 h-7 object-cover rounded shadow-sm" />
                        <div>
                          <div className="font-medium text-gray-800">{c.name}</div>
                          {c.capital && <div className="text-xs text-gray-500">{c.capital}</div>}
                        </div>
                        {toCountry?.id === c.id && <svg className="w-5 h-5 text-red-500 ml-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!fromCountry || !toCountry}
            className={`w-full mt-5 h-14 rounded-xl font-semibold text-lg transition-all duration-200 ${fromCountry && toCountry ? 'bg-[#FF4C4C] text-white hover:bg-red-600 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            Search Visas
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection