export interface RekurensiStep {
  n: number;
  value: number;
  equation: string;
}

export interface RekurensiResult {
  p: number;
  q: number;
  a0: number;
  a1: number;
  terms: number;
  sequence: RekurensiStep[];
  characteristic: string;
  roots: { r1: string; r2: string } | null;
  closedForm: string;
}

function formatNum(x: number): string {
  return Number.isInteger(x) ? String(x) : x.toFixed(4);
}

export function solveRekurensi(p: number, q: number, a0: number, a1: number, terms: number): RekurensiResult {
  // a_n = p*a_{n-1} + q*a_{n-2}
  const sequence: RekurensiStep[] = [];

  sequence.push({ n: 0, value: a0, equation: `a₀ = ${a0} (nilai awal)` });
  if (terms >= 2) {
    sequence.push({ n: 1, value: a1, equation: `a₁ = ${a1} (nilai awal)` });
  }

  let prev2 = a0, prev1 = a1;
  for (let n = 2; n < terms; n++) {
    const val = p * prev1 + q * prev2;
    sequence.push({
      n,
      value: val,
      equation: `a${n} = ${p}·a${n - 1} + ${q}·a${n - 2} = ${p}×${prev1} + ${q}×${prev2} = ${val}`,
    });
    prev2 = prev1;
    prev1 = val;
  }

  // Characteristic equation: r² - p·r - q = 0
  const characteristic = `r² − ${p}r − ${q} = 0`;
  const disc = p * p + 4 * q;

  let roots: { r1: string; r2: string } | null = null;
  let closedForm = '';

  if (disc >= 0) {
    const r1 = (p + Math.sqrt(disc)) / 2;
    const r2 = (p - Math.sqrt(disc)) / 2;
    roots = { r1: formatNum(r1), r2: formatNum(r2) };

    if (Math.abs(r1 - r2) < 1e-9) {
      closedForm = `aₙ = (c₁ + c₂·n) · ${formatNum(r1)}ⁿ`;
    } else {
      closedForm = `aₙ = c₁·(${formatNum(r1)})ⁿ + c₂·(${formatNum(r2)})ⁿ`;
    }
  } else {
    closedForm = `Akar kompleks — bentuk umum: aₙ = rⁿ(c₁·cos(nθ) + c₂·sin(nθ))`;
  }

  return { p, q, a0, a1, terms, sequence, characteristic, roots, closedForm };
}
