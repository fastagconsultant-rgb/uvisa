const testimonials = [
  {
    name: 'Priya Sharma',
    country: 'Mumbai, India',
    text: 'Got my US tourist visa guidance within 3 days. The document checklist was super helpful.',
    rating: 5,
    flag: '🇮🇳'
  },
  {
    name: 'James Wilson',
    country: 'London, UK',
    text: 'Compare feature saved me £200 compared to what I was quoted elsewhere. Highly recommend.',
    rating: 5,
    flag: '🇬🇧'
  },
  {
    name: 'Chen Wei',
    country: 'Singapore',
    text: 'The processing time estimates were accurate. My Canada work permit came through exactly on schedule.',
    rating: 5,
    flag: '🇸🇬'
  },
  {
    name: 'Maria Santos',
    country: 'São Paulo, Brazil',
    text: 'Best visa platform for Latin Americans. Easy to compare Schengen country requirements.',
    rating: 5,
    flag: '🇧🇷'
  }
]

function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by Travelers Worldwide</h2>
          <p className="text-gray-600">Join over 50,000 happy travelers who found their visa with uVisa</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">{t.flag}</div>
                <div>
                  <div className="font-semibold text-gray-800">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials