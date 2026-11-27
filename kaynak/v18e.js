  // ---- ek iş teklifleri: işletme siparişi, tedarik, filo bakımı ----
  var V18OID = 9e5;
  function V18MKJ(from, to, title, item, frag, q, pm) {
    let l = C1(from, to),
      w = Dn[S.save.weather].pay * (js() ? 1.15 : 1);
    return {
      id: V18OID++,
      type: "kurye",
      title,
      from,
      to,
      item,
      frag,
      pay: Math.round((45 + l * 0.16 * w + frag * 10) * (pm || 1)),
      mins: Math.round(((l / 4.3 + 70) * Lr) / 60),
      dist: l,
      who: Ai(_4),
      xp: Math.round(15 + l / 40),
      v18: q,
    };
  }
  function V18OFF(e) {
    if (!V18READY) return e;
    let v = V18S(),
      P = an.D.pois;
    try {
      if (Math.random() < 0.4) {
        let fb = V18B.filter((b) => V18FOOD[b[2]] && V18BOPEN(V18BI[b[0]], S.save.hour));
        if (fb.length) {
          let b = V18BI[Ai(fb)[0]],
            to = null,
            k = 0;
          do to = P[Ai(Ya)];
          while (Math.hypot(to.x - b.dx, to.z - b.dz) < 150 && ++k < 30);
          let own = !!v.biz[b.id],
            it = b.cat === "kafe" || b.cat === "zincir" ? ["Kahve", 1.8] : b.cat === "otomat" ? ["Atıştırmalık", 0.4] : Ai(m7);
          e.push(V18MKJ({ x: b.dx, z: b.dz, name: b.name }, { ...to }, (own ? "🏪 Kendi dükkanından: " : "") + b.name + " siparişi", it[0], it[1], { k: "biz", id: b.id, own }));
        }
      }
      let ow = V18BOWN().filter((id) => v.biz[id].fresh !== S.save.day);
      if (ow.length && Math.random() < 0.4 && !e.some((q) => q.v18 && q.v18.k === "sup")) {
        let b = V18BI[Ai(ow)],
          sp = ["migros", "sok", "a101"].map((k) => V18BI[k]).filter((q) => q.id !== b.id && Math.hypot(q.dx - b.dx, q.dz - b.dz) > 60);
        sp.sort((p, q) => Math.hypot(p.dx - b.dx, p.dz - b.dz) - Math.hypot(q.dx - b.dx, q.dz - b.dz));
        let s = sp[0];
        s && e.push(V18MKJ({ x: s.dx, z: s.dz, name: s.name + " (toptan)" }, { x: b.dx, z: b.dz, name: b.name }, "📦 Tedarik: " + b.name, "Tedarik kolisi", 0.3, { k: "sup", id: b.id }, 1.1));
      }
      if (v.fl.lic && !v.fl.staff.sarj && !e.some((q) => q.v18 && q.v18.k === "flt")) {
        let low = V18Z.map((z, i) => [i, v.fl.z[z[0]]]).filter((q) => q[1] && q[1].n && q[1].b < 0.4);
        if (low.length && Math.random() < 0.7) {
          let zi = Ai(low)[0],
            hb = V18FHUB[zi],
            c = null,
            cd = 1e18;
          for (let p of Pn) {
            let d = Math.hypot(p[0] - hb.x, p[1] - hb.z);
            d < cd && d > 40 && ((cd = d), (c = p));
          }
          c &&
            e.push(
              V18MKJ({ x: c[0], z: c[1], name: "Şarj istasyonu" }, { x: hb.x, z: hb.z, name: V18Z[zi][1] + " filon" }, "⚡ Filo bakımı: " + V18Z[zi][1], "Yedek batarya", 0.2, { k: "flt", id: V18Z[zi][0] }, 0.8),
            );
        }
      }
    } catch (er) {}
    for (let q of e) q.born = S.t || 0;
    return e;
  }
  // ---- yakın etkileşimler (kasa topla, satın al, ye) ----
  function V18ACT(e) {
    if (!V18READY || x.mode === "fallen" || Math.abs(x.speed) > 1.5) return;
    let v = V18S(),
      s = S.save;
    for (let id in V18BI) {
      let b = V18BI[id],
        d = Math.hypot(b.dx - x.x, b.dz - x.z);
      if (d > 14) continue;
      let st = v.biz[id];
      st && !st.mgr && st.cash >= 1
        ? e.unshift({ k: "kasa", label: "💰 Kasayı topla · " + V18TL(st.cash), sub: b.name, fn: () => V18BCOL(id) })
        : !st &&
          x.mode === "walk" &&
          d < 10 &&
          !e.some((q) => q.k === "v18biz") &&
          e.push({
            k: "v18biz",
            label: "🏪 " + b.name,
            sub: "Satılık · " + V18TL(V18BPRICE(b)),
            fn: () => {
              ((V18UI.sel = id), ea("biz"));
            },
          });
      if (x.mode === "walk" && V18FOOD[b.cat] && d < 12 && !e.some((q) => q.k === "cafe" || q.k === "eat" || q.k === "v18eat") && V18BOPEN(b, s.hour)) {
        let pr = st ? 0 : b.cat === "otomat" ? 15 : b.cat === "kucuk" ? 35 : 50;
        e.push({ k: "v18eat", label: (st ? "🎁 " : "🍽️ ") + b.name + (st ? " · ikram" : " · " + pr + "₺"), sub: "+40 enerji", fn: () => E4(pr, 40, 0.25) });
      }
    }
  }
  // ---- garaj ----
  var V18M = {
    pro: ["İNİN Pro", "Dengeli standart model", 0, 8, {}],
    retro: ["İNİN Retro", "Krem gövde, yuvarlak krom far, kahve sele", 2000, 8, {}],
    sprint: ["İNİN Sprint", "+%18 güç · -%12 menzil · yarış şeritleri", 3500, 9, { power: 1.18, thrust: 1.1, capWh: 0.88 }],
    dagci: ["İNİN Dağcı", "+%30 çekiş: yokuşlarda rakipsiz · çamurluklar", 3000, 9, { thrust: 1.3, power: 1.08 }],
    kargo: ["İNİN Kargo", "Teslimat ücreti +%12 · +%30 menzil · paketler %30 daha az sarsılır · arka sandık", 4500, 10, { capWh: 1.3, power: 0.95 }],
    ari: ["İNİN Altın Arı", "40 Altın Arı'nın ödülü: +%15 güç ve menzil", -1, 1, { power: 1.15, capWh: 1.15, thrust: 1.08 }],
  };
  var V18CS = {
    col: [
      "🎨 Scooter rengi",
      [
        ["İNİN Mavi", 0, 2846678],
        ["Kırmızı", 150, 14694718],
        ["Turuncu", 150, 15764004],
        ["Sarı", 150, 16106776],
        ["Yeşil", 150, 3129201],
        ["Mor", 200, 9067766],
        ["Pembe", 200, 15757224],
        ["Siyah", 250, 2500142],
        ["Beyaz", 250, 15658734],
        ["İTÜ Lacivert", 300, 1912687],
      ],
    ],
    hood: [
      "🧥 Kapüşon",
      [
        ["İNİN Turkuazı", 0, 1688534],
        ["İTÜ Lacivert", 120, 1912687],
        ["Kırmızı", 120, 14170682],
        ["Siyah", 120, 2763312],
        ["Gri", 100, 10134445],
        ["Arı Sarısı", 150, 16106776],
        ["Pembe", 150, 15757224],
        ["Mor", 150, 8082902],
      ],
    ],
    pants: [
      "👖 Pantolon",
      [
        ["Kot", 0, 2834005],
        ["Siyah", 100, 2302762],
        ["Bej", 100, 13218442],
        ["Gri", 100, 8226192],
        ["Haki", 120, 7043642],
        ["Bordo", 150, 12071474],
      ],
    ],
    hel: [
      "⛑️ Kask rengi (Mağaza'dan kask alınca görünür)",
      [
        ["Beyaz", 0, 16316664],
        ["Siyah", 100, 2302762],
        ["Kırmızı", 120, 14170682],
        ["Mavi", 120, 2781142],
        ["Arı (20 arı)", -1, 16106776],
      ],
    ],
    hair: [
      "💇 Saç",
      [
        ["Kahverengi", 0, 3877408],
        ["Siyah", 60, 1709076],
        ["Sarı", 80, 15254122],
        ["Kızıl", 80, 11027231],
        ["Mavi", 150, 3116031],
        ["Pembe", 150, 16743096],
      ],
    ],
    light: [
      "💡 Far ışığı",
      [
        ["Beyaz", 0, 16773836],
        ["Sıcak sarı", 100, 16763024],
        ["Buz mavisi", 150, 11068671],
        ["Mor", 200, 12950527],
      ],
    ],
    trail: [
      "✨ İz efekti",
      [
        ["Yok", 0, 0],
        ["Arı Sarısı", 500, 16761370],
        ["Neon Mavi", 800, 1695999],
        ["Ateş", 1200, 16734746],
        ["Gökkuşağı", 2000, -1],
        ["Altın Arı (30 arı)", -1, 16766720],
      ],
    ],
    bell: [
      "🔔 Zil sesi",
      [
        ["Klasik", 0, 0],
        ["Bisiklet zili", 150, 1],
        ["Korna", 250, 2],
        ["Melodi", 400, 4],
        ["Arı vızıltısı (10 arı)", -1, 3],
      ],
    ],
  };
  // arı ödülleriyle açılanlar: [arı sayısı, grup, sıra]
  var V18BEEU = [
    [10, "bell", 4],
    [20, "hel", 4],
    [30, "trail", 5],
  ];
  function V18OWNS(k, i) {
    let g = V18S().gar,
      it = V18CS[k][1][i];
    if (!it) return !1;
    if (it[1] === 0) return !0;
    if (it[1] < 0) {
      let n = Object.keys(V18S().bees).length,
        u = V18BEEU.find((q) => q[1] === k && q[2] === i);
      return !!u && n >= u[0];
    }
    return !!(g.own[k] && g.own[k][i]);
  }
  function V18GBUY(k, i) {
    let g = V18S().gar,
      it = V18CS[k][1][i];
    if (!V18OWNS(k, i)) {
      if (it[1] < 0) return mt("Bu ödül Altın Arı toplayarak açılır", "bad");
      if (S.save.money < it[1]) return mt("Para yetmiyor", "bad");
      (xn(-it[1], it[0]), g.own[k] || (g.own[k] = {}), (g.own[k][i] = 1));
    }
    ((g.eq[k] = i), V18APPLY(), k === "bell" && Hn.bell(), Ln());
  }
  function V18MOWN(k) {
    let g = V18S().gar,
      m = V18M[k];
    return m[2] === 0 || (m[2] < 0 ? Object.keys(V18S().bees).length >= V18BEEN : !!(g.own.model && g.own.model[k]));
  }
  function V18MBUY(k) {
    let g = V18S().gar,
      m = V18M[k],
      e = S.save;
    if (!e.own) return mt("Önce Mağaza'dan kendi scooter'ını (İNİN Pro) al", "bad");
    if (!V18MOWN(k)) {
      if (m[2] < 0) return mt("40 Altın Arı'nın hepsini bulunca açılır", "bad");
      if (e.lvl < m[3]) return mt("Seviye " + m[3] + " gerekli", "bad");
      if (e.money < m[2]) return mt("Para yetmiyor", "bad");
      (xn(-m[2], m[0]), g.own.model || (g.own.model = {}), (g.own.model[k] = 1), S3(Math.round(15 + m[2] / 40)));
    }
    ((g.eq.model = k), V18APPLY(), S.ride && S.ride.own && (x.stats = w3(!0, e.upg)), mt("🛴 " + m[0] + " seçildi", "good"), Ln());
  }
  function V18SPEC(own, sp) {
    if (!own || !S.save || !S.save.v18) return sp;
    let m = V18M[S.save.v18.gar.eq.model] || V18M.pro;
    for (let q in m[4]) sp[q] *= m[4][q];
    return sp;
  }
  function V18CARGO() {
    return S.ride && S.ride.own && S.save.v18 && S.save.v18.gar.eq.model === "kargo" ? 0.7 : 1;
  }
  function V18PICK(k) {
    let g = V18S().gar.eq,
      L = V18CS[k][1];
    return (L[g[k]] || L[0])[2];
  }
  var V18MX = null;
  function V18MODELX() {
    let o = x.ownMesh;
    if (!o || !o.userData.body) return;
    let B = o.userData.body;
    if (!V18MX) {
      V18MX = {};
      let mk = (k) => {
          let g = new Tn();
          return ((g.visible = !1), B.add(g), (V18MX[k] = g), g);
        },
        dk = yn(1974822),
        wh = yn(15658734),
        rd = yn(14694718),
        br = yn(14256698),
        ch = yn(13421772),
        bl = yn(1710618),
        g = mk("retro"),
        h = new Ie(new _i(0.075, 12, 10), ch);
      (h.position.set(0, 1, 0.56), g.add(h));
      let lens = new Ie(new ln(0.055, 0.055, 0.02, 12), new qt({ color: 16774864 }));
      ((lens.rotation.x = Math.PI / 2), lens.position.set(0, 1, 0.63), g.add(lens));
      let seat = new Ie(new ot(0.16, 0.05, 0.22), yn(7029286));
      (seat.position.set(0, 0.26, -0.22), g.add(seat));
      g = mk("sprint");
      for (let s of [-1, 1]) {
        let q = new Ie(new ot(0.025, 0.012, 0.74), wh);
        (q.position.set(s * 0.05, 0.225, -0.02), g.add(q));
      }
      let fin = new Ie(new ot(0.02, 0.14, 0.16), rd);
      (fin.position.set(0, 0.36, -0.42), g.add(fin));
      g = mk("dagci");
      for (let zz of [0.5, -0.38]) {
        let q = new Ie(new ot(0.11, 0.02, 0.28), dk);
        (q.position.set(0, 0.27, zz), g.add(q));
      }
      g = mk("kargo");
      let bx = new Ie(new ot(0.3, 0.26, 0.28), br);
      (bx.position.set(0, 0.42, -0.3), g.add(bx));
      let lid = new Ie(new ot(0.31, 0.03, 0.29), dk);
      (lid.position.set(0, 0.56, -0.3), g.add(lid));
      g = mk("ari");
      for (let zz of [-0.2, 0, 0.2]) {
        let q = new Ie(new ot(0.205, 0.085, 0.05), bl);
        (q.position.set(0, 0.17, zz), g.add(q));
      }
      let wm = new qt({ color: 16777215, transparent: !0, opacity: 0.55, side: 2, depthWrite: !1 });
      for (let s of [-1, 1]) {
        let q = new Ie(new ci(0.22, 0.12), wm);
        (q.position.set(s * 0.14, 0.9, 0.38), q.rotation.set(-0.3, 0, s * 0.5), g.add(q));
      }
      for (let k in V18MX) k !== "ari" ? OUTL(V18MX[k]) : null;
    }
    let md = V18S().gar.eq.model;
    for (let k in V18MX) V18MX[k].visible = k === md;
  }
  function V18APPLY() {
    if (!S.save || !x.person) return;
    let md = V18S().gar.eq.model;
    Y6().own.color.setHex(md === "retro" ? 15852484 : md === "ari" ? 16106776 : V18PICK("col"));
    let M = x.person.userData.mats;
    M && (M.hood.color.setHex(V18PICK("hood")), M.pants.color.setHex(V18PICK("pants")), M.hair.color.setHex(V18PICK("hair")), M.hel.color.setHex(V18PICK("hel")));
    x.light && x.light.color.setHex(V18PICK("light"));
    V18MODELX();
  }
  function V18BELL() {
    if (!S.save || !S.save.v18) return !1;
    let id = V18PICK("bell");
    if (!id) return !1;
    id === 1
      ? [0, 95, 190].forEach((t) => setTimeout(() => Ht(3300, 0.12, "triangle", 0.14), t))
      : id === 2
        ? (Ht(415, 0.45, "sawtooth", 0.08), Ht(523, 0.45, "sawtooth", 0.06))
        : id === 3
          ? [0, 110, 220, 330, 440].forEach((t, i) => setTimeout(() => Ht(200 + (i % 2) * 40, 0.15, "sawtooth", 0.07, 250), t))
          : [659, 784, 988, 1319].forEach((f, i) => setTimeout(() => Ht(f, 0.16, "triangle", 0.12), i * 120));
    return !0;
  }
