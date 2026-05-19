export interface GCDStep {
  a: number;
  b: number;
  quotient: number;
  remainder: number;
  equation: string;
}

export interface GCDResult {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  steps: GCDStep[];
  backSubstitution: string[];
}

export function hitungGCD(a: number, b: number): GCDResult {
  const originalA = a;
  const originalB = b;
  const steps: GCDStep[] = [];

  let x = a;
  let y = b;

  while (y !== 0) {
    const quotient = Math.floor(x / y);
    const remainder = x % y;
    steps.push({
      a: x,
      b: y,
      quotient,
      remainder,
      equation: `${x} = ${y} × ${quotient} + ${remainder}`,
    });
    x = y;
    y = remainder;
  }

  const gcd = x;
  const lcm = (originalA * originalB) / gcd;

  const backSubstitution: string[] = [
    `GCD(${originalA}, ${originalB}) = ${gcd}`,
    `LCM(${originalA}, ${originalB}) = (${originalA} × ${originalB}) / GCD`,
    `LCM(${originalA}, ${originalB}) = ${originalA * originalB} / ${gcd}`,
    `LCM(${originalA}, ${originalB}) = ${lcm}`,
  ];

  return { a: originalA, b: originalB, gcd, lcm, steps, backSubstitution };
}
