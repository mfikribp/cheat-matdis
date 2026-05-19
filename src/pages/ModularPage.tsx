import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { modularExponentiation, modularInverse, type ModExpResult, type ModInverseResult } from '../utils/modular'

interface Props { onBack: () => void }

export default function ModularPage({ onBack }: Props) {
  const [mode, setMode] = useState<'exp' | 'inv'>('exp')
  const [expBase, setExpBase] = useState(2)
  const [expExp, setExpExp] = useState(10)
  const [expMod, setExpMod] = useState(1000)
  const [expResult, setExpResult] = useState<ModExpResult | null>(null)
  const [invA, setInvA] = useState(3)
  const [invM, setInvM] = useState(7)
  const [invResult, setInvResult] = useState<ModInverseResult | null>(null)

  return (
    <AlgorithmLayout
      title="Modular Arithmetic"
      subtitle="Eksponen modular cepat & invers modular"
      color="#fb923c, #ea580c"
      onBack={onBack}
    >
      <div className="tab-switcher">
        <button className={`tab-btn ${mode === 'exp' ? 'active-orange' : ''}`} onClick={() => setMode('exp')}>
          Eksponen Modular
        </button>
        <button className={`tab-btn ${mode === 'inv' ? 'active-orange' : ''}`} onClick={() => setMode('inv')}>
          Invers Modular
        </button>
      </div>

      {mode === 'exp' && (
        <>
          <main className="glass-card">
            <p className="card-formula">aᵉ mod m</p>
            <div className="input-grid cols-3">
              <div className="input-group">
                <label>Base (a)</label>
                <input type="number" value={expBase} onChange={e => setExpBase(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Exponent (e)</label>
                <input type="number" value={expExp} onChange={e => setExpExp(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Modulus (m)</label>
                <input type="number" value={expMod} onChange={e => setExpMod(parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <button className="button-primary btn-orange" onClick={() => setExpResult(modularExponentiation(expBase, expExp, expMod))}>Hitung</button>
          </main>
          {expResult && (
            <div className="single-result-panel">
              <div className="result-panel">
                <div className="result-panel-header" style={{ color: '#fb923c' }}>
                  {expResult.base}^{expResult.exponent} mod {expResult.modulus}
                  <span className="badge badge-orange">= {expResult.result}</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>Eksponen biner: {expResult.binaryExp}₂</p>
                <div className="calc-container">
                  {expResult.steps.map((s, i) => (
                    <div key={i} className={`calc-line ${i === 0 ? 'main-line-orange' : 'sub-line'}`}>{s.equation}</div>
                  ))}
                  <div className="calc-line result-line" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(251,146,60,0.2)' }}>
                    Hasil: {expResult.base}^{expResult.exponent} mod {expResult.modulus} = {expResult.result}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {mode === 'inv' && (
        <>
          <main className="glass-card">
            <p className="card-formula">a⁻¹ mod m</p>
            <div className="input-grid cols-2">
              <div className="input-group">
                <label>Bilangan (a)</label>
                <input type="number" value={invA} onChange={e => setInvA(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Modulus (m)</label>
                <input type="number" value={invM} onChange={e => setInvM(parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <button className="button-primary btn-orange" onClick={() => setInvResult(modularInverse(invA, invM))}>Hitung Invers</button>
          </main>
          {invResult && (
            <div className="single-result-panel">
              <div className="result-panel">
                <div className="result-panel-header" style={{ color: '#fb923c' }}>
                  {invResult.a}⁻¹ mod {invResult.m}
                  {invResult.inverse !== null
                    ? <span className="badge badge-orange">= {invResult.inverse}</span>
                    : <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>Tidak Ada</span>
                  }
                </div>
                <div className="calc-container">
                  {invResult.steps.map((s, i) => (
                    <div key={i} className={`calc-line ${i === 0 ? 'main-line-orange' : i === invResult.steps.length - 1 ? 'result-line' : 'sub-line'}`}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AlgorithmLayout>
  )
}
