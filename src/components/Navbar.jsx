import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 zm0 4c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z"/>
              <path d="M16 10v6l4 4"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">uVisa</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Visa Types</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Countries</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <a href="#" className="block text-gray-600 py-2">Visa Types</a>
          <a href="#" className="block text-gray-600 py-2">Countries</a>
          <a href="#" className="block text-gray-600 py-2">Services</a>
          <a href="#" className="block text-gray-600 py-2">About</a>
          <button className="w-full bg-blue-600 text-white px-5 py-2 rounded-lg font-medium">Get Started</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar