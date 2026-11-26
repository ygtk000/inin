# İNİN v1.3: ekonomi, seçenekler (arazi/ceza), başarımlar, keşif, seri, akıcı menüler
from patch_common import P
p = P('/home/claude/work/app.mod.js')

# ---------- G1: ekonomi ----------
p.rep('''    Lr = 20,
    rn = { unlock: 10, perMin: 1.5, passPerMin: 0.9, ownPrice: 4500 },''',
      '''    Lr = 9,
    rn = { unlock: 3, perMin: 0.5, passPerMin: 0.2, ownPrice: 3000 },''')
p.rep('''      v: 3,
      money: 150,''', '''      v: 3,
      money: 400,''')
p.rep('''      opt: { quality: 1, shadows: !0, steer: "slider", sound: !0, cam: 0, vib: !0 },''',
      '''      opt: { quality: 1, shadows: !0, steer: "slider", sound: !0, cam: 0, vib: !0, terrain: !0, pen: !0, outline: !0 },
      ach: {},
      disc: {},
      streak: 0,
      bestStreak: 0,''')
# iş ücretleri
p.rep('''        u = Math.round((n === "vip" ? 120 : 28) + l * (n === "vip" ? 0.2 : 0.11) * e + c[1] * 8),''',
      '''        u = Math.round((n === "vip" ? 160 : 45) + l * (n === "vip" ? 0.26 : 0.16) * e + c[1] * 10),''')
p.rep('''        pay: Math.round((25 + o * 0.1 * e) * c),''', '''        pay: Math.round((40 + o * 0.14 * e) * c),''')
p.rep('''        pay: Math.round((38 + l * 0.07) * e),''', '''        pay: Math.round((60 + l * 0.11) * e),''')
p.rep('''        pay: Math.round((30 + c * 0.06) * e),''', '''        pay: Math.round((50 + c * 0.1) * e),''')
# yemek fiyatları
p.rep('''            E4(25, 60, 0.6);''', '''            E4(15, 60, 0.6);''')
p.rep('''              E4(55, 40, 0.2);''', '''              E4(30, 40, 0.2);''')

# ---------- G2: seçenek bayrakları ----------
p.rep('''  var J7 = new L();''', '''  var J7 = new L(),
    OPTX = { terrain: !0, pen: !0 };''')
# eski kayıtlarda yeni alanlar
p.rep('''            opt: { ...e.opt, ...n.opt },
          }),''', '''            opt: { ...e.opt, ...n.opt },
            ach: { ...(n.ach || {}) },
            disc: { ...(n.disc || {}) },
          }),
          S.save.money < 150 && S.save.v13 !== 1 && ((S.save.money += 250), (S.save.v13gift = 1)),
          (S.save.v13 = 1),''')

# ---------- G3: arazi zorlukları kapatılabilir ----------
p.rep('''      o = tn(x.x, x.z),
      c = $s[o] || $s[kt.GRASS],
      l = t.rain ? 0.72 : 1,''', '''      o = tn(x.x, x.z),
      c = OPTX.terrain ? $s[o] || $s[kt.GRASS] : $s[kt.ROAD],
      l = t.rain && OPTX.terrain ? 0.72 : 1,''')
p.rep('''    let R = (-g * y * p) / Math.sqrt(1 + p * p),''', '''    OPTX.terrain || (x.wobble = 0);
    let R = OPTX.terrain ? (-g * y * p) / Math.sqrt(1 + p * p) : 0,''')
p.rep('''    if (de !== G && Math.abs(m) > 0.5 && !r3(pe, Ce) && (se === kt.ROAD || o === kt.ROAD)) {''',
      '''    if (OPTX.terrain && de !== G && Math.abs(m) > 0.5 && !r3(pe, Ce) && (se === kt.ROAD || o === kt.ROAD)) {''')
p.rep('''    if (((x.bumpCd -= n), x.bumpCd <= 0))
      for (let De of kn) {''', '''    if (((x.bumpCd -= n), OPTX.terrain && x.bumpCd <= 0))
      for (let De of kn) {''')
p.rep('''    let Q = $s[se] || $s[kt.GRASS];
    if (m > Q.risk) {''', '''    let Q = OPTX.terrain ? $s[se] || $s[kt.GRASS] : $s[kt.ROAD];
    if (m > Q.risk) {''')
