export interface Edge {
  id: string;
  u: number; // 0-indexed node index
  v: number; // 0-indexed node index
  isLoop: boolean;
}

export interface GraphNode {
  index: number;
  label: string;
  degree: number;
  hasLoop: boolean;
  x: number;
  y: number;
}

// Fixed permutations for isomorphic star-like drawing
const PERMUTATIONS: Record<number, number[]> = {
  3: [0, 2, 1],
  4: [0, 2, 1, 3],
  5: [0, 2, 4, 1, 3], // Classic pentagram star sequence
  6: [0, 2, 4, 1, 3, 5],
  8: [0, 3, 6, 1, 4, 7, 2, 5]
};

/**
 * Computes vertex degrees for an undirected graph from adjacency matrix.
 * Note: A self loop (diagonal = 1) adds +2 to the degree of that vertex.
 */
export function getVertexDegrees(matrix: number[][]): number[] {
  const size = matrix.length;
  const degrees = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    let sum = 0;
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 1) {
        if (i === j) {
          sum += 2; // self-loop adds 2 to degree
        } else {
          sum += 1;
        }
      }
    }
    degrees[i] = sum;
  }
  return degrees;
}

/**
 * Extracts all unique edges (including self-loops) from the symmetric matrix.
 */
export function getEdges(matrix: number[][]): Edge[] {
  const size = matrix.length;
  const edges: Edge[] = [];
  for (let i = 0; i < size; i++) {
    for (let j = i; j < size; j++) {
      if (matrix[i][j] === 1) {
        edges.push({
          id: `edge-${i}-${j}`,
          u: i,
          v: j,
          isLoop: i === j
        });
      }
    }
  }
  return edges;
}

/**
 * Computes coordinates for standard circular layout (Layout 1)
 */
export function getCircularLayout(
  matrix: number[][],
  cx: number,
  cy: number,
  r: number
): GraphNode[] {
  const size = matrix.length;
  const degrees = getVertexDegrees(matrix);

  // Exact rectangular coordinates matching the slide for N=5
  if (size === 5) {
    const coords = [
      { x: cx - 110, y: cy - 60 }, // v1 (Top-Left)
      { x: cx,       y: cy - 60 }, // v2 (Top-Middle)
      { x: cx + 110, y: cy - 60 }, // v3 (Top-Right)
      { x: cx + 110, y: cy + 60 }, // v4 (Bottom-Right)
      { x: cx - 110, y: cy + 60 }  // v5 (Bottom-Left)
    ];
    return coords.map((c, i) => ({
      index: i,
      label: `v${i + 1}`,
      degree: degrees[i],
      hasLoop: matrix[i][i] === 1,
      x: c.x,
      y: c.y
    }));
  }

  return Array(size)
    .fill(0)
    .map((_, i) => {
      const angle = (2 * Math.PI * i) / size - Math.PI / 2; // Start from top
      return {
        index: i,
        label: size === 8 ? String.fromCharCode(65 + i) : `v${i + 1}`,
        degree: degrees[i],
        hasLoop: matrix[i][i] === 1,
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    });
}

/**
 * Computes coordinates for isomorphic star/permuted layout (Layout 2)
 */
export function getIsomorphicLayout(
  matrix: number[][],
  cx: number,
  cy: number,
  r: number
): GraphNode[] {
  const size = matrix.length;
  const degrees = getVertexDegrees(matrix);

  // Exact fan/pyramid coordinates matching the slide for N=5
  if (size === 5) {
    const coords = [
      { x: cx - 120, y: cy + 30 }, // u1 (Bottom-Left-most)
      { x: cx,       y: cy - 80 }, // u2 (Top peak)
      { x: cx + 120, y: cy + 30 }, // u3 (Bottom-Right-most)
      { x: cx + 40,  y: cy + 80 }, // u4 (Bottom-Middle-Right)
      { x: cx - 40,  y: cy + 80 }  // u5 (Bottom-Middle-Left)
    ];
    return coords.map((c, i) => ({
      index: i,
      label: `u${i + 1}`,
      degree: degrees[i],
      hasLoop: matrix[i][i] === 1,
      x: c.x,
      y: c.y
    }));
  }

  const perm = PERMUTATIONS[size] || Array.from({ length: size }, (_, i) => i);
  return Array(size)
    .fill(0)
    .map((_, i) => {
      const targetPos = perm.indexOf(i); // Permute circular positions
      const angle = (2 * Math.PI * targetPos) / size - Math.PI / 2;
      return {
        index: i,
        label: size === 8 ? String.fromCharCode(65 + i) : `u${i + 1}`,
        degree: degrees[i],
        hasLoop: matrix[i][i] === 1,
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    });
}

/**
 * Returns the mapping function f(v_i) = u_j for the isomorphism mapping
 */
export function getIsomorphismMapping(size: number): { from: string; to: string }[] {
  // Simpul v_i di petakan ke u_j berdasarkan posisinya
  return Array.from({ length: size }, (_, i) => {
    return {
      from: `v${i + 1}`,
      to: `u${i + 1}`
    };
  });
}

/**
 * Welch-Powell Greedy Graph Coloring Algorithm.
 * Returns an array of color indices for each vertex.
 */
export function getWelchPowellColoring(matrix: number[][]): number[] {
  const size = matrix.length;
  const degrees = getVertexDegrees(matrix);
  
  // Create vertex objects with original indices
  const vertices = Array.from({ length: size }, (_, i) => ({
    index: i,
    degree: degrees[i]
  }));
  
  // Sort vertices in descending order of their degree
  vertices.sort((a, b) => b.degree - a.degree);
  
  const colors = Array(size).fill(-1);
  let colorCounter = 0;
  
  while (vertices.some(v => colors[v.index] === -1)) {
    // Pick the first uncolored vertex
    const firstUncolored = vertices.find(v => colors[v.index] === -1);
    if (!firstUncolored) break;
    
    const currentColor = colorCounter;
    colors[firstUncolored.index] = currentColor;
    
    // Find other uncolored vertices that can be colored with currentColor
    // A vertex can be colored if it is not adjacent to any vertex already colored with currentColor
    for (const v of vertices) {
      if (colors[v.index] !== -1) continue;
      
      // Check if adjacent to any vertex with currentColor (ignoring self-loops)
      let canColor = true;
      for (let i = 0; i < size; i++) {
        if (i !== v.index && colors[i] === currentColor && matrix[v.index][i] === 1) {
          canColor = false;
          break;
        }
      }
      
      if (canColor) {
        colors[v.index] = currentColor;
      }
    }
    
    colorCounter++;
  }
  
  return colors;
}
