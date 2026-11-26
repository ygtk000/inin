# İNİN v1.5: düzgün kavşaklar, küçük tuşlar, isteğe bağlı öğretici, ek tuşlar, direksiyon hassasiyeti, yeşil alan çeşitliliği
from patch_common import P
p = P('/home/claude/work/app.mod.js')

# ---------- 1) kavşaklar: yalnızca 3+ yol birleşiminde kavşak; iki parçanın uç uca eklendiği yerde kesinti yok ----------
p.rep('''      let W = jt[C.a] > 1 ? Math.min(C.len * 0.3, mn[C.a] - 1) : 0,
        te = jt[C.b] > 1 ? Math.min(C.len * 0.3, mn[C.b] - 1) : 0;''', '''      let W = jt[C.a] > 2 ? Math.min(C.len * 0.3, mn[C.a] - 1) : 0,
        te = jt[C.b] > 2 ? Math.min(C.len * 0.3, mn[C.b] - 1) : 0;''')
p.rep('''      let oe = jt[C.a] > 1 ? Math.max(0, mn[C.a] - 0.9) : 0,
        Re = jt[C.b] > 1 ? Math.max(0, mn[C.b] - 0.9) : 0,''', '''      let oe = jt[C.a] > 2 ? Math.max(0, mn[C.a] - 0.9) : 0,
        Re = jt[C.b] > 2 ? Math.max(0, mn[C.b] - 0.9) : 0,''')
JUNC = open('/home/claude/work/junc.js', encoding='utf-8').read()
a = p.src.index('''    let re = [];
    for (let C in jt)
      if (jt[C] > 1) {''')
b = p.src.index('''    Y($n(re), P);''', a)
p.src = p.src[:a] + JUNC + p.src[b:]
# yüzey haritası, kaldırım/kavşak denetimi, park kuralı
p.rep('''          if (jt[a] > 1) {''', '''          if (jt[a] > 2) {''')
p.rep('''      if (jt[t] > 1) {''', '''      if (jt[t] > 2) {''')
p.rep('''      if (jt[s] > 1 && Math.hypot(ji(s)[0] - n, ji(s)[1] - e) < mn[s] + 4)''', '''      if (jt[s] > 2 && Math.hypot(ji(s)[0] - n, ji(s)[1] - e) < mn[s] + 4)''')

# ---------- 2) direksiyon hassasiyeti + yüksek hızda yumuşak dönüş ----------
p.rep('''    let F = 0.07 + 0.55 / (1 + Math.abs(m) * 0.55),
      q = e.steer * F;
    x.steerA += (q - x.steerA) * Math.min(1, n * 7);''', '''    let F = (0.04 + 0.5 / (1 + Math.abs(m) * 0.75)) * ((S.save && S.save.opt.steerK) || 1),
      q = e.steer * F;
    x.steerA += (q - x.steerA) * Math.min(1, n * (7 / (1 + Math.abs(m) * 0.12)));''')
p.rep('''        i(
          "\\u{1F3A5} Kamera",''', '''        i(
          "\\u{1F3AF} Direksiyon hassasiyeti",
          [
            [0.6, "D\\xFC\\u015F\\xFCk"],
            [1, "Orta"],
            [1.4, "Y\\xFCksek"],
          ],
          t.steerK || 1,
          (s) => (t.steerK = s),
        ),
        i(
          "\\u{1F518} Tu\\u015F boyutu",
          [
            ["s", "K\\xFC\\xE7\\xFCk"],
            ["m", "Orta"],
            ["l", "B\\xFCy\\xFCk"],
          ],
          t.ui || "m",
          (s) => {
            ((t.ui = s), UIsize());
          },
        ),
        i(
          "\\u{1F4D6} \\xD6\\u011Freticiler",
          [
            [!0, "A\\xE7\\u0131k"],
            [!1, "Kapal\\u0131"],
          ],
          t.tut !== !1,
          (s) => (t.tut = s),
        ),
        i(
          "\\u{1F3A5} Kamera",''')

# ---------- 3) tuşlar küçük + ek tuşlar (işler, ayarlar) ----------
p.rep('''  <div id="topbtn"><div class="rbtn pe" id="bPhone">\\u{1F4F1}</div><div class="rbtn pe" id="bPause">\\u23F8</div><div class="rbtn pe" id="bCam">\\u{1F3A5}</div></div>''',
      '''  <div id="topbtn"><div class="rbtn pe" id="bPhone">\\u{1F4F1}</div><div class="rbtn pe" id="bJobs">\\u{1F4BC}</div><div class="rbtn pe" id="bSet">\\u2699\\uFE0F</div><div class="rbtn pe" id="bPause">\\u23F8</div><div class="rbtn pe" id="bCam">\\u{1F3A5}</div></div>''')
