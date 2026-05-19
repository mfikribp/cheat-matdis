export function matrixJoin(A: number[][], B: number[][]): number[][] {
  const size = A.length
  const result: number[][] = []
  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      row.push(A[i][j] | B[i][j])
    }
    result.push(row)
  }
  return result
}

export function matrixMeet(A: number[][], B: number[][]): number[][] {
  const size = A.length
  const result: number[][] = []
  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      row.push(A[i][j] & B[i][j])
    }
    result.push(row)
  }
  return result
}

export interface CompositionStep {
  i: number
  j: number
  expression: string // e.g., "(1 ∧ 1) ∨ (1 ∧ 0) ∨ (1 ∧ 0)"
  result: number
}

export function solveComposition(A: number[][], B: number[][]): { matrix: number[][]; steps: CompositionStep[] } {
  const size = A.length
  const matrix: number[][] = []
  const steps: CompositionStep[] = []

  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      let sum = 0
      const terms: string[] = []
      for (let k = 0; k < size; k++) {
        const valA = A[i][k]
        const valB = B[k][j]
        const valProduct = valA & valB
        sum |= valProduct
        terms.push(`(${valA} ∧ ${valB})`)
      }
      row.push(sum)
      steps.push({
        i,
        j,
        expression: terms.join(' ∨ '),
        result: sum,
      })
    }
    matrix.push(row)
  }

  return { matrix, steps }
}
