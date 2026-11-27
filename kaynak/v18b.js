  // ---- işletmeler (OSM 27.11.2026 + İTÜ/yemek.com kaynakları) ----
  // [ad, simge, fiyat, saatlik gelir, açılış, kapanış, seviye]
  var V18BC = {
    otomat: ["Otomat", "🥤", 450, 58, 0, 24, 2],
    kucuk: ["Simit · Börek · Lokanta", "🥯", 1050, 163, 7, 22, 3],
    kafe: ["Kafe", "☕", 1600, 240, 7.5, 23, 4],
    berber: ["Kuaför", "💈", 1200, 170, 9, 20, 4],
    kirtasiye: ["Kırtasiye · Kitap · Baskı", "📚", 1400, 195, 8, 19, 5],
    kafeterya: ["Kafeterya", "🍽️", 1900, 286, 8, 20, 5],
    restoran: ["Restoran", "🍕", 2450, 364, 11, 22.5, 6],
    zincir: ["Zincir kahveci", "🧋", 3150, 468, 7, 22, 7],
    cowork: ["Çalışma kafe", "💻", 1750, 221, 8, 24, 7],
    magaza: ["Mağaza", "🛍️", 2800, 338, 9, 19, 8],
    yikama: ["Oto yıkama", "🚗", 2300, 299, 8, 19, 8],
    market: ["Market", "🛒", 5250, 676, 8, 21.5, 10],
  };
  var V18FOOD = { otomat: 1, kucuk: 1, kafe: 1, kafeterya: 1, restoran: 1, zincir: 1, cowork: 1 };
  var V18B = [
    ["robean", "Robean Cafe Otomatı", "otomat", -215, 131],
    ["otokuzey", "Kuzey Otomatı", "otomat", 148, 231],
    ["sofra", "Sofra Börek", "kucuk", -77, -48],
    ["simit", "Simit Çarşısı", "kucuk", -183, -348],
    ["sariyer", "Meşhur Sarıyer Börekçisi", "kucuk", -133, 84],
    ["tost", "Tost Akademisi", "kucuk", 4, -240],
    ["pisaco", "Pi Sa Co", "kucuk", -256, -346],
    ["faki", "Fakı Mehmet", "kucuk", -256, -341],
    ["oses", "Oses Çiğköfte", "kucuk", -250, -340],
    ["pilavist", "Pilav İstanbul", "kucuk", -247, -346],
    ["unkapani", "Tarihi Unkapanı Pilavcısı", "kucuk", -246, 36],
    ["kahve1773", "1773 İTÜ Kahve", "kafe", -79, -38],
    ["cabra", "Cabra Loca", "kafe", -64, -157],
    ["mg", "MG Coffee", "kafe", -35, -131],
    ["caldo", "Caffe Caldo", "kafe", -178, -348],
    ["mekansal", "mekanSAL", "kafe", -400, -45],
    ["golet", "Gölet Kafe", "kafe", 455, 330],
    ["dolunay", "Dolunay Cafe (Spor Merkezi)", "kafe", -228, 182],
    ["starbucks", "Starbucks ARI Teknokent", "zincir", 708, -322],
    ["espressolab", "Espressolab", "zincir", -42, -44],
    ["moc", "MOC Coffee Roastery", "zincir", -13, -49],
    ["coffy", "Coffy", "zincir", -286, 43],
    ["fanfan", "Fanfan", "restoran", -306, 46],
    ["bestra", "Bestra Kitchen", "restoran", -128, 180],
    ["kucukev", "Küçük Ev", "restoran", -385, 61],
    ["selfis", "Selfiş", "restoran", -217, 31],
    ["bigslice", "Big Slice Pizza", "restoran", 360, 231],
    ["cajun", "Cajun Corner", "restoran", -64, -67],
    ["cafe1773", "1773 Cafe", "restoran", -45, -66],
    ["kafeterya1773", "1773 İTÜ Kafeterya", "kafeterya", -174, 164],
    ["luqs", "LUQS Cafeteria", "kafeterya", -406, 119],
    ["kuzey", "Kuzey Cafeteria", "kafeterya", 171, 215],
    ["osm", "Öğrenci Sosyal Merkezi Kafesi", "kafeterya", 84, 113],
    ["migros", "Migros", "market", -137, 207],
    ["sok", "Şok", "market", -320, -88],
    ["a101", "A101", "market", 31, 193],
    ["satis1773", "1773 İTÜ Satış Mekânı", "magaza", -83, -64],
    ["gratis", "Gratis", "magaza", -124, 198],
    ["cantaylar", "Çantaylar Kitabevi", "kirtasiye", 18, -232],
    ["goldenmert", "Golden Mert Kırtasiye", "kirtasiye", -179, -359],
    ["maslakbaski", "Maslak Baskı", "kirtasiye", -184, -358],
    ["hairplanet", "Hair Planet", "berber", -237, 35],
    ["otoyikama", "Oto Yıkama", "yikama", -660, -229],
    ["kovan", "Kovan Cafe & Çalışma Mekânı", "cowork", -167, 186],
  ];
  var V18BI = {},
    V18READY = !1;
  function V18BPREP() {
    for (let b of V18B) {
      let o = { id: b[0], name: b[1], cat: b[2], x: b[3], z: b[4] };
      o.pm = 0.88 + V18H32(o.id) * 0.26;
      o.zi = V18ZI(o.x, o.z);
      // kapı: bina içindeyse en yakın açık noktaya taşı
      let ok = (a, c) => sn(a, c) && tn(a, c) !== Pt.BUILDING && tn(a, c) !== Pt.WATER,
        dx = o.x,
        dz = o.z;
      if (!ok(dx, dz)) {
        let f = !1;
        for (let r = 2; r <= 60 && !f; r += 2)
          for (let k = 0; k < 24 && !f; k++) {
            let a = (k / 24) * Math.PI * 2,
              px = o.x + Math.cos(a) * r,
              pz = o.z + Math.sin(a) * r;
            ok(px, pz) && ((dx = px), (dz = pz), (f = !0));
          }
      }
      let q = i3(dx, dz);
      if (q < 0 || BTout(q)) {
        let bq = -1,
          bd = 6400;
        for (let k = 0; k < bt.pts.length; k++) {
          if (BTout(k)) continue;
          let d = (bt.pts[k][0] - dx) ** 2 + (bt.pts[k][1] - dz) ** 2;
          d < bd && ((bd = d), (bq = k));
        }
        bq >= 0 && ((dx = bt.pts[bq][0]), (dz = bt.pts[bq][1]));
      }
      ((o.dx = dx), (o.dz = dz), (V18BI[o.id] = o));
    }
  }
  function V18BPRICE(b) {
    let c = V18BC[b.cat];
    return Math.round((c[2] * b.pm * (1 - 0.04 * V18RLV(b.zi))) / 50) * 50;
  }
  var V18LVM = [1, 1.5, 2.1, 2.8, 3.6],
    V18UPC = [0.9, 1.8, 3.2, 5.5];
  function V18BOPEN(b, h) {
    let c = V18BC[b.cat];
    h = ((h % 24) + 24) % 24;
    return c[4] <= 0 && c[5] >= 24 ? !0 : h >= c[4] && h < c[5];
  }
  function V18BCAP(b, st) {
    return Math.round(V18BC[b.cat][3] * b.pm * V18LVM[st.lv - 1] * 5);
  }
  function V18BINC(b, st, h) {
    if (!V18BOPEN(b, h)) return 0;
    let c = V18BC[b.cat],
      hh = ((h % 24) + 24) % 24,
      m = c[3] * b.pm * V18LVM[st.lv - 1],
      w = S.save.weather,
      ev = V18EV();
    V18FOOD[b.cat]
      ? (m *= hh >= 11.5 && hh < 14 ? 1.5 : hh >= 8 && hh < 10 ? 1.25 : hh >= 18 && hh < 20.5 ? 1.2 : 0.85)
      : b.cat === "market" && (m *= hh >= 17 && hh < 20 ? 1.35 : 1);
    w === "yagmur" && (m *= b.cat === "yikama" ? 0.3 : /kafe|zincir|cowork|kafeterya/.test(b.cat) ? 1.15 : 1);
    ev === "final" && /kafe|kafeterya|kirtasiye|zincir|cowork/.test(b.cat) && (m *= 1.5);
    ev === "bahar" && V18FOOD[b.cat] && (m *= 1.5);
    ev === "mac" && /restoran|kucuk/.test(b.cat) && (m *= 1.4);
    ev === "kariyer" && b.cat === "zincir" && (m *= 1.4);
    ev === "mezun" && (b.id === "satis1773" || b.id === "gratis") && (m *= 2);
    m *= [0.85, 1, 1.25][st.pr] * (0.55 + 0.1 * st.rt) * (1 + 0.05 * V18RLV(b.zi)) * (st.fresh === S.save.day ? 1.25 : 1) * V18DM();
    return m;
  }
  function V18BOWN() {
    let v = V18S();
    return Object.keys(v.biz).filter((k) => V18BI[k]);
  }
  function V18BBUY(id) {
    let b = V18BI[id],
      v = V18S(),
      e = S.save,
      c = V18BC[b.cat],
      p = V18BPRICE(b);
    if (v.biz[id]) return;
    if (e.lvl < c[6]) return mt("Seviye " + c[6] + " (" + V18TN(c[6]) + ") gerekli", "bad");
    if (e.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
    (xn(-p, b.name + " satın alındı"),
      (v.biz[id] = { lv: 1, cash: 0, mgr: 0, pr: 1, rt: 4, fresh: 0, inv: p, full: 0 }),
      (v.st.bizN = Object.keys(v.biz).length),
      S3(Math.round(15 + p / 40)),
      V18SIGN(id),
      S.audio && S.audio.level(),
      Ot() && Ot().big("🏪 " + b.name, "Artık senin! Kasası dolunca yanına gidip topla ya da müdür tut.", "good"),
      Ln());
  }
  function V18BUP(id) {
    let b = V18BI[id],
      st = V18S().biz[id];
    if (!st || st.lv >= 5) return;
    let p = Math.round((V18BC[b.cat][2] * b.pm * V18UPC[st.lv - 1]) / 50) * 50;
    if (S.save.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
    (xn(-p, b.name + " yükseltme"), st.lv++, (st.inv += p), S3(Math.round(15 + p / 40)), mt("⬆️ " + b.name + " Sv " + st.lv, "good"), V18SIGN(id), Ln());
  }
  function V18BMGR(id) {
    let b = V18BI[id],
      st = V18S().biz[id];
    if (!st) return;
    if (st.mgr) return ((st.mgr = 0), mt("Müdür ayrıldı. Kasayı artık sen toplayacaksın.", "info"), Ln());
    let p = Math.round((V18BC[b.cat][2] * b.pm * 0.4) / 50) * 50;
    if (S.save.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
    (xn(-p, "Müdür: " + b.name), (st.mgr = 1), (st.inv += p), S3(Math.round(p / 40)), st.cash > 0 && (xn(st.cash, "Kasa"), (st.cash = 0)), mt("👔 Müdür işe başladı: gelir otomatik hesabına geçer (%12 pay alır)", "good"), Ln());
  }
  function V18BSELL(id) {
    let v = V18S(),
      st = v.biz[id],
      b = V18BI[id];
    if (!st) return;
    let p = Math.round((st.inv * 0.5) / 10) * 10 + Math.round(st.cash);
    (xn(p, b.name + " satıldı"), delete v.biz[id], (v.st.bizN = Object.keys(v.biz).length), V18SIGN(id), Ln());
  }
  function V18BCOL(id) {
    let v = V18S(),
      st = v.biz[id],
      b = V18BI[id];
    if (!st || st.cash < 1) return;
    let c = Math.round(st.cash);
    ((st.cash = 0), (st.full = 0), xn(c, "Kasa: " + b.name), S3(Math.max(1, Math.round(c / 50))), (v.st.collects++, (v.st.bizIn += c)), Or("kasa"), V18W("kasa", c), Ln());
  }
  // saatlik birikim (oyun saati)
  function V18H(dh) {
    if (!V18READY || !(dh > 0)) return;
    let v = V18S();
    for (v.acc += dh; v.acc >= 0.02;) {
      let st = Math.min(v.acc, 0.25);
      ((v.acc -= st), V18STEP(st));
    }
  }
  function V18STEP(dh) {
    let v = V18S(),
      e = S.save,
      h = e.hour,
      mg = 0;
    for (let id in v.biz) {
      let b = V18BI[id],
        st = v.biz[id];
      if (!b) continue;
      let inc = V18BINC(b, st, h) * dh,
        tgt = [4.8, 4.2, 3.4][st.pr] + (st.fresh === e.day ? 0.2 : 0);
      if (((st.rt += (tgt - st.rt) * Math.min(1, 0.06 * dh)), st.mgr)) mg += inc * 0.88;
      else {
        let cap = V18BCAP(b, st);
        ((st.cash = Math.min(cap, st.cash + inc)),
          st.cash >= cap - 0.5 && !st.full && ((st.full = 1), mt("💰 " + b.name + " kasası doldu! Yanına gidip topla.", "warn")));
      }
    }
    if (mg > 0) {
      ((v.mgrPend += mg), (v.st.bizIn += mg));
      v.mgrPend >= 40 && (xn(Math.round(v.mgrPend), "Müdürlerden"), V18W("kasa", v.mgrPend), (v.mgrPend = 0));
    }
    V18FSTEP(dh, h);
    // lig rakipleri ve oyuncu ortalaması
    let L = V18LG();
    for (let r of L.r) r[1] += r[2] * Math.max(150 + e.lvl * 15, v.ema) * dh;
    let hi = Math.floor(h);
    v.lastH !== hi && (v.lastH >= 0 && (v.ema = v.ema * 0.85 + v.hourIn * 0.15), (v.hourIn = 0), (v.lastH = hi));
  }
