import { useState, useEffect } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { analyzeCoprimes, type CoprimeAnalysisResult } from '../utils/relatifPrima'

interface Props {
  onBack: () => void
}

export default function RelatifPrimaPage({ onBack }: Props) {
  const [inputText, setInputText] = useState<string>('25, 41, 49, 64')
  const [result, setResult] = useState<CoprimeAnalysisResult | null>(null)
  const [activePairIdx, setActivePairIdx] = useState<number | null>(null)

  useEffect(() => {
    handleCalculate()
  }, [])

  const handleCalculate = () => {
    const nums = inputText
      .split(/[\s,]+/)
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val) && val > 0)
    
    if (nums.length < 2) {
      alert('Masukkan minimal 2 bilangan bulat positif!')
      return
    }

    setResult(analyzeCoprimes(nums))
    setActivePairIdx(null)
  }

  const loadPreset = (preset: string) => {
    setInputText(preset)
    const nums = preset
      .split(/[\s,]+/)
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val) && val > 0)
    setResult(analyzeCoprimes(nums))
    setActivePairIdx(null)
  }

  return (
    <AlgorithmLayout
      title="Relatif Prima (Coprime)"
      subtitle="Cek pasangan bilangan bulat yang saling relatif prima satu sama lain beserta langkah Euclidean-nya."
      color="#a855f7, #ec4899"
      onBack={onBack}
      pdfUrl="/15-Teori-Bilangan-Bagian1-2024.pdf"
      pdfLabel="Unduh PDF Materi (Lokal)"
    >
      <div className="algo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Input Panel */}
        <main className="glass-card" style={{ borderLeft: '4px solid #a855f7' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
            </svg>
            Input Bilangan Bulat
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Masukkan deretan bilangan bulat positif dipisahkan dengan koma atau spasi.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Daftar Bilangan (a, b, c, ...):
            </label>
            <input 
              type="text" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Contoh: 25, 41, 49, 64"
              style={{ 
                width: '100%', 
                padding: '0.85rem 1rem', 
                borderRadius: '0.75rem', 
                background: 'rgba(15, 23, 42, 0.6)', 
                border: '1px solid #475569', 
                color: '#f8fafc', 
                fontSize: '1.1rem',
                fontFamily: 'monospace',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#a855f7'}
              onBlur={e => e.target.style.borderColor = '#475569'}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>Presets Soal:</span>
            <button 
              className="tag-btn"
              onClick={() => loadPreset('25, 41, 49, 64')}
              style={{
                background: inputText === '25, 41, 49, 64' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                border: `1px solid ${inputText === '25, 41, 49, 64' ? '#a855f7' : '#334155'}`,
                color: inputText === '25, 41, 49, 64' ? '#c084fc' : '#94a3b8',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Soal Ujian: 25, 41, 49, 64
            </button>
            <button 
              className="tag-btn"
              onClick={() => loadPreset('20, 3, 5, 8')}
              style={{
                background: inputText === '20, 3, 5, 8' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                border: `1px solid ${inputText === '20, 3, 5, 8' ? '#a855f7' : '#334155'}`,
                color: inputText === '20, 3, 5, 8' ? '#c084fc' : '#94a3b8',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Contoh 2: 20, 3, 5, 8
            </button>
          </div>

          <button 
            onClick={handleCalculate}
            style={{ 
              background: 'linear-gradient(135deg, #a855f7, #ec4899)', 
              color: '#ffffff', 
              fontWeight: '600', 
              padding: '0.85rem 1.75rem', 
              borderRadius: '0.75rem', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(168, 85, 247, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(168, 85, 247, 0.3)'
            }}
          >
            Analisis Relatif Prima
          </button>
        </main>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Summary Banner */}
            <div 
              className="glass-card" 
              style={{ 
                borderLeft: `4px solid ${result.allPairsAreCoprime ? '#10b981' : '#f43f5e'}`,
                background: result.allPairsAreCoprime ? 'rgba(16, 185, 129, 0.06)' : 'rgba(244, 63, 94, 0.06)',
                padding: '1.5rem'
              }}
            >
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kesimpulan Analisis</span>
              <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', margin: '0.5rem 0 0.75rem 0', lineHeight: 1.3 }}>
                Himpunan Angka: {' '}
                <span style={{ color: '#c084fc', fontFamily: 'monospace' }}>
                  {`{${result.numbers.join(', ')}}`}
                </span>
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
                {result.allPairsAreCoprime ? (
                  <span>
                    <strong style={{ color: '#10b981' }}>✓ Saling Relatif Prima (Pairwise Coprime):</strong> Seluruh pasangan bilangan bulat dari himpunan di atas memiliki PBB = 1. Ini menjawab soal Anda secara utuh bahwa <strong>semua kombinasi pasangan saling relatif prima satu sama lain.</strong>
                  </span>
                ) : (
                  <span>
                    <strong style={{ color: '#f43f5e' }}>✗ Tidak Semua Saling Relatif Prima:</strong> Ada beberapa pasangan angka dalam himpunan ini yang memiliki PBB &gt; 1, sehingga tidak semua elemen saling relatif prima satu sama lain.
                  </span>
                )}
              </p>
            </div>

            {/* Matrix & Quick View Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Adjacency Matrix */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                  </svg>
                  Matriks Relasi PBB &amp; Coprime
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Sel hijau menandakan pasangan yang saling relatif prima (PBB = 1).
                </p>
                <div style={{ overflowX: 'auto', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(15, 23, 42, 0.7)', borderBottom: '2px solid #334155', color: '#94a3b8' }}>
                        <th style={{ padding: '0.85rem 0.5rem', fontWeight: 600, borderRight: '1px solid #334155' }}>PBB</th>
                        {result.numbers.map(num => (
                          <th key={num} style={{ padding: '0.85rem 0.5rem', fontWeight: 600, fontFamily: 'monospace', color: '#f8fafc' }}>{num}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.numbers.map(row => (
                        <tr key={row} style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, fontFamily: 'monospace', color: '#f8fafc', background: 'rgba(15, 23, 42, 0.7)', borderRight: '2px solid #334155' }}>
                            {row}
                          </td>
                          {result.numbers.map(col => {
                            const isSelf = row === col
                            const cell = result.matrix[row][col]
                            
                            let bg = 'rgba(30, 41, 59, 0.2)'
                            let color = '#f8fafc'
                            let border = '1px solid rgba(255,255,255,0.03)'

                            if (!isSelf) {
                              if (cell.isCoprime) {
                                bg = 'rgba(16, 185, 129, 0.15)'
                                color = '#34d399'
                                border = '1px solid rgba(16, 185, 129, 0.3)'
                              } else {
                                bg = 'rgba(244, 63, 94, 0.12)'
                                color = '#fb7185'
                                border = '1px solid rgba(244, 63, 94, 0.25)'
                              }
                            }

                            return (
                              <td 
                                key={col} 
                                style={{ 
                                  padding: '0.85rem 0.5rem', 
                                  background: isSelf ? 'rgba(15, 23, 42, 0.4)' : bg,
                                  color: isSelf ? '#475569' : color,
                                  border: border,
                                  fontFamily: 'monospace',
                                  fontSize: '0.95rem',
                                  fontWeight: isSelf ? 'normal' : 'bold'
                                }}
                              >
                                {isSelf ? '-' : cell.gcd}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* List of Pairs */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Daftar Pasangan &amp; Bukti PBB
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Klik salah satu pasangan di bawah untuk melihat jalannya penelusuran algoritma Euclidean secara instan.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '300px', paddingRight: '0.5rem' }}>
                  {result.pairs.map((pair, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePairIdx(activePairIdx === idx ? null : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.85rem 1rem',
                        background: activePairIdx === idx ? 'rgba(168, 85, 247, 0.12)' : 'rgba(30, 41, 59, 0.4)',
                        border: `1px solid ${activePairIdx === idx ? '#a855f7' : '#334155'}`,
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '1rem', color: '#f8fafc', fontFamily: 'monospace', fontWeight: 600 }}>
                          Pasangan ({pair.a}, {pair.b})
                        </span>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                          PBB = {pair.gcd}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '0.25rem',
                            background: pair.isCoprime ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                            color: pair.isCoprime ? '#34d399' : '#fb7185',
                            border: `1px solid ${pair.isCoprime ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                          }}
                        >
                          {pair.isCoprime ? 'Relatif Prima' : 'Tidak Relatif Prima'}
                        </span>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#64748b" 
                          strokeWidth="2.5"
                          style={{ 
                            transform: activePairIdx === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                          }}
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Euclidean Trace Steps Panel (Dynamic) */}
            {activePairIdx !== null && (
              <div 
                className="glass-card" 
                style={{ 
                  animation: 'fadeInUp 0.3s ease-out', 
                  borderLeft: '4px solid #d946ef',
                  background: 'rgba(217, 70, 239, 0.03)'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2.5">
                    <polyline points="4 17 10 11 15 16 22 9" />
                    <polyline points="18 9 22 9 22 13" />
                  </svg>
                  Langkah Euclidean: PBB({result.pairs[activePairIdx].a}, {result.pairs[activePairIdx].b})
                </h3>

                {/* Visual Divisors/Factors Display */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Faktor Pembagi {result.pairs[activePairIdx].a}</span>
                    <div style={{ fontFamily: 'monospace', color: '#f8fafc', fontSize: '1rem', marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {result.pairs[activePairIdx].factorsA.map(f => (
                        <span key={f} style={{
                          padding: '0.15rem 0.45rem',
                          borderRadius: '0.25rem',
                          background: result.pairs[activePairIdx].commonFactors.includes(f) ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.05)',
                          color: result.pairs[activePairIdx].commonFactors.includes(f) ? '#d946ef' : '#cbd5e1',
                          border: `1px solid ${result.pairs[activePairIdx].commonFactors.includes(f) ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.05)'}`,
                          fontWeight: result.pairs[activePairIdx].commonFactors.includes(f) ? 'bold' : 'normal'
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Faktor Pembagi {result.pairs[activePairIdx].b}</span>
                    <div style={{ fontFamily: 'monospace', color: '#f8fafc', fontSize: '1rem', marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {result.pairs[activePairIdx].factorsB.map(f => (
                        <span key={f} style={{
                          padding: '0.15rem 0.45rem',
                          borderRadius: '0.25rem',
                          background: result.pairs[activePairIdx].commonFactors.includes(f) ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.05)',
                          color: result.pairs[activePairIdx].commonFactors.includes(f) ? '#d946ef' : '#cbd5e1',
                          border: `1px solid ${result.pairs[activePairIdx].commonFactors.includes(f) ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.05)'}`,
                          fontWeight: result.pairs[activePairIdx].commonFactors.includes(f) ? 'bold' : 'normal'
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Common Divisors Summary */}
                <div style={{ background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168, 85, 247, 0.25)', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Faktor persekutuan (pembagi bersama) dari {result.pairs[activePairIdx].a} dan {result.pairs[activePairIdx].b} adalah:{' '}
                  <strong style={{ color: '#d946ef', fontFamily: 'monospace', fontSize: '1rem' }}>
                    {`{ ${result.pairs[activePairIdx].commonFactors.join(', ')} }`}
                  </strong>
                  {result.pairs[activePairIdx].isCoprime ? (
                    <span>. Karena faktor pembagi terbesarnya (PBB) adalah <strong>1</strong>, maka terbukti keduanya <strong>relatif prima</strong>.</span>
                  ) : (
                    <span>. Karena faktor pembagi terbesarnya (PBB) adalah <strong>{result.pairs[activePairIdx].gcd} &gt; 1</strong>, maka keduanya <strong>tidak relatif prima</strong>.</span>
                  )}
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Berikut adalah pembuktian pembagian berulang sisa modular (Algoritma Euclidean) untuk mencari PBB tersebut:
                </p>

                <div 
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.8)', 
                    border: '1px solid #334155', 
                    borderRadius: '0.75rem', 
                    padding: '1.25rem',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: '#f8fafc',
                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)',
                    lineHeight: '1.7'
                  }}
                >
                  {result.pairs[activePairIdx].steps.map((step, sIdx) => (
                    <div key={sIdx} style={{ padding: '0.25rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ color: '#64748b' }}>[{sIdx + 1}]</span>
                      <span style={{ color: '#e2e8f0' }}>{step.calculation}</span>
                      {step.r === 0 && (
                        <span style={{ color: '#d946ef', marginLeft: 'auto' }}>
                          ← Sisa pembagian = 0, maka PBB adalah pembagi terakhir.
                        </span>
                      )}
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #334155', marginTop: '1rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#d946ef' }}>
                      Maka, PBB({result.pairs[activePairIdx].a}, {result.pairs[activePairIdx].b}) = {result.pairs[activePairIdx].gcd}
                    </span>
                    <span 
                      style={{ 
                        color: result.pairs[activePairIdx].isCoprime ? '#34d399' : '#fb7185',
                        fontWeight: 'bold',
                        background: result.pairs[activePairIdx].isCoprime ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.4rem',
                        border: `1px solid ${result.pairs[activePairIdx].isCoprime ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                      }}
                    >
                      {result.pairs[activePairIdx].isCoprime 
                        ? 'PBB = 1 → RELATIF PRIMA ✓' 
                        : `PBB = ${result.pairs[activePairIdx].gcd} ≠ 1 → TIDAK RELATIF PRIMA ✗`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Educational Section based on Rinaldi Munir Syllabus */}
            <div className="glass-card" style={{ borderLeft: '4px solid #ec4899' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Teori Pendukung: Bilangan Relatif Prima
              </h2>
              <div style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p>
                  Berdasarkan slide <strong>Materi Kuliah Matematika Diskrit ITB - Teori Bilangan Bagian 1 (Slide 12)</strong>:
                </p>
                
                <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '3px solid #64748b' }}>
                  <strong style={{ color: '#f8fafc', display: 'block', marginBottom: '0.25rem' }}>Definisi:</strong>
                  Dua buah bilangan bulat <em>a</em> dan <em>b</em> dikatakan relatif prima jika pembagi bersama terbesar (PBB / Greatest Common Divisor / FPB) keduanya adalah 1. 
                  Secara matematis: <strong>PBB(a, b) = 1</strong>.
                </div>

                <p>
                  Jika <em>a</em> dan <em>b</em> relatif prima, maka terdapat bilangan bulat <em>m</em> dan <em>n</em> sedemikian sehingga:
                  <code style={{ display: 'block', padding: '0.5rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.25rem', color: '#c084fc', textAlign: 'center', margin: '0.5rem 0', fontFamily: 'monospace', fontSize: '1rem' }}>
                    m · a + n · b = 1
                  </code>
                  Ini disebut juga sebagai **Identitas Bézout** untuk bilangan relatif prima.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <strong style={{ color: '#34d399', display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>CONTOH 1 (Relatif Prima):</strong>
                    20 dan 3 relatif prima karena <strong>PBB(20, 3) = 1</strong>. Kombinasi liniernya: <code>(-1)·20 + 7·3 = 1</code>.
                  </div>
                  <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.15)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <strong style={{ color: '#fb7185', display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>CONTOH 2 (TIDAK Relatif Prima):</strong>
                    20 dan 5 tidak relatif prima karena <strong>PBB(20, 5) = 5 ≠ 1</strong>. Keduanya memiliki faktor pembagi bersama selain 1, yaitu 5.
                  </div>
                </div>

                {/* PDF download links */}
                <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #334155', paddingTop: '1.25rem' }}>
                  <a
                    href="/15-Teori-Bilangan-Bagian1-2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      padding: '0.6rem 1.25rem',
                      borderRadius: '0.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Unduh PDF Materi (Lokal)
                  </a>

                  <a
                    href="https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/15-Teori-Bilangan-Bagian1-2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      background: 'rgba(56, 189, 248, 0.08)',
                      color: '#38bdf8',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      padding: '0.6rem 1.25rem',
                      borderRadius: '0.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    PDF Asli STEI ITB
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </AlgorithmLayout>
  )
}
