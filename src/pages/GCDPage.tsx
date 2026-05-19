import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { hitungGCD, type GCDResult } from '../utils/gcd'

interface Props { onBack: () => void }

export default function GCDPage({ onBack }: Props) {
  const [a, setA] = useState(48)
  const [b, setB] = useState(18)
  const [result, setResult] = useState<GCDResult | null>(null)
  const [error, setError] = useState('')

  const handleHitung = () => {
    setError('')
    if (a <= 0 || b <= 0) { setError('a dan b harus bilangan positif'); return }
    setResult(hitungGCD(a, b))
  }

  return (
    <AlgorithmLayout
      title="GCD & LCM (Euclidean)"
      subtitle="Mencari FPB dan KPK menggunakan Algoritma Euclid"
      color="#34d399, #059669"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="input-grid cols-2">
          <div className="input-group">
            <label>Bilangan a</label>
            <input type="number" value={a} min={1} onChange={e => setA(parseInt(e.target.value) || 1)} />
          </div>
          <div className="input-group">
            <label>Bilangan b</label>
            <input type="number" value={b} min={1} onChange={e => setB(parseInt(e.target.value) || 1)} />
          </div>
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="button-primary btn-green" onClick={handleHitung}>Hitung GCD & LCM</button>
      </main>

      {result && (
        <>
          <div className="summary-cards">
            <div className="summary-card" style={{ borderColor: '#34d399' }}>
              <span className="summary-label">GCD / FPB</span>
              <span className="summary-value" style={{ color: '#34d399' }}>{result.gcd}</span>
            </div>
            <div className="summary-card" style={{ borderColor: '#34d399' }}>
              <span className="summary-label">LCM / KPK</span>
              <span className="summary-value" style={{ color: '#34d399' }}>{result.lcm}</span>
            </div>
          </div>

          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#34d399' }}>
                Langkah-langkah Algoritma Euclid
              </div>
              <div className="calc-container">
                {result.steps.map((step, i) => (
                  <div key={i} className={`calc-line ${i === 0 ? 'main-line-green' : 'sub-line'}`}>
                    <span style={{ color: '#64748b', marginRight: '1rem', fontSize: '0.8rem' }}>
                      Step {i + 1}:
                    </span>
                    {step.equation}
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(52,211,153,0.2)', marginTop: '1rem', paddingTop: '1rem' }}>
                  {result.backSubstitution.map((s, i) => (
                    <div key={i} className={`calc-line ${i === result.backSubstitution.length - 1 ? 'result-line' : 'sub-line'}`}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
