  // ---- filo patronluğu ----
  var V18FLV = 9,
    V18FLIC = 1500,
    V18FST = {
      sarj: ["🔌 Şarjcı", "Bataryaları %60'ın altına düşürmez", 600, 60],
      deng: ["🔁 Dengeleyici", "Scooter'ları yoğun noktalara taşır: filo geliri +%25", 1000, 90],
      tekn: ["🔧 Teknisyen", "Arıza ve yıpranmayı önler, bakımları yapar", 800, 75],
    },
    V18FMAX = 8,
    V18FHUB = [];
  function V18FZP(zi) {
    return { m: 1400, f: 800, d: 1000, t: 1200 }[V18Z[zi][4]];
  }
  function V18FCNT() {
    let n = 0,
      z = V18S().fl.z;
    for (let k in z) n += z[k].n || 0;
    return n;
  }
  function V18FSP() {
    return 600 + 10 * V18FCNT();
  }
  function V18FRATE(zi, h) {
    let v = V18S(),
      z = v.fl.z[V18Z[zi][0]];
    if (!z || !z.n || z.b <= 0.03) return 0;
    return 50 * Math.pow(z.n, 0.9) * V18DEM(zi, h) * z.c * (v.fl.staff.deng ? 1.25 : 1) * (V18EV() === "filo" ? 1.6 : 1) * (1 + 0.05 * V18RLV(zi)) * V18DM();
  }
  function V18FSTEP(dh, h) {
    let v = V18S(),
      f = v.fl;
    if (!f.lic) return;
    let tot = 0;
    for (let i = 0; i < V18Z.length; i++) {
      let z = f.z[V18Z[i][0]];
      if (!z || !z.on) continue;
      let d = V18DEM(i, h);
      if (z.n) {
        let r = V18FRATE(i, h) * dh;
        ((tot += r), (z.b = Math.max(0, z.b - 0.07 * d * dh)), f.staff.tekn ? (z.c = Math.min(1, z.c + 0.05 * dh)) : (z.c = Math.max(0.4, z.c - 0.012 * d * dh)));
      }
      (z.st && (z.b = Math.min(1, z.b + 0.12 * dh)), f.staff.sarj && z.b < 0.6 && (z.b = Math.min(1, z.b + 0.3 * dh)));
      z.n && z.b <= 0.03 && !z.warn && ((z.warn = 1), mt("🔋 " + V18Z[i][1] + " filon şarjsız kaldı! Şarjcı tut ya da filo bakım işini yap.", "warn"));
      z.b > 0.2 && (z.warn = 0);
    }
    if (tot > 0) {
      ((f.pend += tot), (f.today += tot), (f.total += tot), (v.st.fleetIn += tot), Or("filo", tot), V18W("filo", tot));
      f.pend >= 30 && (xn(Math.round(f.pend), "Filo geliri"), (f.pend = 0));
    }
  }
  function V18FLIC2() {
    let v = V18S();
    if (S.save.lvl < V18FLV) return mt("Seviye " + V18FLV + " (" + V18TN(V18FLV) + ") gerekli", "bad");
    if (S.save.money < V18FLIC) return mt("Para yetmiyor", "bad");
    (xn(-V18FLIC, "İNİN bayi lisansı"), (v.fl.lic = 1), S3(60), V18FLOOK(), Ot() && Ot().big("🛴 İNİN BAYİSİ", "Artık kendi filon var! Bir bölge izni al ve scooter yerleştir.", "good"), Ln());
  }
  function V18FZON(zi) {
    let v = V18S(),
      k = V18Z[zi][0],
      p = V18FZP(zi);
    if (v.fl.z[k] && v.fl.z[k].on) return;
    if (S.save.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
    (xn(-p, "Bölge izni: " + V18Z[zi][1]), (v.fl.z[k] = { on: 1, n: 0, b: 1, c: 1, st: 0 }), S3(Math.round(15 + p / 40)), mt("✅ " + V18Z[zi][1] + " izni alındı", "good"), Ln());
  }
  function V18FADD(zi, d) {
    let v = V18S(),
      z = v.fl.z[V18Z[zi][0]];
    if (!z || !z.on) return;
    if (d > 0) {
      if (z.n >= V18FMAX) return mt("Bu bölgede en fazla " + V18FMAX + " scooter olabilir", "bad");
      let p = V18FSP();
      if (S.save.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
      (xn(-p, "Filoya scooter"), (z.b = (z.b * z.n + 1) / (z.n + 1)), (z.c = (z.c * z.n + 1) / (z.n + 1)), z.n++, S3(Math.round(15 + p / 40)));
    } else {
      if (!z.n) return;
      (z.n--, xn(Math.round((V18FSP() - 10) * 0.5), "Scooter satıldı"));
    }
    (V18FLEETM(), Ln());
  }
  function V18FSTN(zi) {
    let z = V18S().fl.z[V18Z[zi][0]];
    if (!z || z.st) return;
    if (S.save.money < 1200) return mt("Para yetmiyor (1.200₺)", "bad");
    (xn(-1200, "Şarj istasyonu"), (z.st = 1), S3(45), mt("⚡ Şarj istasyonu kuruldu", "good"), Ln());
  }
  function V18FREP(zi) {
    let z = V18S().fl.z[V18Z[zi][0]];
    if (!z) return;
    let p = Math.round((1 - z.c) * 120 * z.n);
    if (p < 1) return;
    if (S.save.money < p) return mt("Para yetmiyor (" + V18TL(p) + ")", "bad");
    (xn(-p, "Filo bakımı"), (z.c = 1), mt("🔧 Bakım tamam", "good"), Ln());
  }
  function V18FSTAFF(k) {
    let f = V18S().fl,
      d = V18FST[k];
    if (f.staff[k]) return ((f.staff[k] = 0), mt(d[0] + " işten ayrıldı", "info"), Ln());
    if (S.save.money < d[2]) return mt("Para yetmiyor (" + V18TL(d[2]) + ")", "bad");
    (xn(-d[2], d[0] + " işe alındı"), (f.staff[k] = 1), S3(Math.round(d[2] / 40)), mt(d[0] + " işe başladı · günlük maaş " + d[3] + "₺", "good"), Ln());
  }
  // gün sonu: maaşlar ve özet
  function V18FDAY() {
    let v = V18S(),
      f = v.fl;
    if (!f.lic) return "";
    let sal = 0,
      out = [];
    for (let k in V18FST)
      if (f.staff[k]) {
        let p = V18FST[k][3];
        S.save.money >= p ? ((sal += p), xn(-p, "Maaş: " + V18FST[k][0])) : ((f.staff[k] = 0), out.push(V18FST[k][0]));
      }
    let s = "🛴 " + V18FLOOK().name + " dün " + V18TL(f.today) + " kazandı" + (sal ? " · maaşlar " + V18TL(sal) : "") + (out.length ? " · bakiye yetmediği için ayrılan: " + out.join(", ") : "");
    f.today = 0;
    return s;
  }
  // bölge park noktaları
  function V18FPREP() {
    V18FHUB.length = 0;
    let ok = (a, c) => sn(a, c) && tn(a, c) !== Pt.BUILDING && tn(a, c) !== Pt.WATER;
    for (let i = 0; i < V18Z.length; i++) {
      let [, , ax, az] = V18Z[i],
        best = null,
        bd = 1e18;
      for (let h of en) {
        let d = (h[1] - ax) ** 2 + (h[2] - az) ** 2;
        d < bd && d < 160 ** 2 && sn(h[1], h[2]) && ((bd = d), (best = [h[1], h[2]]));
      }
      if (!best) {
        let q = i3(ax, az);
        best = q >= 0 ? [bt.pts[q][0], bt.pts[q][1]] : [ax, az];
      }
      let slots = null;
      for (let t = 0; t < 12 && !slots; t++) {
        let a = (t / 12) * Math.PI * 2,
          dx = Math.cos(a),
          dz = Math.sin(a),
          s = [];
        for (let k = 0; k < V18FMAX; k++) {
          let px = best[0] + dx * (3 + k * 0.85) - dz * 1.5,
            pz = best[1] + dz * (3 + k * 0.85) + dx * 1.5;
          if (!ok(px, pz)) break;
          s.push([px, pz, Math.atan2(dx, dz) + Math.PI / 2]);
        }
        s.length === V18FMAX && (slots = s);
      }
      if (!slots) {
        slots = [];
        for (let k = 0; k < V18FMAX; k++) slots.push([best[0] + 3 + k * 0.85, best[1] + 1.5, Math.PI / 2]);
      }
      V18FHUB.push({ x: best[0], z: best[1], slots });
    }
  }
