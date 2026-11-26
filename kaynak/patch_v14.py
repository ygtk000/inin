# İNİN v1.4: yeni yol/kaldırım görünümü, çime geçiş, sürükleyerek bakma, birinci şahıs,
# hiçbir şey yavaşlatmasın seçeneği, mini harita boyutu + tıklayınca tam harita, konfeti yok, oranlar
from patch_common import P
p = P('/home/claude/work/app.mod.js')
TEX = open('/home/claude/work/tex14.js', encoding='utf-8').read()

# ---------- dokular ----------
p.rep('''  function x1(n) {
    let e = hn(256, 512),''', TEX + '''
  function x1(n) {
    let e = hn(256, 512),''')
# yol, kaldırım, bordür malzemeleri
p.rep('''    let E = new lt({ map: x1("ana"), polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      w = new lt({ map: x1("ara"), polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      v = x1("plain"),''', '''    let E = new lt({ map: RTX("ana"), side: Mn, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      w = new lt({ map: RTX("ara"), side: Mn, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      v = RTX("plain"),''')
p.rep('''      R = u3("#b5b0a6"),
      k = new lt({ map: R, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      I = new lt({ map: H0() }),''', '''      R = SWTX(),
      k = new lt({ map: R, side: Mn, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      I = new lt({ map: KTX(), side: Mn }),
      KB = [],
      VG = [],
      VGm = new lt({ map: VTX(), transparent: !0, depthWrite: !1, side: Mn, polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),''')
# kaldırım: bordür taşı + yükseltilmiş taş döşeme + dış kenar + çime geçiş şeridi
p.rep('''      (C.sws[0] &&
        (q.push(v1(C.line, C.w / 2, C.w / 2 + Ue, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
        j.push(J0(C.line, C.w / 2, 0, 0.2, { trim0: oe, trim1: Re }))),
        C.sws[1] &&
          (q.push(v1(C.line, -C.w / 2 - Ue, -C.w / 2, 0.2, 2, { trim0: oe, trim1: Re, uRep: Ue / 2 })),
          j.push(J0(C.line, -C.w / 2, 0, 0.2, { trim0: oe, trim1: Re }))));''', '''      {
        let tr = { trim0: oe, trim1: Re },
          tv = { trim0: W, trim1: te };
        for (let sd of [1, -1]) {
          let has = C.sws[sd > 0 ? 0 : 1],
            a0 = C.w / 2;
          if (has) {
            (KB.push(sd > 0 ? v1(C.line, a0, a0 + 0.3, 0.2, 1, tr) : v1(C.line, -a0 - 0.3, -a0, 0.2, 1, tr)),
              q.push(sd > 0 ? v1(C.line, a0 + 0.3, a0 + Ue, 0.2, 2, { ...tr, uRep: (Ue - 0.3) / 2 }) : v1(C.line, -a0 - Ue, -a0 - 0.3, 0.2, 2, { ...tr, uRep: (Ue - 0.3) / 2 })),
              j.push(J0(C.line, sd * a0, 0, 0.2, tr)),
              j.push(J0(C.line, sd * (a0 + Ue), -0.05, 0.2, tr)));
            let o2 = a0 + Ue;
            VG.push(sd > 0 ? v1(C.line, o2, o2 + 1.4, 0.03, 4, tr) : v1(C.line, -o2, -o2 - 1.4, 0.03, 4, tr));
          } else {
            (KB.push(sd > 0 ? v1(C.line, a0 - 0.05, a0 + 0.25, 0.1, 1, tv) : v1(C.line, -a0 - 0.25, -a0 + 0.05, 0.1, 1, tv)),
              VG.push(sd > 0 ? v1(C.line, a0 + 0.25, a0 + 1.8, 0.03, 4, tv) : v1(C.line, -a0 - 0.25, -a0 - 1.8, 0.03, 4, tv)));
          }
        }
      }''')
p.rep('''    (Y($n(V), E), Y($n(F), w), Y($n(q), k), Y($n(j), I));''',
      '''    (Y($n(V), E), Y($n(F), w), Y($n(q), k), Y($n(j), I), Y($n(KB), I));
    for (let C of Lt) C.t !== "merdiven" && C.w >= 1.8 && (VG.push(v1(C.line, C.w / 2, C.w / 2 + 0.7, 0.025, 4, {})), VG.push(v1(C.line, -C.w / 2, -C.w / 2 - 0.7, 0.025, 4, {})));
    {
      let vg = Y($n(VG), VGm, !1);
      vg && (vg.renderOrder = 1);
    }''')
