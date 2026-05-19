export interface PigeonholeResult {
  pigeons: number;
  holes: number;
  minGuaranteed: number;
  minPigeonsForK: number | null;
  k: number;
  steps: string[];
  explanation: string;
}

export function hitungPigeonhole(pigeons: number, holes: number, k: number): PigeonholeResult {
  // Minimum pigeons needed to guarantee k pigeons in one hole
  const minPigeonsForK = (k - 1) * holes + 1;

  // If we have `pigeons` pigeons in `holes` holes, what's the minimum guaranteed max?
  const minGuaranteed = Math.ceil(pigeons / holes);

  const steps: string[] = [
    `📌 Prinsip Pigeonhole: Jika n merpati dimasukkan ke k kandang,`,
    `   maka minimal ada satu kandang yang berisi ⌈n/k⌉ merpati.`,
    ``,
    `🔢 Diberikan: ${pigeons} merpati, ${holes} kandang`,
    ``,
    `📊 Jumlah merpati minimum yang PASTI ada di satu kandang:`,
    `   ⌈${pigeons} / ${holes}⌉ = ⌈${pigeons / holes}⌉ = ${minGuaranteed}`,
    ``,
    `🎯 Agar PASTI ada ${k} merpati di satu kandang, butuh minimal:`,
    `   (k − 1) × kandang + 1 = (${k} − 1) × ${holes} + 1 = ${minPigeonsForK} merpati`,
  ];

  const explanation =
    pigeons >= minPigeonsForK
      ? `✅ Dengan ${pigeons} merpati di ${holes} kandang, PASTI ada kandang dengan minimal ${k} merpati!`
      : `❌ Dengan ${pigeons} merpati di ${holes} kandang, belum tentu ada kandang dengan ${k} merpati. Butuh minimal ${minPigeonsForK} merpati.`;

  return { pigeons, holes, minGuaranteed, minPigeonsForK, k, steps, explanation };
}