p.rep('''      (Xe.mini.onclick = () => ea("map")),''', '''      (Xe.mini.onclick = () => ea("map")),
      (document.getElementById("bJobs").onclick = () => ea("jobs")),
      (document.getElementById("bSet").onclick = () => ea("set")),
      UIsize(),
      Xe.job.addEventListener("click", (ev) => {
        ev.target.classList && ev.target.classList.contains("tx") && ((S.save.opt.tut = !1), Ln(), (Xe.job.style.display = "none"), vn("\\xD6\\u011Freticiler kapat\\u0131ld\\u0131 (Ayarlar'dan a\\xE7abilirsin)"));
      }),''')
p.rep('''  function MMsize() {''', '''  function UIsize() {
    let u = (S.save && S.save.opt.ui) || "m";
    mi && ((mi.classList.toggle("us", u === "s")), mi.classList.toggle("ul", u === "l"));
  }
  function MMsize() {''')
p.rep('''      ((Fe.steer = -i), (Xe.steerVis.lastChild.style.transform = `translateX(${i * 85}px)`));''',
      '''      ((Fe.steer = -i), (Xe.steerVis.lastChild.style.transform = `translateX(${i * Math.max(30, (Xe.steerVis.clientWidth - Xe.steerVis.lastChild.clientWidth) / 2 - 6)}px)`));''')
p.rep('''        (Xe.acts.style.bottom = i ? "160px" : "20px"));''', '''        (Xe.acts.style.bottom = i ? "var(--ab)" : "16px"));''')
p.rep('''#mini:active{transform:scale(.95)}''', '''#mini:active{transform:scale(.95)}
#ui{--pw:64px;--ph:92px;--gh:104px;--rb:38px;--sw:190px;--sh:52px;--sk:21px;--ab:124px}
#ui.us{--pw:54px;--ph:78px;--gh:88px;--rb:33px;--sw:165px;--sh:46px;--sk:18px;--ab:106px}
#ui.ul{--pw:80px;--ph:118px;--gh:134px;--rb:44px;--sw:230px;--sh:64px;--sk:26px;--ab:160px}
.pedal{width:var(--pw);height:var(--ph);font-size:calc(var(--pw) * .23);border-radius:calc(var(--pw) * .22);padding-bottom:calc(var(--pw) * .13)}
#gas{height:var(--gh)}
#ctrlR{gap:8px;bottom:10px}
.rbtn{width:var(--rb);height:var(--rb);font-size:calc(var(--rb) * .44);border-radius:calc(var(--rb) * .27)}
#topbtn{display:grid;grid-template-columns:repeat(2,var(--rb));gap:6px;right:calc(var(--mm,132px) + 14px + env(safe-area-inset-right))}
#small{right:calc(var(--pw) * 2 + 32px + env(safe-area-inset-right));bottom:10px;gap:6px}
.act{padding:calc(var(--rb) * .19) calc(var(--rb) * .34);font-size:calc(var(--rb) * .4);border-radius:12px}
.act small{font-size:11px}
#steerVis{width:var(--sw);height:var(--sh);border-radius:calc(var(--sh) / 2);bottom:16px}
#steerVis i{top:calc(var(--sh) / 2 - var(--sk));left:calc(50% - var(--sk));width:calc(var(--sk) * 2);height:calc(var(--sk) * 2)}
#steerVis span{top:calc(var(--sh) / 2 - 11px);font-size:17px}
#speed{padding:4px 12px;min-width:160px;bottom:8px}
#speed .v{font-size:calc(var(--rb) * .85)}
#speed .sub{font-size:12px;gap:8px}
#limit{left:calc(50% + 96px);width:38px;height:38px;font-size:16px;border-width:4px;bottom:14px}
#stat{font-size:12px;min-width:160px;padding:6px 10px;line-height:1.45}
#stat .money{font-size:20px}
#ui.us #stat{font-size:11px;min-width:145px}#ui.us #stat .money{font-size:18px}
#job{top:96px;font-size:12px;max-width:205px;padding:5px 9px;line-height:1.4}
#job b{font-size:13px}
#job .tx{float:right;margin:-2px -3px 0 8px;padding:0 5px;font-size:13px;opacity:.75;border-radius:6px;background:rgba(255,255,255,.08)}
#joyVis{width:104px;height:104px}#joyVis i{left:29px;top:29px;width:46px;height:46px}''')

# ---------- 4) öğretici: kısa ve isteğe bağlı ----------
p.rep('''          : t.tutorial < 99
            ? ((Xe.job.style.display = "block"), (Xe.job.innerHTML = T7()))''', '''          : t.tutorial < 99 && t.opt.tut !== !1
            ? ((Xe.job.style.display = "block"), Xe.job.dataset.t !== String(t.tutorial) && ((Xe.job.dataset.t = String(t.tutorial)), (Xe.job.innerHTML = T7())))''')
