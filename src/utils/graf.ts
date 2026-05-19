export interface GrafEdge {
  u: number;
  v: number;
}

export interface GrafResult {
  vertices: number;
  edges: GrafEdge[];
  edgeCount: number;
  degreeSequence: { vertex: number; degree: number }[];
  sumDegrees: number;
  handshakingCheck: boolean;
  hasEulerCircuit: boolean;
  hasEulerPath: boolean;
  eulerPathVertices: number[];
  oddDegreeVertices: number[];
  steps: string[];
  isConnected: boolean | null; // null = not computed for large graphs
}

export function analyzeGraf(vertices: number, edges: GrafEdge[]): GrafResult {
  const steps: string[] = [];

  // Build adjacency and degree count
  const degree: number[] = new Array(vertices + 1).fill(0);
  const adj: Set<number>[] = Array.from({ length: vertices + 1 }, () => new Set());

  for (const e of edges) {
    if (e.u >= 1 && e.u <= vertices && e.v >= 1 && e.v <= vertices && e.u !== e.v) {
      degree[e.u]++;
      degree[e.v]++;
      adj[e.u].add(e.v);
      adj[e.v].add(e.u);
    }
  }

  const degreeSequence = Array.from({ length: vertices }, (_, i) => ({
    vertex: i + 1,
    degree: degree[i + 1],
  })).sort((a, b) => b.degree - a.degree);

  const sumDegrees = degreeSequence.reduce((s, d) => s + d.degree, 0);
  const handshakingCheck = sumDegrees === 2 * edges.length;

  steps.push(`Graf G = (V, E) dengan |V| = ${vertices}, |E| = ${edges.length}`);
  steps.push(`Handshaking Lemma: Σdeg(v) = 2|E|`);
  steps.push(`Σdeg(v) = ${sumDegrees}, 2|E| = ${2 * edges.length} → ${handshakingCheck ? '✓ Terbukti' : '✗ Periksa input'}`);

  const oddDegreeVertices = degreeSequence.filter(d => d.degree % 2 !== 0).map(d => d.vertex);
  steps.push(`Vertex berderajat ganjil: ${oddDegreeVertices.length === 0 ? 'tidak ada' : `{${oddDegreeVertices.join(', ')}}`}`);

  const hasEulerCircuit = oddDegreeVertices.length === 0;
  const hasEulerPath = oddDegreeVertices.length === 2;

  if (hasEulerCircuit) {
    steps.push(`✅ Euler Circuit ada: semua vertex berderajat genap`);
  } else if (hasEulerPath) {
    steps.push(`✅ Euler Path ada: tepat 2 vertex berderajat ganjil (vertex ${oddDegreeVertices[0]} dan ${oddDegreeVertices[1]})`);
    steps.push(`   Path dimulai dari vertex ${oddDegreeVertices[0]} dan berakhir di vertex ${oddDegreeVertices[1]}`);
  } else {
    steps.push(`❌ Tidak ada Euler Path/Circuit: ada ${oddDegreeVertices.length} vertex berderajat ganjil`);
  }

  // BFS connectivity check
  let isConnected: boolean | null = null;
  if (vertices <= 50) {
    const visited = new Set<number>();
    // Find a vertex with degree > 0
    let start = 1;
    for (let i = 1; i <= vertices; i++) {
      if (degree[i] > 0) { start = i; break; }
    }
    const queue = [start];
    visited.add(start);
    while (queue.length > 0) {
      const cur = queue.shift()!;
      for (const nb of adj[cur]) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
        }
      }
    }
    // Check all vertices with degree > 0 are visited
    isConnected = Array.from({ length: vertices }, (_, i) => i + 1)
      .filter(v => degree[v] > 0)
      .every(v => visited.has(v));
    steps.push(`Konektivitas: Graf ${isConnected ? '✅ terhubung' : '❌ tidak terhubung'}`);
  }

  return {
    vertices,
    edges,
    edgeCount: edges.length,
    degreeSequence,
    sumDegrees,
    handshakingCheck,
    hasEulerCircuit,
    hasEulerPath,
    eulerPathVertices: oddDegreeVertices,
    oddDegreeVertices,
    steps,
    isConnected,
  };
}

export function parseEdges(input: string, vertices: number): GrafEdge[] {
  const edges: GrafEdge[] = [];
  const lines = input.trim().split(/[\n,;]+/);
  for (const line of lines) {
    const parts = line.trim().split(/[\s\-–]+/);
    if (parts.length >= 2) {
      const u = parseInt(parts[0]);
      const v = parseInt(parts[1]);
      if (!isNaN(u) && !isNaN(v) && u >= 1 && u <= vertices && v >= 1 && v <= vertices) {
        edges.push({ u, v });
      }
    }
  }
  return edges;
}
