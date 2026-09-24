// ---------------------------------------------------------------------------
// Pure, dependency-free ML demos. Everything runs on a seeded PRNG so the
// notebooks are reproducible — and fully testable in plain Node.
// ---------------------------------------------------------------------------

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Box–Muller gaussian from a uniform source
export function makeGauss(rng: () => number) {
  let spare: number | null = null;
  return function gauss(): number {
    if (spare !== null) {
      const v = spare;
      spare = null;
      return v;
    }
    let u = 0;
    let v = 0;
    while (u === 0) u = rng();
    while (v === 0) v = rng();
    const mag = Math.sqrt(-2.0 * Math.log(u));
    spare = mag * Math.sin(2 * Math.PI * v);
    return mag * Math.cos(2 * Math.PI * v);
  };
}

// ---------------------------------------------------------------- logistic regression

export interface LinPoint {
  x: number;
  y: number;
}

export interface LogRegResult {
  w: number;
  b: number;
  acc: number;
  history: number[]; // training loss per step (sampled)
}

export function trainLogistic(
  data: LinPoint[],
  steps = 400,
  lr = 0.5,
): LogRegResult {
  let w = 0;
  let b = 0;
  const history: number[] = [];
  const n = data.length;
  for (let s = 0; s < steps; s++) {
    let gw = 0;
    let gb = 0;
    let loss = 0;
    for (const p of data) {
      const z = w * p.x + b;
      const pHat = 1 / (1 + Math.exp(-z));
      const err = pHat - p.y;
      gw += err * p.x;
      gb += err;
      loss += -(p.y * Math.log(Math.max(1e-9, pHat)) + (1 - p.y) * Math.log(Math.max(1e-9, 1 - pHat)));
    }
    w -= lr * (gw / n);
    b -= lr * (gb / n);
    if (s % 8 === 0 || s === steps - 1) history.push(loss / n);
  }
  let correct = 0;
  for (const p of data) {
    const pred = 1 / (1 + Math.exp(-(w * p.x + b))) >= 0.5 ? 1 : 0;
    if (pred === p.y) correct++;
  }
  return { w, b, acc: correct / n, history };
}

export function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// ----------------------------------------------------------------- k-NN classifier

export function makeNNDataset(seed = 7, perClass = 30): { x: number[]; y: number; label: number }[] {
  const rng = mulberry32(seed);
  const g = makeGauss(rng);
  const pts: { x: [number, number]; y: number; label: number }[] = [];
  const blobs: [number, number, number][] = [
    [-2.2, -1.2, 0],
    [2.0, -1.4, 0],
    [0.2, 2.1, 1],
  ];
  for (const [cx, cy, label] of blobs) {
    for (let i = 0; i < perClass; i++) {
      pts.push({ x: [cx + g() * 0.72, cy + g() * 0.72], y: label, label });
    }
  }
  return pts.map((p) => ({ x: p.x, y: p.y, label: p.label }));
}

