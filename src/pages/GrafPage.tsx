import { useState, useEffect } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { getCircularLayout, getIsomorphicLayout, getEdges, getVertexDegrees, getWelchPowellColoring, type GraphNode } from '../utils/graf'

const NODE_COLOR_PALETTES = [
  { bg: '#ffedd5', border: '#c2410c', text: '#7c2d12', name: 'Terracotta' },
  { bg: '#dcfce7', border: '#166534', text: '#14532d', name: 'Pine Sage' },
  { bg: '#fef9c3', border: '#a16207', text: '#713f12', name: 'Warm Ochre' },
  { bg: '#ffe4e6', border: '#be123c', text: '#881337', name: 'Rust Rose' },
  { bg: '#ccfbf1', border: '#0f766e', text: '#115e59', name: 'Earthy Teal' },
  { bg: '#e0f2fe', border: '#0369a1', text: '#0c4a6e', name: 'Slate Blue' }
]

export default function GrafPage({ onBack }: { onBack: () => void }) {
  const [size, setSize] = useState<number>(5)
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1]
  ])

  // Preset default for the exam question
  const loadExamPreset = () => {
    setSize(5)
    setMatrix([
      [0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 0, 1],
      [1, 1, 0, 1, 1]
    ])
  }

  // Adjust matrix dynamically when size changes
  useEffect(() => {
    // If user returns to size 5, offer to reset to exam preset or seed it
    if (size === 5) {
      if (matrix.length !== 5) {
        loadExamPreset()
      }
    } else {
      const newM = Array(size).fill(0).map(() => Array(size).fill(0))
      // Add standard ring-edges + 1 self-loop to look interesting
      for (let i = 0; i < size; i++) {
        newM[i][(i + 1) % size] = 1
        newM[(i + 1) % size][i] = 1
      }
      if (size > 2) {
        newM[2][2] = 1 // Self loop for variety
      }
      setMatrix(newM)
    }
  }, [size])

  // Handles clicking on cells. Auto-synchronizes symmetric cells for undirected graph
  const handleCellClick = (rIdx: number, cIdx: number) => {
    const copy = matrix.map((row, r) =>
      row.map((val, c) => {
        if ((r === rIdx && c === cIdx) || (r === cIdx && c === rIdx)) {
          return val === 1 ? 0 : 1
        }
        return val
      })
    )
    setMatrix(copy)
  }

  const degrees = getVertexDegrees(matrix)
  const edges = getEdges(matrix)
  const nodeColors = getWelchPowellColoring(matrix)
  const chromaticNumber = Math.max(...nodeColors) + 1

  // Dimensions for SVG canvases
  const width = 300
  const height = 300
  const cx = width / 2
  const cy = height / 2
  const radius = 90

  // Calculate layout models
  const layoutCircular = getCircularLayout(matrix, cx, cy, radius)
  const layoutIsomorphic = getIsomorphicLayout(matrix, cx, cy, radius)

  // Renders a single graph node, loops, and edges
  const renderSVGGraph = (nodes: GraphNode[], title: string) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#706b64' }}>{title}</span>
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(112, 107, 100, 0.12)',
          borderRadius: '24px',
          padding: '1rem',
          boxShadow: '0 4px 16px rgba(112, 107, 100, 0.03)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            {/* Draw Edges */}
            {edges.map(edge => {
              if (edge.isLoop) return null; // Loops handled separately
              const nodeU = nodes[edge.u]
              const nodeV = nodes[edge.v]
              if (!nodeU || !nodeV) return null;
              return (
                <line
                  key={edge.id}
                  x1={nodeU.x}
                  y1={nodeU.y}
                  x2={nodeV.x}
                  y2={nodeV.y}
                  stroke="#706b64"
                  strokeWidth="2"
                  opacity="0.6"
                />
              )
            })}

            {/* Draw Self-Loops */}
            {nodes.map(node => {
              if (!node.hasLoop) return null;
              // Project self-loop radially outwards from graph center
              const angle = Math.atan2(node.y - cy, node.x - cx)
              const loopRadius = 14
              const distance = 16
              const loopX = node.x + Math.cos(angle) * distance
              const loopY = node.y + Math.sin(angle) * distance

              return (
                <g key={`loop-${node.index}`}>
                  <circle
                    cx={loopX}
                    cy={loopY}
                    r={loopRadius}
                    fill="none"
                    stroke="#9f1239"
                    strokeWidth="2"
                    strokeDasharray="2 1"
                  />
                  <path
                    d={`M ${loopX + 3} ${loopY - 3} L ${loopX} ${loopY} L ${loopX + 3} ${loopY + 3}`}
                    fill="none"
                    stroke="#9f1239"
                    strokeWidth="1.5"
                  />
                </g>
              )
            })}

            {/* Draw Nodes */}
            {nodes.map(node => {
              const colorIdx = nodeColors[node.index]
              const palette = NODE_COLOR_PALETTES[colorIdx] || NODE_COLOR_PALETTES[0]
              return (
                <g key={`node-${node.index}`} style={{ cursor: 'default' }}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill={palette.bg}
                    stroke={palette.border}
                    strokeWidth="3.5"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(112, 107, 100, 0.08))' }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    dy=".3em"
                    textAnchor="middle"
                    fill={palette.text}
                    style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'monospace' }}
                  >
                    {node.label}
                  </text>
                  {/* Degree indicator dot */}
                  <circle
                    cx={node.x + 13}
                    cy={node.y - 13}
                    r="7.5"
                    fill="#706b64"
                  />
                  <text
                    x={node.x + 13}
                    y={node.y - 13}
                    dy=".3em"
                    textAnchor="middle"
                    fill="#ffffff"
                    style={{ fontSize: '0.6rem', fontWeight: 700 }}
                  >
                    {node.degree}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    )
  }

  return (
    <AlgorithmLayout
      title="Graf Isomorfik & Derajat"
      subtitle="Input matriks ketetanggaan untuk menggambar 2 representasi graf isomorfik secara dinamis."
      color="#c2410c, #9a3412"
      onBack={onBack}
      pdfUrl="https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/20-Graf-Bagian1-2024.pdf#page=48"
      pdfLabel="PDF Teori Graf"
    >
      <div className="algo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

        {/* Settings & Adjacency Matrix Panel */}
        <section className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Matriks Ketetanggaan</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* Reset to Exam Question preset */}
              <button
                className="button-primary btn-orange"
                onClick={loadExamPreset}
                style={{ margin: 0, padding: '0.35rem 1rem', fontSize: '0.8rem', borderRadius: '10px' }}
              >
                Muat Soal Ujian Anda
              </button>

              {/* Size Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#706b64', textTransform: 'uppercase' }}>Simpul:</span>
                <div className="tab-switcher" style={{ margin: 0 }}>
                  {[3, 4, 5, 6].map(s => (
                    <button
                      key={s}
                      className={`tab-btn ${size === s ? 'active-orange' : ''}`}
                      onClick={() => setSize(s)}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#706b64', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
            Matriks ketetanggaan di bawah ini adalah representasi graf tidak berarah (simetris). Klik sel mana saja untuk membuat atau menghapus sisi (edge). Elemen diagonal <strong>(berwarna merah)</strong> menunjukkan <strong>self-loop</strong>.
          </p>

          {/* Adjacency Matrix Matrix Grid */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${size}, 50px)`,
              gap: '6px',
              padding: '1.25rem',
              background: '#f5f2eb',
              border: '1px solid rgba(112, 107, 100, 0.12)',
              borderRadius: '20px'
            }}>
              {matrix.map((row, r) =>
                row.map((val, c) => {
                  const isDiagonal = r === c
                  return (
                    <button
                      key={`adj-${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        border: val === 1
                          ? (isDiagonal ? '1px solid rgba(159, 18, 57, 0.4)' : '1px solid rgba(22, 101, 52, 0.4)')
                          : '1px solid rgba(112, 107, 100, 0.15)',
                        background: val === 1
                          ? (isDiagonal ? 'linear-gradient(135deg, rgba(159, 18, 57, 0.1), rgba(159, 18, 57, 0.2))' : 'linear-gradient(135deg, rgba(22, 101, 52, 0.1), rgba(22, 101, 52, 0.2))')
                          : '#ffffff',
                        color: val === 1
                          ? (isDiagonal ? '#9f1239' : '#166534')
                          : '#706b64',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    >
                      {val}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </section>

        {/* Dynamic Interactive Drawings */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {renderSVGGraph(layoutCircular, 'Graf A ')}
          {renderSVGGraph(layoutIsomorphic, 'Graf B ')}
        </section>

        {/* Proof & Details Panel */}
        <div className="two-col-result" style={{ marginTop: 0 }}>
          {/* Degree list panel */}
          <div className="result-panel" style={{
            background: 'rgba(30, 41, 59, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <div className="result-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-yellow" style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>DERAJAT</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>Analisis Derajat Simpul</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6' }}>
                Derajat dari suatu simpul $d(v_i)$ dihitung dari jumlah sisi yang terhubung dengannya. Sisi gelang / <strong>self-loop</strong> memberikan kontribusi <strong>+2 derajat</strong>.
              </div>

              {degrees.map((deg, idx) => {
                const hasLoop = matrix[idx][idx] === 1
                const otherEdgesCount = matrix[idx].reduce((acc, v, c) => acc + (c !== idx ? v : 0), 0)
                return (
                  <div
                    key={`deg-item-${idx}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.55)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '14px',
                      padding: '0.75rem 1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#f8fafc', fontSize: '0.95rem' }}>v{idx + 1}</span>
                      {hasLoop && <span className="badge-pink" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>Self-Loop (+2)</span>}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#cbd5e1' }}>
                      {hasLoop ? `d(v${idx + 1}) = ${otherEdgesCount} + 2` : `d(v${idx + 1}) = ${otherEdgesCount}`} = <strong style={{ color: '#f97316', fontSize: '1.1rem' }}>{deg}</strong>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Isomorphism bijection list */}
          <div className="result-panel" style={{
            background: 'rgba(30, 41, 59, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <div className="result-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-green" style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>ISOMORFIK & PEWARNAAN</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>Bijeksi & Pewarnaan Graf</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6' }}>
                Kedua graf di atas diwarnai secara otomatis menggunakan <strong>Algoritma Welch-Powell</strong>. Jumlah warna minimum yang dibutuhkan (Bilangan Kromatik) adalah <strong style={{ color: '#fb923c' }}>&chi;(G) = {chromaticNumber}</strong> warna.
              </div>

              {/* Bijection table */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.65rem', marginBottom: '0.65rem', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.05em' }}>
                  <div style={{ flex: 1 }}>Graf A</div>
                  <div style={{ flex: 1 }}>Graf B</div>
                  <div style={{ flex: 2 }}>Pewarnaan (Coloring)</div>
                </div>
                {Array.from({ length: size }).map((_, idx) => {
                  const colorIdx = nodeColors[idx]
                  const palette = NODE_COLOR_PALETTES[colorIdx] || NODE_COLOR_PALETTES[0]
                  return (
                    <div key={`bij-${idx}`} style={{ display: 'flex', padding: '0.35rem 0', alignItems: 'center' }}>
                      <div style={{ flex: 1, color: '#4ade80', fontWeight: 800, fontSize: '0.95rem' }}>v{idx + 1}</div>
                      <div style={{ flex: 1, color: '#fb923c', fontWeight: 800, fontSize: '0.95rem' }}>u{idx + 1}</div>
                      <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          backgroundColor: palette.bg,
                          color: palette.text,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '20px',
                          border: `1.5px solid ${palette.border}`,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: palette.border,
                            display: 'inline-block'
                          }}></span>
                          {palette.name}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.5' }}>
                *Dengan menyusun ulang posisi spasial koordinat node (Graf B disusun menyilang seperti pola bintang), kita membuktikan secara visual bahwa kedua graf adalah isomorfik.
              </div>
            </div>
          </div>
        </div>

      </div>
    </AlgorithmLayout>
  )
}
