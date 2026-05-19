import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { sieveOfEratosthenes, type SieveResult } from '../utils/sieve'

interface Props { onBack: () => void }

export default function SievePage({ onBack }: Props) {
  const [limit, setLimit] = useState(100)
  const [result, setResult] = useState<SieveResult | null>(null)

  const handleHitung = () => {
    const l = Math.min(Math.max(limit, 2), 500)
    setResult(sieveOfEratosthenes(l))
  }

  const colorMap: Record<number, string> = {
    2: '#60a5fa', 3: '#a78bfa', 5: '#f472b6', 7: '#34d399',
    11: '#fb923c', 13: '#fbbf24', 17: '#22d3ee', 19: '#f87171',
  }

  return (
    <AlgorithmLayout
      title="Sieve of Eratosthenes"
      subtitle="Mencari semua bilangan prima hingga N dengan visualisasi"
      color="#fbbf24, #d97706"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="input-grid cols-2" style={{ maxWidth: '400px' }}>
          <div className="input-group">
            <label>Batas N (maks 500)</label>
            <input type="number" value={limit} min={2} max={500} onChange={e => setLimit(parseInt(e.target.value) || 2)} />
          </div>
        </div>
        <button className="button-primary btn-yellow" onClick={handleHitung}>Mulai Saringan</button>
      </main>

      {result && (
        <>
          <div className="summary-cards">
            <div className="summary-card" style={{ borderColor: '#fbbf24' }}>
              <span className="summary-label">Batas N</span>
              <span className="summary-value" style={{ color: '#fbbf24' }}>{result.limit}</span>
            </div>
            <div className="summary-card" style={{ borderColor: '#fbbf24' }}>
              <span className="summary-label">Jumlah Prima</span>
              <span className="summary-value" style={{ color: '#fbbf24' }}>{result.primes.length}</span>
            </div>
            <div className="summary-card" style={{ borderColor: '#fbbf24' }}>
              <span className="summary-label">Prima Terbesar</span>
              <span className="summary-value" style={{ color: '#fbbf24' }}>{result.primes[result.primes.length - 1]}</span>
            </div>
          </div>

          {/* Steps */}
          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#fbbf24' }}>Langkah Eliminasi</div>
              <div className="calc-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {result.steps.map((step, i) => (
                  <div key={i} className="calc-line sub-line">
                    Prima <strong style={{ color: '#fbbf24' }}>{step.prime}</strong>: eliminasi {step.eliminated.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid visualization */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#fbbf24' }}>Visualisasi Grid</div>
            <div className="sieve-legend">
              <span className="sieve-legend-item">
                <span style={{ background: '#fbbf24', width: 12, height: 12, borderRadius: 3, display: 'inline-block', marginRight: 6 }}></span>
                Bilangan Prima
              </span>
              <span className="sieve-legend-item">
                <span style={{ background: 'rgba(255,255,255,0.05)', width: 12, height: 12, borderRadius: 3, display: 'inline-block', marginRight: 6, border: '1px solid rgba(255,255,255,0.1)' }}></span>
                Komposit
              </span>
            </div>
            <div className="sieve-grid">
              {result.allNumbers.map(num => {
                const primeColor = colorMap[num.eliminatedBy ?? 0]
                return (
                  <div
                    key={num.value}
                    className={`sieve-cell ${num.isPrime ? 'prime' : 'composite'}`}
                    title={num.isPrime ? `${num.value} adalah prima` : `${num.value} habis dibagi ${num.eliminatedBy}`}
                    style={num.isPrime ? { background: 'rgba(251,191,36,0.2)', borderColor: '#fbbf24', color: '#fbbf24' }
                      : primeColor ? { borderColor: `${primeColor}44`, color: '#475569' }
                      : {}}
                  >
                    {num.value}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Prime list */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#fbbf24' }}>Daftar Bilangan Prima</div>
            <div className="prime-list">
              {result.primes.map(p => (
                <span key={p} className="prime-chip">{p}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
