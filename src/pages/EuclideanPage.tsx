import { useState, useEffect } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { solveEuclidean, type EuclideanResult } from '../utils/euclidean'

interface Props {
  onBack: () => void
}

export default function EuclideanPage({ onBack }: Props) {
  const [mInput, setMInput] = useState<number>(252)
  const [nInput, setNInput] = useState<number>(198)
  const [result, setResult] = useState<EuclideanResult | null>(null)

  useEffect(() => {
    handleCalculate()
  }, [])

  const handleCalculate = () => {
    setResult(solveEuclidean(mInput, nInput))
  }

  return (
    <AlgorithmLayout
      title="Algoritma Euclidean (PBB)"
      subtitle="Mencari Pembagi Bersama Terbesar (PBB/GCD) dengan modulasi berulang."
      color="#34d399, #059669"
      onBack={onBack}
    >
      <div className="algo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Input Panel */}
        <main className="glass-card">
          <p className="card-formula" style={{ color: '#34d399', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            PBB({mInput}, {nInput})
          </p>
          <div className="input-grid cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nilai m (Bilangan pertama)</label>
              <input 
                type="number" 
                value={mInput} 
                min={0}
                onChange={e => setMInput(Math.max(0, parseInt(e.target.value) || 0))} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #334155', color: '#f8fafc', fontSize: '1rem' }}
              />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nilai n (Bilangan kedua)</label>
              <input 
                type="number" 
                value={nInput} 
                min={0}
                onChange={e => setNInput(Math.max(0, parseInt(e.target.value) || 0))} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #334155', color: '#f8fafc', fontSize: '1rem' }}
              />
            </div>
          </div>
          <button 
            className="button-primary" 
            onClick={handleCalculate}
            style={{ 
              background: 'linear-gradient(135deg, #34d399, #059669)', 
              color: '#0f172a', 
              fontWeight: '600', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.5rem', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '1rem',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            Hitung PBB
          </button>
        </main>

        {result && (
          <div className="results-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Quick swap notification */}
            {result.wasSwapped && (
              <div className="swap-banner" style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '1rem', borderRadius: '0.75rem', color: '#34d399', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>ℹ️</span>
                <span>
                  <strong>Nilai Ditukar:</strong> Karena syarat awal algoritma adalah <code>m ≥ n</code>, nilai <code>m</code> dan <code>n</code> otomatis ditukar agar memenuhi ketentuan.
                </span>
              </div>
            )}

            {/* Main Result Card */}
            <div className="final-result-card glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderLeft: '4px solid #34d399' }}>
              <div>
                <span className="summary-label" style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hasil Akhir</span>
                <h2 style={{ fontSize: '2rem', color: '#f8fafc', margin: '0.25rem 0' }}>
                  PBB({Math.max(result.originalM, result.originalN)}, {Math.min(result.originalM, result.originalN)}) = <span style={{ color: '#34d399', fontWeight: 'bold' }}>{result.pbb}</span>
                </h2>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(5, 150, 105, 0.2))', padding: '1rem 2rem', borderRadius: '0.75rem', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>STATUS</span>
                <span style={{ fontSize: '1.25rem', color: '#34d399', fontWeight: 600, display: 'block', textAlign: 'center' }}>SELESAI ✓</span>
              </div>
            </div>

            {/* Trace Table & Pseudocode Side-by-Side */}
            <div className="layout-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Trace Table */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📊 Tabel Penelusuran Variabel (Trace)
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Iterasi</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>m</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>n</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>r (m mod n)</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Next State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.steps.length > 0 ? (
                        result.steps.map((step, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #1e293b', transition: 'background-color 0.2s' }} className="table-row-hover">
                            <td style={{ padding: '0.75rem 0.5rem', color: '#34d399', fontWeight: 600 }}>{step.index}</td>
                            <td style={{ padding: '0.75rem 0.5rem', color: '#f8fafc' }}>{step.m}</td>
                            <td style={{ padding: '0.75rem 0.5rem', color: '#f8fafc' }}>{step.n}</td>
                            <td style={{ padding: '0.75rem 0.5rem', color: '#34d399' }}>{step.r}</td>
                            <td style={{ padding: '0.75rem 0.5rem', color: '#64748b' }}>
                              m → {step.nextM}, n → {step.nextN}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ padding: '1rem 0.5rem', textAlign: 'center', color: '#94a3b8' }}>
                            Nilai n langsung bernilai 0. PBB langsung m = {result.pbb}.
                          </td>
                        </tr>
                      )}
                      <tr style={{ background: 'rgba(52, 211, 153, 0.05)', fontWeight: 600 }}>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>Selesai</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#34d399' }}>{result.pbb}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#ef4444' }}>0</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#64748b' }}>-</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#34d399' }}>PBB = {result.pbb}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pseudocode Visualizer */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📜 Pencocokan Pseudocode
                </h3>
                <pre style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  border: '1px solid #334155', 
                  borderRadius: '0.5rem', 
                  padding: '1rem', 
                  fontSize: '0.85rem', 
                  color: '#94a3b8', 
                  lineHeight: '1.5',
                  fontFamily: 'Consolas, Monaco, monospace',
                  overflowX: 'auto'
                }}>
                  <div style={{ color: '#64748b' }}>{`procedure Euclidean(input m, n : integer,`}</div>
                  <div style={{ color: '#64748b' }}>{`                    output PBB : integer)`}</div>
                  <div style={{ color: '#64748b' }}>{`Kamus`}</div>
                  <div style={{ color: '#64748b' }}>{`  r : integer`}</div>
                  <div style={{ color: '#64748b' }}>{`Algoritma:`}</div>
                  <div style={{ color: result.steps.length > 0 ? '#34d399' : '#94a3b8', fontWeight: result.steps.length > 0 ? 'bold' : 'normal' }}>
                    {`  while n ≠ 0 do`}
                  </div>
                  <div style={{ color: result.steps.length > 0 ? '#34d399' : '#94a3b8' }}>
                    {`    r ← m mod n`}
                  </div>
                  <div style={{ color: result.steps.length > 0 ? '#34d399' : '#94a3b8' }}>
                    {`    m ← n`}
                  </div>
                  <div style={{ color: result.steps.length > 0 ? '#34d399' : '#94a3b8' }}>
                    {`    n ← r`}
                  </div>
                  <div style={{ color: result.steps.length > 0 ? '#34d399' : '#94a3b8', fontWeight: result.steps.length > 0 ? 'bold' : 'normal' }}>
                    {`  endwhile`}
                  </div>
                  <div style={{ color: '#64748b' }}>{`  { n = 0, maka PBB(m,n) = m }`}</div>
                  <div style={{ color: '#34d399', fontWeight: 'bold' }}>{`  PBB ← m`}</div>
                </pre>
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  💡 <strong>Keterangan Eksekusi:</strong>
                  {result.steps.length > 0 ? (
                    <p style={{ marginTop: '0.25rem' }}>
                      Loop <code>while</code> berputar sebanyak <strong>{result.steps.length} kali</strong> karena <code>n</code> tidak sama dengan 0 pada awalnya. Setelah iterasi terakhir, <code>n</code> menjadi 0 sehingga keluar loop dan mengembalikan nilai <code>PBB = {result.pbb}</code>.
                    </p>
                  ) : (
                    <p style={{ marginTop: '0.25rem' }}>
                      Loop <code>while</code> tidak dieksekusi sama sekali karena nilai <code>n</code> langsung bernilai 0. Nilai PBB langsung didefinisikan sebagai <code>m = {result.pbb}</code>.
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Mathematical Calculations Step by Step */}
            <div className="glass-card">
              <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1.25rem' }}>
                ✏️ Perhitungan Matematis Terperinci
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.steps.map((step, idx) => (
                  <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid #1e293b', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Iterasi ke-{step.index}</div>
                    <div style={{ fontSize: '1.1rem', fontFamily: 'Consolas, Courier, monospace', color: '#f8fafc' }}>
                      {step.m} = {Math.floor(step.m / step.n)} × {step.n} + <span style={{ color: '#34d399', fontWeight: 'bold' }}>{step.r}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                      Sisa pembagian <code>{step.m} mod {step.n}</code> adalah <code>{step.r}</code>. Nilai variabel digeser: <code>m</code> menjadi {step.nextM}, <code>n</code> menjadi {step.nextN}.
                    </div>
                  </div>
                ))}
                
                {/* Final step definition */}
                <div style={{ background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '1rem', borderRadius: '0.75rem' }}>
                  <div style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Langkah Akhir</div>
                  <div style={{ fontSize: '1.1rem', fontFamily: 'Consolas, Courier, monospace', color: '#f8fafc' }}>
                    Sisa pembagian bernilai <span style={{ color: '#ef4444' }}>0</span>.
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Berdasarkan Teori Sisa Euclidean, pembagi tidak nol terakhir adalah sisa pembagian sebelum sisa 0 didapatkan. Oleh karena itu, <strong>PBB = {result.pbb}</strong>.
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </AlgorithmLayout>
  )
}
