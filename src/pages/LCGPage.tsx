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
        {results.map((res, index) => (
          <div key={index} className="result-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="step-header">
              <span>Iterasi {index + 1}</span>
              <span className="badge">X{index + 1} = {res.nextX}</span>
            </div>
            <div className="calc-container">
              <div className="calc-line main-line">{res.calculation}</div>
              <div className="calc-line sub-line">{res.step2}</div>
              <div className="calc-line sub-line">{res.step3}</div>
              <div className="calc-line sub-line">{res.step4}</div>
            </div>
          </div>
        ))}
      </section>
    </AlgorithmLayout>
  )
}
