import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { generateFibonacci, type FibonacciResult } from '../utils/fibonacci'

interface Props { onBack: () => void }

export default function FibonacciPage({ onBack }: Props) {
  const [n, setN] = useState(12)
  const [result, setResult] = useState<FibonacciResult | null>(null)

  const handleHitung = () => {
    const clamped = Math.min(Math.max(n, 1), 50)
    setResult(generateFibonacci(clamped))
  }

  return (
    <AlgorithmLayout
      title="Barisan Fibonacci"
      subtitle="F(n) = F(n−1) + F(n−2), dengan F(0) = 0 dan F(1) = 1"
      color="#22d3ee, #0891b2"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="input-grid cols-2" style={{ maxWidth: '300px' }}>
          <div className="input-group">
            <label>Jumlah suku (n ≤ 50)</label>
            <input type="number" value={n} min={1} max={50} onChange={e => setN(parseInt(e.target.value) || 1)} />
          </div>
        </div>
        <button className="button-primary btn-cyan" onClick={handleHitung}>Generate Fibonacci</button>
      </main>

      {result && (
        <>
          {/* Visual sequence bar */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#22d3ee' }}>
              Barisan F(0) hingga F({result.n - 1})
            </div>
            <div className="fib-sequence">
              {result.sequence.map((val, i) => (
                <div key={i} className="fib-chip">
                  <span className="fib-index">F({i})</span>
                  <span className="fib-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step */}
          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#22d3ee' }}>Langkah-langkah</div>
              <div className="calc-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {result.steps.map((step, i) => (
                  <div key={i} className={`calc-line ${i < 2 ? 'main-line-cyan' : i === result.steps.length - 1 ? 'result-line' : 'sub-line'}`}>
                    {step.equation}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AlgorithmLayout>
  )
}