# yürürken de yokuş/zemin
# ---------- G4: cezalar kapatılabilir ----------
p.rep('''  function zr(n, e, t = 0) {
    let i = S.save;''', '''  function zr(n, e, t = 0) {
    if (!OPTX.pen) return;
    let i = S.save;''')
p.rep('''  function ts(n, e) {
    let t = S.save,
      i = t.score;''', '''  function ts(n, e) {
    if (n < 0 && !OPTX.pen) return;
    let t = S.save,
      i = t.score;''')
p.rep('''        xn(-80, "Bay\\u0131ld\\u0131n, revir"),''', '''        OPTX.pen && xn(-40, "Bay\\u0131ld\\u0131n, revir"),''')
p.rep('''        Ot() && Ot().big("BAYILDIN", "Hi\\xE7 yemek yemedin! Revir 80\\u20BA. Yemekhane veya kafede ye.", "bad")),''',
      '''        Ot() && Ot().big("BAYILDIN", OPTX.pen ? "Hi\\xE7 yemek yemedin! Revir 40\\u20BA. Yemekhane veya kafede ye." : "Hi\\xE7 yemek yemedin! Yemekhane veya kafede ye.", "bad")),''')
p.rep('''      n && (xn(-40, "Taksiyle yurda d\\xF6n\\xFC\\u015F"), mt("Gece 02:00'yi ge\\xE7irdin, yorgun d\\xFC\\u015Ft\\xFCn!", "bad")),''',
      '''      n && (OPTX.pen && xn(-20, "Taksiyle yurda d\\xF6n\\xFC\\u015F"), mt("Gece 02:00'yi ge\\xE7irdin, yorgun d\\xFC\\u015Ft\\xFCn!", "bad")),''')
p.rep('''      ((S.job = null), xn(-20, "\\u0130\\u015F iptal cezas\\u0131"), ts(-2, "\\u0130\\u015F iptali"), S.save.stats.failed++, (S.route = null));''',
      '''      ((S.job = null), OPTX.pen && xn(-10, "\\u0130\\u015F iptal cezas\\u0131"), ts(-2, "\\u0130\\u015F iptali"), S.save.stats.failed++, (S.route = null), (S.save.streak = 0));''')
p.rep('''      r.ok ? r.hub && !t.work && xn(3, "\\u0130stasyon park indirimi") : zr(120, "Hatal\\u0131 park: " + r.why, -4);''',
      '''      r.ok ? r.hub && !t.work && xn(3, "\\u0130stasyon park indirimi") : zr(60, "Hatal\\u0131 park: " + r.why, -4);''')
# geç teslim: ceza kapalıysa tam ücret
p.rep('''    t
      ? ((s *= 0.5), a.push("Ge\\xE7 kald\\u0131n (yar\\u0131 \\xFCcret)"), ts(-2, "Ge\\xE7 teslimat"))
      : i < 0.5 && ((s *= 1.2), a.push("H\\u0131zl\\u0131 teslim bonusu %20"), Or("fast"));''',
      '''    t
      ? (OPTX.pen && ((s *= 0.7), a.push("Ge\\xE7 kald\\u0131n (%70 \\xFCcret)")), ts(-2, "Ge\\xE7 teslimat"), (e.streak = 0))
      : (i < 0.5 && ((s *= 1.2), a.push("H\\u0131zl\\u0131 teslim bonusu %20"), Or("fast")),
        (e.streak = (e.streak || 0) + 1),
        (e.bestStreak = Math.max(e.bestStreak || 0, e.streak)),
        e.streak > 1 && ((s *= 1 + Math.min(0.5, (e.streak - 1) * 0.1)), a.push("\\u{1F525} Seri x" + e.streak + " +%" + Math.round(Math.min(0.5, (e.streak - 1) * 0.1) * 100))));
    js() && (S.flags.nightJob = !0);''')
