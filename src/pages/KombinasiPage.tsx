import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { hitungKombinasi, type KombinasiResult } from '../utils/kombinasi'

interface Props { onBack: () => void }

export default function KombinasiPage({ onBack }: Props) {
  const [n, setN] = useState(10)
  const [r, setR] = useState(3)
  const [result, setResult] = useState<KombinasiResult | null>(null)
  const [error, setError] = useState('')

  const handleHitung = () => {
    setError('')
    if (n < 0 || r < 0) { setError('n dan r harus bilangan non-negatif'); return }
    if (r > n) { setError('r tidak boleh lebih besar dari n'); return }
    setResult(hitungKombinasi(n, r))
  }

  return (
    <AlgorithmLayout
      title="Kombinasi"
      subtitle="Menghitung pemilihan r objek dari n tanpa memperhatikan urutan"
      color="#f472b6, #db2777"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="input-grid cols-2">
          <div className="input-group">
            <label>Jumlah objek (n)</label>
            <input type="number" value={n} min={0} onChange={e => setN(parseInt(e.target.value) || 0)} />
          </div>
          <div className="input-group">
            <label>Dipilih (r)</label>
            <input type="number" value={r} min={0} onChange={e => setR(parseInt(e.target.value) || 0)} />
          </div>
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="button-primary btn-pink" onClick={handleHitung}>Hitung Kombinasi</button>
      </main>

      {result && (
        <div className="single-result-panel">
          <div className="result-panel">
            <div className="result-panel-header" style={{ color: '#f472b6' }}>
              C({result.n}, {result.r})
              <span className="badge badge-pink">{result.result.toLocaleString()}</span>
            </div>
            <div className="calc-container">
              {result.steps.map((s, i) => (
                <div
                  key={i}
                  className={`calc-line ${
                    i === 0
                      ? 'main-line-pink'
                      : i === result.steps.length - 1
                      ? 'result-line'
                      : 'sub-line'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AlgorithmLayout>
  )
}