export function knnPredict(
  train: { x: number[]; y: number }[],
  q: number[],
  k = 5,
): number {
  const dists = train
    .map((p) => ({ y: p.y, d: (p.x[0] - q[0]) ** 2 + (p.x[1] - q[1]) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k);
  let votes = 0;
  for (const d of dists) votes += d.y;
  return votes * 2 >= k ? 1 : 0;
}

// --------------------------------------------------------------------- MLP

export interface MLPParams {
  w1: number[][];
  b1: number[];
  w2: number[][];
  b2: number[];
  w3: number[][];
  b3: number[];
}

function initLayer(rng: () => number, fanIn: number, fanOut: number, scale = 1.6): { w: number[][]; b: number[] } {
  const w: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < fanOut; i++) {
    const row: number[] = [];
    for (let j = 0; j < fanIn; j++) row.push((rng() * 2 - 1) * scale);
    w.push(row);
    b.push(0);
  }
  return { w, b };
}

export function initMLP(seed = 11): MLPParams {
  const rng = mulberry32(seed);
  const l1 = initLayer(rng, 2, 16);
  const l2 = initLayer(rng, 16, 8);
  const l3 = initLayer(rng, 8, 1, 1.0);
  return { w1: l1.w, b1: l1.b, w2: l2.w, b2: l2.b, w3: l3.w, b3: l3.b };
}

function mlpForward(p: MLPParams, x: number[]) {
  const a1 = p.w1.map((row, i) => Math.tanh(row.reduce((s, v, j) => s + v * x[j], 0) + p.b1[i]));
  const a2 = p.w2.map((row, i) => Math.tanh(row.reduce((s, v, j) => s + v * a1[j], 0) + p.b2[i]));
  const z3 = p.w3[0].reduce((s, v, j) => s + v * a2[j], 0) + p.b3[0];
  const a3 = sigmoid(z3);
  return { a1, a2, z3, a3 };
}

export function mlpPredict(p: MLPParams, x: number[]): number {
  return mlpForward(p, x).a3;
}

export interface TrainStep {
  params: MLPParams;
  loss: number;
}

export function mlpTrainStep(p: MLPParams, batch: { x: number[]; y: number }[], lr: number): TrainStep {
  let loss = 0;
  for (const { x, y } of batch) loss += -(y * Math.log(Math.max(1e-9, mlpPredict(p, x))) + (1 - y) * Math.log(Math.max(1e-9, 1 - mlpPredict(p, x))));
  loss /= batch.length;

  // gradients for a single sample, averaged over the batch
  const g = { w1: Array.from({ length: 16 }, () => Array(2).fill(0)), b1: Array(16).fill(0), w2: Array.from({ length: 8 }, () => Array(16).fill(0)), b2: Array(8).fill(0), w3: [Array(8).fill(0)], b3: [0] };
  for (const { x, y } of batch) {
    const f = mlpForward(p, x);
    const d3 = f.a3 - y;
    for (let j = 0; j < 8; j++) g.w3[0][j] += d3 * f.a2[j];
    g.b3[0] += d3;
    // d2 = d3 * w3 * (1 - a2^2)
    const d2 = Array.from({ length: 8 }, (_, j) => d3 * p.w3[0][j] * (1 - f.a2[j] * f.a2[j]));
    // d1 = (d2 · w2[j]) backpropagated through tanh of layer 1
    const d1 = Array(16).fill(0) as number[];
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 16; i++) g.w2[j][i] += d2[j] * f.a1[i];
      g.b2[j] += d2[j];
    }
    for (let i = 0; i < 16; i++) {
      let s = 0;
      for (let j = 0; j < 8; j++) s += d2[j] * p.w2[j][i];
      d1[i] = s * (1 - f.a1[i] * f.a1[i]);
    }
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 2; j++) g.w1[i][j] += d1[i] * x[j];
      g.b1[i] += d1[i];
    }
  }
  const m = batch.length;
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 2; j++) p.w1[i][j] -= lr * (g.w1[i][j] / m);
    p.b1[i] -= lr * (g.b1[i] / m);
  }
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 16; i++) p.w2[j][i] -= lr * (g.w2[j][i] / m);
    p.b2[j] -= lr * (g.b2[j] / m);
  }
  for (let j = 0; j < 8; j++) p.w3[0][j] -= lr * (g.w3[0][j] / m);
  p.b3[0] -= lr * (g.b3[0] / m);
  return { params: p, loss };
}

// --------------------------------------------------------------------- k-means

export interface KmeansResult {
  centroids: [number, number][];
  assign: number[];
  cohesion: number; // 0..1, higher = tighter clusters (1 - mean/maxDist heuristic)
}

export function trainKmeans(
  pts: { x: [number, number] }[],
  k = 3,
  iters = 60,
  seed = 3,
): KmeansResult {
  const rng = mulberry32(seed);
  const n = pts.length;
  // k-means++ style seeding
  const first = Math.floor(rng() * n);
  const centroids: [number, number][] = [[pts[first].x[0], pts[first].x[1]]];
  while (centroids.length < k) {
    let total = 0;
    for (const p of pts) {
      let dmin = Infinity;
      for (const c of centroids) {
        const d = (p.x[0] - c[0]) ** 2 + (p.x[1] - c[1]) ** 2;
        if (d < dmin) dmin = d;
      }
      total += dmin;
    }
    let r = rng() * total;
    let pick = pts[0];
    for (const p of pts) {
      let dmin = Infinity;
      for (const c of centroids) {
        const d = (p.x[0] - c[0]) ** 2 + (p.x[1] - c[1]) ** 2;
        if (d < dmin) dmin = d;
      }
      r -= dmin;
      pick = p;
      if (r <= 0) break;
    }
    centroids.push([pick.x[0], pick.x[1]]);
  }
  const assign = new Array<number>(n).fill(0);
  let meanDist = 0;
  let maxDist = 0;
  for (let it = 0; it < iters; it++) {
    for (let i = 0; i < n; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < k; c++) {
        const d = (pts[i].x[0] - centroids[c][0]) ** 2 + (pts[i].x[1] - centroids[c][1]) ** 2;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      assign[i] = best;
    }
    for (let c = 0; c < k; c++) {
      let sx = 0;
      let sy = 0;
      let cnt = 0;
      for (let i = 0; i < n; i++) {
        if (assign[i] === c) {
          sx += pts[i].x[0];
          sy += pts[i].x[1];
          cnt++;
        }
      }
      if (cnt > 0) {
        centroids[c] = [sx / cnt, sy / cnt];
      }
    }
  }
  for (let i = 0; i < n; i++) {
    const d = Math.sqrt((pts[i].x[0] - centroids[assign[i]][0]) ** 2 + (pts[i].x[1] - centroids[assign[i]][1]) ** 2);
    meanDist += d;
    if (d > maxDist) maxDist = d;
  }
  meanDist /= n;
  const cohesion = maxDist > 0 ? Math.max(0, 1 - meanDist / maxDist) : 1;
  return { centroids, assign, cohesion };
}

