export interface KombinasiResult {
  n: number;
  r: number;
  result: number;
  steps: string[];
}

function factorial(n: number): bigint {
  if (n <= 1) return 1n;
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}

function formatFactorial(n: number): string {
  if (n === 0 || n === 1) return `${n}! = 1`;
  const terms = Array.from({ length: n }, (_, i) => i + 1)
    .reverse()
    .join(' × ');
  return `${n}! = ${terms} = ${factorial(n)}`;
}

export function hitungKombinasi(n: number, r: number): KombinasiResult {
  const numFact = factorial(n);
  const rFact = factorial(r);
  const nrFact = factorial(n - r);
  const denominator = rFact * nrFact;
  const result = Number(numFact / denominator);

  const steps: string[] = [
    `C(n, r) = n! / (r! × (n - r)!)`,
    `C(${n}, ${r}) = ${n}! / (${r}! × (${n} - ${r})!)`,
    `C(${n}, ${r}) = ${n}! / (${r}! × ${n - r}!)`,
    `${formatFactorial(n)}`,
    `${formatFactorial(r)}`,
    `${formatFactorial(n - r)}`,
    `C(${n}, ${r}) = ${numFact} / (${rFact} × ${nrFact})`,
    `C(${n}, ${r}) = ${numFact} / ${denominator}`,
    `C(${n}, ${r}) = ${result}`,
  ];

  return { n, r, result, steps };
}
