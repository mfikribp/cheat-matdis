import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import {
  permutasiTanpaPengulangan,
  permutasiDenganPengulangan,
  type PermutasiResult,
} from '../utils/permutasi'

interface Props { onBack: () => void }

export default function PermutasiPage({ onBack }: Props) {
  const [n, setN] = useState(26)
  const [r, setR] = useState(9)
  const [result, setResult] = useState<{ tanpa: PermutasiResult; dengan: PermutasiResult } | null>(null)
  const [error, setError] = useState('')

  const handleHitung = () => {
    setError('')
    if (n < 0 || r < 0) { setError('n dan r harus bilangan non-negatif'); return }
    if (r > n) { setError('r tidak boleh lebih besar dari n untuk permutasi tanpa pengulangan'); return }
    setResult({
      tanpa: permutasiTanpaPengulangan(n, r),
      dengan: permutasiDenganPengulangan(n, r),
    })
  }

  return (
    <AlgorithmLayout
      title="Permutasi"
      subtitle="Menghitung jumlah susunan r objek dari n objek"
      color="#a78bfa, #7c3aed"
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
        <button className="button-primary btn-purple" onClick={handleHitung}>Hitung Permutasi</button>
      </main>

      {result && (
        <div className="two-col-result">
          {/* Tanpa pengulangan */}
          <div className="result-panel">
            <div className="result-panel-header" style={{ color: '#a78bfa' }}>
              Tanpa Pengulangan
              <span className="badge badge-purple">{result.tanpa.result.toLocaleString()}</span>
            </div>
            <div className="calc-container">
              {result.tanpa.steps.map((s, i) => (
                <div key={i} className={`calc-line ${i === 0 ? 'main-line-purple' : i === result.tanpa.steps.length - 1 ? 'result-line' : 'sub-line'}`}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Dengan pengulangan */}
          <div className="result-panel">
            <div className="result-panel-header" style={{ color: '#a78bfa' }}>
              Dengan Pengulangan
              <span className="badge badge-purple">{result.dengan.result.toLocaleString()}</span>
            </div>
            <div className="calc-container">
              {result.dengan.steps.map((s, i) => (
                <div key={i} className={`calc-line ${i === 0 ? 'main-line-purple' : i === result.dengan.steps.length - 1 ? 'result-line' : 'sub-line'}`}>
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
