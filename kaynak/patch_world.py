# İNİN v1.3: harita / dünya yamaları (app.pretty.js -> app.mod.js)
import json, re, sys
src = open('/home/claude/work/app.pretty.js', encoding='utf-8').read()

def rep(old, new, cnt=1):
    global src
    n = src.count(old)
    if n != cnt:
        print('BULUNAMADI/ÇOKLU (%d):' % n, old[:120]); sys.exit(1)
    src = src.replace(old, new)

# ---- A1: yeni harita verisi ----
a = src.index('  var L0 = {\n    src: "osm",')
b = src.index('\n  };\n  var Me = null,', a)
L0 = open('/home/claude/data/L0_new.json', encoding='utf-8').read()
src = src[:a] + '  var L0 = ' + L0 + ';' + src[b + len('\n  };'):]

# ---- A2: gerçek yükselti ızgarası (Terrarium/SRTM, 10 m) ----
rep('''  function J2(n, e) {
    return v6(n, e) + 0.9 * Math.sin(n / 37) * Math.cos(e / 41) + 0.5 * Math.sin((n + e) / 23);
  }''', '''  var DEMG = null;
  function demInit() {
    if (DEMG || typeof L0 == "undefined" || !L0 || !L0.dem) return;
    let d = L0.dem,
      b = atob(d.b64),
      u = new Float32Array(b.length >> 1);
    for (let i = 0; i < u.length; i++) u[i] = (b.charCodeAt(2 * i) | (b.charCodeAt(2 * i + 1) << 8)) / 10;
    DEMG = { x0: d.x0, z0: d.z0, s: d.step, nx: d.nx, nz: d.nz, h: u };
  }
  function J2(n, e) {
    if ((demInit(), !DEMG)) return v6(n, e);
    let D = DEMG,
      fx = Math.max(0, Math.min(D.nx - 1.001, (n - D.x0) / D.s)),
      fz = Math.max(0, Math.min(D.nz - 1.001, (e - D.z0) / D.s)),
      ix = Math.floor(fx),
      iz = Math.floor(fz),
      tx = fx - ix,
      tz = fz - iz,
      g = (a, c) => D.h[Math.max(0, Math.min(D.nz - 1, c)) * D.nx + Math.max(0, Math.min(D.nx - 1, a))],
      row = (c) => T0(g(ix - 1, c), g(ix, c), g(ix + 1, c), g(ix + 2, c), tx);
    return T0(row(iz - 1), row(iz), row(iz + 1), row(iz + 2), tz);
  }''')

# ---- A3: yol kaldırımı (sol/sağ) + bina avlusu/kanopi/simge verisi ----
rep('''          oneway: !!e.oneway,
          sw: n ? e.type === "ana" : e.type !== "servis",
        });''', '''          oneway: !!e.oneway,
          sws: e.sws || (n ? [e.type === "ana", e.type === "ana"] : [e.type !== "servis", e.type !== "servis"]),
          sw: e.sws ? e.sws[0] || e.sws[1] : n ? e.type === "ana" : e.type !== "servis",
        });''')
rep('''      Qe.buildings.forEach((e, t) => {
        let [i, s] = Ws(e.poly);
        Zi.push({''', '''      Qe.buildings.forEach((e, t) => {
        if (e.roof) {
          Cano.push(e);
          return;
        }
        let [i, s] = Ws(e.poly);
        Zi.push({
          holes: e.holes || null,
          lm: e.lm || "",
          lv: e.lv || 0,
          kind: e.kind || "",''')
rep('''    Zi = [],
    L6 = 7;''', '''    Zi = [],
    Cano = [],
    L6 = 7;
  function offLine(n, d) {
    return n.map((p, i) => {
      let a = n[Math.max(0, i - 1)],
        b = n[Math.min(n.length - 1, i + 1)],
        x = b[0] - a[0],
        z = b[1] - a[1],
        l = Math.hypot(x, z) || 1;
      return [p[0] - (z / l) * d, p[1] + (x / l) * d];
    });
  }
  function polyH(s, P, H) {
    s.beginPath();
    for (let R of [P, ...(H || [])]) {
      R.forEach((t, i) => (i ? s.lineTo(t[0] - Me.minX, t[1] - Me.minZ) : s.moveTo(t[0] - Me.minX, t[1] - Me.minZ)));
      s.closePath();
    }
    s.fill("evenodd");
  }''')
# raster: kaldırımlar yön bazlı, binalar avlulu
rep('''      t(Pt.SIDEWALK, (s) => nt.filter((a) => a.sw).forEach((a) => Na(s, a.line, a.w + U0 * 2))),''',
    '''      t(Pt.SIDEWALK, (s) =>
        nt
          .filter((a) => a.sw)
          .forEach((a) => {
            a.sws[0] && a.sws[1]
              ? Na(s, a.line, a.w + U0 * 2)
              : (a.sws[0] && Na(s, offLine(a.line, a.w / 2 + U0 / 2), U0 + 0.6),
                a.sws[1] && Na(s, offLine(a.line, -a.w / 2 - U0 / 2), U0 + 0.6));
          }),
      ),''')
