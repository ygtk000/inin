# İNİN v1.8: işletmeler, filo, ünvanlar, görevler, lig, garaj, hayalet, rakipler, altın arılar
import sys
sys.path.insert(0, '/home/claude/work')
from patch_common import P
p = P('/home/claude/work/app.mod.js')
def esc(t):
    o = []
    for ch in t:
        c = ord(ch)
        o.append(ch if c < 128 else ('\\x%02X' % c if c < 256 else ('\\u%04X' % c if c < 0x10000 else '\\u{%X}' % c)))
    return ''.join(o)
_rep = p.rep
def rep2(old, new, cnt=1):
    if p.src.count(old) == cnt: return _rep(old, new, cnt)
    return _rep(esc(old), new, cnt)
p.rep = rep2
MOD = ''.join(open('/home/claude/work/' + f, encoding='utf-8').read() for f in ['v18a.js', 'v18b.js', 'v18c.js', 'v18d.js', 'v18e.js', 'v18i.js', 'v18g.js', 'v18f.js', 'v18h.js'])
H7 = '  var h7 = (n) => (Math.round(n * 10) / 10).toLocaleString("tr-TR"),'
p.rep(H7, MOD + H7)
# XP eğrisi: daha yumuşak (Rektör Sv 34 ulaşılabilir)
p.rep('var Ur = (n) => Math.round(80 + 70 * Math.pow(n - 1, 1.35));', 'var Ur = (n) => Math.round(60 + 28 * Math.pow(n - 1, 1.25));')
p.rep(r'Ot().big("SEVİYE " + e.lvl, T3(e.lvl), "lvl")', r'Ot().big("SEVİYE " + e.lvl, V18LV(e.lvl), "lvl")')
# yeni gün / günlük görevler / etkinlik
p.rep('    e.daily = { day: e.day, list: i };\n  }', '    ((e.daily = { day: e.day, list: V18DAILY(i) }), V18DAY(n));\n  }')
# zaman birikimi
p.rep('    let t = (n * Lr) / 3600;\n    if (\n      ((e.hour += t),', '    let t = (n * Lr) / 3600;\n    V18H(t);\n    if (\n      ((e.hour += t),')
p.rep('  function P1(n) {\n    let e = S.save;', '  function P1(n) {\n    V18H(n);\n    let e = S.save;')
# iş bitişi
p.rep('      S.save.items.helmet && (s *= 1.1),\n      (s = Math.round(s)),', '      S.save.items.helmet && (s *= 1.1),\n      (s = V18PAY(n, s, a)),\n      (s = Math.round(s)),')
p.rep('      S3(n.xp),', '      S3(V18XP(n)),')
p.rep('      n.type === "sarj" && (e.stats.juiced++, Or("juice")),', '      n.type === "sarj" && (e.stats.juiced++, Or("juice")),\n      V18DONE(n, s + r),')
p.rep('Math.min(0.5, (e.streak - 1) * 0.1)', 'Math.min(1, (e.streak - 1) * 0.1)', 2)
p.rep('    let i = S.save.items.bag ? 0.5 : 1,', '    let i = (S.save.items.bag ? 0.5 : 1) * V18CARGO(),')
# teklifler ve havuz
p.rep('    ((S.offers = e), (S.offerT = 0));\n  }\n  function D4(n, e) {', '    ((S.offers = V18OFF(e)), (S.offerT = 0));\n  }\n  function D4(n, e) {')
p.rep('      g7());\n  }\n  var m7 = [', '      g7(),\n      V18POOL());\n  }\n  var m7 = [')
# yarış hayaleti
p.rep('        (n.cleanStart = S.save.stats.falls),', '        (n.cleanStart = S.save.stats.falls),\n        GHSTART(n),')
p.rep('    if (((e.t += n), x.mode !== "ride" && x.mode !== "fallen")) {', '    if (((e.t += n), GHT(e), x.mode !== "ride" && x.mode !== "fallen")) {')
p.rep('(e.idx++, S.audio && S.audio.check(), e.idx >= e.pts.length)', '(e.idx++, S.audio && S.audio.check(), GHCP(e), e.idx >= e.pts.length)')
p.rep('        S3(s ? 40 : 10),\n        Or("race"),', '        S3(s ? 40 : 10),\n        Or("race"),\n        GHFIN(e, i),')
p.rep('  function k3(n) {\n    S.race && ((S.race = null), (S.route = null), n && mt(n, "bad"));', '  function k3(n) {\n    (GHSTOP(), S.race && ((S.race = null), (S.route = null), n && mt(n, "bad")));')
# yakın etkileşimler
p.rep('    let i = S.job;\n    if (i && x.mode !== "fallen") {', '    V18ACT(e);\n    let i = S.job;\n    if (i && x.mode !== "fallen") {')
# zil, scooter modelleri, kıyafet malzemeleri
p.rep('    bell() {\n      (Ht(2100,', '    bell() {\n      if (V18BELL()) return;\n      (Ht(2100,')
p.rep('  function w3(n, e, t) {\n    let i = e || {};\n    return n', '  function w3(n, e, t) {\n    return V18SPEC(n, w3o(n, e, t));\n  }\n  function w3o(n, e, t) {\n    let i = e || {};\n    return n')
p.rep('    let m = new Ie(new _i(0.238, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), mW);', '    let mHel = yn(16316664),\n      m = new Ie(new _i(0.238, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), mHel);')
p.rep('(a.userData = { hip: u, la: E, ra: w, ll: v, rl: P2, neck: p, hel: m, bag: f, torso: tor, eyes: ey })', '(a.userData = { hip: u, la: E, ra: w, ll: v, rl: P2, neck: p, hel: m, bag: f, torso: tor, eyes: ey, mats: { hood: mH, pants: mP, hair: mHr, hel: mHel } })')
# telefon sekmeleri
p.rep(r'''        ["map", "\u{1F5FA}️ Harita"],
        ["jobs", "\u{1F4BC} İşler"],
        ["race", "\u{1F3C1} Yarış"],
        ["shop", "\u{1F6D2} Mağaza"],
        ["me", "\u{1F464} Profil"],''', r'''        ["map", "\u{1F5FA}️ Harita"],
        ["jobs", "\u{1F4BC} İşler"],
        ["goal", "\u{1F3AF} G\xF6rev"],
        ["race", "\u{1F3C1} Yarış"],
        ["biz", "\u{1F3EA} İşletme"],
        ["fleet", "\u{1F6F4} Filo"],
        ["shop", "\u{1F6D2} Mağaza"],
        ["gar", "\u{1F3A8} Garaj"],
        ["me", "\u{1F464} Profil"],''')
