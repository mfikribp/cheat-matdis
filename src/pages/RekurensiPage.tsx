import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { solveRekurensi, type RekurensiResult } from '../utils/rekurensi'

interface Props { onBack: () => void }

export default function RekurensiPage({ onBack }: Props) {
  const [p, setP] = useState(3)
  const [q, setQ] = useState(-2)
  const [a0, setA0] = useState(1)
  const [a1, setA1] = useState(3)
  const [terms, setTerms] = useState(10)
  const [result, setResult] = useState<RekurensiResult | null>(null)

  const handleHitung = () => {
    setResult(solveRekurensi(p, q, a0, a1, Math.min(terms, 20)))
  }

  return (
    <AlgorithmLayout
      title="Relasi Rekurensi"
      subtitle="Selesaikan aₙ = p·aₙ₋₁ + q·aₙ₋₂ — Deretan & Rekursi"
      color="#38bdf8, #0284c7"
      onBack={onBack}
    >
      <main className="glass-card">
        <p className="card-formula">aₙ = p·aₙ₋₁ + q·aₙ₋₂, dengan a₀ dan a₁ diketahui</p>
        <div className="input-grid">
          <div className="input-group">
            <label>Koefisien p</label>
            <input type="number" value={p} onChange={e => setP(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Koefisien q</label>
            <input type="number" value={q} onChange={e => setQ(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Nilai awal a₀</label>
            <input type="number" value={a0} onChange={e => setA0(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Nilai awal a₁</label>
            <input type="number" value={a1} onChange={e => setA1(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Jumlah suku (≤ 20)</label>
            <input type="number" value={terms} min={2} max={20} onChange={e => setTerms(parseInt(e.target.value) || 2)} />
          </div>
        </div>
        <button className="button-primary btn-sky" onClick={handleHitung}>Generate Barisan</button>
      </main>

      {result && (
        <>
          {/* Sequence chips */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#38bdf8' }}>
              Barisan aₙ = {result.p}·aₙ₋₁ + {result.q}·aₙ₋₂
            </div>
            <div className="fib-sequence">
              {result.sequence.map((step) => (
                <div key={step.n} className="fib-chip" style={{ borderColor: 'rgba(56,189,248,0.3)', background: 'rgba(56,189,248,0.07)' }}>
                  <span className="fib-index">a{step.n}</span>
                  <span className="fib-val" style={{ color: '#38bdf8' }}>{step.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step */}
          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#38bdf8' }}>Langkah-langkah</div>
              <div className="calc-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {result.sequence.map((step, i) => (
                  <div key={i} className={`calc-line ${i < 2 ? 'main-line-sky' : 'sub-line'}`}>
                    {step.equation}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Characteristic equation */}
          <div className="result-panel" style={{ marginTop: '1rem' }}>
            <div className="result-panel-header" style={{ color: '#38bdf8' }}>Persamaan Karakteristik</div>
            <div className="calc-container">
              <div className="calc-line main-line-sky">Persamaan karakteristik: {result.characteristic}</div>
              {result.roots && (
                <>
                  <div className="calc-line sub-line">
                    Akar: r₁ = {result.roots.r1}, r₂ = {result.roots.r2}
                  </div>
                  {result.roots.r1 === result.roots.r2
                    ? <div className="calc-line sub-line">Akar kembar → bentuk umum berbeda</div>
                    : null
                  }
                </>
              )}
              <div className="calc-line result-line">
                Solusi umum: {result.closedForm}
              </div>
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
