export interface BinomialResult {
  n: number;
  pascal: number[][];
  coefficients: number[];
  expansionTerms: string[];
}

export interface BinomialCoeffResult {
  n: number;
  k: number;
  result: number;
  steps: string[];
}

function C(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.round(result);
}

export function buildPascal(n: number): BinomialResult {
  const pascal: number[][] = [];
  for (let i = 0; i <= n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= i; j++) {
      row.push(C(i, j));
    }
    pascal.push(row);
  }

  const coefficients = pascal[n] || [1];

  // Expansion (x + y)^n — show symbolically with powers
  const expansionTerms: string[] = coefficients.map((coef, k) => {
    const xPow = n - k;
    const yPow = k;
    const xPart = xPow === 0 ? '' : xPow === 1 ? 'x' : `x^${xPow}`;
    const yPart = yPow === 0 ? '' : yPow === 1 ? 'y' : `y^${yPow}`;
    const coefStr = coef === 1 && (xPart || yPart) ? '' : `${coef}`;
    return `${coefStr}${xPart}${yPart}` || `${coef}`;
  });

  return { n, pascal, coefficients, expansionTerms };
}

export function hitungBinomial(n: number, k: number): BinomialCoeffResult {
  const result = C(n, k);
  const steps: string[] = [
    `C(n, k) = n! / (k! × (n−k)!)`,
    `C(${n}, ${k}) = ${n}! / (${k}! × ${n - k}!)`,
  ];

  // Show numerator product
  if (k <= n - k) {
    const nums = Array.from({ length: k }, (_, i) => n - i);
    const dens = Array.from({ length: k }, (_, i) => i + 1);
    steps.push(`       = (${nums.join(' × ')}) / (${dens.join(' × ')})`);
  }

  steps.push(`C(${n}, ${k}) = ${result}`);

  // Pascal's triangle row
  const row: number[] = [];
  for (let j = 0; j <= n; j++) row.push(C(n, j));
  steps.push(`Baris ke-${n} Pascal: [ ${row.join('  ') } ]`);
  steps.push(`C(${n}, ${k}) berada di posisi ke-${k} = ${result}`);

  return { n, k, result, steps };
}
