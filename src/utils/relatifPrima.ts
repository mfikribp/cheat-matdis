export interface CoprimeStep {
  m: number;
  n: number;
  r: number;
  calculation: string;
}

export interface PairwiseResult {
  a: number;
  b: number;
  gcd: number;
  isCoprime: boolean;
  steps: CoprimeStep[];
  factorsA: number[];
  factorsB: number[];
  commonFactors: number[];
}

export interface CoprimeAnalysisResult {
  numbers: number[];
  matrix: {
    [key: number]: {
      [key: number]: {
        gcd: number;
        isCoprime: boolean;
      };
    };
  };
  pairs: PairwiseResult[];
  allPairsAreCoprime: boolean;
}

// Helper to get all divisors/factors of a number
export function getFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
      if (i * i !== num) {
        factors.push(num / i);
      }
    }
  }
  return factors.sort((x, y) => x - y);
}

// Helper to calculate GCD and trace steps
export function calculateGcdWithSteps(a: number, b: number): { gcd: number; steps: CoprimeStep[] } {
  let m = Math.abs(a);
  let n = Math.abs(b);

  if (m < n) {
    const temp = m;
    m = n;
    n = temp;
  }

  const steps: CoprimeStep[] = [];
  let currentM = m;
  let currentN = n;

  if (currentN === 0) {
    return {
      gcd: currentM,
      steps: [{
        m: currentM,
        n: 0,
        r: 0,
        calculation: `PBB(${currentM}, 0) = ${currentM}`
      }]
    };
  }

  while (currentN !== 0) {
    const r = currentM % currentN;
    steps.push({
      m: currentM,
      n: currentN,
      r: r,
      calculation: `${currentM} = ${Math.floor(currentM / currentN)} × ${currentN} + ${r}`
    });
    currentM = currentN;
    currentN = r;
  }

  return {
    gcd: currentM,
    steps
  };
}

export function analyzeCoprimes(numbersInput: number[]): CoprimeAnalysisResult {
  // Filter unique and valid positive integers
  const numbers = Array.from(new Set(numbersInput))
    .filter(num => !isNaN(num) && num > 0)
    .sort((x, y) => x - y);

  const matrix: CoprimeAnalysisResult['matrix'] = {};
  const pairs: PairwiseResult[] = [];

  // Initialize matrix
  numbers.forEach(num => {
    matrix[num] = {};
  });

  // Calculate pairwise GCD and check if coprime
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      const a = numbers[i];
      const b = numbers[j];
      
      const { gcd, steps } = calculateGcdWithSteps(a, b);
      const isCoprime = gcd === 1;

      matrix[a][b] = { gcd, isCoprime };
      matrix[b][a] = { gcd, isCoprime };

      if (a !== b) {
        const factorsA = getFactors(a);
        const factorsB = getFactors(b);
        const commonFactors = factorsA.filter(f => factorsB.includes(f));

        pairs.push({
          a,
          b,
          gcd,
          isCoprime,
          steps,
          factorsA,
          factorsB,
          commonFactors
        });
      }
    }
  }

  const allPairsAreCoprime = pairs.length > 0 && pairs.every(p => p.isCoprime);

  return {
    numbers,
    matrix,
    pairs,
    allPairsAreCoprime
  };
}
