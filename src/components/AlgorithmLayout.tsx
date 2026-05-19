import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle: string
  color: string
  onBack: () => void
  pdfUrl?: string
  pdfLabel?: string
  children: ReactNode
}

export default function AlgorithmLayout({ title, subtitle, color, onBack, pdfUrl, pdfLabel, children }: Props) {
  return (
    <div className="container">
      <header className="algo-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <button className="btn-back" onClick={onBack} style={{ margin: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Menu
          </button>

          {pdfUrl && (
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#38bdf8',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>{pdfLabel || 'PDF Materi Kuliah'}</span>
            </a>
          )}
        </div>
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
