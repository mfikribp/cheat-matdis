import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { solveKongruensi, solveSystemKongruensi, type KongruensiResult, type SystemKongruensiResult } from '../utils/kongruensi'

interface Props { onBack: () => void }

export default function KongruensiPage({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'single' | 'system'>('single')

  // State for single congruence
  const [a, setA] = useState(3)
  const [b, setB] = useState(6)
  const [m, setM] = useState(9)
  const [result, setResult] = useState<KongruensiResult | null>(null)

  // State for system of congruences
  const [systemEqs, setSystemEqs] = useState<{ a: number; m: number }[]>([
    { a: 2, m: 3 },
    { a: 3, m: 5 }
  ])
  const [systemResult, setSystemResult] = useState<SystemKongruensiResult | null>(null)

  const handleHitungSingle = () => {
    setResult(solveKongruensi(a, b, m))
  }

  const handleAddEq = () => {
    setSystemEqs(prev => [...prev, { a: 0, m: 2 }])
  }

  const handleRemoveEq = (idx: number) => {
    if (systemEqs.length > 2) {
      setSystemEqs(prev => prev.filter((_, i) => i !== idx))
    }
  }

  const handleSystemChange = (idx: number, field: 'a' | 'm', val: number) => {
    setSystemEqs(prev => prev.map((eq, i) => i === idx ? { ...eq, [field]: val } : eq))
  }

  const handleSolveSystem = () => {
    setSystemResult(solveSystemKongruensi(systemEqs))
  }

  return (
    <AlgorithmLayout
      title="Kongruensi Linier & CRT"
      subtitle="Selesaikan persamaan tunggal ax ≡ b (mod m) atau Sistem Kongruensi Linier"
      color="#e879f9, #a21caf"
      onBack={onBack}
      pdfUrl="https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/16-Teori-Bilangan-Bagian2-2024.pdf#page=12"
      pdfLabel="PDF Slide 12"
    >
      {/* Sliding Tabs Switcher */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        background: 'rgba(30, 41, 59, 0.45)',
        padding: '0.4rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <button
          onClick={() => setActiveTab('single')}
          style={{
            flex: 1,
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'single' ? '#a21caf' : 'transparent',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Persamaan Tunggal
        </button>
        <button
          onClick={() => setActiveTab('system')}
          style={{
            flex: 1,
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'system' ? '#a21caf' : 'transparent',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Sistem Persamaan (CRT)
        </button>
      </div>

      {activeTab === 'single' ? (
        <>
          <main className="glass-card">
            <p className="card-formula">ax ≡ b (mod m)</p>
            <div className="input-grid cols-3">
              <div className="input-group">
                <label>Koefisien (a)</label>
                <input type="number" value={a} onChange={e => setA(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Konstanta (b)</label>
                <input type="number" value={b} onChange={e => setB(parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Modulus (m)</label>
                <input type="number" value={m} min={1} onChange={e => setM(parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <button className="button-primary btn-fuchsia" onClick={handleHitungSingle}>Selesaikan</button>
          </main>

          {result && (
            <>
              {result.hasSolution ? (
                <div className="summary-cards">
                  <div className="summary-card" style={{ borderColor: '#e879f9' }}>
                    <span className="summary-label">Jumlah Solusi</span>
                    <span className="summary-value" style={{ color: '#e879f9' }}>{result.numSolutions}</span>
                  </div>
                  {result.solutions.map((sol, i) => (
                    <div key={i} className="summary-card" style={{ borderColor: '#e879f9' }}>
                      <span className="summary-label">x₀ + {i > 0 ? `${i}·(${result.m / result.numSolutions})` : '0'}</span>
                      <span className="summary-value" style={{ color: '#e879f9' }}>x = {sol}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-solution-banner">
                  ❌ Tidak ada solusi — GCD({Math.abs(result.a)}, {result.m}) = {result.gcd} tidak membagi {result.b}
                </div>
              )}

              <div className="single-result-panel">
                <div className="result-panel">
                  <div className="result-panel-header" style={{ color: '#e879f9' }}>
                    {result.a}x ≡ {result.b} (mod {result.m})
                    <span className="badge badge-fuchsia">
                      {result.hasSolution ? `${result.numSolutions} solusi` : 'Tidak ada'}
                    </span>
                  </div>
                  <div className="calc-container">
                    {result.steps.map((s, i) => (
                      <div key={i} className={`calc-line ${
                        i === 0 ? 'main-line-fuchsia' :
                        i === result.steps.length - 1 ? 'result-line' : 'sub-line'
                      }`}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <main className="glass-card">
            <p className="card-formula">x ≡ a_i (mod m_i)</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {systemEqs.map((eq, idx) => (
                <div key={idx} className="crt-row">
                  <span style={{ color: '#cbd5e1', fontWeight: 800, minWidth: '70px', fontSize: '0.875rem' }}>
                    Pers. ({idx + 1}):
                  </span>
                  
                  <div className="input-group" style={{ flex: 1, margin: 0 }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sisa Suku (a)</label>
                    <input
                      type="number"
                      value={eq.a}
                      onChange={e => handleSystemChange(idx, 'a', parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '0.5rem' }}
                    />
                  </div>
                  
                  <div className="input-group" style={{ flex: 1, margin: 0 }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Modulus (m)</label>
                    <input
                      type="number"
                      value={eq.m}
                      min={1}
                      onChange={e => handleSystemChange(idx, 'm', parseInt(e.target.value) || 1)}
                      style={{ width: '100%', padding: '0.5rem' }}
                    />
                  </div>

                  {systemEqs.length > 2 && (
                    <button
                      onClick={() => handleRemoveEq(idx)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        background: '#ef4444',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: '0.2s'
                      }}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className="button-primary btn-fuchsia"
                onClick={handleSolveSystem}
                style={{ flex: 2 }}
              >
                Selesaikan Sistem
              </button>
              <button
                className="button-primary"
                onClick={handleAddEq}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontWeight: 700
                }}
              >
                Tambah Persamaan
              </button>
            </div>
          </main>

          {systemResult && (
            <>
              {systemResult.hasSolution ? (
                <div className="summary-cards">
                  <div className="summary-card" style={{ borderColor: '#e879f9' }}>
                    <span className="summary-label">Solusi Unik Positif</span>
                    <span className="summary-value" style={{ color: '#e879f9' }}>x = {systemResult.solution}</span>
                  </div>
                  <div className="summary-card" style={{ borderColor: '#e879f9' }}>
                    <span className="summary-label">Modulus LCM Bersama</span>
                    <span className="summary-value" style={{ color: '#e879f9' }}>mod {systemResult.modulus}</span>
                  </div>
                  <div className="summary-card" style={{ borderColor: '#e879f9', gridColumn: 'span 2' }}>
                    <span className="summary-label">Solusi Umum (CRT)</span>
                    <span className="summary-value" style={{ color: '#e879f9', fontSize: '1.25rem' }}>
                      x ≡ {systemResult.solution} (mod {systemResult.modulus})
                    </span>
                  </div>
                </div>
              ) : (
                <div className="no-solution-banner" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                  ❌ Tidak ada solusi — Moduli tidak memenuhi syarat kekongruenan bersama.
                </div>
              )}

              <div className="single-result-panel">
                <div className="result-panel" style={{
                  background: 'rgba(30, 41, 59, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '1.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}>
                  <div className="result-panel-header" style={{ color: '#e879f9' }}>
                    Langkah-Langkah Substitusi Beruntun (Substitution Method)
                    <span className="badge badge-fuchsia">
                      {systemResult.hasSolution ? 'Solusi Ditemukan' : 'Tidak ada'}
                    </span>
                  </div>
                  
                  <div className="calc-container" style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    lineHeight: '1.8'
                  }}>
                    {systemResult.steps.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          color: s.startsWith('---') || s.startsWith('===') || s.includes('Solusi') ? '#e879f9' : '#cbd5e1',
                          fontWeight: s.startsWith('===') || s.includes('Solusi') || s.includes('Solusi Umum') ? 800 : undefined,
                          paddingTop: s.startsWith('---') || s.startsWith('===') ? '0.75rem' : undefined,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {s}
                      </div>
                    ))}
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
