import { useState, useEffect } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { generateLCG, type LCGResult } from '../utils/lcg'

interface Props { onBack: () => void }

export default function LCGPage({ onBack }: Props) {
  const [params, setParams] = useState({ m: 19, a: 9, b: 13, x0: 3, n: 10 })
  const [results, setResults] = useState<LCGResult[]>([])

  useEffect(() => { handleGenerate() }, [])

  const handleGenerate = () => {
    setResults(generateLCG(params.m, params.a, params.b, params.x0, params.n))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  return (
    <AlgorithmLayout
      title="Linear Congruential Generator"
      subtitle="Generator bilangan acak semu: Xₙ = (a·Xₙ₋₁ + b) mod m"
      color="#60a5fa, #3b82f6"
      onBack={onBack}
      pdfUrl="https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/17-Teori-Bilangan-Bagian3-2024.pdf#page=52"
      pdfLabel="PDF Slide 52"
    >
      <main className="glass-card">
        <div className="input-grid">
          {[
            { label: 'Modulus (m)', name: 'm', val: params.m },
            { label: 'Multiplier (a)', name: 'a', val: params.a },
            { label: 'Increment (b)', name: 'b', val: params.b },
            { label: 'Seed (X₀)', name: 'x0', val: params.x0 },
            { label: 'Iterasi (n)', name: 'n', val: params.n },
          ].map(f => (
            <div key={f.name} className="input-group">
              <label>{f.label}</label>
              <input type="number" name={f.name} value={f.val} onChange={handleChange} />
            </div>
          ))}
        </div>
        <button className="button-primary" onClick={handleGenerate}>Generate Sequence</button>
      </main>

      <section className="result-grid" style={{ marginTop: '2rem' }}>
        {results.map((res, index) => {
          const isSeed = res.iteration === 0;
          return (
            <div 
              key={index} 
              className={`result-card ${isSeed ? 'seed-card' : ''}`} 
              style={{ 
                animationDelay: `${index * 0.05}s`,
                background: isSeed ? 'rgba(59, 130, 246, 0.15)' : undefined,
                border: isSeed ? '1px solid rgba(59, 130, 246, 0.4)' : undefined
              }}
            >
              <div className="step-header">
                <span>{isSeed ? 'Nilai Awal (Seed)' : `Iterasi ${res.iteration}`}</span>
                <span className="badge" style={{ backgroundColor: isSeed ? '#2563eb' : undefined }}>
                  X₀ = {res.nextX}
                </span>
              </div>
              <div className="calc-container">
                <div className="calc-line main-line" style={{ color: isSeed ? '#60a5fa' : undefined, fontWeight: isSeed ? 800 : undefined }}>
                  {res.calculation}
                </div>
                <div className="calc-line sub-line" style={{ color: isSeed ? '#94a3b8' : undefined }}>{res.step2}</div>
                <div className="calc-line sub-line" style={{ color: isSeed ? '#94a3b8' : undefined }}>{res.step3}</div>
                <div className="calc-line sub-line" style={{ color: isSeed ? '#60a5fa' : undefined, fontWeight: isSeed ? 700 : undefined }}>{res.step4}</div>
              </div>
            </div>
          )
        })}
      </section>
    </AlgorithmLayout>
  )
}