p.rep('''      if (a) {
        let l = (a.deadline - t.hour) * 60,''', '''      if (((a || r) && (Xe.job.dataset.t = ""), a)) {
        let l = (a.deadline - t.hour) * 60,''')
p.rep('''    return n.tutorial === 0
      ? "<b>\\u{1F44B} Ho\\u015F geldin!</b><br>Haritadaki turkuaz noktalar \\u0130N\\u0130N scooterlar\\u0131. En yak\\u0131n\\u0131na y\\xFCr\\xFC ve <b>QR okut</b>."
      : n.tutorial === 1
        ? "<b>\\u{1F6F4} S\\xFCr\\xFC\\u015F</b><br>Solda kayd\\u0131r: direksiyon. Sa\\u011Fda GAZ/FREN.<br>Kasis, kald\\u0131r\\u0131m ve \\xE7arpmalarda scooter yava\\u015Flar."
        : n.tutorial === 2
          ? "<b>\\u{1F4BC} Para kazan</b><br>\\u{1F4F1} Telefon \\u2192 \\u0130\\u015Fler: teslimat al, zaman\\u0131nda g\\xF6t\\xFCr. S\\xFCr\\xFC\\u015F dakikas\\u0131 para yer, h\\u0131zl\\u0131 ol!"
          : "<b>Hedef</b><br>Para biriktir: kask, telefon tutaca\\u011F\\u0131, \\u0130N\\u0130N Pass ve sonunda kendi scooter\\u0131n (Sv 8).";''',
      '''    let X = '<span class="pe tx">\\u2715</span>';
    return (
      X +
      (n.tutorial === 0
        ? "<b>\\u{1F44B} Ba\\u015Fla</b><br>Turkuaz nokta = scooter. Yan\\u0131na git, QR okut."
        : n.tutorial === 1
          ? "<b>\\u{1F6F4} S\\xFCr\\xFC\\u015F</b><br>Sol: direksiyon \\xB7 Sa\\u011F: GAZ/FREN"
          : n.tutorial === 2
            ? "<b>\\u{1F4BC} \\u0130\\u015F al</b><br>\\u{1F4BC} tu\\u015Fu \\u2192 teslimat se\\xE7, zaman\\u0131nda g\\xF6t\\xFCr."
            : "<b>\\u{1F3AF} Hedef</b><br>Para biriktir: kask, Pass, kendi scooter'\\u0131n (Sv 8).")
    );''')

# ---------- 5) yeşil alanlar: zemin dokusunda çim desenleri + hafif çalı/çiçek öbekleri ----------
p.rep('''    ((s.fillStyle = "rgba(150,210,95,0.6)"),
      o.grass.forEach((l) => {
        (r(l.poly), s.fill());
      }),''', '''    for (let l = 0; l < 1400; l++) {
      let cx = Me.minX + a() * Ct,
        cz = Me.minZ + a() * It,
        k = a();
      ((s.fillStyle = k < 0.33 ? "rgba(185,200,95,0.22)" : k < 0.66 ? "rgba(60,120,45,0.2)" : "rgba(130,190,80,0.25)"),
        s.beginPath(),
        s.ellipse(cx, cz, 6 + a() * 22, 4 + a() * 14, a() * 3, 0, 7),
        s.fill());
    }
    for (let l = 0; l < 260; l++) {
      let cx = Me.minX + a() * Ct,
        cz = Me.minZ + a() * It,
        c = ["255,255,255", "255,226,90", "255,150,190", "190,150,255"][(a() * 4) | 0];
      for (let k = 0; k < 26; k++) ((s.fillStyle = `rgba(${c},${0.35 + a() * 0.35})`), s.fillRect(cx + (a() - 0.5) * 16, cz + (a() - 0.5) * 12, 0.9, 0.9));
    }
    ((s.fillStyle = "rgba(150,210,95,0.6)"),
      o.grass.forEach((l) => {
        (r(l.poly), s.fill(), s.save(), r(l.poly), s.clip());
        let [cx, cz] = Ws(l.poly),
          R = Math.sqrt(Hs(l.poly)) + 40;
        (s.translate(cx, cz), s.rotate(a() * 3.14), (s.fillStyle = "rgba(255,255,220,0.08)"));
        for (let k = -R; k < R; k += 8) s.fillRect(k, -R, 4, 2 * R);
        (s.restore(), (s.fillStyle = "rgba(150,210,95,0.6)"));
      }),''')
DECO = open('/home/claude/work/deco.js', encoding='utf-8').read()
p.rep('''    let Pe = [];
    for (let C of nt)
      if (C.type !== "servis")''', DECO + '''
    let Pe = [];
    for (let C of nt)
      if (C.type !== "servis")''')
p.save()
