import { useState, useEffect } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { matrixJoin, matrixMeet, solveComposition, type CompositionStep } from '../utils/relasi'

type OpType = 'union' | 'intersection' | 'r_circ_s' | 's_circ_r'

export default function RelasiPage({ onBack }: { onBack: () => void }) {
  const [size, setSize] = useState<number>(3)
  const [matrixR, setMatrixR] = useState<number[][]>([
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ])
  const [matrixS, setMatrixS] = useState<number[][]>([
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ])
  const [operation, setOperation] = useState<OpType>('union')
  const [resultMatrix, setResultMatrix] = useState<number[][]>([])
  const [compositionSteps, setCompositionSteps] = useState<CompositionStep[]>([])

  // Re-initialize matrices when size changes
  useEffect(() => {
    // If size is 3 and we matches our default, keep it!
    if (size === 3) {
      setMatrixR([
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
      ])
      setMatrixS([
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ])
    } else {
      const newR = Array(size).fill(0).map(() => Array(size).fill(0))
      const newS = Array(size).fill(0).map(() => Array(size).fill(0))
      // Simple seed for other sizes
      for (let i = 0; i < size; i++) {
        newR[i][i] = 1
        newS[i][(i + 1) % size] = 1
      }
      setMatrixR(newR)
      setMatrixS(newS)
    }
  }, [size])

  // Calculate results on input or operation change
  useEffect(() => {
    if (operation === 'union') {
      setResultMatrix(matrixJoin(matrixR, matrixS))
      setCompositionSteps([])
    } else if (operation === 'intersection') {
      setResultMatrix(matrixMeet(matrixR, matrixS))
      setCompositionSteps([])
    } else if (operation === 'r_circ_s') {
      // R o S = S product R (Boolean product of S and R)
      const res = solveComposition(matrixS, matrixR)
      setResultMatrix(res.matrix)
      setCompositionSteps(res.steps)
    } else if (operation === 's_circ_r') {
      // S o R = R product S (Boolean product of R and S)
      const res = solveComposition(matrixR, matrixS)
      setResultMatrix(res.matrix)
      setCompositionSteps(res.steps)
    }
  }, [matrixR, matrixS, operation, size])

  const toggleCell = (matrix: 'R' | 'S', rIdx: number, cIdx: number) => {
    if (matrix === 'R') {
      const copy = matrixR.map((row, r) =>
        row.map((val, c) => (r === rIdx && c === cIdx ? (val === 1 ? 0 : 1) : val))
      )
      setMatrixR(copy)
    } else {
      const copy = matrixS.map((row, r) =>
        row.map((val, c) => (r === rIdx && c === cIdx ? (val === 1 ? 0 : 1) : val))
      )
      setMatrixS(copy)
    }
  }

  return (
    <AlgorithmLayout
      title="Operasi Matriks Relasi"
      subtitle="Gabungan, irisan, dan perkalian Boolean komposisi relasi (R dan S)."
      color="#06b6d4, #0891b2"
      onBack={onBack}
      pdfUrl="https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/05-Relasi-dan-Fungsi-Bagian1-(2024).pdf#page=16"
      pdfLabel="PDF Relasi"
    >
      <div className="algo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Settings & Input Glass Card */}
        <section className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#e2e8f0' }}>Input Matriks Relasi</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Ukuran:</span>
              <div className="tab-switcher" style={{ margin: 0 }}>
                {[2, 3, 4].map(s => (
                  <button
                    key={s}
                    className={`tab-btn ${size === s ? 'active-sky' : ''}`}
                    onClick={() => setSize(s)}
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    {s}x{s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
            Klik pada setiap kotak elemen di bawah ini untuk mengubah nilainya secara langsung antara <strong>0</strong> dan <strong>1</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {/* Matrix R Card */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e879f9' }}></span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Matriks R</h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${size}, 55px)`,
                gap: '8px',
                justifyContent: 'center',
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px'
              }}>
                {matrixR.map((row, r) =>
                  row.map((val, c) => (
                    <button
                      key={`R-${r}-${c}`}
                      onClick={() => toggleCell('R', r, c)}
                      style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '10px',
                        border: val === 1 ? '1px solid rgba(232, 121, 249, 0.4)' : '1px solid rgba(255,255,255,0.07)',
                        background: val === 1 ? 'linear-gradient(135deg, rgba(232, 121, 249, 0.15), rgba(162, 28, 175, 0.25))' : 'rgba(15, 23, 42, 0.4)',
                        color: val === 1 ? '#e879f9' : '#475569',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        boxShadow: val === 1 ? '0 0 12px rgba(232, 121, 249, 0.15)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                        if (val === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        if (val === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      }}
                    >
                      {val}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Matrix S Card */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa' }}></span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Matriks S</h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${size}, 55px)`,
                gap: '8px',
                justifyContent: 'center',
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px'
              }}>
                {matrixS.map((row, r) =>
                  row.map((val, c) => (
                    <button
                      key={`S-${r}-${c}`}
                      onClick={() => toggleCell('S', r, c)}
                      style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '10px',
                        border: val === 1 ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255,255,255,0.07)',
                        background: val === 1 ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.25))' : 'rgba(15, 23, 42, 0.4)',
                        color: val === 1 ? '#60a5fa' : '#475569',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        boxShadow: val === 1 ? '0 0 12px rgba(96, 165, 250, 0.15)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                        if (val === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        if (val === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      }}
                    >
                      {val}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Operation Picker */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="tab-switcher" style={{ padding: '0.45rem', borderRadius: '16px', flexWrap: 'wrap', justifyContent: 'center', width: 'auto', maxWidth: '100%' }}>
            {[
              { id: 'union', label: 'R ∪ S (Gabungan)' },
              { id: 'intersection', label: 'R ∩ S (Irisan)' },
              { id: 'r_circ_s', label: 'R ◦ S (Komposisi)' },
              { id: 's_circ_r', label: 'S ◦ R (Komposisi)' },
            ].map(op => (
              <button
                key={op.id}
                className={`tab-btn ${operation === op.id ? 'active-sky' : ''}`}
                onClick={() => setOperation(op.id as OpType)}
                style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem', borderRadius: '12px' }}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results layout */}
        <div className="two-col-result" style={{ marginTop: 0 }}>
          {/* Result Matrix Panel */}
          <div className="result-panel">
            <div className="result-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-sky" style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>RESULT</span>
                <span>Matriks Hasil</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'monospace' }}>
                {operation === 'union' && 'M_R ∨ M_S'}
                {operation === 'intersection' && 'M_R ∧ M_S'}
                {operation === 'r_circ_s' && 'M_S ⊙ M_R'}
                {operation === 's_circ_r' && 'M_R ⊙ M_S'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem 0' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${size}, 60px)`,
                gap: '10px',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)'
              }}>
                {resultMatrix.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`res-${r}-${c}`}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        border: val === 1 ? '1px solid rgba(34, 211, 238, 0.4)' : '1px solid rgba(255,255,255,0.04)',
                        background: val === 1 ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(2, 132, 199, 0.3))' : 'rgba(15, 23, 42, 0.2)',
                        color: val === 1 ? '#22d3ee' : '#334155',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: val === 1 ? '0 0 15px rgba(34, 211, 238, 0.2)' : 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Trace / Step by step Panel */}
          <div className="result-panel">
            <div className="result-panel-header">
              <span>Langkah Pengerjaan Terperinci</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Formula Card */}
              <div className="calc-container" style={{ lineHeight: '1.6' }}>
                {operation === 'union' && (
                  <>
                    <span className="main-line-cyan">Aturan Gabungan (Join / OR):</span>
                    <span className="calc-line">Elemen hasil diperoleh dengan meng-OR-kan elemen baris dan kolom yang sama.</span>
                    <span className="calc-line" style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>c_ij = r_ij ∨ s_ij</span>
                  </>
                )}
                {operation === 'intersection' && (
                  <>
                    <span className="main-line-cyan">Aturan Irisan (Meet / AND):</span>
                    <span className="calc-line">Elemen hasil diperoleh dengan meng-AND-kan elemen baris dan kolom yang sama.</span>
                    <span className="calc-line" style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>c_ij = r_ij ∧ s_ij</span>
                  </>
                )}
                {operation === 'r_circ_s' && (
                  <>
                    <span className="main-line-cyan">Aturan Komposisi R ◦ S:</span>
                    <span className="calc-line">Didefinisikan sebagai perkalian Boolean matriks S dengan matriks R:</span>
                    <span className="calc-line" style={{ color: '#22d3ee', fontWeight: 700 }}>M_(R ◦ S) = M_S ⊙ M_R</span>
                    <span className="calc-line" style={{ color: '#64748b', fontSize: '0.75rem', fontStyle: 'italic' }}>*Catatan: S dikerjakan terlebih dahulu, sehingga matriks S berada di sebelah kiri perkalian.</span>
                  </>
                )}
                {operation === 's_circ_r' && (
                  <>
                    <span className="main-line-cyan">Aturan Komposisi S ◦ R:</span>
                    <span className="calc-line">Didefinisikan sebagai perkalian Boolean matriks R dengan matriks S:</span>
                    <span className="calc-line" style={{ color: '#22d3ee', fontWeight: 700 }}>M_(S ◦ R) = M_R ⊙ M_S</span>
                    <span className="calc-line" style={{ color: '#64748b', fontSize: '0.75rem', fontStyle: 'italic' }}>*Catatan: R dikerjakan terlebih dahulu, sehingga matriks R berada di sebelah kiri perkalian.</span>
                  </>
                )}
              </div>

              {/* Detailed cell-by-cell trace */}
              <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {operation === 'union' &&
                  resultMatrix.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`step-union-${r}-${c}`} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>Baris {r+1}, Kolom {c+1}:</span>
                          <div style={{ marginTop: '0.25rem' }}>
                            c_{r+1}{c+1} = R[{r+1}][{c+1}] ∨ S[{r+1}][{c+1}]
                          </div>
                          <div style={{ marginTop: '0.15rem', color: '#e2e8f0' }}>
                            c_{r+1}{c+1} = {matrixR[r][c]} ∨ {matrixS[r][c]} = <strong style={{ color: val === 1 ? '#22d3ee' : '#64748b' }}>{val}</strong>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                }

                {operation === 'intersection' &&
                  resultMatrix.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`step-intersect-${r}-${c}`} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>Baris {r+1}, Kolom {c+1}:</span>
                          <div style={{ marginTop: '0.25rem' }}>
                            c_{r+1}{c+1} = R[{r+1}][{c+1}] ∧ S[{r+1}][{c+1}]
                          </div>
                          <div style={{ marginTop: '0.15rem', color: '#e2e8f0' }}>
                            c_{r+1}{c+1} = {matrixR[r][c]} ∧ {matrixS[r][c]} = <strong style={{ color: val === 1 ? '#22d3ee' : '#64748b' }}>{val}</strong>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                }

                {(operation === 'r_circ_s' || operation === 's_circ_r') &&
                  compositionSteps.map((step, idx) => {
                    const matrixLeftName = operation === 'r_circ_s' ? 'S' : 'R'
                    const matrixRightName = operation === 'r_circ_s' ? 'R' : 'S'
                    return (
                      <div key={`step-comp-${idx}`} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>Baris {step.i+1}, Kolom {step.j+1}:</span>
                          <div style={{ marginTop: '0.25rem', color: '#64748b', fontSize: '0.75rem' }}>
                            Perkalian Boolean Baris {step.i+1} Matriks {matrixLeftName} dengan Kolom {step.j+1} Matriks {matrixRightName}:
                          </div>
                          <div style={{ marginTop: '0.25rem', color: '#cbd5e1' }}>
                            c_{step.i+1}{step.j+1} = {step.expression}
                          </div>
                          <div style={{ marginTop: '0.15rem', color: '#22d3ee', fontWeight: 'bold' }}>
                            Hasil = {step.result}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </AlgorithmLayout>
  )
}
