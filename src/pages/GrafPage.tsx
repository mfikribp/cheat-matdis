import { useState } from 'react'
import AlgorithmLayout from '../components/AlgorithmLayout'
import { analyzeGraf, parseEdges, type GrafResult } from '../utils/graf'

interface Props { onBack: () => void }

const EXAMPLES = [
  { label: 'Graf K₄ (lengkap 4 simpul)', v: 4, edges: '1-2\n1-3\n1-4\n2-3\n2-4\n3-4' },
  { label: 'Graf Euler Circuit', v: 5, edges: '1-2\n2-3\n3-4\n4-5\n5-1\n1-3\n3-5' },
  { label: 'Graf Euler Path', v: 4, edges: '1-2\n2-3\n3-4\n4-1\n1-3' },
  { label: 'Graf Tidak Terhubung', v: 4, edges: '1-2\n3-4' },
]

export default function GrafPage({ onBack }: Props) {
  const [vertices, setVertices] = useState(4)
  const [edgeInput, setEdgeInput] = useState('1-2\n2-3\n3-4\n4-1\n1-3')
  const [result, setResult] = useState<GrafResult | null>(null)
  const [error, setError] = useState('')

  const handleHitung = () => {
    setError('')
    if (vertices < 1 || vertices > 50) { setError('Jumlah vertex: 1 – 50'); return }
    const edges = parseEdges(edgeInput, vertices)
    if (edges.length === 0) { setError('Format edge tidak valid. Contoh: 1-2 (satu per baris)'); return }
    setResult(analyzeGraf(vertices, edges))
  }

  const loadExample = (ex: typeof EXAMPLES[0]) => {
    setVertices(ex.v)
    setEdgeInput(ex.edges)
    setResult(null)
  }

  const maxDeg = result ? Math.max(...result.degreeSequence.map(d => d.degree), 1) : 1

  return (
    <AlgorithmLayout
      title="Analisis Graf"
      subtitle="Derajat, Handshaking Lemma, Euler Path/Circuit — Graf Bag.1 (Slide 20)"
      color="#a3e635, #65a30d"
      onBack={onBack}
    >
      <main className="glass-card">
        <div className="example-chips">
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Contoh:</span>
          {EXAMPLES.map(ex => (
            <button key={ex.label} className="example-chip-btn" onClick={() => loadExample(ex)}>
              {ex.label}
            </button>
          ))}
        </div>

        <div className="input-grid cols-2">
          <div className="input-group">
            <label>Jumlah Vertex (V)</label>
            <input type="number" value={vertices} min={1} max={50} onChange={e => setVertices(parseInt(e.target.value) || 1)} />
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label>Daftar Edge (format: u-v, satu per baris atau dipisah koma)</label>
          <textarea
            className="edge-textarea"
            value={edgeInput}
            onChange={e => setEdgeInput(e.target.value)}
            rows={6}
            placeholder={'1-2\n2-3\n3-1'}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}
        <button className="button-primary btn-lime" onClick={handleHitung}>Analisis Graf</button>
      </main>

      {result && (
        <>
          {/* Status badges */}
          <div className="summary-cards">
            <div className="summary-card" style={{ borderColor: '#a3e635' }}>
              <span className="summary-label">|V| Vertex</span>
              <span className="summary-value" style={{ color: '#a3e635' }}>{result.vertices}</span>
            </div>
            <div className="summary-card" style={{ borderColor: '#a3e635' }}>
              <span className="summary-label">|E| Edge</span>
              <span className="summary-value" style={{ color: '#a3e635' }}>{result.edgeCount}</span>
            </div>
            <div className="summary-card" style={{
              borderColor: result.hasEulerCircuit ? '#4ade80' : result.hasEulerPath ? '#fbbf24' : '#f87171'
            }}>
              <span className="summary-label">Euler</span>
              <span className="summary-value" style={{
                fontSize: '1.1rem',
                color: result.hasEulerCircuit ? '#4ade80' : result.hasEulerPath ? '#fbbf24' : '#f87171'
              }}>
                {result.hasEulerCircuit ? '✅ Circuit' : result.hasEulerPath ? '🔶 Path' : '❌ Tidak Ada'}
              </span>
            </div>
            {result.isConnected !== null && (
              <div className="summary-card" style={{ borderColor: result.isConnected ? '#4ade80' : '#f87171' }}>
                <span className="summary-label">Konektivitas</span>
                <span className="summary-value" style={{ fontSize: '1.1rem', color: result.isConnected ? '#4ade80' : '#f87171' }}>
                  {result.isConnected ? '✅ Terhubung' : '❌ Tidak'}
                </span>
              </div>
            )}
          </div>

          {/* Degree sequence visual */}
          <div className="result-panel" style={{ marginTop: '1.5rem' }}>
            <div className="result-panel-header" style={{ color: '#a3e635' }}>
              Derajat Setiap Vertex
              <span className="badge badge-lime">Σdeg = {result.sumDegrees} = 2×{result.edgeCount}</span>
            </div>
            <div className="degree-bars">
              {result.degreeSequence.map(d => (
                <div key={d.vertex} className="degree-bar-item">
                  <div className="degree-bar-label">
                    v{d.vertex}
                    <span className={`degree-parity ${d.degree % 2 === 0 ? 'even' : 'odd'}`}>
                      {d.degree % 2 === 0 ? 'G' : 'J'}
                    </span>
                  </div>
                  <div className="degree-bar-track">
                    <div
                      className="degree-bar-fill"
                      style={{
                        width: `${(d.degree / maxDeg) * 100}%`,
                        background: d.degree % 2 === 0
                          ? 'linear-gradient(90deg, #4ade80, #a3e635)'
                          : 'linear-gradient(90deg, #f87171, #fb923c)',
                      }}
                    />
                  </div>
                  <span className="degree-bar-val">{d.degree}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.5rem 0 0' }}>
              G = Genap (mendukung Euler), J = Ganjil (menghambat Euler)
            </p>
          </div>

          {/* Steps */}
          <div className="single-result-panel">
            <div className="result-panel">
              <div className="result-panel-header" style={{ color: '#a3e635' }}>Analisis Lengkap</div>
              <div className="calc-container">
                {result.steps.map((s, i) => (
                  <div key={i} className={`calc-line ${i === 0 ? 'main-line-lime' : s.startsWith('✅') ? 'result-line' : s.startsWith('❌') ? 'calc-line' : 'sub-line'}`}
                    style={s.startsWith('❌') ? { color: '#f87171' } : undefined}>
                    {s}
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
