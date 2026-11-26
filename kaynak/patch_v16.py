# İNİN v1.6: tek yükselti yüzeyi, yumuşatılmış yol profilleri, düzgün şerit uçları, daha çok ağaç
from patch_common import P
p = P('/home/claude/work/app.mod.js')
HGJS = open('/home/claude/work/hg.js', encoding='utf-8').read()
a = p.src.index('  function v1(n, e, t, i, s, { trim0: a = 0, trim1: r = 0, uRep: o = 1 } = {}) {')
b = p.src.index('  function $n(n) {', a)
p.src = p.src[:a] + HGJS + p.src[b:]
p.rep('''  function b6(n, e) {
    let t = J2(n, e);''', '''  function b6(n, e) {
    if (HG) return hgAt(n, e);
    let t = J2(n, e);''')
p.rep('''      z6(),
      O0(),''', '''      z6(),
      buildHG(),
      O0(),''')
a = p.src.index('''    let l = Math.round(Ct / 8),
      u = Math.round(It / 8),
      h = new ci(Ct + 300, It + 300, l + 38, u + 38);''')
b = p.src.index('''    h.computeVertexNormals();
    let y = new Fn(W6());''', a)
p.src = p.src[:a] + '''    let l = 0,
      u = 0,
      h = GROUNDGEO();
''' + p.src[b + len('''    h.computeVertexNormals();
'''):]
# daha çok ağaç (instanced; uzaktaki ağaçların hattı çizilmez)
p.rep('''        Ue = Math.floor(Re / (e.trees ? 95 : 200));''', '''        Ue = Math.floor(Re / (e.trees ? 46 : 150));''')
p.rep('''    for (let C = 0; C < (e.trees ? 1600 : 700); C++) Gt(Me.minX + z() * Ct, Me.minZ + z() * It, !1);''',
      '''    for (let C = 0; C < (e.trees ? 4200 : 1500); C++) Gt(Me.minX + z() * Ct, Me.minZ + z() * It, !1);
    for (let C of Ms.D.grass || [])
      if (e.trees) {
        let W = C.poly,
          te = W.map((Ve) => Ve[0]),
          oe = W.map((Ve) => Ve[1]),
          x0 = Math.min(...te),
          x1 = Math.max(...te),
          z0 = Math.min(...oe),
          z1 = Math.max(...oe),
          Ue = Math.floor(((x1 - x0) * (z1 - z0)) / 320);
        for (let Ve = 0; Ve < Ue; Ve++) {
          let cx = x0 + z() * (x1 - x0),
            cz = z0 + z() * (z1 - z0);
          if (!Ar(cx, cz, W)) continue;
          let nn = 1 + ((z() * 4) | 0);
          for (let k = 0; k < nn; k++) {
            let tx = cx + (z() - 0.5) * 9,
              tz = cz + (z() - 0.5) * 9;
            Ar(tx, tz, W) && Gt(tx, tz, !1);
          }
        }
      }''')
p.rep('''      s ? ((o.count = s.count), (o.visible = on && s.visible)) : (o.visible = on);''',
      '''      s
        ? ((o.count = s.count),
          (o.visible =
            on &&
            s.visible &&
            (s.userData.cx == null || !S.camera || (s.userData.cx - S.camera.position.x) ** 2 + (s.userData.cz - S.camera.position.z) ** 2 < 48400)))
        : (o.visible = on);''')
p.rep('''    let d = new Ie(h, m);
    ((d.receiveShadow = !!e.shadows), t.add(d));''', '''    let d = null;
    for (let gg of h) ((d = new Ie(gg, m)), (d.receiveShadow = !!e.shadows), t.add(d));''')
p.save()
p = P('/home/claude/work/app.mod.js')
# kaldırım/bordür: başka yolun asfaltına ya da binaya denk gelen kısımlarını kes
p.rep('''        for (let sd of [1, -1]) {
          let has = C.sws[sd > 0 ? 0 : 1],
            a0 = C.w / 2;
          if (has) {''', '''        for (let sd of [1, -1]) {
          let has = C.sws[sd > 0 ? 0 : 1],
            a0 = C.w / 2;
          for (let [IA, IB] of SWI(C, sd * (has ? a0 + 1.4 : a0 + 0.35), has ? oe : W, has ? Re : te)) {
          let tr = { trim0: IA, trim1: C.len - IB },
            tv = tr;
          if (has) {''')
p.rep('''              VG.push(sd > 0 ? v1(C.line, a0 + 0.25, a0 + 1.8, 0.03, 4, tv) : v1(C.line, -a0 - 0.25, -a0 - 1.8, 0.03, 4, tv)));
          }
        }''', '''              VG.push(sd > 0 ? v1(C.line, a0 + 0.25, a0 + 1.8, 0.03, 4, tv) : v1(C.line, -a0 - 0.25, -a0 - 1.8, 0.03, 4, tv)));
          }
          }
        }''')
p.rep('''  function stripPts(n, A, B) {''', '''  function SWI(C, off, A, B) {
    let n = C.line,
      c = [0];
    for (let g = 1; g < n.length; g++) c.push(c[g - 1] + Math.hypot(n[g][0] - n[g - 1][0], n[g][1] - n[g - 1][1]));
    let len = c[c.length - 1],
      Bm = len - B,
      out = [],
      st = null,
      g = 1,
      last = A;
    for (let d = A; d <= Bm + 1e-6; d += 1) {
      let dd = Math.min(d, Bm);
      for (; g < n.length - 1 && c[g] < dd;) g++;
      let s0 = c[g] - c[g - 1] || 1e-6,
        f = Math.max(0, Math.min(1, (dd - c[g - 1]) / s0)),
        tx = (n[g][0] - n[g - 1][0]) / s0,
        tz = (n[g][1] - n[g - 1][1]) / s0,
        x2 = n[g - 1][0] + (n[g][0] - n[g - 1][0]) * f - tz * off,
        z2 = n[g - 1][1] + (n[g][1] - n[g - 1][1]) * f + tx * off,
        k = tn(x2, z2),
        ok = k !== Pt.ROAD && k !== Pt.BUILDING && k !== Pt.WATER;
      (ok ? st == null && (st = dd) : st != null && (dd - 0.5 - st > 1.5 && out.push([st, dd - 0.5]), (st = null)), (last = dd));
      if (dd >= Bm) break;
    }
    return (st != null && Bm - st > 1.5 && out.push([st, Bm]), out);
  }
  function stripPts(n, A, B) {''')
# kavşak içindeki kısa bağlantılarda şerit çizgisi yok
p.rep('''      (C.type === "ana" ? V : F).push(v1(C.line, -C.w / 2, C.w / 2, 0.09, 12, { trim0: W, trim1: te }));''',
      '''      (C.len < 22 && (jt[C.a] > 2 || jt[C.b] > 2) ? PLN : C.type === "ana" ? V : F).push(v1(C.line, -C.w / 2, C.w / 2, 0.09, 12, { trim0: W, trim1: te }));''')
p.rep('''      KB = [],
      VG = [],''', '''      KB = [],
      VG = [],
      PLN = [],''')
p.rep('''    (Y($n(V), E), Y($n(F), w), Y($n(q), k), Y($n(j), I), Y($n(KB), I));''', '''    (Y($n(V), E), Y($n(F), w), Y($n(q), k), Y($n(j), I), Y($n(KB), I), Y($n(PLN), new lt({ map: v, side: Mn, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })));''')
p.save()
