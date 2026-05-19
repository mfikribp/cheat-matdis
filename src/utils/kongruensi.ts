export interface KongruensiResult {
  a: number;
  b: number;
  m: number;
  gcd: number;
  hasSolution: boolean;
  numSolutions: number;
  solutions: number[];
  steps: string[];
}

function extGCD(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const res = extGCD(b, a % b);
  return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function solveKongruensi(a: number, b: number, m: number): KongruensiResult {
  const d = gcd(Math.abs(a), Math.abs(m));
  const steps: string[] = [];

  steps.push(`Persamaan: ${a}x ≡ ${b} (mod ${m})`);
  steps.push(`Langkah 1: Hitung GCD(${Math.abs(a)}, ${m}) = ${d}`);

  if (b % d !== 0) {
    steps.push(`Langkah 2: Karena ${d} ∤ ${b} (${d} tidak membagi ${b}), TIDAK ADA SOLUSI.`);
    steps.push(`Syarat solusi: GCD(a, m) | b harus terpenuhi.`);
    return { a, b, m, gcd: d, hasSolution: false, numSolutions: 0, solutions: [], steps };
  }

  steps.push(`Langkah 2: Karena ${d} | ${b} (${d} membagi ${b}), ada tepat ${d} solusi dalam mod ${m}.`);

  // Reduce to a'x ≡ b' (mod m')
  const a2 = a / d, b2 = b / d, m2 = m / d;
  steps.push(`Langkah 3: Bagi semua dengan GCD → ${a2}x ≡ ${b2} (mod ${m2})`);

  const { x } = extGCD(((a2 % m2) + m2) % m2, m2);
  const x0 = ((x * b2) % m2 + m2) % m2;
  steps.push(`Langkah 4: Invers modular dari ${a2} mod ${m2} = ${x}`);
  steps.push(`Langkah 5: x₀ = (${x} × ${b2}) mod ${m2} = ${x0}`);

  const solutions: number[] = [];
  for (let i = 0; i < d; i++) {
    solutions.push((x0 + i * m2) % m);
  }
  steps.push(`Langkah 6: ${d} solusi dalam [0, ${m - 1}]: x = ${solutions.join(', ')}`);

  // Verify
  solutions.forEach(sol => {
    const lhs = ((a * sol) % m + m) % m;
    const rhs = ((b % m) + m) % m;
    steps.push(`Verifikasi x=${sol}: ${a}×${sol} = ${a * sol} ≡ ${lhs} (mod ${m}) ${lhs === rhs ? '✓' : '✗'}`);
  });

  return { a, b, m, gcd: d, hasSolution: true, numSolutions: d, solutions, steps };
}

export interface SystemKongruensiResult {
  hasSolution: boolean;
  solution: number;
  modulus: number;
  steps: string[];
  equations: { a: number; m: number }[];
}

export function solveSystemKongruensi(
  eqs: { a: number; m: number }[]
): SystemKongruensiResult {
  const steps: string[] = [];
  steps.push(`Sistem Kekongruenan Linier yang diberikan:`);
  eqs.forEach((eq, idx) => {
    steps.push(`(${idx + 1})  x ≡ ${eq.a} (mod ${eq.m})`);
  });

  if (eqs.length < 2) {
    return {
      hasSolution: false,
      solution: 0,
      modulus: 0,
      steps: [...steps, `Error: Sistem harus memiliki minimal 2 persamaan.`],
      equations: eqs
    };
  }

  // Solve pairwise using substitution method
  let currentA = ((eqs[0].a % eqs[0].m) + eqs[0].m) % eqs[0].m;
  let currentM = eqs[0].m;

  for (let i = 1; i < eqs.length; i++) {
    const nextA = ((eqs[i].a % eqs[i].m) + eqs[i].m) % eqs[i].m;
    const nextM = eqs[i].m;

    steps.push(`\n--- Menyelesaikan pasangan persamaan:`);
    steps.push(`[i]   x ≡ ${currentA} (mod ${currentM})`);
    steps.push(`[ii]  x ≡ ${nextA} (mod ${nextM})`);

    steps.push(`Langkah 1: Tulis persamaan pertama sebagai:`);
    steps.push(`   x = ${currentA} + ${currentM}k₁  ...(iii)`);

    steps.push(`Langkah 2: Substitusikan (iii) ke dalam persamaan kedua:`);
    steps.push(`   ${currentA} + ${currentM}k₁ ≡ ${nextA} (mod ${nextM})`);
    
    const diff = ((nextA - currentA) % nextM + nextM) % nextM;
    steps.push(`   ${currentM}k₁ ≡ ${diff} (mod ${nextM})`);

    const g = gcd(currentM, nextM);
    if (diff % g !== 0) {
      steps.push(`Langkah 3: Karena GCD(${currentM}, ${nextM}) = ${g} tidak membagi ${diff}, SISTEM TIDAK MEMILIKI SOLUSI.`);
      return {
        hasSolution: false,
        solution: 0,
        modulus: 0,
        steps,
        equations: eqs
      };
    }

    steps.push(`   Karena GCD(${currentM}, ${nextM}) = ${g} membagi ${diff}, solusi untuk k₁ dijamin ada.`);

    const reducedM = currentM / g;
    const reducedDiff = diff / g;
    const reducedMod = nextM / g;
    
    if (g > 1) {
      steps.push(`   Sederhanakan persamaan dengan membagi ${g} → ${reducedM}k₁ ≡ ${reducedDiff} (mod ${reducedMod})`);
    }

    const { x: inv } = extGCD(((reducedM % reducedMod) + reducedMod) % reducedMod, reducedMod);
    const modInv = (inv % reducedMod + reducedMod) % reducedMod;
    
    steps.push(`   Invers perkalian dari ${reducedM} modulo ${reducedMod} adalah ${modInv} (karena ${reducedM} × ${modInv} = ${reducedM * modInv} ≡ 1 mod ${reducedMod})`);

    const k0 = (reducedDiff * modInv) % reducedMod;
    steps.push(`   Sehingga diperoleh: k₁ ≡ ${reducedDiff} × ${modInv} ≡ ${k0} (mod ${reducedMod})`);
    steps.push(`   Dapat ditulis sebagai: k₁ = ${k0} + ${reducedMod}k₂  ...(iv)`);

    steps.push(`Langkah 3: Substitusikan k₁ kembali ke persamaan (iii):`);
    steps.push(`   x = ${currentA} + ${currentM}(${k0} + ${reducedMod}k₂)`);
    
    const newA = currentA + currentM * k0;
    const newM = currentM * reducedMod;
    steps.push(`   x = ${currentA} + ${currentM * k0} + ${newM}k₂`);
    steps.push(`   x = ${newA} + ${newM}k₂`);
    steps.push(`   x ≡ ${newA} (mod ${newM})`);

    currentA = ((newA % newM) + newM) % newM;
    currentM = newM;
  }

  steps.push(`\n==================================================`);
  steps.push(`Solusi Umum Sistem Kekongruenan Linier:`);
  steps.push(`   x ≡ ${currentA} (mod ${currentM})`);
  steps.push(`\nHimpunan Solusi Positif:`);
  
  const solList: number[] = [];
  for (let s = 0; s < 4; s++) {
    solList.push(currentA + s * currentM);
  }
  steps.push(`   x = ${solList.join(', ')}, ...`);
  steps.push(`\nVerifikasi solusi x = ${currentA}:`);
  eqs.forEach((eq, idx) => {
    const rem = currentA % eq.m;
    steps.push(`   Persamaan (${idx + 1}): ${currentA} mod ${eq.m} = ${rem} (Sesuai sisa ${eq.a}) ${rem === (eq.a % eq.m) ? '✓' : '✗'}`);
  });

  return {
    hasSolution: true,
    solution: currentA,
    modulus: currentM,
    steps,
    equations: eqs
  };
}
