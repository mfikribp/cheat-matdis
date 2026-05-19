export interface FibonacciStep {
  index: number;
  value: number;
  equation: string;
}

export interface FibonacciResult {
  n: number;
  sequence: number[];
  steps: FibonacciStep[];
}

export function generateFibonacci(n: number): FibonacciResult {
  const sequence: number[] = [];
  const steps: FibonacciStep[] = [];

  if (n >= 1) {
    sequence.push(0);
    steps.push({ index: 0, value: 0, equation: 'F(0) = 0 (basis)' });
  }
  if (n >= 2) {
    sequence.push(1);
    steps.push({ index: 1, value: 1, equation: 'F(1) = 1 (basis)' });
  }

  for (let i = 2; i < n; i++) {
    const val = sequence[i - 1] + sequence[i - 2];
    sequence.push(val);
    steps.push({
      index: i,
      value: val,
      equation: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${sequence[i - 1]} + ${sequence[i - 2]} = ${val}`,
    });
  }

  return { n, sequence, steps };
}
