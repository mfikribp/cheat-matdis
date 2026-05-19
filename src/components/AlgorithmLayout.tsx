import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle: string
  color: string
  onBack: () => void
  children: ReactNode
}

export default function AlgorithmLayout({ title, subtitle, color, onBack, children }: Props) {
  return (
    <div className="container">
      <header className="algo-header">
        <button className="btn-back" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali ke Menu
        </button>
        <div className="algo-title-wrap">
          <h1 style={{ backgroundImage: `linear-gradient(135deg, ${color})` }}>{title}</h1>
          <p className="algo-subtitle">{subtitle}</p>
        </div>
      </header>
      {children}
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#475569', paddingBottom: '2rem', fontSize: '0.875rem' }}>
        <p>© 2026 DiskreMath · Matematika Diskrit Interactive Hub</p>
      </footer>
    </div>
  )
}
