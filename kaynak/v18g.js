  // ---- dünya: tabelalar, altın arılar, filo, rakipler, hayalet, iz ----
  var V18SG = {};
  function V18SIGNTEX(b, cv) {
    cv = cv || document.createElement("canvas");
    ((cv.width = 256), (cv.height = 72));
    let g = cv.getContext("2d"),
      st = S.save && S.save.v18 ? S.save.v18.biz[b.id] : null,
      c = V18BC[b.cat];
    ((g.fillStyle = st ? "#2a1f04" : "#0c2a30"),
      g.fillRect(0, 0, 256, 72),
      (g.strokeStyle = st ? "#ffc21a" : "#19c3d6"),
      (g.lineWidth = 6),
      g.strokeRect(3, 3, 250, 66),
      (g.textBaseline = "middle"),
      (g.font = "34px sans-serif"),
      g.fillText(c[1], 10, 37));
    let fs = 26;
    for (g.font = "bold " + fs + "px sans-serif"; g.measureText(b.name).width > 188 && fs > 12;) (fs--, (g.font = "bold " + fs + "px sans-serif"));
    ((g.fillStyle = "#fff"), g.fillText(b.name, 58, st ? 27 : 37));
    st && ((g.font = "bold 16px sans-serif"), (g.fillStyle = "#ffd36a"), g.fillText("★ SENİN · Sv " + st.lv, 58, 55));
    return cv;
  }
  function V18SIGN(id) {
    let s = V18SG[id];
    s && (V18SIGNTEX(V18BI[id], s.tex.image), (s.tex.needsUpdate = !0));
  }
  function V18SIGNS(sc) {
    let pm = yn(5592405);
    for (let id in V18BI) {
      let b = V18BI[id],
        g = new Tn(),
        tex = new Fn(V18SIGNTEX(b)),
        post = new Ie(new ln(0.04, 0.04, 2.1, 6), pm),
        board = new Ie(new ci(1.9, 0.53), new qt({ map: tex, side: 2 }));
      ((post.position.y = 1.05), g.add(post), (board.position.y = 2.25), g.add(board));
      (g.position.set(b.dx, Ss(b.dx, b.dz), b.dz), (g.visible = !1), sc.add(g), (V18SG[id] = { g, board, tex }));
    }
  }
  var V18BEEN = 40,
    V18BEES = [],
    V18BEEM = [],
    V18BEEW = [];
  function V18BEEPREP() {
    let r = V18RNG(1773),
      C = [];
    for (let q = 0; q < bt.pts.length; q++) {
      if (BTout(q)) continue;
      let p = bt.pts[q],
        t = tn(p[0], p[1]);
      t !== Pt.BUILDING && t !== Pt.WATER && sn(p[0], p[1]) && C.push(p);
    }
    for (let k = C.length - 1; k > 0; k--) {
      let j = Math.floor(r() * (k + 1));
      [C[k], C[j]] = [C[j], C[k]];
    }
    for (let sp of [85, 65, 45, 30]) {
      for (let p of C) {
        if (V18BEES.length >= V18BEEN) break;
        V18BEES.every((b) => (b[0] - p[0]) ** 2 + (b[1] - p[1]) ** 2 > sp * sp) && V18BEES.push([p[0], p[1]]);
      }
      if (V18BEES.length >= V18BEEN) break;
    }
  }
  function V18BEEBUILD(sc) {
    let T = new Tn(),
      core = new Tn(),
      yl = yn(16761370),
      bk = yn(1710618),
      body = new Ie(new _i(0.17, 14, 10), yl);
    (body.scale.set(0.9, 0.85, 1.25), core.add(body));
    for (let zz of [-0.06, 0.09]) {
      let q = new Ie(new e1(0.152, 0.032, 6, 16), bk);
      ((q.position.z = zz), core.add(q));
    }
    let head = new Ie(new _i(0.1, 10, 8), bk);
    ((head.position.z = 0.25), core.add(head), T.add(core), OUTL(core));
    let wm = new qt({ color: 15660799, transparent: !0, opacity: 0.75, side: 2, depthWrite: !1 });
    for (let s of [-1, 1]) {
      let w = new Ie(new _i(0.13, 8, 6), wm);
      (w.scale.set(1, 0.15, 0.6), w.position.set(s * 0.16, 0.15, 0), (w.name = s > 0 ? "wr" : "wl"), T.add(w));
    }
    let halo = new Ie(new e1(0.42, 0.025, 6, 24), new qt({ color: 16766720, transparent: !0, opacity: 0.55, depthWrite: !1 }));
    ((halo.rotation.x = Math.PI / 2), (halo.position.y = -0.75), T.add(halo));
    for (let i = 0; i < V18BEES.length; i++) {
      let m = T.clone();
      (m.scale.setScalar(1.5), (m.visible = !1), sc.add(m), V18BEEM.push(m), V18BEEW.push([m.getObjectByName("wl"), m.getObjectByName("wr")]));
    }
  }
  var V18FI = [],
    V18FT = null;
  function V18FLEETBUILD(sc) {
    let t = V18FTEMPLATE();
    t.updateMatrixWorld(!0);
    let mp = new Map();
    t.traverse((s) => {
      if (s.isMesh) {
        let a = s.geometry.clone().applyMatrix4(s.matrixWorld);
        (mp.has(s.material) || mp.set(s.material, []), mp.get(s.material).push(a));
      }
    });
    for (let [m, a] of mp) {
      let o = new ui(i7(a), m, V18Z.length * V18FMAX);
      ((o.castShadow = !0), (o.frustumCulled = !1), (o.count = 0), sc.add(o), V18FI.push(o), OUTI(o));
    }
    ((V18FT = new Tn()), (V18FT.rotation.order = "YXZ"));
  }
  function V18FLEETM() {
    if (!V18FI.length || !S.save) return;
    let v = V18S(),
      n = 0;
    for (let i = 0; i < V18Z.length; i++) {
      let z = v.fl.z[V18Z[i][0]];
      if (!z || !z.n) continue;
      let H = V18FHUB[i];
      for (let k = 0; k < z.n && k < V18FMAX; k++) {
        let [px, pz, yw] = H.slots[k];
        (V18FT.position.set(px, Ss(px, pz) + A1(px, pz), pz), V18FT.rotation.set(0, yw, 0.1), V18FT.updateMatrix());
        for (let o of V18FI) o.setMatrixAt(n, V18FT.matrix);
        n++;
      }
    }
    for (let o of V18FI) ((o.count = n), (o.instanceMatrix.needsUpdate = !0));
    V18FHS.length && V18FAPPLY();
  }
  var V18RVN = [];
  function V18RIVBUILD(sc) {
    for (let k = 0; k < 3; k++) {
      let q = V18LN[[0, 2, 3][k]],
        g = new Tn(),
        s = b1(!1),
        mat = yn(q[2]),
        gr = Y6().green;
      s.traverse((m) => {
        m.isMesh && m.material === gr && (m.material = mat);
      });
      g.add(s);
      let p = i4(q[2], 2302762, 15911845, [1709076, 11027231, 3877408][k], !1, !0),
        u = p.userData;
      ((p.position.y = 0.22), u.la && (u.la.rotation.x = -1.05), u.ra && (u.ra.rotation.x = -1.05), g.add(p), OUTL(g));
      (g.traverse((m) => {
        m.isMesh && (m.castShadow = !1);
      }),
        (g.visible = !1),
        sc.add(g),
        V18RVN.push({ g, name: q[0], col: q[2], pts: null, seg: 0, u: 0, spd: 5.3 + k * 0.45, x: 0, z: 0, yaw: 0, wait: k * 2 }));
    }
  }
  function V18RIVPICK(r) {
    let P = an.D.pois,
      ks = Ya.concat(Xa).filter((k) => P[k] && sn(P[k].x, P[k].z));
    if (!ks.length) return;
    let a = P[Ai(ks)],
      f = r.pts ? [r.x, r.z] : null;
    if (!f) {
      let b = P[Ai(ks)];
      f = [b.x, b.z];
    }
    let R = Ji(f[0], f[1], a.x, a.z);
    !R || !R.pts || R.pts.length < 2 ? ((r.pts = null), (r.wait = 6)) : ((r.pts = R.pts), (r.seg = 0), (r.u = 0), (r.x = R.pts[0][0]), (r.z = R.pts[0][1]));
  }
  function V18RIVSTEP(r, dt) {
    if (r.wait > 0) return void (r.wait -= dt);
    if (!r.pts) return void V18RIVPICK(r);
    let d = r.spd * dt;
    for (; d > 0 && r.pts;) {
      let a = r.pts[r.seg],
        b = r.pts[r.seg + 1];
      if (!b) return void ((r.wait = 2 + Math.random() * 4), V18RIVPICK(r));
      let L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 0.001,
        rem = L * (1 - r.u);
      d < rem ? ((r.u += d / L), (d = 0)) : ((d -= rem), r.seg++, (r.u = 0));
    }
    if (!r.pts) return;
    let a = r.pts[r.seg],
      b = r.pts[r.seg + 1] || a;
    ((r.x = a[0] + (b[0] - a[0]) * r.u), (r.z = a[1] + (b[1] - a[1]) * r.u));
    if (b !== a) {
      let dy = Math.atan2(b[0] - a[0], b[1] - a[1]) - r.yaw;
      for (; dy > Math.PI;) dy -= 2 * Math.PI;
      for (; dy < -Math.PI;) dy += 2 * Math.PI;
      r.yaw += dy * Math.min(1, dt * 5);
    }
  }
  var V18GH = null,
    V18REC = null;
  function V18GHBUILD(sc) {
    let g = new Tn(),
      m = new qt({ color: 8382194, transparent: !0, opacity: 0.38, depthWrite: !1 }),
      p = i4(1688534, 2834005, 15911845, 3877408, !1, !0);
    ((p.position.y = 0.22), p.userData.la && ((p.userData.la.rotation.x = -1.05), (p.userData.ra.rotation.x = -1.05)), g.add(b1(!1)), g.add(p));
    (g.traverse((q) => {
      q.isMesh && ((q.material = m), (q.castShadow = !1));
    }),
      (g.visible = !1),
      sc.add(g),
      (V18GH = g));
  }
  function GHSTART(n) {
    V18REC = { r: n.r.id, p: [], cp: [], t: 0 };
  }
  function GHT(e) {
    let R = V18REC;
    if (R && R.r === e.r.id) for (; R.t <= e.t; R.t += 0.2) R.p.push(Math.round(x.x * 10), Math.round(x.z * 10), Math.round(x.yaw * 100));
  }
  function GHCP(e) {
    let R = V18REC;
    if (!R || R.r !== e.r.id) return;
    R.cp.push(+e.t.toFixed(2));
    let gh = V18S().ghost[e.r.id],
      k = R.cp.length - 1;
    if (gh && gh.cp && gh.cp[k] != null && (k % 4 === 3 || e.idx >= e.pts.length - 1)) {
      let d = e.t - gh.cp[k];
      mt("👻 " + (d <= 0 ? "Hayaletten " + (-d).toFixed(1) + " sn öndesin" : "Hayaletin " + d.toFixed(1) + " sn gerisindesin"), d <= 0 ? "good" : "warn");
    }
  }
  function GHFIN(e, t) {
    let v = V18S(),
      R = V18REC,
      pv = v.ghost[e.r.id];
    if (R && R.r === e.r.id && (!pv || t < pv.t)) {
      (pv && (v.st.ghostWins++, setTimeout(() => mt("👻 Kendi hayaletini " + (pv.t - t).toFixed(1) + " sn farkla geçtin! Yeni hayalet kaydedildi.", "good"), 2600)),
        R.p.length < 12e3 && (v.ghost[e.r.id] = { t: +t.toFixed(2), p: R.p, cp: R.cp }));
    }
    ((V18REC = null), V18W("race"));
  }
  function GHSTOP() {
    V18REC = null;
  }
  function V18GHF() {
    if (!V18GH) return;
    let r = S.race,
      gh = r && r.stage === "run" ? V18S().ghost[r.r.id] : null;
    if (!gh || !gh.p || gh.p.length < 6) return void (V18GH.visible = !1);
    let P = gh.p,
      N = P.length / 3,
      f = r.t / 0.2,
      i = Math.floor(f),
      u = f - i;
    i >= N - 1 && ((i = N - 1), (u = 0));
    let a = i * 3,
      b = Math.min(N - 1, i + 1) * 3,
      gx = (P[a] + (P[b] - P[a]) * u) / 10,
      gz = (P[a + 1] + (P[b + 1] - P[a + 1]) * u) / 10,
      ya = P[a + 2] / 100,
      dy = P[b + 2] / 100 - ya;
    for (; dy > Math.PI;) dy -= 2 * Math.PI;
    for (; dy < -Math.PI;) dy += 2 * Math.PI;
    (V18GH.position.set(gx, Ss(gx, gz) + A1(gx, gz), gz), (V18GH.rotation.y = ya + dy * u), (V18GH.visible = !0));
  }
  var V18TRM = null,
    V18TRP = [],
    V18CL = null;
  function V18TRBUILD(sc) {
    let g = new St(),
      idx = [];
    for (let i = 0; i < 35; i++) {
      let a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    (g.setAttribute("position", new wt(new Float32Array(216), 3)), g.setAttribute("color", new wt(new Float32Array(288), 4)), g.setIndex(idx));
    ((V18TRM = new Ie(g, new qt({ vertexColors: !0, transparent: !0, depthWrite: !1, side: 2 }))),
      (V18TRM.frustumCulled = !1),
      (V18TRM.visible = !1),
      sc.add(V18TRM),
      (V18CL = new Le()));
  }
  function V18TRF() {
    if (!V18TRM) return;
    let c = S.save && S.save.v18 ? V18PICK("trail") : 0;
    if (!c || x.mode !== "ride") return void ((V18TRM.visible = !1), (V18TRP.length = 0));
    let bx = x.x - Math.sin(x.yaw) * 0.45,
      bz = x.z - Math.cos(x.yaw) * 0.45,
      by = x.y + (x.yOff || 0),
      l = V18TRP[0];
    (!l || Math.hypot(l[0] - bx, l[2] - bz) > 0.35 ? V18TRP.unshift([bx, by, bz, x.yaw]) : ((l[0] = bx), (l[1] = by), (l[2] = bz), (l[3] = x.yaw)), V18TRP.length > 36 && (V18TRP.length = 36));
    Math.abs(x.speed) < 1.5 && V18TRP.length > 1 && V18TRP.pop();
    let n = V18TRP.length,
      A = V18TRM.geometry.attributes,
      P = A.position.array,
      C = A.color.array,
      T = performance.now() / 1e3;
    for (let i = 0; i < 36; i++) {
      let p = V18TRP[Math.min(i, n - 1)],
        k = i * 6,
        q = i * 8,
        f = i < n && n > 1 ? (1 - i / 35) ** 1.6 : 0,
        r,
        gg,
        b;
      let wx = Math.cos(p[3]) * 0.12 * (0.4 + f),
        wz = -Math.sin(p[3]) * 0.12 * (0.4 + f);
      ((P[k] = p[0] - wx), (P[k + 1] = p[1] + 0.3), (P[k + 2] = p[2] - wz), (P[k + 3] = p[0] + wx), (P[k + 4] = p[1] + 0.3), (P[k + 5] = p[2] + wz));
      c === -1
        ? (V18CL.setHSL((i / 36 + T * 0.35) % 1, 1, 0.55), (r = V18CL.r), (gg = V18CL.g), (b = V18CL.b))
        : ((r = ((c >> 16) & 255) / 255), (gg = ((c >> 8) & 255) / 255), (b = (c & 255) / 255));
      c === 16761370 && (i >> 2) % 2 && (f *= 0.15);
      c === 16766720 && (f *= 0.55 + 0.45 * Math.sin(i * 1.7 + T * 18));
      ((C[q] = C[q + 4] = r), (C[q + 1] = C[q + 5] = gg), (C[q + 2] = C[q + 6] = b), (C[q + 3] = C[q + 7] = f * 0.8));
    }
    ((A.position.needsUpdate = !0), (A.color.needsUpdate = !0), (V18TRM.visible = n > 2));
  }
