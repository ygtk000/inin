  // --- İNİN v1.6: tek yüzey sistemi. Zemin ağı, yollar, kaldırımlar, binalar ve fizik aynı yükselti ızgarasını kullanır.
  // Yol boyuna profilleri yumuşatılır, kavşaklarda eşitlenir ve zemine "oyulur" (dolgu/yarma), kenarlara yumuşak geçiş.
  var HG = null;
  function hgAt(x2, z2) {
    let H = HG,
      fx = (x2 - H.x0) / H.s,
      fz = (z2 - H.z0) / H.s;
    ((fx = fx < 0 ? 0 : fx > H.nx - 1.0001 ? H.nx - 1.0001 : fx), (fz = fz < 0 ? 0 : fz > H.nz - 1.0001 ? H.nz - 1.0001 : fz));
    let i = fx | 0,
      j = fz | 0,
      a = fx - i,
      b = fz - j,
      G = H.g,
      k = j * H.nx + i,
      ha = G[k],
      hd = G[k + 1],
      hb = G[k + H.nx],
      hc = G[k + H.nx + 1];
    return a + b <= 1 ? ha + (hd - ha) * a + (hb - ha) * b : hc + (hb - hc) * (1 - a) + (hd - hc) * (1 - b);
  }
  function buildHG() {
    let s = 4,
      x0 = Me.minX - 48,
      z0 = Me.minZ - 48,
      nx = Math.ceil((Me.maxX + 48 - x0) / s) + 1,
      nz = Math.ceil((Me.maxZ + 48 - z0) / s) + 1;
    for (; (nx - 1) % 6;) nx++;
    for (; (nz - 1) % 6;) nz++;
    let N = nx * nz,
      g = new Float32Array(N);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) g[j * nx + i] = b6(x0 + i * s, z0 + j * s);
    // 1) yol profilleri
    let prof = [],
      nodeS = {},
      nodeC = {};
    for (let C of nt) {
      let L = C.line,
        n = L.length;
      if (n < 2) {
        prof.push(null);
        continue;
      }
      let cum = [0];
      for (let q = 1; q < n; q++) cum.push(cum[q - 1] + Math.hypot(L[q][0] - L[q - 1][0], L[q][1] - L[q - 1][1]));
      let raw = L.map((p) => b6(p[0], p[1])),
        R = C.type === "ana" ? 26 : C.type === "servis" ? 14 : 20,
        sm = (A) => {
          let out = new Array(n);
          for (let q = 0; q < n; q++) {
            let sum = 0,
              cnt = 0;
            for (let r = q; r >= 0 && cum[q] - cum[r] <= R; r--) ((sum += A[r]), cnt++);
            for (let r = q + 1; r < n && cum[r] - cum[q] <= R; r++) ((sum += A[r]), cnt++);
            out[q] = sum / cnt;
          }
          return out;
        },
        h = sm(sm(raw));
      prof.push({ cum, h });
      for (let [k, v] of [
        [C.a, h[0]],
        [C.b, h[n - 1]],
      ])
        ((nodeS[k] = (nodeS[k] || 0) + v), (nodeC[k] = (nodeC[k] || 0) + 1));
    }
    // 2) kavşak/birleşim noktalarında yüksekliği eşitle
    nt.forEach((C, q) => {
      let P = prof[q];
      if (!P) return;
      let n = P.h.length,
        len = P.cum[n - 1] || 1,
        d0 = nodeS[C.a] / nodeC[C.a] - P.h[0],
        d1 = nodeS[C.b] / nodeC[C.b] - P.h[n - 1];
      for (let r = 0; r < n; r++) P.h[r] += d0 + ((d1 - d0) * P.cum[r]) / len;
    });
    // 3) yol koridorlarını zemine uygula
    let W = new Float32Array(N),
      T = new Float32Array(N),
      Dd = new Float32Array(N).fill(1e9);
    nt.forEach((C, q) => {
      let P = prof[q];
      if (!P) return;
      let L = C.line,
        half = C.w / 2 + (C.sw ? 2.8 : 0.9),
        bl = 9,
        ext = half + bl;
      for (let r = 1; r < L.length; r++) {
        let ax = L[r - 1][0],
          az = L[r - 1][1],
          bx = L[r][0],
          bz = L[r][1],
          dx = bx - ax,
          dz = bz - az,
          ll = dx * dx + dz * dz || 1e-9,
          i0 = Math.max(0, Math.floor((Math.min(ax, bx) - ext - x0) / s)),
          i1 = Math.min(nx - 1, Math.ceil((Math.max(ax, bx) + ext - x0) / s)),
          j0 = Math.max(0, Math.floor((Math.min(az, bz) - ext - z0) / s)),
          j1 = Math.min(nz - 1, Math.ceil((Math.max(az, bz) + ext - z0) / s));
        for (let j = j0; j <= j1; j++)
          for (let i = i0; i <= i1; i++) {
            let px = x0 + i * s,
              pz = z0 + j * s,
              t2 = ((px - ax) * dx + (pz - az) * dz) / ll;
            t2 = t2 < 0 ? 0 : t2 > 1 ? 1 : t2;
            let ex = ax + dx * t2 - px,
              ez = az + dz * t2 - pz,
              d = Math.sqrt(ex * ex + ez * ez);
            if (d > ext) continue;
            let w2 = d <= half ? 1 : 1 - (((d - half) / bl) * ((d - half) / bl) * (3 - (2 * (d - half)) / bl)),
              k = j * nx + i,
              hh = P.h[r - 1] + (P.h[r] - P.h[r - 1]) * t2;
            (w2 > W[k] + 1e-4 || (w2 >= 0.999 && d < Dd[k])) && ((W[k] = w2), (T[k] = hh), w2 >= 0.999 && (Dd[k] = d));
          }
      }
    });
    for (let k = 0; k < N; k++) W[k] > 0 && (g[k] += W[k] * (T[k] - g[k]));
    HG = { x0, z0, s, nx, nz, g };
  }
  function GROUNDGEO() {
    let H = HG,
      X1 = H.x0 + (H.nx - 1) * H.s,
      Z1 = H.z0 + (H.nz - 1) * H.s,
      out = [],
      mk = (pos, uv, nor, idx) => {
        let geo = new St();
        return (
          geo.setAttribute("position", new tt(pos, 3)),
          geo.setAttribute("uv", new tt(uv, 2)),
          nor ? geo.setAttribute("normal", new tt(nor, 3)) : 0,
          geo.setIndex(idx),
          nor || geo.computeVertexNormals(),
          geo
        );
      },
      hv = (i, j) => H.g[Math.max(0, Math.min(H.nz - 1, j)) * H.nx + Math.max(0, Math.min(H.nx - 1, i))],
      TS = 60;
    // iç ızgara: 60x60 hücrelik karolar (görüş dışı karolar çizilmez), normaller yükseklikten
    for (let tj = 0; tj < H.nz - 1; tj += TS)
      for (let ti = 0; ti < H.nx - 1; ti += TS) {
        let i1 = Math.min(H.nx - 1, ti + TS),
          j1 = Math.min(H.nz - 1, tj + TS),
          w = i1 - ti + 1,
          pos = [],
          uv = [],
          nor = [],
          idx = [];
        for (let j = tj; j <= j1; j++)
          for (let i = ti; i <= i1; i++) {
            let x2 = H.x0 + i * H.s,
              z2 = H.z0 + j * H.s,
              nx2 = -(hv(i + 1, j) - hv(i - 1, j)) / (2 * H.s),
              nz2 = -(hv(i, j + 1) - hv(i, j - 1)) / (2 * H.s),
              l = Math.hypot(nx2, 1, nz2);
            (pos.push(x2, hv(i, j) - 0.02, z2), uv.push((x2 - Me.minX) / Ct, 1 - (z2 - Me.minZ) / It), nor.push(nx2 / l, 1 / l, nz2 / l));
          }
        for (let j = 0; j < j1 - tj; j++)
          for (let i = 0; i < i1 - ti; i++) {
            let a = j * w + i,
              b = a + w,
              c = b + 1,
              d = a + 1;
            idx.push(a, b, d, b, c, d);
          }
        out.push(mk(pos, uv, nor, idx));
      }
    // dış etek (kaba ızgara, iç alanı atlar) + sınırda çatlak örtüsü
    let pos = [],
      uv = [],
      idx = [],
      put = (x2, y2, z2) => (pos.push(x2, y2, z2), uv.push((x2 - Me.minX) / Ct, 1 - (z2 - Me.minZ) / It), pos.length / 3 - 1),
      S = H.s * 6,
      M = 20,
      ox = H.x0 - M * S,
      oz = H.z0 - M * S,
      cx = (H.nx - 1) / 6 + 2 * M + 1,
      cz = (H.nz - 1) / 6 + 2 * M + 1;
    for (let j = 0; j < cz; j++)
      for (let i = 0; i < cx; i++) {
        let x2 = ox + i * S,
          z2 = oz + j * S,
          qx = Math.max(H.x0, Math.min(X1, x2)),
          qz = Math.max(H.z0, Math.min(Z1, z2)),
          dd = Math.hypot(x2 - qx, z2 - qz);
        put(x2, hgAt(qx, qz) + dd * 0.22 - (dd > 0 ? 0.3 : 0.02), z2);
      }
    for (let j = 0; j < cz - 1; j++)
      for (let i = 0; i < cx - 1; i++) {
        let x2 = ox + i * S,
          z2 = oz + j * S;
        if (x2 >= H.x0 - 0.1 && x2 + S <= X1 + 0.1 && z2 >= H.z0 - 0.1 && z2 + S <= Z1 + 0.1) continue;
        let a = j * cx + i,
          b = a + cx,
          c = b + 1,
          d = a + 1;
        idx.push(a, b, d, b, c, d);
      }
    let curt = (ax, az, bx, bz) => {
      let p1 = put(ax, hgAt(ax, az) - 0.02, az),
        p2 = put(bx, hgAt(bx, bz) - 0.02, bz),
        p3 = put(bx, hgAt(bx, bz) - 4, bz),
        p4 = put(ax, hgAt(ax, az) - 4, az);
      idx.push(p1, p2, p3, p1, p3, p4, p1, p3, p2, p1, p4, p3);
    };
    for (let i = 0; i < H.nx - 1; i++) (curt(H.x0 + i * H.s, H.z0, H.x0 + (i + 1) * H.s, H.z0), curt(H.x0 + i * H.s, Z1, H.x0 + (i + 1) * H.s, Z1));
    for (let j = 0; j < H.nz - 1; j++) (curt(H.x0, H.z0 + j * H.s, H.x0, H.z0 + (j + 1) * H.s), curt(X1, H.z0 + j * H.s, X1, H.z0 + (j + 1) * H.s));
    return (out.push(mk(pos, uv, null, idx)), out);
  }
  // şerit (yol/kaldırım/patika) ağı: kırpma uçları tam noktada, enine alt bölümlü
  function stripPts(n, A, B) {
    let c = [0];
    for (let g = 1; g < n.length; g++) c.push(c[g - 1] + Math.hypot(n[g][0] - n[g - 1][0], n[g][1] - n[g - 1][1]));
    let at = (d) => {
        let g = 1;
        for (; g < n.length - 1 && c[g] < d;) g++;
        let s0 = c[g] - c[g - 1] || 1e-6,
          f = Math.max(0, Math.min(1, (d - c[g - 1]) / s0)),
          dx = (n[g][0] - n[g - 1][0]) / s0,
          dz = (n[g][1] - n[g - 1][1]) / s0;
        return [n[g - 1][0] + (n[g][0] - n[g - 1][0]) * f, n[g - 1][1] + (n[g][1] - n[g - 1][1]) * f, d, dx, dz];
      },
      P = [at(A)];
    for (let g = 0; g < n.length; g++)
      if (c[g] > A + 0.25 && c[g] < B - 0.25) {
        let p = n[Math.max(0, g - 1)],
          q = n[Math.min(n.length - 1, g + 1)],
          dx = q[0] - p[0],
          dz = q[1] - p[1],
          l = Math.hypot(dx, dz) || 1;
        P.push([n[g][0], n[g][1], c[g], dx / l, dz / l]);
      }
    return (P.push(at(B)), { P, len: c[c.length - 1] });
  }
  function v1(n, e, t, i, s, { trim0: a = 0, trim1: r = 0, uRep: o = 1 } = {}) {
    if (n.length < 2) return null;
    let len0 = 0;
    for (let g = 1; g < n.length; g++) len0 += Math.hypot(n[g][0] - n[g - 1][0], n[g][1] - n[g - 1][1]);
    let A = Math.max(0, a),
      B = len0 - Math.max(0, r);
    if (B - A < 0.3) return null;
    let { P } = stripPts(n, A, B),
      K = Math.max(1, Math.ceil(Math.abs(t - e) / 3.2)),
      h = [],
      f = [],
      p = [];
    P.forEach((q, m) => {
      for (let k = 0; k <= K; k++) {
        let off = e + ((t - e) * k) / K,
          x2 = q[0] - q[4] * off,
          z2 = q[1] + q[3] * off;
        (h.push(x2, Wt(x2, z2) + i, z2), f.push((o * k) / K, q[2] / s));
      }
      if (m > 0)
        for (let k = 0; k < K; k++) {
          let I = (m - 1) * (K + 1) + k,
            J = m * (K + 1) + k;
          p.push(I, J, I + 1, I + 1, J, J + 1);
        }
    });
    let y = new St();
    return (y.setAttribute("position", new tt(h, 3)), y.setAttribute("uv", new tt(f, 2)), y.setIndex(p), y.computeVertexNormals(), y);
  }
  function J0(n, e, t, i, s) {
    if (n.length < 2) return null;
    let len0 = 0;
    for (let g = 1; g < n.length; g++) len0 += Math.hypot(n[g][0] - n[g - 1][0], n[g][1] - n[g - 1][1]);
    let A = Math.max(0, s.trim0 || 0),
      B = len0 - Math.max(0, s.trim1 || 0);
    if (B - A < 0.3) return null;
    let { P } = stripPts(n, A, B),
      o = [],
      c = [],
      l = [];
    P.forEach((q, u) => {
      let E = q[0] - q[4] * e,
        w = q[1] + q[3] * e,
        v = Wt(E, w);
      if ((o.push(E, v + t, w, E, v + i, w), c.push(q[2] / 1.5, 0, q[2] / 1.5, 1), u > 0)) {
        let P2 = (u - 1) * 2;
        e > 0 ? l.push(P2, P2 + 1, P2 + 2, P2 + 1, P2 + 3, P2 + 2) : l.push(P2, P2 + 2, P2 + 1, P2 + 1, P2 + 2, P2 + 3);
      }
    });
    let h = new St();
    return (h.setAttribute("position", new tt(o, 3)), h.setAttribute("uv", new tt(c, 2)), h.setIndex(l), h.computeVertexNormals(), h);
  }