# zemin haritası: yolların altındaki sert gri bant yerine yumuşak toprak/çim geçişi
p.rep('''      nt.forEach((l) => c(l.line, l.w + 6, "#8d8a80")),
      Lt.forEach((l) => c(l.line, l.w + 0.6, "#7c776c")),''', '''      nt.forEach((l) => c(l.line, l.w + 8, "rgba(122,145,80,0.45)")),
      nt.forEach((l) => c(l.line, l.w + 3.4, "#8a9262")),
      Lt.forEach((l) => c(l.line, l.w + 1.6, "rgba(130,135,95,0.6)")),''')

# ---------- kaldırım neredeyse her yolda (veri dönüştürücüde) -> app'te varsayılan ----------
# (convert.py güncellendi)

# ---------- pencere oranları: kat başına bir sıra, 3 m aks ----------
p.rep('''        let Oe = Math.max(0.5, Math.round((Je / 4) * 2) / 2),
          pt = (Ue - Re) / 3.5,
          Et = (ss - Re) / 3.5,
          Tt = (Ve - Re) / 3.5;''', '''        let Oe = Math.max(0.5, Math.round((Je / 6) * 2) / 2),
          pt = (Ue - Re) / 7,
          Et = (ss - Re) / 7,
          Tt = (Ve - Re) / 7;''')

# ---------- karakter oranı (kafa biraz küçülsün, boy ~1,80 m) ----------
p.rep('''    let p = new Tn();
    ((p.position.y = 0.6), u.add(p));
    let head = new Ie(new _i(0.205, 20, 16), mS);''', '''    let p = new Tn();
    ((p.position.y = 0.57), p.scale.setScalar(0.88), u.add(p));
    let head = new Ie(new _i(0.205, 20, 16), mS);''')

# ---------- konfeti kaldırıldı ----------
p.rep('''  function CONFETTI(n = 50) {
    try {''', '''  function CONFETTI(n = 50) {
    return;
    try {''')

# ---------- hiçbir şey yavaşlatmasın ----------
p.rep('''    OPTX = { terrain: !0, pen: !0 };''', '''    OPTX = { terrain: !0, pen: !0, noslow: !1 };''')
p.rep('''    ((OPTX.terrain = e.opt.terrain !== !1), (OPTX.pen = e.opt.pen !== !1), (S.t += n), ACHT(n));''',
      '''    ((OPTX.noslow = e.opt.noslow === !0), (OPTX.terrain = e.opt.terrain !== !1 && !OPTX.noslow), (OPTX.pen = e.opt.pen !== !1), (S.t += n), ACHT(n));''')
p.rep('''  function Ti(n, e, t = !1) {
    if (x.mode !== "ride") return;''', '''  function Ti(n, e, t = !1) {
    if (x.mode !== "ride" || (OPTX.noslow && !t)) return;''')
p.rep('''    (d < 0.15 && ((E *= 0.3), (w = Math.min(w, 30 / 3.6))), d <= 0 && (E = 0), t.slowZone && (w = Math.min(w, t.slowLimit)));''',
      '''    (!OPTX.noslow && d < 0.15 && ((E *= 0.3), (w = Math.min(w, 30 / 3.6))), !OPTX.noslow && d <= 0 && (E = 0), !OPTX.noslow && t.slowZone && (w = Math.min(w, t.slowLimit)));''')
p.rep('''      e.brake > 0.9 && m > 5 && u < 0.75 && Math.random() < n * 1.5 && Ti("Fren kilitlendi, kayd\\u0131n!", 2));''',
      '''      !OPTX.noslow && e.brake > 0.9 && m > 5 && u < 0.75 && Math.random() < n * 1.5 && Ti("Fren kilitlendi, kayd\\u0131n!", 2));''')
p.rep('''    ((s.batt = Math.max(0, s.batt - (((V / 0.8) * n) / 3600 / i.capWh) * t.battMul)), (x.powerW = D));''',
      '''    ((s.batt = Math.max(OPTX.noslow ? Math.min(s.batt, 0.25) : 0, s.batt - (((V / 0.8) * n) / 3600 / i.capWh) * t.battMul)), (x.powerW = D));''')
