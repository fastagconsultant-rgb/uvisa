import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from '../data/countries.js'

function Countries() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.landmark && c.landmark.toLowerCase().includes(search.toLowerCase()))
  ).slice(0, 60)

  const getFlagUrl = (iso2) => `https://flagpedia.net/data/flags/small/${iso2.toLowerCase()}.png`

  const handleCountryClick = (country) => {
    navigate(`/search?from=1&to=${country.id}`)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Destinations</h2>
          <p className="text-gray-600">Click any country to explore visa options</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by country or landmark..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(country => (
            <button
              key={country.id}
              onClick={() => handleCountryClick(country)}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 aspect-square"
            >
              {/* Background image area with flag watermark */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <img
                  src={getFlagUrl(country.iso2)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-10"
                />
              </div>

              {/* Large centered flag */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={getFlagUrl(country.iso2)}
                  alt={country.name}
                  className="w-16 h-12 object-cover rounded-lg shadow-lg border-2 border-white"
                />
              </div>

              {/* Country name */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 text-center">
                <div className="font-semibold text-gray-800 text-sm truncate">{country.name}</div>
              </div>

              {/* Landmark tag */}
              {country.landmark && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs text-gray-600 px-2 py-1 rounded-full shadow">
                  📍 {country.landmark.split(',')[0]}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries