type PageId =
  | 'home'
  | 'lcg'
  | 'kongruensi'

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
}

interface Category {
  label: string
  icon: string
  slide: string
  algorithms: Algorithm[]
}

interface Props {
  onNavigate: (page: PageId) => void
}

const categories: Category[] = [
  {
    label: 'Teori Bilangan',
    icon: '🔢',
    slide: 'Slide 15–17',
    algorithms: [
      {
        id: 'kongruensi',
        title: 'Kongruensi Linier',
        shortTitle: 'ax ≡ b mod m',
        desc: 'Selesaikan persamaan kongruensi linier ax ≡ b (mod m).',
        formula: 'ax ≡ b (mod m)',
        color: '#e879f9, #a21caf',
        tags: ['Kongruensi', 'Teori Bilangan'],
        slide: 'Slide 16',
        example: 'Selesaikan 3x ≡ 6 (mod 9). Ada berapa solusi?',
      },
    ],
  },
  {
    label: 'Barisan & Rekursi',
    icon: '🔁',
    slide: 'Slide 10–11',
    algorithms: [
      {
        id: 'lcg',
        title: 'Linear Congruential Generator',
        shortTitle: 'LCG',
        desc: 'Generator bilangan acak semu menggunakan rumus rekursif modular.',
        formula: 'Xₙ = (a·Xₙ₋₁ + b) mod m',
        color: '#60a5fa, #3b82f6',
        tags: ['Randomness', 'Modular'],
        slide: 'Slide 17',
        example: 'Bangkitkan 10 bilangan acak: X₀=3, a=9, b=13, m=19.',
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
        <div className="home-badge">IF1220 Matematika Diskrit · ITB 2024-2025</div>
        <h1 className="home-title">
          <span className="gradient-text-blue">Diskre</span>
          <span className="gradient-text-purple">Math</span>
        </h1>
        <p className="home-subtitle">
          Kalkulator interaktif berbasis silabus IF1220 ITB.<br />
          Setiap menu dilengkapi contoh soal — pilih yang sesuai!
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat.label} className="category-section">
          <div className="category-header">
            <span className="category-icon">{cat.icon}</span>
            <div>
              <h2 className="category-title">{cat.label}</h2>
              <span className="category-slide">{cat.slide}</span>
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
                  <span className="algo-example-label">📝 Contoh soal:</span>
                  <span className="algo-example-text">{algo.example}</span>
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

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#334155', paddingBottom: '2rem', fontSize: '0.8rem' }}>
        <p>© 2026 DiskreMath · Berdasarkan Silabus IF1220 ITB 2024-2025 · Rinaldi Munir</p>
      </footer>
    </div>
  )
}
