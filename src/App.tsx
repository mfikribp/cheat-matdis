import { useState } from 'react'
import './index.css'
import HomePage, { type PageId } from './components/HomePage'
import LCGPage from './pages/LCGPage'
import PermutasiPage from './pages/PermutasiPage'
import KombinasiPage from './pages/KombinasiPage'
import GCDPage from './pages/GCDPage'
import ModularPage from './pages/ModularPage'
import SievePage from './pages/SievePage'
import FibonacciPage from './pages/FibonacciPage'
import PigeonholePage from './pages/PigeonholePage'
import KongruensiPage from './pages/KongruensiPage'
import BinomialPage from './pages/BinomialPage'
import RekurensiPage from './pages/RekurensiPage'
import GrafPage from './pages/GrafPage'

function App() {
  const [page, setPage] = useState<PageId>('home')
  const goHome = () => setPage('home')

  return (
    <>
      {page === 'home'        && <HomePage onNavigate={setPage} />}
      {page === 'lcg'         && <LCGPage onBack={goHome} />}
      {page === 'permutasi'   && <PermutasiPage onBack={goHome} />}
      {page === 'kombinasi'   && <KombinasiPage onBack={goHome} />}
      {page === 'gcd'         && <GCDPage onBack={goHome} />}
      {page === 'modular'     && <ModularPage onBack={goHome} />}
      {page === 'sieve'       && <SievePage onBack={goHome} />}
      {page === 'fibonacci'   && <FibonacciPage onBack={goHome} />}
      {page === 'pigeonhole'  && <PigeonholePage onBack={goHome} />}
      {page === 'kongruensi'  && <KongruensiPage onBack={goHome} />}
      {page === 'binomial'    && <BinomialPage onBack={goHome} />}
      {page === 'rekurensi'   && <RekurensiPage onBack={goHome} />}
      {page === 'graf'        && <GrafPage onBack={goHome} />}
    </>
  )
}

export default App
