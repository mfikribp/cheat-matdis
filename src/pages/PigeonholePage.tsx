import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { hitungPigeonhole, type PigeonholeResult } from '../utils/pigeonhole'

interface Props { onBack: () => void }

export default function PigeonholePage({ onBack }: Props) {
  const [pigeons, setPigeons] = useState(10)
  const [holes, setHoles] = useState(3)
  const [k, setK] = useState(4)
  const [result, setResult] = useState<PigeonholeResult | null>(null)

  const handleHitung = () => {
    if (pigeons <= 0 || holes <= 0 || k <= 0) return
    setResult(hitungPigeonhole(pigeons, holes, k))
  }

  return (
    <AlgorithmLayout
      title="Pigeonhole Principle"
      subtitle="Prinsip Sangkar Merpati — jika n > k merpati di k kandang, pasti ada kandang dengan ≥ 2 merpati"
      color="#f87171, #dc2626"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="input-grid cols-3">
          <div className="input-group">
            <label>Jumlah Merpati (n)</label>
            <input type="number" value={pigeons} min={1} onChange={e => setPigeons(parseInt(e.target.value) || 1)} />
          </div>
          <div className="input-group">
            <label>Jumlah Kandang (k)</label>
            <input type="number" value={holes} min={1} onChange={e => setHoles(parseInt(e.target.value) || 1)} />
          </div>
          <div className="input-group">
            <label>Target per Kandang (k)</label>
            <input type="number" value={k} min={2} onChange={e => setK(parseInt(e.target.value) || 2)} />
          </div>
        </div>
        <button className="button-primary btn-red" onClick={handleHitung}>Analisis Pigeonhole</button>
      </main>

      {result && (
        <>
          <div className="summary-cards">
            <div className="summary-card" style={{ borderColor: '#f87171' }}>
              <span className="summary-label">Min. Dijamin di 1 Kandang</span>
              <span className="summary-value" style={{ color: '#f87171' }}>≥ {result.minGuaranteed}</span>
            </div>
            <div className="summary-card" style={{ borderColor: '#f87171' }}>
              <span className="summary-label">Min. Merpati untuk {result.k}/kandang</span>
              <span className="summary-value" style={{ color: '#f87171' }}>{result.minPigeonsForK}</span>
            </div>
          </div>

          {/* Visual pigeonhole */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#f87171' }}>Visualisasi</div>
            <div className="pigeonhole-vis">
              {Array.from({ length: Math.min(holes, 20) }).map((_, i) => {
                const perHole = Math.floor(pigeons / holes)
                const extra = pigeons % holes
                const count = perHole + (i < extra ? 1 : 0)
                return (
                  <div key={i} className="hole-box">
                    <div className="hole-label">Kandang {i + 1}</div>
                    <div className="hole-birds">
                      {Array.from({ length: Math.min(count, 10) }).map((_, j) => (
                        <span key={j} className="bird-icon">🐦</span>
                      ))}
                      {count > 10 && <span style={{ color: '#64748b', fontSize: '0.75rem' }}>+{count - 10}</span>}
                    </div>
                    <div className="hole-count">{count} merpati</div>
                  </div>
                )
              })}
              {holes > 20 && <div style={{ color: '#64748b', fontSize: '0.875rem', padding: '1rem' }}>...dan {holes - 20} kandang lainnya</div>}
            </div>
          </div>

          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#f87171' }}>Penjelasan</div>
              <div className="calc-container">
                {result.steps.map((s, i) => (
                  <div key={i} className={`calc-line ${i === 0 ? 'main-line-red' : 'sub-line'}`}>{s}</div>
                ))}
                <div className="calc-line result-line" style={{ marginTop: '1rem', fontSize: '1rem' }}>
                  {result.explanation}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
