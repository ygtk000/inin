# İNİN v1.7: rotalar/yarışlar kampüs içinde kalsın
from patch_common import P
p = P('/home/claude/work/app.mod.js')
p.rep('''        for (let [E, w] of bt.adj[d]) {
          let v = o[d] + w;
          v < o[E] && ((o[E] = v), (c[E] = d), p(v + u(E), E));
        }''', '''        for (let [E, w] of bt.adj[d]) {
          let v = o[d] + w * (BTout(E) || BTout(d) ? 60 : 1);
          v < o[E] && ((o[E] = v), (c[E] = d), p(v + u(E), E));
        }''')
p.rep('''    return (g.reverse(), g.unshift([n, e]), g.push([t, i]), { pts: g, len: isFinite(o[a]) ? o[a] : Math.hypot(t - n, i - e) });
  }''', '''    (g.reverse(), g.unshift([n, e]), g.push([t, i]));
    let LL = 0;
    for (let q = 1; q < g.length; q++) LL += Math.hypot(g[q][0] - g[q - 1][0], g[q][1] - g[q - 1][1]);
    return { pts: g, len: isFinite(o[a]) ? LL : Math.hypot(t - n, i - e) };
  }
  var BTO = null;
  function BTout(k) {
    if (!$i) return 0;
    if (!BTO || BTO.length !== bt.pts.length) {
      BTO = new Uint8Array(bt.pts.length);
      for (let q = 0; q < bt.pts.length; q++) BTO[q] = sn(bt.pts[q][0], bt.pts[q][1]) ? 0 : 1;
    }
    return BTO[k];
  }''')
p.save()
p = P('/home/claude/work/app.mod.js')
# kampüs sınırındaki noktaları (ör. metro kapısı) kampüs içindeki en yakın yol/patika noktasına çek
p.rep('''  function I4() {
    ((Xa = b4("food")),''', '''  function POIin() {
    if (!$i || !bt.pts.length) return;
    for (let k in an.D.pois) {
      let p = an.D.pois[k],
        nn = i3(p.x, p.z);
      if (nn >= 0 && !BTout(nn) && sn(p.x, p.z)) continue;
      let best = -1,
        bd = 1e18;
      for (let q = 0; q < bt.pts.length; q++) {
        if (BTout(q)) continue;
        let d = (bt.pts[q][0] - p.x) ** 2 + (bt.pts[q][1] - p.z) ** 2;
        d < bd && ((bd = d), (best = q));
      }
      best >= 0 && bd < 22500 && ((p.x = bt.pts[best][0]), (p.z = bt.pts[best][1]), (p.inCampus = !0));
    }
  }
  function I4() {
    (POIin(),
      (Xa = b4("food")),''')
p.save()
p = P('/home/claude/work/app.mod.js')
# yakınlık bağlantıları bina, su, kampüs sınırı ya da KYK duvarı üzerinden kurulmasın
p.rep('''                p > o && !bt.adj[o].some((y) => y[0] === p) && Math.hypot(bt.pts[p][0] - r[0], bt.pts[p][1] - r[1]) < 9 && e(o, p);''',
      '''                p > o && !bt.adj[o].some((y) => y[0] === p) && Math.hypot(bt.pts[p][0] - r[0], bt.pts[p][1] - r[1]) < 9 && LINKOK(r, bt.pts[p]) && e(o, p);''')
p.rep('''  var bt = { pts: [], adj: [] };''', '''  var bt = { pts: [], adj: [] },
    KYKP = null;
  function LINKOK(a, b) {
    let C = Qe.campus;
    KYKP === null && (KYKP = ((Qe.dormAreas || []).find((l) => /mühendishane|kyk/i.test(l.name)) || {}).poly || 0);
    if (C && Gs(a[0], a[1], C) !== Gs(b[0], b[1], C)) return !1;
    if (KYKP && Gs(a[0], a[1], KYKP) !== Gs(b[0], b[1], KYKP)) return !1;
    for (let q = 1; q < 5; q++) {
      let k = tn(a[0] + ((b[0] - a[0]) * q) / 5, a[1] + ((b[1] - a[1]) * q) / 5);
      if (k === Pt.BUILDING || k === Pt.WATER) return !1;
    }
    return !0;
  }''')
