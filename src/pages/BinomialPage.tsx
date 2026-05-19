import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { buildPascal, hitungBinomial, type BinomialResult, type BinomialCoeffResult } from '../utils/binomial'

interface Props { onBack: () => void }

export default function BinomialPage({ onBack }: Props) {
  const [mode, setMode] = useState<'pascal' | 'coef'>('coef')

  const [pascalN, setPascalN] = useState(6)
  const [pascalResult, setPascalResult] = useState<BinomialResult | null>(null)

  const [coefN, setCoefN] = useState(8)
  const [coefK, setCoefK] = useState(5)
  const [coefResult, setCoefResult] = useState<BinomialCoeffResult | null>(null)

  return (
    <AlgorithmLayout
      title="Koefisien Binomial"
      subtitle="Pascal's Triangle & ekspansi (x+y)ⁿ — Kombinatorika Bag.2"
      color="#4ade80, #16a34a"
      onBack={onBack}
    >
      <div className="tab-switcher">
        <button className={`tab-btn ${mode === 'coef' ? 'active-emerald' : ''}`} onClick={() => setMode('coef')}>
          Koefisien C(n,k)
        </button>
        <button className={`tab-btn ${mode === 'pascal' ? 'active-emerald' : ''}`} onClick={() => setMode('pascal')}>
          Segitiga Pascal
        </button>
      </div>

      {mode === 'coef' && (
        <>
          <main className="glass-card">
            <p className="card-formula">C(n, k) — koefisien xᵏ pada (x+y)ⁿ</p>
            <div className="input-grid cols-2">
              <div className="input-group">
                <label>Pangkat (n)</label>
                <input type="number" value={coefN} min={0} max={20} onChange={e => setCoefN(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Posisi (k)</label>
                <input type="number" value={coefK} min={0} onChange={e => setCoefK(parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <button className="button-primary btn-emerald" onClick={() => setCoefResult(hitungBinomial(coefN, coefK))}>
              Hitung C(n,k)
            </button>
          </main>
          {coefResult && (
            <div className="single-result-panel">
              <div className="result-panel">
                <div className="result-panel-header" style={{ color: '#4ade80' }}>
                  C({coefResult.n}, {coefResult.k})
                  <span className="badge badge-emerald">{coefResult.result.toLocaleString()}</span>
                </div>
                <div className="calc-container">
                  {coefResult.steps.map((s, i) => (
                    <div key={i} className={`calc-line ${
                      i === 0 ? 'main-line-emerald' :
                      i >= coefResult.steps.length - 2 ? 'result-line' : 'sub-line'
                    }`}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {mode === 'pascal' && (
        <>
          <main className="glass-card">
            <p className="card-formula">Segitiga Pascal baris 0 hingga n, dan ekspansi (x+y)ⁿ</p>
            <div className="input-grid cols-2" style={{ maxWidth: 300 }}>
              <div className="input-group">
                <label>Baris ke-n (≤ 12)</label>
                <input type="number" value={pascalN} min={0} max={12} onChange={e => setPascalN(Math.min(12, parseInt(e.target.value) || 0))} />
              </div>
            </div>
            <button className="button-primary btn-emerald" onClick={() => setPascalResult(buildPascal(pascalN))}>
              Buat Segitiga Pascal
            </button>
          </main>

          {pascalResult && (
            <>
              {/* Pascal Triangle */}
              <div className="result-panel" style={{ marginTop: '1.5rem' }}>
                <div className="result-panel-header" style={{ color: '#4ade80' }}>
                  Segitiga Pascal (baris 0–{pascalResult.n})
                </div>
                <div className="pascal-triangle">
                  {pascalResult.pascal.map((row, i) => (
                    <div key={i} className="pascal-row">
                      {row.map((val, j) => (
                        <span
                          key={j}
                          className="pascal-cell"
                          style={i === pascalResult.n ? { color: '#4ade80', borderColor: '#4ade80', background: 'rgba(74,222,128,0.1)' } : {}}
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Binomial Expansion */}
              <div className="result-panel" style={{ marginTop: '1rem' }}>
                <div className="result-panel-header" style={{ color: '#4ade80' }}>
                  Ekspansi (x + y)^{pascalResult.n}
                </div>
                <div className="calc-container">
                  <div className="calc-line main-line-emerald">
                    (x + y)^{pascalResult.n} =
                  </div>
                  <div className="calc-line sub-line" style={{ paddingLeft: '4rem', wordBreak: 'break-all' }}>
                    {pascalResult.expansionTerms.join(' + ')}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </AlgorithmLayout>
  )
}
