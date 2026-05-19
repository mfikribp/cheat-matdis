export interface ModExpStep {
  step: number;
  exp: number;
  base: number;
  result: number;
  equation: string;
}

export interface ModExpResult {
  base: number;
  exponent: number;
  modulus: number;
  result: number;
  steps: ModExpStep[];
  binaryExp: string;
}

export interface ModInverseResult {
  a: number;
  m: number;
  inverse: number | null;
  steps: string[];
}

export function modularExponentiation(base: number, exponent: number, modulus: number): ModExpResult {
  const steps: ModExpStep[] = [];
  let result = 1;
  let b = base % modulus;
  let exp = exponent;
  const binaryExp = exponent.toString(2);

  let stepNum = 1;

  steps.push({
    step: stepNum++,
    exp,
    base: b,
    result,
    equation: `Inisialisasi: result = 1, base = ${base} mod ${modulus} = ${b}`,
  });

  while (exp > 0) {
    if (exp % 2 === 1) {
      const newResult = (result * b) % modulus;
      steps.push({
        step: stepNum++,
        exp,
        base: b,
        result: newResult,
        equation: `exp=${exp} (ganjil): result = (${result} × ${b}) mod ${modulus} = ${newResult}`,
      });
      result = newResult;
    } else {
      steps.push({
        step: stepNum++,
        exp,
        base: b,
        result,
        equation: `exp=${exp} (genap): result tidak berubah = ${result}`,
      });
    }
    b = (b * b) % modulus;
    exp = Math.floor(exp / 2);
    if (exp > 0) {
      steps.push({
        step: stepNum++,
        exp,
        base: b,
        result,
        equation: `Update: base = base² mod ${modulus} = ${b}, exp = ${exp}`,
      });
    }
  }

  return { base, exponent, modulus, result, steps, binaryExp };
}

export function modularInverse(a: number, m: number): ModInverseResult {
  // Extended Euclidean Algorithm
  const steps: string[] = [`Cari invers dari ${a} mod ${m} menggunakan Algoritma Euclid Diperluas`];

  let old_r = a, r = m;
  let old_s = 1, s = 0;

  while (r !== 0) {
    const q = Math.floor(old_r / r);
    steps.push(`${old_r} = ${r} × ${q} + ${old_r - q * r}`);
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }

  if (old_r !== 1) {
    steps.push(`GCD(${a}, ${m}) = ${old_r} ≠ 1, invers tidak ada!`);
    return { a, m, inverse: null, steps };
  }

  const inverse = ((old_s % m) + m) % m;
  steps.push(`Koefisien s = ${old_s}`);
  steps.push(`Invers = ((${old_s}) mod ${m} + ${m}) mod ${m} = ${inverse}`);
  steps.push(`Verifikasi: ${a} × ${inverse} mod ${m} = ${(a * inverse) % m}`);

  return { a, m, inverse, steps };
}