// ------------------------------------------------------------------- PCA

export interface PCAResult {
  mean: [number, number];
  // unit vector of PC1 in data space
  axis: [number, number];
  // project point
}

export function pca1(pts: { x: [number, number] }[]): { first: PCAResult; projected: number[]; min: number; max: number } {
  const n = pts.length;
  let mx = 0;
  let my = 0;
  for (const p of pts) {
    mx += p.x[0];
    my += p.x[1];
  }
  mx /= n;
  my /= n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const p of pts) {
    const dx = p.x[0] - mx;
    const dy = p.x[1] - my;
    sxx += dx * dx;
    sxy += dx * dy;
    syy += dy * dy;
  }
  // first principal component of a 2x2 covariance
  const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  const axis: [number, number] = [Math.cos(theta), Math.sin(theta)];
  const projected: number[] = [];
  let min = Infinity;
  let max = -Infinity;
  for (const p of pts) {
    const v = (p.x[0] - mx) * axis[0] + (p.x[1] - my) * axis[1];
    projected.push(v);
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { first: { mean: [mx, my], axis }, projected, min, max };
}

// -------------------------------------------------------------------- naive bayes

interface NBModel {
  mean: [number[], number[]]; // [class0 means, class1 means] per feature
  sd: [number[], number[]];
  prior: [number, number];
}

export function trainNaiveBayes(data: { x: number[]; y: number }[]): NBModel {
  const X0 = data.filter((d) => d.y === 0);
  const X1 = data.filter((d) => d.y === 1);
  const features = data[0]?.x?.length ?? 0;
  const mean = (xs: number[][]) => {
    const out: number[] = [];
    for (let i = 0; i < features; i++) out.push(xs.length ? xs.reduce((a, d) => a + d[i], 0) / xs.length : 0);
    return out;
  };
  const sd = (xs: number[][], m: number[]) => {
    const out: number[] = [];
    for (let i = 0; i < features; i++) {
      const v = xs.length ? Math.sqrt(xs.reduce((a, d) => a + (d[i] - m[i]) ** 2, 0) / xs.length) : 1;
      out.push(Math.max(1e-3, v));
    }
    return out;
  };
  const m0 = mean(X0.map((d) => d.x));
  const m1 = mean(X1.map((d) => d.x));
  return {
    mean: [m0, m1],
    sd: [sd(X0.map((d) => d.x), m0), sd(X1.map((d) => d.x), m1)],
    prior: [X0.length / data.length, X1.length / data.length],
  };
}

export function nbPredict(model: NBModel, x: number[]): number {
  let l0 = Math.log(Math.max(1e-9, model.prior[0]));
  let l1 = Math.log(Math.max(1e-9, model.prior[1]));
  for (let i = 0; i < x.length; i++) {
    l0 += -0.5 * Math.log(2 * Math.PI * model.sd[0][i] ** 2) - ((x[i] - model.mean[0][i]) ** 2) / (2 * model.sd[0][i] ** 2);
    l1 += -0.5 * Math.log(2 * Math.PI * model.sd[1][i] ** 2) - ((x[i] - model.mean[1][i]) ** 2) / (2 * model.sd[1][i] ** 2);
  }
  return l1 > l0 ? 1 : 0;
}

// Gaussian generative 2-class scatter for NB / PCA / kNN share this dataset style
export function makeGaussian2D(seed = 5, perClass = 40): { x: [number, number]; y: number }[] {
  const rng = mulberry32(seed);
  const g = makeGauss(rng);
  const pts: { x: [number, number]; y: number }[] = [];
  const blobs: [number, number, number][] = [
    [-2.4, -1.0, 0],
    [1.8, -1.6, 0],
    [-0.2, 2.2, 1],
  ];
  for (const [cx, cy, label] of blobs) {
    for (let i = 0; i < perClass; i++) {
      pts.push({ x: [cx + g() * 0.85, cy + g() * 0.85], y: label });
    }
  }
  // shuffle
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  return pts;
}
