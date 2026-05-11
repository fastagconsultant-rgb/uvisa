import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

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

export default App