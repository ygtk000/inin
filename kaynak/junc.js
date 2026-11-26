    // --- İNİN v1.5: kavşak dolgusu (yol ağızlarının dışbükey zarfı) + iki yol parçasının birleştiği yerde yuvarlak ek ---
    let re = [],
      rj = [];
    {
      let ptAt = (L, d) => {
          let acc = 0;
          for (let i = 1; i < L.length; i++) {
            let dx = L[i][0] - L[i - 1][0],
              dz = L[i][1] - L[i - 1][1],
              s0 = Math.hypot(dx, dz) || 1e-6;
            if (acc + s0 >= d || i === L.length - 1) {
              let f = Math.max(0, Math.min(1, (d - acc) / s0));
              return [L[i - 1][0] + dx * f, L[i - 1][1] + dz * f, dx / s0, dz / s0];
            }
            acc += s0;
          }
          return [L[0][0], L[0][1], 1, 0];
        },
        hull = (P) => {
          P = P.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
          let cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]),
            lo = [],
            up = [];
          for (let p of P) {
            for (; lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0;) lo.pop();
            lo.push(p);
          }
          for (let i = P.length - 1; i >= 0; i--) {
            let p = P[i];
            for (; up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0;) up.pop();
            up.push(p);
          }
          return (up.pop(), lo.pop(), lo.concat(up));
        },
        fan = (H, y0, out) => {
          let pos = [],
            uv = [],
            idx = [];
          H.forEach((p) => {
            (pos.push(p[0], Wt(p[0], p[1]) + y0, p[1]), uv.push(p[0] / 8, p[1] / 16));
          });
          for (let i = 1; i < H.length - 1; i++) idx.push(0, i, i + 1);
          let g = new St();
          (g.setAttribute("position", new tt(pos, 3)), g.setAttribute("uv", new tt(uv, 2)), g.setIndex(idx), g.computeVertexNormals(), out.push(g));
        },
        ends = {};
      for (let C of nt)
        for (let [k, rv] of [
          [C.a, 0],
          [C.b, 1],
        ])
          jt[k] > 1 && (ends[k] = ends[k] || []).push([C, rv]);
      for (let k in ends) {
        let E2 = ends[k],
          n0 = ji(k);
        if (jt[k] > 2) {
          let pts = [];
          for (let [C, rv] of E2) {
            let L = rv ? C.line.slice().reverse() : C.line,
              hw = C.w / 2,
              d = Math.min(C.len * 0.3, mn[k] - 1) + 0.08;
            for (let dd of [0, d]) {
              let [px, pz, tx, tz] = ptAt(L, dd);
              pts.push([px - tz * hw, pz + tx * hw], [px + tz * hw, pz - tx * hw]);
            }
          }
          let H = hull(pts);
          H.length > 2 && fan(H, 0.1, re);
        } else if (E2.length === 2) {
          let [A1, B1] = E2,
            ta = ptAt(A1[1] ? A1[0].line.slice().reverse() : A1[0].line, 0),
            tb = ptAt(B1[1] ? B1[0].line.slice().reverse() : B1[0].line, 0),
            dot = -(ta[2] * tb[2] + ta[3] * tb[3]);
          if (dot > 0.995) continue;
          let r = Math.min(A1[0].w, B1[0].w) / 2,
            H = [];
          for (let i = 0; i < 18; i++) H.push([n0[0] + Math.cos((i / 18) * 6.283) * r, n0[1] + Math.sin((i / 18) * 6.283) * r]);
          fan(H, 0.075, rj);
        }
      }
    }
    Y($n(rj), new lt({ map: v, side: Mn }));
