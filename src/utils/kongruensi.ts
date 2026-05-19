export interface KongruensiResult {
  a: number;
  b: number;
  m: number;
  gcd: number;
  hasSolution: boolean;
  numSolutions: number;
  solutions: number[];
  steps: string[];
}

function extGCD(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const res = extGCD(b, a % b);
  return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function solveKongruensi(a: number, b: number, m: number): KongruensiResult {
  const d = gcd(Math.abs(a), Math.abs(m));
  const steps: string[] = [];

  steps.push(`Persamaan: ${a}x ≡ ${b} (mod ${m})`);
  steps.push(`Langkah 1: Hitung GCD(${Math.abs(a)}, ${m}) = ${d}`);

  if (b % d !== 0) {
    steps.push(`Langkah 2: Karena ${d} ∤ ${b} (${d} tidak membagi ${b}), TIDAK ADA SOLUSI.`);
    steps.push(`Syarat solusi: GCD(a, m) | b harus terpenuhi.`);
    return { a, b, m, gcd: d, hasSolution: false, numSolutions: 0, solutions: [], steps };
  }

  steps.push(`Langkah 2: Karena ${d} | ${b} (${d} membagi ${b}), ada tepat ${d} solusi dalam mod ${m}.`);

  // Reduce to a'x ≡ b' (mod m')
  const a2 = a / d, b2 = b / d, m2 = m / d;
  steps.push(`Langkah 3: Bagi semua dengan GCD → ${a2}x ≡ ${b2} (mod ${m2})`);

  const { x } = extGCD(((a2 % m2) + m2) % m2, m2);
  const x0 = ((x * b2) % m2 + m2) % m2;
  steps.push(`Langkah 4: Invers modular dari ${a2} mod ${m2} = ${x}`);
  steps.push(`Langkah 5: x₀ = (${x} × ${b2}) mod ${m2} = ${x0}`);

  const solutions: number[] = [];
  for (let i = 0; i < d; i++) {
    solutions.push((x0 + i * m2) % m);
  }
  steps.push(`Langkah 6: ${d} solusi dalam [0, ${m - 1}]: x = ${solutions.join(', ')}`);

  // Verify
  solutions.forEach(sol => {
    const lhs = ((a * sol) % m + m) % m;
    const rhs = ((b % m) + m) % m;
    steps.push(`Verifikasi x=${sol}: ${a}×${sol} = ${a * sol} ≡ ${lhs} (mod ${m}) ${lhs === rhs ? '✓' : '✗'}`);
  });

  return { a, b, m, gcd: d, hasSolution: true, numSolutions: d, solutions, steps };
}
