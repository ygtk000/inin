# İNİN v1.3: simge yapılar, kanopiler, bina hatları, yeni cephe dokuları
from patch_common import P
p = P('/home/claude/work/app.mod.js')

p.rep('''      xe = { beton: 7828336, tugla: 6967108, beyaz: 10328724, cam: 5595242, yurt: 9071957, metro: 3033702 };''',
      '''      xe = { beton: 7828336, tugla: 6967108, beyaz: 10328724, cam: 5595242, yurt: 9071957, metro: 3033702, klinker: 7166020, perfore: 9343126, elek: 9081238, yesil: 7310954 },
      LMK = [],
      EDG = [];''')

LANDMARKS = open('/home/claude/work/landmarks.js', encoding='utf-8').read()
p.rep('''    let he = new Ie(
      $n(
        Q.map((C) => (C.index || (C = C.toNonIndexed()), C)).map((C) => {''', LANDMARKS + '''
    let he = new Ie(
      $n(
        Q.map((C) => (C.index || (C = C.toNonIndexed()), C)).map((C) => {''')

p.rep('''      a = { beton: "#bdb8ad", tugla: "#a8553c", beyaz: "#e7e3da", cam: "#6f8796", yurt: "#d8c49a", metro: "#3d6e9e" }[n] || "#bbb";''',
      '''      a =
        { beton: "#c4bdb0", tugla: "#b45f42", beyaz: "#efeae0", cam: "#79a3b8", yurt: "#e6cf9e", metro: "#3d6e9e", klinker: "#9c4f37", perfore: "#c3c8cd", elek: "#b7bec4", yesil: "#6fae62" }[n] || "#bbb";''')
p.rep('''    if (!e && n === "tugla") {
      i.fillStyle = "rgba(0,0,0,0.08)";
      for (let o = 0; o < 128; o += 4) i.fillRect(0, o, 128, 1);
    }''', '''    if (!e && n === "tugla") {
      i.fillStyle = "rgba(0,0,0,0.08)";
      for (let o = 0; o < 128; o += 4) i.fillRect(0, o, 128, 1);
    }
    if (!e && n === "klinker") {
      i.fillStyle = "rgba(0,0,0,0.12)";
      for (let o = 0; o < 128; o += 32) (i.fillRect(0, o, 128, 2), i.fillRect(o, 0, 2, 128));
    }
    if (!e && (n === "perfore" || n === "elek")) {
      i.fillStyle = n === "perfore" ? "rgba(70,78,86,0.55)" : "rgba(80,88,96,0.45)";
      for (let o = 2; o < 128; o += 6)
        for (let c = 2 + ((o / 6) % 2) * 3; c < 128; c += 6)
          n === "perfore"
            ? i.fillRect(c, o, 2, 2)
            : (i.beginPath(), i.moveTo(c, o - 2), i.lineTo(c + 2, o), i.lineTo(c, o + 2), i.lineTo(c - 2, o), i.fill());
      i.fillStyle = "rgba(255,255,255,0.18)";
      for (let o = 0; o < 128; o += 32) i.fillRect(0, o, 128, 2);
    }''')
p.rep('''      metro: [[1, 1, 1]],
    },''', '''      metro: [[1, 1, 1]],
      klinker: [
        [1, 1, 1],
        [0.96, 0.92, 0.9],
      ],
      perfore: [[1, 1, 1]],
      elek: [
        [1, 1, 1],
        [0.97, 0.98, 1],
      ],
      yesil: [[1, 1, 1]],
    },''')
p.save()
