import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { solveKongruensi, type KongruensiResult } from '../utils/kongruensi'

interface Props { onBack: () => void }

export default function KongruensiPage({ onBack }: Props) {
  const [a, setA] = useState(3)
  const [b, setB] = useState(6)
  const [m, setM] = useState(9)
  const [result, setResult] = useState<KongruensiResult | null>(null)

  const handleHitung = () => {
    setResult(solveKongruensi(a, b, m))
  }

  return (
    <AlgorithmLayout
      title="Kongruensi Linier"
      subtitle="Selesaikan persamaan ax ≡ b (mod m) — Teori Bilangan Bag.2"
      color="#e879f9, #a21caf"
      onBack={onBack}
    >
      <main className="glass-card">
        <p className="card-formula">ax ≡ b (mod m)</p>
        <div className="input-grid cols-3">
          <div className="input-group">
            <label>Koefisien (a)</label>
            <input type="number" value={a} onChange={e => setA(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Konstanta (b)</label>
            <input type="number" value={b} onChange={e => setB(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Modulus (m)</label>
            <input type="number" value={m} min={1} onChange={e => setM(parseInt(e.target.value) || 1)} />
          </div>
        </div>
        <button className="button-primary btn-fuchsia" onClick={handleHitung}>Selesaikan</button>
      </main>

      {result && (
        <>
          {result.hasSolution ? (
            <div className="summary-cards">
              <div className="summary-card" style={{ borderColor: '#e879f9' }}>
                <span className="summary-label">Jumlah Solusi</span>
                <span className="summary-value" style={{ color: '#e879f9' }}>{result.numSolutions}</span>
              </div>
              {result.solutions.map((sol, i) => (
                <div key={i} className="summary-card" style={{ borderColor: '#e879f9' }}>
                  <span className="summary-label">x₀ + {i > 0 ? `${i}·(${result.m / result.numSolutions})` : '0'}</span>
                  <span className="summary-value" style={{ color: '#e879f9' }}>x = {sol}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-solution-banner">
              ❌ Tidak ada solusi — GCD({Math.abs(result.a)}, {result.m}) = {result.gcd} tidak membagi {result.b}
            </div>
          )}

          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#e879f9' }}>
                {result.a}x ≡ {result.b} (mod {result.m})
                <span className="badge badge-fuchsia">
                  {result.hasSolution ? `${result.numSolutions} solusi` : 'Tidak ada'}
                </span>
              </div>
              <div className="calc-container">
                {result.steps.map((s, i) => (
                  <div key={i} className={`calc-line ${
                    i === 0 ? 'main-line-fuchsia' :
                    i === result.steps.length - 1 ? 'result-line' : 'sub-line'
                  }`}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
