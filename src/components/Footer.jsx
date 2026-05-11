function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-8 h-8 text-blue-400" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16zm0 4c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z"/>
                <path d="M16 10v6l4 4"/>
              </svg>
              <span className="text-xl font-bold text-white">uVisa</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted visa search platform. Compare requirements, fees, and processing times for 258 countries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Visa Types</a></li>
              <li><a href="#" className="hover:text-white transition">Countries</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Document Checklist</a></li>
              <li><a href="#" className="hover:text-white transition">Visa Guide Blog</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="text-xs text-gray-500 space-y-2">
            <p>
              <strong>Disclaimer:</strong> uVisa is a visa search and comparison platform. We do not process visa applications directly. 
              Visa approvals are solely at the discretion of the respective country's embassy or consulate. Service fees shown are for 
              guidance only and may vary. Prices are sourced from publicly available government websites and may change without notice.
            </p>
            <p>
              <strong>Advertising Disclosure:</strong> Some visa results may include sponsored listings from third-party visa service providers. 
              These are clearly labeled. Our search results are based on objective criteria including processing time, fee transparency, and 
              user reviews — not paid placement.
            </p>
            <p className="text-gray-600">
              © {new Date().getFullYear()} uVisa. All rights reserved. Not affiliated with any government embassy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer