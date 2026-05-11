import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { countries } from './data/countries.js'

function getFlagUrl(iso2, size = 64) {
  const sizeMap = { 32: 'w20', 40: 'w40', 64: 'w80', 80: 'w80', 128: 'ultra' }
  const key = size <= 20 ? 'mini' : sizeMap[size] || 'w80'
  return `https://flagpedia.net/data/flags/${key}/${iso2}.png`
}

function SearchPage() {
  const [searchParams] = useSearchParams()
  const fromId = searchParams.get('from')
  const toId = searchParams.get('to')

  const [visas, setVisas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fromCountry = countries.find(c => c.id === fromId)
  const toCountry = countries.find(c => c.id === toId)

  useEffect(() => {
    async function fetchVisas() {
      if (!fromId || !toId) return
      setLoading(true)
      try {
        const form = new FormData()
        form.append('from_country', fromId)
        form.append('to_country', toId)
        const res = await fetch('https://migrate.vughy.com/visaclapapi_yam/api/visacountry', {
          method: 'POST',
          body: form,
        })
        const data = await res.json()
        if (data.message && Array.isArray(data.message)) {
          setVisas(data.message)
        } else if (data.message && typeof data.message === 'object') {
          setVisas([data.message])
        } else {
          setVisas([])
        }
      } catch (e) {
        setError('Failed to load visa options')
      }
      setLoading(false)
    }
    fetchVisas()
  }, [fromId, toId])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchHeader fromCountry={fromCountry} toCountry={toCountry} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!loading && !error && visas.length === 0 && <EmptyState fromCountry={fromCountry} toCountry={toCountry} />}
        {!loading && visas.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-6">{visas.length} visa type{visas.length !== 1 ? 's' : ''} found for {fromCountry?.name || 'origin'} → {toCountry?.name || 'destination'}</p>
            <div className="space-y-6">
              {visas.map((visa, index) => (
                <VisaCard
                  key={index}
                  visa={visa}
                  fromCountry={fromCountry}
                  toCountry={toCountry}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src="/favicon.svg" alt="uVisa" className="w-8 h-8" />
        <span className="font-bold text-xl text-gray-900">uVisa</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors">Countries</Link>
        <a href="#" className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors">Visa Types</a>
        <a href="#" className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors">About</a>
        <a href="#" className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-red-500 font-medium transition-colors">Sign In</button>
        <button className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm">Get Started</button>
      </div>
    </nav>
  )
}

function SearchHeader({ fromCountry, toCountry }) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </Link>
          <span>/</span>
          <span>Visa Search</span>
        </div>
        <div className="flex items-center gap-4">
          {fromCountry && (
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
              <img src={getFlagUrl(fromCountry.iso2, 80)} alt="" className="w-12 h-9 rounded-lg object-cover border border-white/30 shadow" />
              <div>
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">From</p>
                <p className="text-white font-semibold text-base">{fromCountry.name}</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </div>
          {toCountry && (
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
              <img src={getFlagUrl(toCountry.iso2, 80)} alt="" className="w-12 h-9 rounded-lg object-cover border border-white/30 shadow" />
              <div>
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">To</p>
                <p className="text-white font-semibold text-base">{toCountry.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function VisaCard({ visa, fromCountry, toCountry }) {
  const [expanded, setExpanded] = useState(false)

  const visaTypeNames = { '1': 'Visiting Visa', '2': 'Business Visa', '3': 'Tourist Visa' }
  const visaType = visaTypeNames[visa.visa_type] || visa.visa_type_name || 'Visa'

  const price = parseFloat(visa.price || 0)
  const serviceCharge = parseFloat(visa.service_charge || 0)
  const total = price + serviceCharge

  const docs = visa.documents || []
  const notes = visa.notes || []
  const process = visa.process || []

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                visa.visa_type === '1' ? 'bg-blue-100 text-blue-700' :
                visa.visa_type === '2' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              }`}>
                {visaType}
              </span>
              {visa.validity && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  📅 {visa.validity}
                </span>
              )}
              {visa.Processing_Time && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  ⏱ {visa.Processing_Time}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {toCountry?.name || 'Destination'} {visaType}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              For travel from {fromCountry?.name || 'origin'} to {toCountry?.name || 'destination'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-red-600">${total.toLocaleString()}</div>
            <div className="text-xs text-gray-400">incl. all fees</div>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      {(price > 0 || serviceCharge > 0) && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Price Breakdown</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Separate fees</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {price > 0 && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-xs">🏛</div>
                <div>
                  <p className="text-xs text-gray-500">Government Fee</p>
                  <p className="text-sm font-bold text-gray-800">${price.toLocaleString()}</p>
                </div>
              </div>
            )}
            {serviceCharge > 0 && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-xs">💼</div>
                <div>
                  <p className="text-xs text-gray-500">Service Fee</p>
                  <p className="text-sm font-bold text-gray-800">${serviceCharge.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents */}
      {docs.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center text-xs">📄</span>
            Documents Required
          </h4>
          <div className="flex flex-wrap gap-2">
            {docs.map((doc, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-full font-medium">
                ✓ {doc}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Processing / Notes */}
      {(process.length > 0 || notes.length > 0) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {process.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-xs">⚡</span>
                Processing Steps
              </h4>
              <div className="space-y-2">
                {process.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {notes.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center text-xs">📝</span>
                Important Notes
              </h4>
              <div className="space-y-1.5">
                {notes.map((note, i) => (
                  <p key={i} className="text-xs text-gray-500 flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{note}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-white flex items-center justify-between gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Hide details' : 'View details'}
          <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors text-sm">
            View Requirements
          </button>
          <button className="px-5 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-md text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mb-4"/>
      <p className="text-gray-500 text-sm">Loading visa options...</p>
    </div>
  )
}

function ErrorState({ error }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-gray-500 text-sm">{error}</p>
      <Link to="/" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
        ← Back to Home
      </Link>
    </div>
  )
}

function EmptyState({ fromCountry, toCountry }) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">🔍</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No Visas Found</h3>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
        We couldn't find any visa options for travel from {fromCountry?.name || 'origin'} to {toCountry?.name || 'destination'}. Try different countries.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors">
        ← Search Again
      </Link>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14 px-4 mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/favicon.svg" alt="uVisa" className="w-8 h-8" />
              <span className="font-bold text-xl text-white">uVisa</span>
            </div>
            <p className="text-sm leading-relaxed">
              We are visa consultation professionals providing information about visa requirements,
              fees, and procedures. We help travelers understand the visa process for their destination countries.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Visa Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>📧 support@uvisa.com</li>
              <li>📍 Mumbai, India</li>
              <li>📞 Available on request</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="bg-gray-800 rounded-xl p-5 mb-6">
            <h5 className="text-white text-sm font-bold mb-2">Important Disclaimer</h5>
            <p className="text-xs leading-relaxed">
              <strong>Disclaimer:</strong> uVisa is an independent visa information service. We provide publicly
              available visa information for informational purposes only. We are not affiliated with, endorsed by,
              or represent any government authority. Visa approvals, fees, and requirements are subject to change
              without notice and are determined solely by the respective embassies and consulates. The information
              provided on this platform should not be considered as legal or immigration advice. We recommend
              verifying all information directly with the relevant embassy or consulate before making travel plans.
              uVisa does not guarantee visa approval or accuracy of fees displayed. Service fees shown are
              separate from government visa fees and are charged for information and consultation services only.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2025 uVisa. All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs">
              <span>🔒 Your data is secure</span>
              <span>✓ Verified Information</span>
              <span>🌍 258 Countries</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SearchPage