  // ===== İNİN v1.8: ünvanlar, zorluk, işletmeler, filo, görevler, lig, garaj, hayalet, rakipler, altın arılar =====
  var V18T = [
    [1, "Hazırlık Öğrencisi", "Hazırlık"],
    [2, "Lisans 1. Sınıf Öğrencisi", "1. Sınıf"],
    [3, "Lisans 2. Sınıf Öğrencisi", "2. Sınıf"],
    [4, "Lisans 3. Sınıf Öğrencisi", "3. Sınıf"],
    [5, "Lisans 4. Sınıf Öğrencisi", "4. Sınıf"],
    [6, "Mezun Mühendis", "Mühendis"],
    [7, "Yüksek Lisans Öğrencisi", "Y. Lisans"],
    [8, "Doktora Öğrencisi", "Doktora"],
    [9, "Araştırma Görevlisi", "Arş. Gör."],
    [11, "Öğretim Görevlisi", "Öğr. Gör."],
    [13, "Dr. Öğretim Üyesi", "Dr. Öğr. Üyesi"],
    [15, "Doçent", "Doç. Dr."],
    [18, "Profesör", "Prof. Dr."],
    [21, "Bölüm Başkanı", "Böl. Bşk."],
    [24, "Enstitü Müdürü", "Enst. Md."],
    [27, "Dekan", "Dekan"],
    [30, "Rektör Yardımcısı", "Rek. Yrd."],
    [34, "Rektör", "Rektör"],
  ];
  function V18TI(l) {
    let k = 0;
    for (let i = 0; i < V18T.length; i++) l >= V18T[i][0] && (k = i);
    return k;
  }
  function V18TN(l) {
    return V18T[V18TI(l)][1];
  }
  function V18TS(l) {
    return V18T[V18TI(l)][2] + " · SV " + l;
  }
  function V18TNEXT(l) {
    let i = V18TI(l);
    return i + 1 < V18T.length ? V18T[i + 1] : null;
  }
  // ---- zorluk ----
  function V18DM() {
    let o = S.save.opt;
    return 1 + (o.terrain !== !1 && o.noslow !== !0 ? 0.25 : 0) + (o.pen !== !1 ? 0.5 : 0) + (o.noslow !== !0 ? 0.25 : 0);
  }
  function V18DP() {
    let o = S.save.opt,
      t = o.terrain !== !1,
      p = o.pen !== !1,
      q = o.noslow === !0;
    return !t && !p && q ? "rahat" : t && !p && !q ? "normal" : t && p && !q ? "gercek" : "ozel";
  }
  function V18DIFF(i, t) {
    i(
      `🎚️ Zorluk · ödül çarpanı ×${V18DM().toFixed(2)}<div class="d" style="font-weight:400;font-family:Barlow;font-size:12px">Rahat: hiçbir şey yavaşlatmaz, ceza yok (×1.0). Normal: arazi ve yavaşlatmalar açık, ceza yok (×1.5). Gerçekçi: her şey açık (×2.0). Çarpan iş ücretine, iş XP'sine, işletme ve filo gelirine uygulanır. Aşağıdaki ayarları tek tek de değiştirebilirsin.</div>`,
      [
        ["rahat", "Rahat"],
        ["normal", "Normal"],
        ["gercek", "Gerçekçi"],
      ],
      V18DP(),
      (s) => {
        s === "rahat"
          ? ((t.terrain = !1), (t.pen = !1), (t.noslow = !0))
          : s === "normal"
            ? ((t.terrain = !0), (t.pen = !1), (t.noslow = !1))
            : ((t.terrain = !0), (t.pen = !0), (t.noslow = !1));
      },
    );
  }
  // ---- bölgeler / fakülte itibarı ----
  var V18Z = [
    ["rek", "Rektörlük & Metro", -220, -300, "m"],
    ["med", "MED & YDY", -50, -90, "f"],
    ["fen", "Fen-Edebiyat & SDKM", 60, -210, "f"],
    ["ins", "İnşaat Fakültesi", -450, 0, "f"],
    ["kut", "Kütüphane & Sosyal Merkez", -170, 150, "f"],
    ["eef", "EEF & Bilgisayar-Bilişim", 110, 150, "f"],
    ["mad", "Maden · Kimya-Metalurji · Gemi", 260, 170, "f"],
    ["kiz", "Kız Yurtları & Stadyum", -280, 330, "d"],
    ["ucak", "Uçak-Uzay & Olimpik Havuz", 60, 420, "f"],
    ["golet", "Gölet Yurtları", 430, 360, "d"],
    ["ari", "ARI Teknokent", 620, -300, "t"],
    ["vadi", "Vadi Yurtları", 960, -420, "d"],
    ["kyk", "KYK & Kamu Konutları", 960, 500, "d"],
  ];
  function V18ZI(a, b) {
    let k = 0,
      bd = 1e18;
    for (let i = 0; i < V18Z.length; i++) {
      let d = (V18Z[i][2] - a) ** 2 + (V18Z[i][3] - b) ** 2;
      d < bd && ((bd = d), (k = i));
    }
    return k;
  }
  function V18DEM(zi, h) {
    h = ((h % 24) + 24) % 24;
    let t = V18Z[zi][4];
    return t === "f"
      ? h >= 8.5 && h < 17.5
        ? 1.3
        : h >= 7.5 && h < 20
          ? 0.7
          : 0.2
      : t === "d"
        ? (h >= 7 && h < 9.5) || (h >= 17 && h < 23.5)
          ? 1.3
          : h >= 9.5 && h < 17
            ? 0.6
            : 0.25
        : t === "m"
          ? (h >= 7.5 && h < 10) || (h >= 16.5 && h < 19.5)
            ? 1.6
            : h >= 10 && h < 16.5
              ? 0.8
              : 0.3
          : h >= 8 && h < 19
            ? 1.1
            : 0.25;
  }
  var V18RL = [0, 8, 25, 60, 130],
    V18RN = ["Yeni", "Tanıdık", "Sevilen", "Efsane", "Fahri Üye"];
  function V18RLV(zi) {
    let r = V18S().rep[V18Z[zi][0]] || 0,
      l = 0;
    for (let i = 0; i < V18RL.length; i++) r >= V18RL[i] && (l = i);
    return l;
  }
  // ---- etkinlikler ----
  var V18EVS = {
    final: ["📚", "Final Haftası", "Ders notu işleri ×1.6 · kafe, kafeterya ve kırtasiye gelirleri ×1.5"],
    bahar: ["🌸", "Bahar Şenliği", "Tüm teslimatlar +%20 · yeme-içme işletmeleri ×1.5"],
    mac: ["⚽", "Maç Günü", "Stadyum ve kız yurtları bölgesine teslimat ×1.5 · restoran ve büfeler ×1.4"],
    kariyer: ["💼", "Kariyer Günleri", "ARI Teknokent işleri ×1.5 · zincir kahveciler ×1.4"],
    mezun: ["🎓", "Mezuniyet Töreni", "Tüm iş ödemeleri +%15 · 1773 mağaza ve Gratis ×2"],
    filo: ["🛴", "İNİN Kampanya Günü", "Filo gelirleri ×1.6 · kiralama yoğun"],
  };
  function V18EV() {
    let v = V18S();
    return v.ev && v.ev.day === S.save.day ? v.ev.id : null;
  }
  function V18RN8() {
    return Dn[S.save.weather].rain > 0.5 && js();
  }
  // ---- kayıt ----
  function V18S() {
    let s = S.save;
    s.v18 || (s.v18 = {});
    let v = s.v18,
      d = {
        biz: {},
        fl: { lic: 0, z: {}, staff: {}, today: 0, total: 0, pend: 0 },
        gar: { own: {}, eq: { model: "pro", col: 0, hood: 0, pants: 0, hel: 0, hair: 0, trail: 0, bell: 0, light: 0 } },
        rep: {},
        bees: {},
        radar: 0,
        ghost: {},
        week: null,
        league: null,
        login: { last: "", n: 0 },
        ev: null,
        dz: {},
        dstreak: 0,
        ema: 250,
        hourIn: 0,
        lastH: -1,
        acc: 0,
        mgrPend: 0,
        st: { bizIn: 0, fleetIn: 0, collects: 0, supplies: 0, ghostWins: 0, stolen: 0, leagueWins: 0, bizN: 0, beeN: 0 },
        lastReal: 0,
      };
    for (let k in d) v[k] === void 0 && (v[k] = d[k]);
    for (let k in d.st) v.st[k] === void 0 && (v.st[k] = 0);
    for (let k in d.gar.eq) v.gar.eq[k] === void 0 && (v.gar.eq[k] = d.gar.eq[k]);
    return v;
  }
  function V18H32(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) ((h ^= s.charCodeAt(i)), (h = Math.imul(h, 16777619)));
    return (h >>> 0) / 4294967296;
  }
  function V18RNG(a) {
    return () => {
      a |= 0;
      a = (a + 1831565813) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      return ((t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t), ((t ^ (t >>> 14)) >>> 0) / 4294967296);
    };
  }
  var V18TL = (n) => Math.round(n).toLocaleString("tr-TR") + "₺";