rep('''      t(Pt.BUILDING, (s) => Zi.forEach((a) => _s(s, a.poly))));''',
    '''      t(Pt.BUILDING, (s) => Zi.forEach((a) => polyH(s, a.poly, a.holes))));''')

# ---- A4: yol kaldırımı çizimi (yön bazlı) ----
rep('''      C.sw &&
        (q.push(v1(C.line, C.w / 2, C.w / 2 + Ue, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
        q.push(v1(C.line, -C.w / 2 - Ue, -C.w / 2, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
        j.push(J0(C.line, C.w / 2, 0, 0.2, { trim0: oe, trim1: Re })),
        j.push(J0(C.line, -C.w / 2, 0, 0.2, { trim0: oe, trim1: Re })));''',
    '''      (C.sws[0] &&
        (q.push(v1(C.line, C.w / 2, C.w / 2 + Ue, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
        j.push(J0(C.line, C.w / 2, 0, 0.2, { trim0: oe, trim1: Re }))),
        C.sws[1] &&
          (q.push(v1(C.line, -C.w / 2 - Ue, -C.w / 2, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
          j.push(J0(C.line, -C.w / 2, 0, 0.2, { trim0: oe, trim1: Re }))));''')

# ---- A5: zemin haritasında avlular ----
rep('''      Zi.forEach((l) => {
        (r(l.poly), s.fill(), s.stroke());
      }),
      i
    );''', '''      Zi.forEach((l) => {
        (s.beginPath(),
          [l.poly, ...(l.holes || [])].forEach((R) => {
            (R.forEach((u, h) => (h ? s.lineTo(u[0], u[1]) : s.moveTo(u[0], u[1]))), s.closePath());
          }),
          s.fill("evenodd"),
          s.stroke());
      }),
      i
    );''')

# ---- A6: bina duvarları: avlu halkaları + avlulu çatı ----
rep('''      let oe = W.map((ae) => Wt(ae[0], ae[1])),
        Re = Math.max(...oe),''', '''      let HO = (C.holes || [])
          .filter((ae) => ae.length > 2)
          .map((ae) => {
            let me = ae.slice(),
              Be = 0;
            for (let Je = 0, Oe = me.length - 1; Je < me.length; Oe = Je++) Be += (me[Oe][0] - me[Je][0]) * (me[Oe][1] + me[Je][1]);
            return (Be < 0 && me.reverse(), me);
          }),
        oe = W.map((ae) => Wt(ae[0], ae[1])),
        Re = Math.max(...oe),''')
rep('''      for (let ae = 0; ae < W.length; ae++) {
        let me = W[ae],
          Be = W[(ae + 1) % W.length],
          Je = Math.hypot(Be[0] - me[0], Be[1] - me[1]);''', '''      for (let RG of [W, ...HO])
      for (let ae = 0; ae < RG.length; ae++) {
        let me = RG[ae],
          Be = RG[(ae + 1) % RG.length],
          Je = Math.hypot(Be[0] - me[0], Be[1] - me[1]);''')
rep('''      let U = br.triangulateShape(
          W.map((ae) => new je(ae[0], ae[1])),
          [],
        ),
        X = [];
      W.forEach((ae) => X.push(ae[0], Ve, ae[1]));''', '''      let U = br.triangulateShape(
          W.map((ae) => new je(ae[0], ae[1])),
          HO.map((ae) => ae.map((me) => new je(me[0], me[1]))),
        ),
        X = [];
      [W, ...HO].forEach((R) => R.forEach((ae) => X.push(ae[0], Ve, ae[1])));
      let NV = X.length / 3;''')
rep('''      (H.setAttribute("position", new tt(X, 3)), H.setAttribute("uv", new tt(new Float32Array(W.length * 2), 2)));''',
    '''      (H.setAttribute("position", new tt(X, 3)), H.setAttribute("uv", new tt(new Float32Array(NV * 2), 2)));''')
rep('''      let ce = new Le(xe[C.style] || 8947848),
        _e = new Float32Array(W.length * 3);
      for (let ae = 0; ae < W.length; ae++) ce.toArray(_e, ae * 3);
      if ((H.setAttribute("color", new wt(_e, 3)), Q.push(H), C.area > 600)) {''', '''      let ce = new Le(xe[C.style] || 8947848),
        _e = new Float32Array(NV * 3);
      for (let ae = 0; ae < NV; ae++) ce.toArray(_e, ae * 3);
      if ((H.setAttribute("color", new wt(_e, 3)), C.lm === "kutuphane" || C.lm === "havuz" || Q.push(H), C.area > 600 && !C.lm && !HO.some((ae) => Gs(C.cx, C.cz, ae)) && Gs(C.cx, C.cz, W))) {''')
rep('''      if (((C.top = Ve), (C.base = Ue), C.name)) {''', '''      if (((C.top = Ve), (C.base = Ue), (C.ring = W), (C.ground = Re), C.lm && LMK.push(C), EDG.push([W, Ue, Ve, Re]), HO.forEach((ae) => EDG.push([ae, Ue, Ve, Re])), C.name)) {''')
open('/home/claude/work/app.mod.js', 'w', encoding='utf-8').write(src)
print('ok', len(src))
