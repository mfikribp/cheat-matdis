import { useState } from 'react'
import './index.css'
import HomePage, { type PageId } from './components/HomePage'
import LCGPage from './pages/LCGPage'
import KongruensiPage from './pages/KongruensiPage'

function App() {
  const [page, setPage] = useState<PageId>('home')
  const goHome = () => setPage('home')

  return (
    <>
      {page === 'home'        && <HomePage onNavigate={setPage} />}
      {page === 'lcg'         && <LCGPage onBack={goHome} />}
      {page === 'kongruensi'  && <KongruensiPage onBack={goHome} />}
    </>
  )
}

export default App
