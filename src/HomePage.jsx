import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Countries from './components/Countries'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Countries />
      <Testimonials />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export { HomePage }
export default App