p.rep('    if (((n.innerHTML = ""), is === "jobs")) {', '    if (((n.innerHTML = ""), V18TAB(n, is))) {\n    } else if (is === "jobs") {')
p.rep('        S.offers.forEach((i) => {\n          let s = { kurye:', '        V18JH(n),\n        S.offers.forEach((i) => {\n          let s = { kurye:')
p.rep(r'`<div class="t">Seviye ${e.lvl} \xB7 ⭐ ${Math.round(e.score)} puan</div>', r'`<div class="t">\u{1F393} ${V18TN(e.lvl)} \xB7 Seviye ${e.lvl} \xB7 ⭐ ${Math.round(e.score)} puan</div>')
p.rep('      (i(\n        "Grafik",', '      (V18DIFF(i, t),\n      i(\n        "Grafik",')
# HUD
p.rep('<span class="lv">SV ${t.lvl}</span>', '<span class="lv">${V18TS(t.lvl)}</span>')
p.rep("PASS</b>' : \"\"}</div>`;", "PASS</b>' : \"\"}</div>${V18HUD(t)}`;")
# haritalar
p.rep(r'''      ((n.font = "16px sans-serif"), (n.textAlign = "center"), (n.textBaseline = "middle"), n.fillText("⚡", p, y));
    }''', r'''      ((n.font = "16px sans-serif"), (n.textAlign = "center"), (n.textBaseline = "middle"), n.fillText("⚡", p, y));
    }
    V18MINI(n, (X, Z) => $a(X, Z, t, i, s, a), e);''')
p.rep(r'      for (let [M, _] of Pn) ((g.font = "16px sans-serif"), g.fillText("⚡", d(M), E(_) - 16));', r'''      for (let [M, _] of Pn) ((g.font = "16px sans-serif"), g.fillText("⚡", d(M), E(_) - 16));
      V18MAP(g, d, E, m);''')
# kare döngüsü ve başlatma
p.rep('      if (k) {\n        let ie = x.mode !== "walk",', '      if ((V18F(de, xe), k)) {\n        let ie = x.mode !== "walk",')
p.rep('        ((k = !0), D3(), S.offers.length || qa(), S.save.daily || D1(!0));', '        (V18INIT(), (k = !0), D3(), S.offers.length || qa(), S.save.daily || D1(!0));')
p.rep('      S.save && ((S.save.pos = [x.x, x.z, x.yaw]), localStorage', '      S.save && ((S.save.pos = [x.x, x.z, x.yaw]), S.save.v18 && (S.save.v18.lastReal = Date.now()), localStorage')
# yardım metni
p.rep(r'seri teslimat bonusu (+%10/teslimat, en fazla +%50).<br>', r'''seri teslimat bonusu (+%10/teslimat, en fazla +%100; iş bitince 3 dk içinde yenisini almazsan seri biter).<br>
  <b>v1.8:</b> \u{1F393} Seviyen akademik \xFCnvan verir (Hazırlık → Rekt\xF6r). \u{1F3EA} Kamp\xFCsteki 44 ger\xE7ek işletmeyi satın al, y\xFCkselt, m\xFCd\xFCr tut, kasayı topla. \u{1F6F4} Sv 9'da kendi filonu kur. \u{1F3AF} G\xFCnl\xFCk/haftalık g\xF6revler, giriş serisi, kurye ligi, fak\xFClte itibarı, etkinlik g\xFCnleri. \u{1F3A8} Garajda model, renk, kıyafet, iz ve zil. \u{1F47B} Yarışlarda kendi hayaletine karşı yarış. \u{1F41D} Kamp\xFCse saklanmış 40 Altın Arı'yı bul.<br>''')
p.save()
