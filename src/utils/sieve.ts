export interface SieveStep {
  prime: number;
  eliminated: number[];
}

export interface SieveResult {
  limit: number;
  primes: number[];
  steps: SieveStep[];
  allNumbers: { value: number; isPrime: boolean; eliminatedBy: number | null }[];
}

export function sieveOfEratosthenes(limit: number): SieveResult {
  const isPrime = new Array(limit + 1).fill(true);
  const eliminatedBy = new Array(limit + 1).fill(null);
  isPrime[0] = false;
  isPrime[1] = false;

  const steps: SieveStep[] = [];

  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      const eliminated: number[] = [];
      for (let j = i * i; j <= limit; j += i) {
        if (isPrime[j]) {
          isPrime[j] = false;
          eliminatedBy[j] = i;
          eliminated.push(j);
        }
      }
      if (eliminated.length > 0) {
        steps.push({ prime: i, eliminated });
      }
    }
  }

  const primes: number[] = [];
  const allNumbers = [];

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) primes.push(i);
    allNumbers.push({ value: i, isPrime: isPrime[i], eliminatedBy: eliminatedBy[i] });
  }

  return { limit, primes, steps, allNumbers };
}