p.rep('''      if (Math.abs(K) > fe * 1.35 && m > 3) {''', '''      if (Math.abs(K) > fe * 1.35 && m > 3 && !OPTX.noslow) {''')
p.rep('''    if (x.wobble > 1.2 && Math.random() < n * (x.wobble - 1.1) * 2) {''', '''    if (!OPTX.noslow && x.wobble > 1.2 && Math.random() < n * (x.wobble - 1.1) * 2) {''')
p.rep('''      if (Ke > 2.4) {''', '''      if (Ke > 2.4 && !OPTX.noslow) {''')
p.rep('''      ((he += xe.px), (ke += xe.pz), (m *= 0.5));''', '''      ((he += xe.px), (ke += xe.pz), (m *= OPTX.noslow ? 0.985 : 0.5));''')
p.rep('''            : ((x.speed *= 0.2), mt("Yayaya de\\u011Fdin, dikkat!", "warn"), ts(-1)));''',
      '''            : (OPTX.noslow || (x.speed *= 0.2), mt("Yayaya de\\u011Fdin, dikkat!", "warn"), ts(-1)));''')
p.rep('''            ((x.x += l[0] * 0.3), (x.z += l[1] * 0.3), (x.speed *= 0.3));''',
      '''            ((x.x += l[0] * 0.3), (x.z += l[1] * 0.3), OPTX.noslow || (x.speed *= 0.3));''')
# ayarlar satırı
p.rep('''        i(
          "\\u{1F46E} Cezalar<div''', '''        i(
          "\\u{1F680} H\\u0130\\xC7B\\u0130R \\u015EEY YAVA\\u015ELATMASIN<div class=\\"d\\" style=\\"font-weight:400;font-family:Barlow;font-size:12px\\">A\\xE7\\u0131kken \\xE7arpma, kald\\u0131r\\u0131m, kasis, zemin, yoku\\u015F, ya\\u011Fmur, yaya/ara\\xE7 temas\\u0131 ve d\\xFC\\u015F\\xFCk batarya \\u0130N\\u0130N'i yava\\u015Flatmaz; batarya %25'in alt\\u0131na d\\xFC\\u015Fmez.</div>",
          [
            [!0, "A\\xE7\\u0131k"],
            [!1, "Kapal\\u0131"],
          ],
          t.noslow === !0,
          (s) => {
            ((t.noslow = s), (OPTX.noslow = s), vn(s ? "Art\\u0131k hi\\xE7bir \\u015Fey seni yava\\u015Flatmaz" : "Yava\\u015Flatmalar geri a\\xE7\\u0131ld\\u0131", "good"));
          },
        ),
        i(
          "\\u{1F46E} Cezalar<div''')

# ---------- kamera: sürükleyerek bak + birinci şahıs ----------
p.rep('''  var N3 = 0,
    $4 = 0,
    Z4 = 0;''', '''  var N3 = 0,
    $4 = 0,
    Z4 = 0,
    LOOK = { yaw: 0, pitch: 0, drag: 0, t: 0 };
  function LOOKinit() {
    let g = document.getElementById("gl"),
      id = null,
      lx = 0,
      ly = 0,
      mv = (X, Y) => {
        ((LOOK.yaw -= (X - lx) * 0.0068),
          (LOOK.pitch = Math.max(-0.75, Math.min(0.85, LOOK.pitch - (Y - ly) * 0.0055))),
          (lx = X),
          (ly = Y),
          (LOOK.t = performance.now()));
      };
    (g.addEventListener(
      "touchstart",
      (a) => {
        for (let r of a.changedTouches) id == null && ((id = r.identifier), (lx = r.clientX), (ly = r.clientY), (LOOK.drag = 1));
      },
      { passive: !0 },
    ),
      g.addEventListener(
        "touchmove",
        (a) => {
          for (let r of a.changedTouches) r.identifier === id && mv(r.clientX, r.clientY);
        },
        { passive: !0 },
      ));
    let end = (a) => {
      for (let r of a.changedTouches) r.identifier === id && ((id = null), (LOOK.drag = 0), (LOOK.t = performance.now()));
    };
    (g.addEventListener("touchend", end), g.addEventListener("touchcancel", end));
    let md = !1;
    (g.addEventListener("mousedown", (a) => {
      ((md = !0), (lx = a.clientX), (ly = a.clientY), (LOOK.drag = 1));
    }),
      window.addEventListener("mousemove", (a) => {
        md && mv(a.clientX, a.clientY);
      }),
      window.addEventListener("mouseup", () => {
        md && ((md = !1), (LOOK.drag = 0), (LOOK.t = performance.now()));
      }));
  }''')
p.rep('''  function E7() {
    let n = Xe.ctrlL,''', '''  function E7() {
    LOOKinit();
    let n = Xe.ctrlL,''')
