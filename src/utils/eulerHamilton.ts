export interface EulerAnalysis {
  type: 'circuit' | 'path' | 'none';
  trail: string[] | null;
  oddVertices: string[];
  degrees: { label: string; deg: number; isOdd: boolean }[];
}

export interface HamiltonAnalysis {
  hasCircuit: boolean;
  circuit: string[] | null;
  hasPath: boolean;
  path: string[] | null;
}

/**
 * Analyses Euler circuits and paths in a symmetric adjacency matrix.
 */
export function analyzeEuler(matrix: number[][], labels: string[]): EulerAnalysis {
  const size = matrix.length;
  
  // Compute degrees
  const degrees = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 1) {
        degrees[i]++;
      }
    }
  }

  const degDetails = labels.map((label, i) => ({
    label,
    deg: degrees[i],
    isOdd: degrees[i] % 2 !== 0
  }));

  const oddIndices = degDetails
    .map((d, i) => d.isOdd ? i : -1)
    .filter(idx => idx !== -1);

  const oddVertices = oddIndices.map(idx => labels[idx]);

  // Compute total edges
  let totalEdges = 0;
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      if (matrix[i][j] === 1) totalEdges++;
    }
  }

  if (totalEdges === 0) {
    return { type: 'none', trail: null, oddVertices, degrees: degDetails };
  }

  // Verification: connected graph component with edges check
  // For small graphs, we can run a simple DFS to ensure all edges are in the same component
  // Find a starting node that has at least one edge
  let startNode = -1;
  for (let i = 0; i < size; i++) {
    if (degrees[i] > 0) {
      startNode = i;
      break;
    }
  }

  if (startNode !== -1) {
    const visited = Array(size).fill(false);
    const q = [startNode];
    visited[startNode] = true;
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      for (let v = 0; v < size; v++) {
        if (matrix[u][v] === 1 && !visited[v]) {
          visited[v] = true;
          q.push(v);
        }
      }
    }
    // If there is any node with degree > 0 that was not visited, graph with edges is disconnected
    for (let i = 0; i < size; i++) {
      if (degrees[i] > 0 && !visited[i]) {
        // Disconnected component containing edges means no Euler circuit/path can exist
        return { type: 'none', trail: null, oddVertices, degrees: degDetails };
      }
    }
  }

  // An Euler circuit exists iff all vertices with degree > 0 are in a single component and have even degree
  // An Euler path exists iff all vertices with degree > 0 are in a single component and exactly 2 have odd degree
  if (oddIndices.length !== 0 && oddIndices.length !== 2) {
    return { type: 'none', trail: null, oddVertices, degrees: degDetails };
  }

  // Backtracking to find a valid trail
  // If path exists, it MUST start at one of the odd degree vertices.
  const startNodes = oddIndices.length === 2 ? oddIndices : [startNode];

  for (const start of startNodes) {
    const edgeUsed = Array(size).fill(0).map(() => Array(size).fill(false));
    const path: number[] = [start];

    function dfs(u: number, edgesVisited: number): boolean {
      if (edgesVisited === totalEdges) {
        if (oddIndices.length === 0 && u !== start) return false;
        return true;
      }

      for (let v = 0; v < size; v++) {
        if (matrix[u][v] === 1 && !edgeUsed[u][v] && !edgeUsed[v][u]) {
          edgeUsed[u][v] = true;
          edgeUsed[v][u] = true;
          path.push(v);

          if (dfs(v, edgesVisited + 1)) return true;

          path.pop();
          edgeUsed[u][v] = false;
          edgeUsed[v][u] = false;
        }
      }
      return false;
    }

    if (dfs(start, 0)) {
      return {
        type: oddIndices.length === 0 ? 'circuit' : 'path',
        trail: path.map(idx => labels[idx]),
        oddVertices,
        degrees: degDetails
      };
    }
  }

  return { type: 'none', trail: null, oddVertices, degrees: degDetails };
}

/**
 * Analyses Hamilton circuits and paths in a symmetric adjacency matrix.
 */
export function analyzeHamilton(matrix: number[][], labels: string[]): HamiltonAnalysis {
  const size = matrix.length;
  if (size === 0) return { hasCircuit: false, circuit: null, hasPath: false, path: null };

  let foundCircuit: number[] | null = null;
  let foundPath: number[] | null = null;

  // Search for Hamilton Circuit starting from node 0
  const path: number[] = [0];
  const visited = Array(size).fill(false);
  visited[0] = true;

  function dfsCircuit(u: number): boolean {
    if (path.length === size) {
      if (matrix[u][0] === 1) {
        foundCircuit = [...path, 0];
        return true;
      }
      return false;
    }

    for (let v = 0; v < size; v++) {
      if (matrix[u][v] === 1 && !visited[v]) {
        visited[v] = true;
        path.push(v);
        if (dfsCircuit(v)) return true;
        path.pop();
        visited[v] = false;
      }
    }
    return false;
  }

  dfsCircuit(0);

  // Search for Hamilton Path starting from all possible nodes
  for (let start = 0; start < size; start++) {
    const pPath: number[] = [start];
    const pVisited = Array(size).fill(false);
    pVisited[start] = true;

    function dfsPath(u: number): boolean {
      if (pPath.length === size) {
        foundPath = [...pPath];
        return true;
      }

      for (let v = 0; v < size; v++) {
        if (matrix[u][v] === 1 && !pVisited[v]) {
          pVisited[v] = true;
          pPath.push(v);
          if (dfsPath(v)) return true;
          pPath.pop();
          pVisited[v] = false;
        }
      }
      return false;
    }

    if (dfsPath(start)) {
      break;
    }
  }

  return {
    hasCircuit: foundCircuit !== null,
    circuit: foundCircuit ? (foundCircuit as number[]).map(idx => labels[idx]) : null,
    hasPath: foundPath !== null,
    path: foundPath ? (foundPath as number[]).map(idx => labels[idx]) : null
  };
}