# iş zaman aşımı → seri sıfırlanır
p.rep('''        ((S.job = null), (S.route = null), ts(-3), e.stats.failed++);''', '''        ((S.job = null), (S.route = null), ts(-3), e.stats.failed++, (e.streak = 0));''')
# çarpma: ceza kapalıysa daha yumuşak (sadece fiziksel durma)
p.rep('''    let i = x.gloves ? 1.6 : 1;
    ((x.speed *= Math.min(0.9, (e >= 3 ? 0.1 : e === 2 ? 0.3 : 0.55) * i)),''', '''    let i = (x.gloves ? 1.6 : 1) * (OPTX.pen ? 1 : 1.5);
    ((x.speed *= Math.min(0.9, (e >= 3 ? 0.1 : e === 2 ? 0.3 : 0.55) * i)),''')
p.rep('''    (S.job && S.job.stage === "deliver" && S.job.frag && e >= 2 && Nr(e * 3, n),''',
      '''    (OPTX.pen && S.job && S.job.stage === "deliver" && S.job.frag && e >= 2 && Nr(e * 3, n),''')

# her adımda bayrakları kayıttan oku
p.rep('''  function I3(n) {
    var i, s;
    let e = S.save;
    S.t += n;''', '''  function I3(n) {
    var i, s;
    let e = S.save;
    ((OPTX.terrain = e.opt.terrain !== !1), (OPTX.pen = e.opt.pen !== !1), (S.t += n), ACHT(n));''')

# ---------- G5: ayarlar ----------
p.rep('''        i(
          "Direksiyon",
          [''', '''        i(
          "\\u26F0\\uFE0F Arazi zorluklar\\u0131<div class=\\"d\\" style=\\"font-weight:400;font-family:Barlow;font-size:12px\\">Kapal\\u0131yken yoku\\u015F, \\xE7im, arnavut kald\\u0131r\\u0131m\\u0131, kasis, kald\\u0131r\\u0131m ve ya\\u011Fmur seni yava\\u015Flatmaz.</div>",
          [
            [!0, "A\\xE7\\u0131k"],
            [!1, "Kapal\\u0131"],
          ],
          t.terrain !== !1,
          (s) => {
            ((t.terrain = s), (OPTX.terrain = s), vn(s ? "Arazi zorluklar\\u0131 a\\xE7\\u0131k" : "Arazi zorluklar\\u0131 kapal\\u0131: yoku\\u015Flar art\\u0131k seni yormaz", "good"));
          },
        ),
        i(
          "\\u{1F46E} Cezalar<div class=\\"d\\" style=\\"font-weight:400;font-family:Barlow;font-size:12px\\">Kapal\\u0131yken h\\u0131z s\\u0131n\\u0131r\\u0131, park, \\xE7arpma, revir ve taksi \\xFCcreti yok; puan\\u0131n d\\xFC\\u015Fmez.</div>",
          [
            [!0, "A\\xE7\\u0131k"],
            [!1, "Kapal\\u0131"],
          ],
          t.pen !== !1,
          (s) => {
            ((t.pen = s), (OPTX.pen = s), vn(s ? "Cezalar a\\xE7\\u0131k" : "Cezalar kapal\\u0131: rahat\\u0131na bak", "good"));
          },
        ),
        i(
          "\\u270F\\uFE0F Belirgin hatlar",
          [
            [!0, "A\\xE7\\u0131k"],
            [!1, "Kapal\\u0131"],
          ],
          t.outline !== !1,
          (s) => {
            ((t.outline = s), S.applyOutline && S.applyOutline());
          },
        ),
        i(
          "Direksiyon",
          [''')

# ---------- G6: başarımlar, keşif, kutlamalar ----------
ACH = open('/home/claude/work/ach.js', encoding='utf-8').read()
p.rep('''  var h7 = (n) => (Math.round(n * 10) / 10).toLocaleString("tr-TR"),''', ACH + '''
  var h7 = (n) => (Math.round(n * 10) / 10).toLocaleString("tr-TR"),''')
# XP kazancı: uçan yazı
p.rep('''  function S3(n) {
    let e = S.save;
    for (e.xp += n; e.xp >= Ur(e.lvl);)
      ((e.xp -= Ur(e.lvl)), e.lvl++, Ot() && Ot().big("SEV\\u0130YE " + e.lvl, T3(e.lvl), "lvl"), S.audio && S.audio.level());
  }''', '''  function S3(n) {
    let e = S.save;
    for (n > 0 && FLOAT("+" + Math.round(n) + " XP", "#ffd36a"), e.xp += n; e.xp >= Ur(e.lvl);)
      ((e.xp -= Ur(e.lvl)), e.lvl++, Ot() && Ot().big("SEV\\u0130YE " + e.lvl, T3(e.lvl), "lvl"), S.audio && S.audio.level(), CONFETTI(90));
  }''')