p.rep('''        ((S.save.opt.cam = (S.save.opt.cam + 1) % 3),
          Hn.click(),
          vn(["Kamera: Arkadan", "Kamera: Yak\\u0131n", "Kamera: Uzak/\\xDCst"][S.save.opt.cam]));''',
      '''        ((S.save.opt.cam = (S.save.opt.cam + 1) % 4),
          Hn.click(),
          (LOOK.yaw = LOOK.pitch = 0),
          vn(["Kamera: Arkadan", "Kamera: Yak\\u0131n", "Kamera: Uzak/\\xDCst", "Kamera: Birinci \\u015Fah\\u0131s"][S.save.opt.cam]));''')
# yürürken joystick bakılan yöne göre
p.rep('''          } else x.mode === "walk" && _3(ie, { jx: Fe.jx, jy: Fe.jy, canRun: G.energy > 10, walkMul: G.energy < 15 ? 0.6 : 1 }, M.yaw);''',
      '''          } else
            x.mode === "walk" &&
              ((Fe.jx || Fe.jy) && LOOK.yaw && ((M.yaw += LOOK.yaw), (LOOK.yaw = 0)),
              _3(ie, { jx: Fe.jx, jy: Fe.jy, canRun: G.energy > 10, walkMul: G.energy < 15 ? 0.6 : 1 }, M.yaw));''')
p.rep('''        ((M.yaw += Ge * Math.min(1, de * (ie ? 3.2 : 1.6))), (x.yawCam = M.yaw));
        let ye = G.opt.cam,''', '''        (M.yaw += Ge * Math.min(1, de * (ie ? 3.2 : 1.6)));
        !LOOK.drag &&
          ie &&
          Math.abs(x.speed) > 1 &&
          performance.now() - LOOK.t > 1600 &&
          ((LOOK.yaw *= 1 - Math.min(1, de * 2.2)), (LOOK.pitch *= 1 - Math.min(1, de * 2.2)));
        let CY = M.yaw + LOOK.yaw,
          FP = G.opt.cam === 3 && x.mode !== "fallen";
        x.yawCam = CY;
        let ye = G.opt.cam === 3 ? 0 : G.opt.cam,''')
p.rep('''          J = x.x - Math.sin(M.yaw) * (A + Math.min(2.5, B * 0.025)),
          ne = x.z - Math.cos(M.yaw) * (A + Math.min(2.5, B * 0.025)),
          Z = x.y + b,''', '''          J = x.x - Math.sin(CY) * (A + Math.min(2.5, B * 0.025)) * Math.cos(LOOK.pitch * 0.6),
          ne = x.z - Math.cos(CY) * (A + Math.min(2.5, B * 0.025)) * Math.cos(LOOK.pitch * 0.6),
          Z = x.y + b - LOOK.pitch * A * 0.7,''')
p.rep('''        (l.position.set(M.pos.x + (Math.random() - 0.5) * le, M.pos.y + (Math.random() - 0.5) * le, M.pos.z),
          M.look.set(x.x + Math.sin(M.yaw) * 3, x.y + (ye === 2 ? 0 : 1.2), x.z + Math.cos(M.yaw) * 3),
          l.lookAt(M.look),
          (l.fov += (62 + Math.min(22, B * 0.22) - l.fov) * Math.min(1, de * 3)),
          l.updateProjectionMatrix());''', '''        if (((x.person.visible = !FP), FP)) {
          let hy = x.mode === "ride" ? x.y + x.yOff + 0.21 + 1.58 : x.y + 1.62,
            hx = x.x + Math.sin(x.mode === "ride" ? x.yaw : CY) * 0.08,
            hz = x.z + Math.cos(x.mode === "ride" ? x.yaw : CY) * 0.08,
            cp = Math.cos(LOOK.pitch - 0.12);
          (l.position.set(hx + (Math.random() - 0.5) * le * 0.5, hy + (Math.random() - 0.5) * le * 0.5, hz),
            M.pos.set(hx, hy, hz),
            M.look.set(hx + Math.sin(CY) * cp * 5, hy + Math.sin(LOOK.pitch - 0.12) * 5, hz + Math.cos(CY) * cp * 5),
            l.lookAt(M.look),
            (l.fov += (72 + Math.min(18, B * 0.18) - l.fov) * Math.min(1, de * 3)),
            l.updateProjectionMatrix());
        } else
          (l.position.set(M.pos.x + (Math.random() - 0.5) * le, M.pos.y + (Math.random() - 0.5) * le, M.pos.z),
            M.look.set(x.x + Math.sin(CY) * 3, x.y + (ye === 2 ? 0 : 1.2) + LOOK.pitch * 3.5, x.z + Math.cos(CY) * 3),
            l.lookAt(M.look),
            (l.fov += (62 + Math.min(22, B * 0.22) - l.fov) * Math.min(1, de * 3)),
            l.updateProjectionMatrix());''')
