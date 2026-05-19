type PageId =
  | 'home'
  | 'lcg' | 'permutasi' | 'kombinasi' | 'gcd' | 'modular'
  | 'sieve' | 'fibonacci' | 'pigeonhole'
  | 'kongruensi' | 'binomial' | 'rekurensi' | 'graf'

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
        id: 'gcd',
        title: 'GCD & LCM (Euclidean)',
        shortTitle: 'GCD/LCM',
        desc: 'Mencari FPB dan KPK menggunakan Algoritma Euclid.',
        formula: 'GCD(a,b) = GCD(b, a mod b)',
        color: '#34d399, #059669',
        tags: ['Teori Bilangan', 'Euclidean'],
        slide: 'Slide 15',
        example: 'Tentukan FPB dan KPK dari 252 dan 198.',
      },
      {
        id: 'sieve',
        title: 'Sieve of Eratosthenes',
        shortTitle: 'Saringan Prima',
        desc: 'Mencari semua bilangan prima hingga N dengan visualisasi eliminasi.',
        formula: '∀p prima: coret 2p, 3p, 4p, …',
        color: '#fbbf24, #d97706',
        tags: ['Bilangan Prima', 'Visualisasi'],
        slide: 'Slide 15',
        example: 'Temukan semua bilangan prima antara 1 dan 200.',
      },
      {
        id: 'modular',
        title: 'Modular Arithmetic',
        shortTitle: 'Mod Arith',
        desc: 'Eksponen modular cepat dan invers modular dengan Extended Euclidean.',
        formula: 'aᵉ mod m · a⁻¹ mod m',
        color: '#fb923c, #ea580c',
        tags: ['Kriptografi', 'Teori Bilangan'],
        slide: 'Slide 16',
        example: 'Hitung 3^644 mod 645. Cari invers 7 mod 26.',
      },
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
    label: 'Kombinatorika',
    icon: '📊',
    slide: 'Slide 18–19',
    algorithms: [
      {
        id: 'permutasi',
        title: 'Permutasi',
        shortTitle: 'P(n,r)',
        desc: 'Menghitung jumlah susunan r objek dari n objek.',
        formula: 'P(n,r) = n! / (n−r)!',
        color: '#a78bfa, #7c3aed',
        tags: ['Counting', 'Factorial'],
        slide: 'Slide 18',
        example: 'Berapa kata 9 huruf dari 26 huruf (a) tanpa & (b) dengan pengulangan?',
      },
      {
        id: 'kombinasi',
        title: 'Kombinasi',
        shortTitle: 'C(n,r)',
        desc: 'Menghitung pemilihan r objek dari n tanpa memperhatikan urutan.',
        formula: 'C(n,r) = n! / (r! · (n−r)!)',
        color: '#f472b6, #db2777',
        tags: ['Counting', 'Factorial'],
        slide: 'Slide 18',
        example: 'Dari 10 orang dipilih 3 sebagai panitia. Ada berapa cara?',
      },
      {
        id: 'binomial',
        title: 'Koefisien Binomial',
        shortTitle: 'Binomial',
        desc: 'Segitiga Pascal dan koefisien ekspansi (x+y)ⁿ.',
        formula: 'C(n,k) — baris ke-n Segitiga Pascal',
        color: '#4ade80, #16a34a',
        tags: ['Pascal', 'Ekspansi'],
        slide: 'Slide 19',
        example: 'Berapa koefisien x⁵ dalam ekspansi (x+2)⁸?',
      },
      {
        id: 'pigeonhole',
        title: 'Pigeonhole Principle',
        shortTitle: 'Pigeonhole',
        desc: 'Kalkulator prinsip sangkar merpati untuk pembuktian eksistensi.',
        formula: '⌈n/k⌉ merpati per kandang',
        color: '#f87171, #dc2626',
        tags: ['Kombinatorika', 'Bukti'],
        slide: 'Slide 19',
        example: 'Jika 13 buku diletakkan di 12 rak, pasti ada rak dengan ≥ 2 buku.',
      },
    ],
  },
  {
    label: 'Barisan & Rekursi',
    icon: '🔁',
    slide: 'Slide 10–11',
    algorithms: [
      {
        id: 'fibonacci',
        title: 'Barisan Fibonacci',
        shortTitle: 'Fibonacci',
        desc: 'Menghasilkan barisan Fibonacci langkah per langkah.',
        formula: 'F(n) = F(n−1) + F(n−2)',
        color: '#22d3ee, #0891b2',
        tags: ['Barisan', 'Rekursi'],
        slide: 'Slide 10',
        example: 'Hitung F(0) hingga F(10). Berapakah F(10)?',
      },
      {
        id: 'rekurensi',
        title: 'Relasi Rekurensi',
        shortTitle: 'Rekurensi',
        desc: 'Solusi aₙ = p·aₙ₋₁ + q·aₙ₋₂ dengan persamaan karakteristik.',
        formula: 'aₙ = p·aₙ₋₁ + q·aₙ₋₂',
        color: '#38bdf8, #0284c7',
        tags: ['Rekurensi', 'Karakteristik'],
        slide: 'Slide 11',
        example: 'Tentukan solusi aₙ = 3aₙ₋₁ − 2aₙ₋₂, a₀=1, a₁=3.',
      },
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
  {
    label: 'Graf & Pohon',
    icon: '🌐',
    slide: 'Slide 20–24',
    algorithms: [
      {
        id: 'graf',
        title: 'Analisis Graf',
        shortTitle: 'Graf',
        desc: 'Derajat vertex, Handshaking Lemma, Euler Path dan Circuit.',
        formula: 'Σ deg(v) = 2|E|',
        color: '#a3e635, #65a30d',
        tags: ['Graf', 'Euler', 'Handshaking'],
        slide: 'Slide 20',
        example: 'Buktikan Handshaking Lemma. Apakah graf memiliki Euler circuit?',
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