p.rep('''    ((t.money += n), n > 0 ? (t.stats.earned += n) : (t.stats.spent -= n), Ot() && Ot().moneyFx(n, e), n > 0 && S.audio && S.audio.cash());''',
      '''    ((t.money += n),
      n > 0 ? (t.stats.earned += n) : (t.stats.spent -= n),
      Ot() && Ot().moneyFx(n, e),
      n > 0 && S.audio && S.audio.cash(),
      n >= 5 && FLOAT("+" + Math.round(n) + " \\u20BA", "#7ff0a0"));''')
# teslimatta konfeti
p.rep('''      xn(s + r, n.title),
      S3(n.xp),''', '''      xn(s + r, n.title),
      S3(n.xp),
      CONFETTI(s + r > 150 ? 70 : 40),''')
# günlük görev bitince
p.rep('''            mt("\\u2705 G\\xFCnl\\xFCk g\\xF6rev: " + i.t + " +" + i.rew + "\\u20BA", "good")));''',
      '''            mt("\\u2705 G\\xFCnl\\xFCk g\\xF6rev: " + i.t + " +" + i.rew + "\\u20BA", "good"),
            CONFETTI(50)));''')

# ---------- G7: akıcı telefon menüsü (sekme değişince yeniden açılmaz) ----------
p.rep('''    (n && (is = n),
      Hn.click(),
      Vn && Vn.remove(),''', '''    if (Vn && !n) {
      Hn.click();
      let b = Vn.querySelector(".ph-body");
      return (
        Vn.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.k === is)),
        b.classList.remove("swap"),
        void b.offsetWidth,
        b.classList.add("swap"),
        (b.scrollTop = 0),
        C7(b)
      );
    }
    (n && (is = n),
      Hn.click(),
      Vn && Vn.remove(),''')
p.rep('''        ["me", "\\u{1F464} Profil"],''', '''        ["me", "\\u{1F464} Profil"],
        ["ach", "\\u{1F3C6} Rozetler"],''')
p.rep('''      let a = Bt(`<div class="tab ${i === is ? "on" : ""}">${s}</div>`);''', '''      let a = Bt(`<div class="tab ${i === is ? "on" : ""}" data-k="${i}">${s}</div>`);''')
p.rep('''    if (is === "set") {
      let t = e.opt,''', '''    if (is === "ach") ACHVIEW(n);
    if (is === "set") {
      let t = e.opt,''')
p.rep('''      t.appendChild(a);
    }),
      C7(Vn.querySelector(".ph-body")));''', '''      t.appendChild(a);
    }),
      C7(Vn.querySelector(".ph-body")));
    let at = t.querySelector(".tab.on");
    at && at.scrollIntoView && at.scrollIntoView({ inline: "center", block: "nearest" });''') if False else None
# profil sekmesine keşif + seri satırı
p.rep('''    if (is === "me") {
      let t = e.stats;
      (n.appendChild(''', '''    if (is === "me") {
      let t = e.stats;
      (n.appendChild(
        Gn(
          `<div class="t">\\u{1F4CD} Ke\\u015Fif ${Object.keys(e.disc || {}).length}/${DISC.length} \\xB7 \\u{1F525} En iyi seri ${e.bestStreak || 0} \\xB7 \\u{1F3C6} ${Object.keys(e.ach || {}).length}/${ACHS.length} rozet</div><div class="d">Kamp\\xFCsteki yerlerin yan\\u0131na gidip ke\\u015Ffet, \\xFCst \\xFCste zaman\\u0131nda teslimat yap\\u0131p seri b\\xFCy\\xFCt.</div>`,
        ),
      ),
      n.appendChild(''')