# yarışlar: yalnızca kampüs içindeki noktalar
p.rep('''  function g7() {
    Ri.length = 0;
    let n = an.D.pois,
      e = Object.keys(n),''', '''  function g7() {
    Ri.length = 0;
    let n = an.D.pois,
      e = Object.keys(n).filter((k) => sn(n[k].x, n[k].z) && i3(n[k].x, n[k].z) >= 0 && !BTout(i3(n[k].x, n[k].z))),''')
# Gölet turu: göl çevresindeki yol/patika ağından
p.rep('''    if (n.ring) e = Vs([...n.ring, n.ring[0]], 30);
    else {
      let r = n.via || [n.a, n.b];
      for (let o = 1; o < r.length; o++) {
        let c = an.D.pois[r[o - 1]],
          l = an.D.pois[r[o]],''', '''    {
      let r = n.via || [n.a, n.b],
        WP = null;
      if (n.ring) {
        WP = [];
        for (let p of Vs([...n.ring, n.ring[0]], 60)) {
          let k = i3(p[0], p[1]),
            q = k >= 0 && !BTout(k) ? bt.pts[k] : p;
          (WP.length && Math.hypot(WP[WP.length - 1].x - q[0], WP[WP.length - 1].z - q[1]) < 15) || WP.push({ x: q[0], z: q[1] });
        }
        (WP.push(WP[0]), (r = WP.map((q, k) => k)));
      }
      for (let o = 1; o < r.length; o++) {
        let c = WP ? WP[r[o - 1]] : an.D.pois[r[o - 1]],
          l = WP ? WP[r[o]] : an.D.pois[r[o]],''')
p.save()
p = P('/home/claude/work/app.mod.js')
# yarış kontrol noktaları: iki nokta arasındaki düz çizgi duvar/bina/kampüs dışından geçmesin
p.rep('''        e.length || e.push(h[0]);
        for (let p = 1; p < h.length; p++)
          ((f += Math.hypot(h[p][0] - h[p - 1][0], h[p][1] - h[p - 1][1])), f > 45 && (e.push(h[p]), (f = 0)));
        e.push(h[h.length - 1]);''', '''        e.length || e.push(h[0]);
        for (let p = 1; p < h.length; p++) {
          let L2 = e[e.length - 1];
          (f += Math.hypot(h[p][0] - h[p - 1][0], h[p][1] - h[p - 1][1])),
            f > 45 ? (p > 1 && !SEGOK(L2, h[p]) && h[p - 1] !== L2 && e.push(h[p - 1]), e.push(h[p]), (f = 0)) : p > 1 && !SEGOK(L2, h[p]) && h[p - 1] !== L2 && (e.push(h[p - 1]), (f = Math.hypot(h[p][0] - h[p - 1][0], h[p][1] - h[p - 1][1])));
        }
        e.push(h[h.length - 1]);''')
p.rep('''  function LINKOK(a, b) {''', '''  function SEGOK(a, b) {
    let n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2)),
      ky = KYKP ? Gs(a[0], a[1], KYKP) : !1;
    for (let q = 1; q < n; q++) {
      let x2 = a[0] + ((b[0] - a[0]) * q) / n,
        z2 = a[1] + ((b[1] - a[1]) * q) / n,
        k = tn(x2, z2);
      if (!sn(x2, z2) || k === Pt.BUILDING || k === Pt.WATER || (KYKP && Gs(x2, z2, KYKP) !== ky)) return !1;
      let hh = cn(x2, z2, 0.9);
      if (hh && hh.hit && (hh.hit.kind === "bina" || hh.hit.kind === "duvar")) return !1;
    }
    return !0;
  }
  function LINKOK(a, b) {''')
p.save()
