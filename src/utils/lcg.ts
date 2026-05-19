export interface LCGResult {
  iteration: number;
  currentX: number;
  nextX: number;
  multiplier: number;
  increment: number;
  modulus: number;
  calculation: string;
  step2: string;
  step3: string;
  step4: string;
}

export const generateLCG = (
  m: number,
  a: number,
  b: number,
  x0: number,
  n: number
): LCGResult[] => {
  const results: LCGResult[] = [];
  let currentX = x0;

  for (let i = 1; i <= n; i++) {
    const step2Val = a * currentX + b;
    const nextVal = step2Val % m;

    results.push({
      iteration: i,
      currentX: currentX,
      nextX: nextVal,
      multiplier: a,
      increment: b,
      modulus: m,
      calculation: `X${i} = (${a} * X${i - 1} + ${b}) mod ${m}`,
      step2: `= (${a} * ${currentX} + ${b}) mod ${m}`,
      step3: `= ${step2Val} mod ${m}`,
      step4: `= ${nextVal}`,
    });

    currentX = nextVal;
  }

  return results;
};
