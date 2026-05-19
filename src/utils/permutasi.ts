export interface PermutasiResult {
  type: 'with-rep' | 'without-rep';
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

export function permutasiTanpaPengulangan(n: number, r: number): PermutasiResult {
  const numerator = factorial(n);
  const denominator = factorial(n - r);
  const result = Number(numerator / denominator);

  const steps: string[] = [
    `P(n, r) = n! / (n - r)!`,
    `P(${n}, ${r}) = ${n}! / (${n} - ${r})!`,
    `P(${n}, ${r}) = ${n}! / ${n - r}!`,
    `${formatFactorial(n)}`,
    `${formatFactorial(n - r)}`,
    `P(${n}, ${r}) = ${numerator} / ${denominator}`,
    `P(${n}, ${r}) = ${result}`,
  ];

  return { type: 'without-rep', n, r, result, steps };
}

export function permutasiDenganPengulangan(n: number, r: number): PermutasiResult {
  const result = Math.pow(n, r);

  const steps: string[] = [
    `P'(n, r) = nʳ`,
    `P'(${n}, ${r}) = ${n}^${r}`,
    `P'(${n}, ${r}) = ${result}`,
  ];

  return { type: 'with-rep', n, r, result, steps };
}
