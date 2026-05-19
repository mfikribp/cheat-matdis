export interface EuclideanStep {
  index: number;
  m: number;
  n: number;
  r: number;
  calculation: string;
  nextM: number;
  nextN: number;
}

export interface EuclideanResult {
  originalM: number;
  originalN: number;
  wasSwapped: boolean;
  steps: EuclideanStep[];
  pbb: number;
}

export function solveEuclidean(mInput: number, nInput: number): EuclideanResult {
  let m = Math.abs(mInput);
  let n = Math.abs(nInput);
  let wasSwapped = false;

  if (m < n) {
    const temp = m;
    m = n;
    n = temp;
    wasSwapped = true;
  }

  const steps: EuclideanStep[] = [];
  let index = 1;

  let currentM = m;
  let currentN = n;

  while (currentN !== 0) {
    const r = currentM % currentN;
    const nextM = currentN;
    const nextN = r;

    steps.push({
      index: index++,
      m: currentM,
      n: currentN,
      r: r,
      calculation: `${currentM} mod ${currentN} = ${r}`,
      nextM: nextM,
      nextN: nextN
    });

    currentM = nextM;
    currentN = nextN;
  }

  return {
    originalM: mInput,
    originalN: nInput,
    wasSwapped,
    steps,
    pbb: currentM
  };
}