# ---------- G8: CSS: akıcılık ve kutlamalar ----------
p.rep('''#ui.inmenu > :not(#menu):not(.modal):not(#rot){display:none!important}
`;''', '''#ui.inmenu > :not(#menu):not(.modal):not(#rot){display:none!important}
.ph-body.swap{animation:swapin .22s cubic-bezier(.2,.9,.3,1)}
@keyframes swapin{from{opacity:0;transform:translateX(14px)}}
.tab{transition:color .2s,border-color .25s,background .25s}.tab:active{background:rgba(25,195,214,.12)}
.card{animation:cardin .32s cubic-bezier(.2,1,.3,1) both}
.ph-body .card:nth-child(2){animation-delay:.03s}.ph-body .card:nth-child(3){animation-delay:.06s}.ph-body .card:nth-child(4){animation-delay:.09s}.ph-body .card:nth-child(5){animation-delay:.12s}.ph-body .card:nth-child(n+6){animation-delay:.15s}
@keyframes cardin{from{opacity:0;transform:translateY(10px) scale(.98)}}
.btn,.act,.rbtn,.mbtn,.pedal{will-change:transform}
.modal{animation:fade .18s ease-out}
.fx{position:fixed;left:0;top:0;pointer-events:none;z-index:30}
.fl{position:fixed;left:calc(18px + env(safe-area-inset-left));top:96px;font-family:var(--hd);font-weight:800;font-size:22px;text-shadow:0 2px 8px rgba(0,0,0,.6);pointer-events:none;z-index:25;animation:flup 1.4s cubic-bezier(.2,.8,.3,1) forwards}
@keyframes flup{0%{opacity:0;transform:translateY(10px) scale(.8)}15%{opacity:1;transform:translateY(0) scale(1.1)}70%{opacity:1}100%{opacity:0;transform:translateY(-38px) scale(1)}}
.cf{position:fixed;top:-12px;width:9px;height:14px;border-radius:2px;pointer-events:none;z-index:28;animation:cfall linear forwards}
@keyframes cfall{to{transform:translate(var(--dx),110vh) rotate(var(--r));opacity:.9}}
.achpop{position:absolute;left:50%;top:16%;transform:translateX(-50%);display:flex;gap:12px;align-items:center;padding:10px 18px 10px 12px;border-radius:16px;background:linear-gradient(160deg,rgba(60,48,20,.95),rgba(28,22,10,.95));border:1px solid rgba(232,176,75,.6);box-shadow:0 10px 30px rgba(0,0,0,.5),0 0 30px rgba(232,176,75,.35);z-index:26;animation:achin .5s cubic-bezier(.2,1.4,.4,1) both;pointer-events:none}
.achpop.out{animation:achout .35s ease-in forwards}
.achpop .ic{font-size:34px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:radial-gradient(circle,#ffe39a,#e8b04b);box-shadow:0 0 18px rgba(232,176,75,.7);animation:spinin .7s ease-out}
.achpop .tt{font-family:var(--hd);font-weight:800;font-size:13px;letter-spacing:1.5px;color:var(--gold)}.achpop .nm{font-family:var(--hd);font-weight:800;font-size:21px}.achpop .rw{font-size:13px;color:#ffe9b8}
@keyframes achin{from{opacity:0;transform:translate(-50%,-20px) scale(.8)}}
@keyframes achout{to{opacity:0;transform:translate(-50%,-14px) scale(.95)}}
@keyframes spinin{from{transform:rotate(-200deg) scale(.4)}}
.achgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.achc{border-radius:14px;padding:10px;background:linear-gradient(160deg,rgba(48,52,58,.6),rgba(30,33,37,.6));border:1px solid var(--line);text-align:center;animation:cardin .3s both}
.achc .i{font-size:30px;filter:grayscale(1) brightness(.6)}.achc.ok .i{filter:none;animation:spinin .6s ease-out}.achc.ok{border-color:rgba(232,176,75,.55);box-shadow:0 0 16px rgba(232,176,75,.18)}
.achc .n{font-family:var(--hd);font-weight:800;font-size:16px;margin-top:2px}.achc .d{font-size:12px;color:var(--muted);line-height:1.35}.achc .r{font-size:12px;color:var(--gold);margin-top:3px}
.prog{height:5px;border-radius:3px;background:rgba(255,255,255,.1);overflow:hidden;margin-top:6px}.prog i{display:block;height:100%;background:linear-gradient(90deg,#e8b04b,#ffe39a)}
#stat .money{transition:color .3s}#stat .money.up{color:#7ff0a0}
`;''')
p.save()
