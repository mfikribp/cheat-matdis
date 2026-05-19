import type { ReactNode } from 'react'

type PageId =
  | 'home'
  | 'lcg'
  | 'kongruensi'
  | 'euclidean'
  | 'relasi'
  | 'graf'

interface Algorithm {
  id: PageId
  title: string
  shortTitle: string
  desc: string
  formula: string
  color: string
  tags: string[]
  slide: string
  example: string
  pdfUrl: string
  pdfPageLabel: string
}

interface Category {
  label: string
  icon: ReactNode
  algorithms: Algorithm[]
}

interface Props {
  onNavigate: (page: PageId) => void
}

const categories: Category[] = [
  {
    label: 'Teori Bilangan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#854d0e' }}>
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="9" y1="4" x2="9" y2="20" />
        <line x1="15" y1="4" x2="15" y2="20" />
      </svg>
    ),
    algorithms: [
      {
        id: 'euclidean',
        title: 'Algoritma Euclidean (PBB)',
        shortTitle: 'PBB/GCD',
        desc: 'Mencari Pembagi Bersama Terbesar (PBB) menggunakan Algoritma Euclid.',
        formula: 'PBB(m, n) = PBB(n, m mod n)',
        color: '#166534, #15803d',
        tags: ['Euclidean', 'Teori Bilangan'],
        slide: 'Slide 15',
        example: 'Tentukan PBB (FPB) dari 252 dan 198.',
        pdfUrl: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/15-Teori-Bilangan-Bagian1-2024.pdf#page=15',
        pdfPageLabel: 'Hal. 15',
      },
      {
        id: 'kongruensi',
        title: 'Kongruensi Linier',
        shortTitle: 'ax ≡ b mod m',
        desc: 'Selesaikan persamaan kongruensi linier ax ≡ b (mod m).',
        formula: 'ax ≡ b (mod m)',
        color: '#9f1239, #be123c',
        tags: ['Kongruensi', 'Teori Bilangan'],
        slide: 'Slide 16',
        example: 'Selesaikan 3x ≡ 6 (mod 9). Ada berapa solusi?',
        pdfUrl: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/16-Teori-Bilangan-Bagian2-2024.pdf#page=12',
        pdfPageLabel: 'Hal. 12',
      },
    ],
  },
  {
    label: 'Barisan & Rekursi',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0f766e' }}>
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
      </svg>
    ),
    algorithms: [
      {
        id: 'lcg',
        title: 'Linear Congruential Generator',
        shortTitle: 'LCG',
        desc: 'Generator bilangan acak semu menggunakan rumus rekursif modular.',
        formula: 'Xₙ = (a·Xₙ₋₁ + b) mod m',
        color: '#0f766e, #115e59',
        tags: ['Randomness', 'Modular'],
        slide: 'Slide 17',
        example: 'Bangkitkan 10 bilangan acak: X₀=3, a=9, b=13, m=19.',
        pdfUrl: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/17-Teori-Bilangan-Bagian3-2024.pdf#page=17',
        pdfPageLabel: 'Hal. 17',
      },
    ],
  },
  {
    label: 'Relasi & Fungsi',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a16207' }}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <line x1="9" y1="6" x2="15" y2="6" />
        <line x1="9" y1="18" x2="15" y2="18" />
        <line x1="9" y1="6" x2="15" y2="18" />
        <line x1="9" y1="18" x2="15" y2="6" />
      </svg>
    ),
    algorithms: [
      {
        id: 'relasi',
        title: 'Operasi Matriks Relasi',
        shortTitle: 'Relasi & Komposisi',
        desc: 'Selesaikan gabungan, irisan, dan perkalian Boolean komposisi relasi.',
        formula: 'R ∪ S, R ∩ S, R ◦ S, S ◦ R',
        color: '#a16207, #b45309',
        tags: ['Relasi', 'Komposisi'],
        slide: 'Slide 16',
        example: 'R = [1 1 1; 1 0 0; 0 0 0], S = [1 1 0; 0 1 1; 0 0 1]. Tentukan R o S.',
        pdfUrl: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/05-Relasi-dan-Fungsi-Bagian1-(2024).pdf#page=16',
        pdfPageLabel: 'Hal. 16',
      },
    ],
  },
  {
    label: 'Graf & Pohon',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c2410c' }}>
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <line x1="12" y1="8" x2="6.5" y2="15.5" />
        <line x1="12" y1="8" x2="17.5" y2="15.5" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
    algorithms: [
      {
        id: 'graf',
        title: 'Graf Isomorfik & Derajat',
        shortTitle: 'Graf',
        desc: 'Analisis derajat simpul undirected dan visualisasikan dua bentuk graf yang isomorfik.',
        formula: 'Isomorfik: G₁ ≅ G₂',
        color: '#c2410c, #ea580c',
        tags: ['Graf', 'Isomorfik'],
        slide: 'Slide 48',
        example: 'Gambarkan dua buah graf isomorfik yang bersesuaian dengan matriks 5x5 Anda.',
        pdfUrl: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2024-2025/20-Graf-Bagian1-2024.pdf#page=48',
        pdfPageLabel: 'Hal. 48',
      },
    ],
  },
]

export type { PageId }
export { categories }

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="container">
      <header className="home-header">
        <h1 className="home-title">
          <span className="gradient-text-blue">Semoga Nilai Ku </span>
          <span className="gradient-text-purple">A</span>
        </h1>
      </header>

      {categories.map((cat) => (
        <section key={cat.label} className="category-section">
          <div className="category-header">
            <span className="category-icon">{cat.icon}</span>
            <div>
              <h2 className="category-title">{cat.label}</h2>
            </div>
          </div>
          <div className="algo-grid">
            {cat.algorithms.map((algo, i) => (
              <button
                key={algo.id}
                className="algo-card"
                onClick={() => onNavigate(algo.id)}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="algo-card-top">
                  <span className="algo-badge" style={{ background: `linear-gradient(135deg, ${algo.color})` }}>
                    {algo.shortTitle}
                  </span>
                  <div className="algo-tags">
                    {algo.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="algo-name">{algo.title}</h3>
                <p className="algo-desc">{algo.desc}</p>
                <code className="algo-formula">{algo.formula}</code>

                {/* Example problem */}
                <div className="algo-example">
                  <span className="algo-example-label"> Contoh soal:</span>
                  <span className="algo-example-text">{algo.example}</span>
                </div>

                {/* PDF Link Button */}
                <div
                  className="algo-pdf-link"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  style={{
                    marginTop: '0.75rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <a
                    href={algo.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      color: '#854d0e',
                      textDecoration: 'none',
                      fontWeight: 600,
                      background: 'rgba(133, 77, 14, 0.06)',
                      border: '1px solid rgba(133, 77, 14, 0.15)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(133, 77, 14, 0.12)'
                      e.currentTarget.style.borderColor = 'rgba(133, 77, 14, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(133, 77, 14, 0.06)'
                      e.currentTarget.style.borderColor = 'rgba(133, 77, 14, 0.15)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>PDF Materi ({algo.pdfPageLabel})</span>
                  </a>
                </div>

                <div className="algo-card-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#706b64', paddingBottom: '2rem', fontSize: '0.8rem' }}>
        <p>Jangan terlalu diiniin lah apasih namanya</p>
      </footer>
    </div>
  )
}
