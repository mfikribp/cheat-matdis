import { useState } from 'react'
import './index.css'
import HomePage, { type PageId } from './components/HomePage'
import LCGPage from './pages/LCGPage'
import KongruensiPage from './pages/KongruensiPage'
import EuclideanPage from './pages/EuclideanPage'
import RelasiPage from './pages/RelasiPage'

function App() {
  const [page, setPage] = useState<PageId>('home')
  const goHome = () => setPage('home')

  return (
    <>
      {page === 'home'        && <HomePage onNavigate={setPage} />}
      {page === 'lcg'         && <LCGPage onBack={goHome} />}
      {page === 'kongruensi'  && <KongruensiPage onBack={goHome} />}
      {page === 'euclidean'   && <EuclideanPage onBack={goHome} />}
      {page === 'relasi'      && <RelasiPage onBack={goHome} />}
    </>
  )
}

export default App