# ipucu
p.rep('''        ((k = !0), D3(), S.offers.length || qa(), S.save.daily || D1(!0));''',
      '''        ((k = !0), D3(), S.offers.length || qa(), S.save.daily || D1(!0));
        S.save.lookHint || ((S.save.lookHint = 1), setTimeout(() => vn("\\u{1F446} Ekran\\u0131 s\\xFCr\\xFCkleyerek etraf\\u0131na bakabilirsin \\xB7 \\u{1F3A5} ile birinci \\u015Fah\\u0131s", "info"), 5e3));''')
# ayarlarda kamera ve mini harita boyutu
p.rep('''        i(
          "Direksiyon",
          [''', '''        i(
          "\\u{1F3A5} Kamera",
          [
            [0, "Arkadan"],
            [1, "Yak\\u0131n"],
            [2, "Uzak"],
            [3, "1. \\u015Fah\\u0131s"],
          ],
          t.cam,
          (s) => {
            ((t.cam = s), (LOOK.yaw = LOOK.pitch = 0));
          },
        ),
        i(
          "\\u{1F5FA}\\uFE0F Mini harita boyutu",
          [
            [100, "K\\xFC\\xE7\\xFCk"],
            [132, "Orta"],
            [170, "B\\xFCy\\xFCk"],
            [210, "\\xC7ok b\\xFCy\\xFCk"],
          ],
          t.mm || 132,
          (s) => {
            ((t.mm = s), MMsize());
          },
        ),
        i(
          "Direksiyon",
          [''')

# ---------- mini harita: boyut + tıklayınca tam harita ----------
p.rep('''#mini{position:absolute;right:calc(8px + env(safe-area-inset-right));top:8px;width:132px;height:132px;''',
      '''#mini{position:absolute;right:calc(8px + env(safe-area-inset-right));top:8px;width:var(--mm,132px);height:var(--mm,132px);pointer-events:auto;cursor:pointer;transition:width .25s,height .25s,transform .12s;''')
p.rep('''#stat .money{transition:color .3s}''','''#mini:active{transform:scale(.95)}
#stat .money{transition:color .3s}''')
p.rep('''#topbtn{position:absolute;right:calc(148px + env(safe-area-inset-right));''', '''#topbtn{position:absolute;right:calc(var(--mm,132px) + 16px + env(safe-area-inset-right));transition:right .25s;''')
p.rep('''      (document.getElementById("bPhone").onclick = () => ea()),''', '''      (document.getElementById("bPhone").onclick = () => ea()),
      (Xe.mini.onclick = () => ea("map")),
      MMsize(),''')
p.rep('''  function E7() {''', '''  function MMsize() {
    let s = (S.save && S.save.opt.mm) || 132;
    document.documentElement.style.setProperty("--mm", s + "px");
    let c = Xe.mini,
      r = Math.max(264, Math.min(560, Math.round(s * Math.min(3, devicePixelRatio || 1))));
    c && c.width !== r && ((c.width = r), (c.height = r));
  }
  function E7() {''')
# mini harita çizimi tuval boyutuna göre
p.rep('''  function R7() {
    let n = q4,
      e = 264,''', '''  function R7() {
    q4.setTransform(Xe.mini.width / 264, 0, 0, Xe.mini.width / 264, 0, 0);
    let n = q4,
      e = 264,''')
p.rep('''      M = u3("#c4a98a"),
      _ = new lt({ map: M, polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
      D = new lt({ map: W0(), polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),''','''      M = u3("#cdb79a"),
      _ = new lt({ map: M, side: Mn, polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
      D = new lt({ map: W0(), side: Mn, polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),''')
p.rep('''      P = new lt({ map: v, polygonOffset: !0, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),''','''      P = new lt({ map: v, side: Mn, polygonOffset: !0, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),''')
p.save()
p=P('/home/claude/work/app.mod.js')
p.rep('''      let oe = jt[C.a] > 1 ? mn[C.a] + 4 : 0,
        Re = jt[C.b] > 1 ? mn[C.b] + 4 : 0,''','''      let oe = jt[C.a] > 1 ? Math.max(0, mn[C.a] - 0.9) : 0,
        Re = jt[C.b] > 1 ? Math.max(0, mn[C.b] - 0.9) : 0,''')
p.save()
