  // ---- performans modu ve kompakt bildirimler ----
  var V18PFL = 0,
    V18LF = 0,
    V18SH = null,
    V18CH = null,
    V18CT2 = 0,
    V18PED = null,
    V18LOWT = 0,
    V18HINT = 0;
  function V18PF() {
    return S.save && S.save.opt ? S.save.opt.perf | 0 : 0;
  }
  function V18VD(d) {
    let p = V18PF();
    return p === 2 ? Math.min(d, 190) : p === 1 ? Math.min(d, 300) : d;
  }
  function V18FOGF(f) {
    let p = V18PF();
    return p ? Math.min(f, V18VD(999) - 10) : f;
  }
  function V18PRQ(q) {
    let p = V18PF();
    return p === 2 ? Math.min(q, 0.75) : p === 1 ? Math.min(q, 1) : q;
  }
  function V18PRJ(j) {
    let p = V18PF();
    return p === 2 ? Math.min(j, 0.5) : p === 1 ? Math.min(j, 0.6) : j;
  }
  function V18FPL() {
    return V18PF() === 2 ? 25 : 38;
  }
  function V18FPH() {
    return V18PF() === 2 ? 29 : 56;
  }
  function V18LBL() {
    return [150, 100, 70][V18PF()];
  }
  function V18MMF() {
    return [3, 5, 8][V18PF()];
  }
  function V18RTI() {
    return [2.5, 4, 6][V18PF()];
  }
  function V18OUTD() {
    return [48400, 1e4, 0][V18PF()];
  }
  function V18SKIP(t) {
    if (V18PF() !== 2) return ((V18LF = t), !1);
    if (t - V18LF < 31) return !0;
    return ((V18LF = t), !1);
  }
  // büyük birleşik ağları hücrelere böl (yalnızca performans modunda kullanılır)
  function V18CHUNKPREP() {
    if (V18CH || !V18SC) return;
    V18CH = { orig: [], subs: [], tiles: [] };
    let tri = (g) => (g.index ? g.index.count : g.attributes.position ? g.attributes.position.count : 0) / 3;
    for (let o of V18SC.children.slice()) {
      if (!o.isMesh || o.isInstancedMesh || !o.geometry || Array.isArray(o.material) || !o.visible) continue;
      let g = o.geometry,
        T = tri(g);
      if (T < 2e3 || !g.attributes.position) continue;
      g.boundingSphere || g.computeBoundingSphere();
      let bs = g.boundingSphere;
      if (!bs) continue;
      if (bs.radius < 260) {
        V18CH.tiles.push({ o, x: bs.center.x + o.position.x, z: bs.center.z + o.position.z, r: bs.radius });
        continue;
      }
      if (o.position.lengthSq() > 1e-6 || o.rotation.x || o.rotation.y || o.rotation.z || o.scale.x !== 1) continue;
      let P = g.attributes.position.array,
        I = g.index ? g.index.array : null,
        C = 160,
        cells = new Map();
      for (let t = 0; t < T; t++) {
        let a = I ? I[t * 3] : t * 3,
          b = I ? I[t * 3 + 1] : t * 3 + 1,
          c = I ? I[t * 3 + 2] : t * 3 + 2,
          cx = (P[a * 3] + P[b * 3] + P[c * 3]) / 3,
          cz = (P[a * 3 + 2] + P[b * 3 + 2] + P[c * 3 + 2]) / 3,
          k = Math.floor(cx / C) + "," + Math.floor(cz / C),
          L = cells.get(k);
        (L || cells.set(k, (L = [])), L.push(a, b, c));
      }
      let subs = [];
      for (let [, L] of cells) {
        let ng = new St();
        for (let nm in g.attributes) ng.setAttribute(nm, g.attributes[nm]);
        ng.setIndex(new wt(new Uint32Array(L), 1));
        let x0 = 1e9,
          x1 = -1e9,
          y0 = 1e9,
          y1 = -1e9,
          z0 = 1e9,
          z1 = -1e9;
        for (let v of L) {
          let px = P[v * 3],
            py = P[v * 3 + 1],
            pz = P[v * 3 + 2];
          (px < x0 && (x0 = px), px > x1 && (x1 = px), py < y0 && (y0 = py), py > y1 && (y1 = py), pz < z0 && (z0 = pz), pz > z1 && (z1 = pz));
        }
        let cx = (x0 + x1) / 2,
          cy = (y0 + y1) / 2,
          cz = (z0 + z1) / 2,
          r = Math.hypot(x1 - x0, y1 - y0, z1 - z0) / 2;
        ((ng.boundingSphere = bs.clone()), ng.boundingSphere.center.set(cx, cy, cz), (ng.boundingSphere.radius = r));
        let m = new Ie(ng, o.material);
        ((m.castShadow = o.castShadow), (m.receiveShadow = o.receiveShadow), (m.renderOrder = o.renderOrder), (m.visible = !1), (m.matrixAutoUpdate = !1), m.updateMatrix(), V18SC.add(m), subs.push({ o: m, x: cx, z: cz, r }));
      }
      (V18CH.orig.push(o), V18CH.subs.push(...subs));
    }
  }
  function V18PERFAPPLY() {
    if (!V18READY) return;
    let p = V18PF();
    if (!V18SH) {
      V18SH = [];
      V18SC.traverse((o) => o.isLight && o.castShadow && V18SH.push(o));
    }
    for (let l of V18SH) l.castShadow = p === 0;
    try {
      V18PED || (V18PED = [Ga, Va, Es, Dr].map((q) => [q, q.count]));
      for (let [q, n] of V18PED) q.count = p === 2 ? Math.round(n * 0.35) : n;
    } catch {}
    if (p) V18CHUNKPREP();
    if (V18CH) {
      for (let o of V18CH.orig) o.visible = !p;
      if (!p) {
        for (let s of V18CH.subs) s.o.visible = !1;
        for (let s of V18CH.tiles) s.o.visible = !0;
      }
    }
    ((V18CT2 = 9), S.applyOutline && S.applyOutline());
  }
  function V18PERFF(dt) {
    let p = V18PF();
    if (p !== V18PFL) ((V18PFL = p), V18PERFAPPLY());
    let cam = S.camera;
    if (!cam) return;
    cam.far = p ? V18VD(999) + 40 : 1200;
    if (p && V18CH && (V18CT2 += dt) > 0.25) {
      V18CT2 = 0;
      let cx = cam.position.x,
        cz = cam.position.z,
        D = V18VD(999);
      for (let s of V18CH.subs) s.o.visible = Math.hypot(s.x - cx, s.z - cz) - s.r < D;
      for (let s of V18CH.tiles) s.o.visible = Math.hypot(s.x - cx, s.z - cz) - s.r < D;
      if (p === 2) for (let c of di) c.mesh && (c.mesh.visible = (c.x - cx) ** 2 + (c.z - cz) ** 2 < 16900);
    }
    // otomatik öneri: uzun süre düşük kare hızı
    if (!p && S.stats && S.stats.fps < 24 && !V18HINT) {
      if ((V18LOWT += dt) > 12) ((V18HINT = 1), mt("🐢 Oyun kasıyor gibi. Ayarlar → ⚡ Performans: Akıcı ya da Ultra akıcı dene.", "warn"));
    } else V18LOWT = Math.max(0, V18LOWT - dt);
  }
  function V18PERFUI(i, t) {
    (i(
      `⚡ Performans<div class="d" style="font-weight:400;font-family:Barlow;font-size:12px">Akıcı: gölgeler kapanır, görüş mesafesi ve çözünürlük düşer. Ultra akıcı: ek olarak çizgiler kapanır, 30 FPS sabitlenir, kalabalık azalır. En iyi sonuç için Grafik'i de Düşük yapıp oyunu yeniden aç.</div>`,
      [
        [0, "Görsel"],
        [1, "Akıcı"],
        [2, "Ultra akıcı"],
      ],
      t.perf | 0,
      (s) => {
        t.perf = s;
      },
    ),
      i(
        `🔔 Büyük bildirimler<div class="d" style="font-weight:400;font-family:Barlow;font-size:12px">Seviye, ödül ve olay bildirimleri: üstte küçük bir şerit ya da sadece kısa yazı.</div>`,
        [
          [1, "Küçük şerit"],
          [0, "Sadece yazı"],
        ],
        t.notif === 0 ? 0 : 1,
        (s) => {
          t.notif = s;
        },
      ));
  }
  function V18BIGQ(n, e, t) {
    if (S.save && S.save.opt && S.save.opt.notif === 0) {
      let f = (e || "").split("\n")[0];
      return (vn(n + (f ? " · " + f : ""), t === "bad" ? "bad" : t === "info" ? "info" : "good"), !0);
    }
    return !1;
  }
  var V18NCSS =
    "#big{top:8px!important;transform:translateX(-50%)!important;padding:7px 14px 8px!important;min-width:0!important;width:max-content;max-width:min(62vw,420px)!important;pointer-events:none!important;border-radius:14px!important}#big h2{font-size:17px!important;margin:0 0 2px!important;letter-spacing:.4px!important;line-height:1.15}#big p{font-size:12.5px!important;line-height:1.3;max-height:3.9em;overflow:hidden}#toasts{top:58px!important}.toast{font-size:12.5px!important;padding:5px 11px!important}.achpop{top:auto!important;bottom:18%!important;padding:5px 12px 5px 6px!important;gap:8px!important;border-radius:12px!important}.achpop .ic{font-size:20px!important;width:30px!important;height:30px!important}.achpop .tt{font-size:10px!important;letter-spacing:1px!important}.achpop .nm{font-size:14px!important}.achpop .rw{font-size:11px!important}";
