  // ---- İNİN v1.3: rozetler, keşif, kutlama efektleri ----
  var ACHS = [
      ["ilk_surus", "\u{1F6F4}", "İlk s\xFCr\xFCş", "İlk scooter'ını kirala", (s) => s.stats.rides >= 1, 20, 10],
      ["ilk_is", "\u{1F4E6}", "İlk teslimat", "Bir işi tamamla", (s) => s.stats.jobs >= 1, 40, 20],
      ["is10", "\u{1F69A}", "Kurye \xE7irağı", "10 iş tamamla", (s) => s.stats.jobs >= 10, 120, 40, (s) => s.stats.jobs / 10],
      ["is50", "\u{1F3C5}", "Kamp\xFCs kuryesi", "50 iş tamamla", (s) => s.stats.jobs >= 50, 350, 80, (s) => s.stats.jobs / 50],
      ["is150", "\u{1F451}", "Efsane kurye", "150 iş tamamla", (s) => s.stats.jobs >= 150, 900, 150, (s) => s.stats.jobs / 150],
      ["km5", "\u{1F4CF}", "Yolun başı", "Toplam 5 km s\xFCr", (s) => s.stats.m >= 5e3, 50, 20, (s) => s.stats.m / 5e3],
      ["km25", "\u{1F5FA}️", "Yol kurdu", "Toplam 25 km s\xFCr", (s) => s.stats.m >= 25e3, 150, 50, (s) => s.stats.m / 25e3],
      ["km100", "\u{1F30D}", "Maratoncu", "Toplam 100 km s\xFCr", (s) => s.stats.m >= 1e5, 500, 120, (s) => s.stats.m / 1e5],
      ["sv5", "⭐", "Y\xFCkselen yıldız", "Seviye 5'e ulaş", (s) => s.lvl >= 5, 120, 0, (s) => s.lvl / 5],
      ["sv10", "\u{1F31F}", "Usta s\xFCr\xFCc\xFC", "Seviye 10'a ulaş", (s) => s.lvl >= 10, 350, 0, (s) => s.lvl / 10],
      ["para1k", "\u{1F4B0}", "Cebin dolu", "Toplam 1.000₺ kazan", (s) => s.stats.earned >= 1e3, 60, 20, (s) => s.stats.earned / 1e3],
      ["para10k", "\u{1F48E}", "İNİN zengini", "Toplam 10.000₺ kazan", (s) => s.stats.earned >= 1e4, 400, 100, (s) => s.stats.earned / 1e4],
      ["sarj5", "⚡", "Şarj ustası", "5 şarj işi bitir", (s) => s.stats.juiced >= 5, 100, 40, (s) => s.stats.juiced / 5],
      ["hiz", "\u{1F4A8}", "R\xFCzgar gibi", "60 km/s hıza \xE7ık", (s) => s.stats.maxSpeed >= 60, 40, 20],
      ["kask", "⛑️", "\xD6nce g\xFCvenlik", "Kask satın al", (s) => s.items.helmet, 30, 10],
      ["kendi", "\u{1F6F5}", "Kendi scooter'ım", "Kendi scooter'ını al", (s) => s.own, 150, 50],
      ["kesif5", "\u{1F4CD}", "K\xE2şif", "Kamp\xFCste 5 yeri keşfet", (s) => Object.keys(s.disc || {}).length >= 5, 60, 30, (s) => Object.keys(s.disc || {}).length / 5],
      ["kesif15", "\u{1F9ED}", "Kamp\xFCs rehberi", "Kamp\xFCste 15 yeri keşfet", (s) => Object.keys(s.disc || {}).length >= 15, 220, 80, (s) => Object.keys(s.disc || {}).length / 15],
      ["kesifall", "\u{1F3DB}️", "Ayazağa'nın ta kendisi", "T\xFCm yerleri keşfet", (s) => DISC.length > 0 && Object.keys(s.disc || {}).length >= DISC.length, 600, 200, (s) => Object.keys(s.disc || {}).length / Math.max(1, DISC.length)],
      ["seri5", "\u{1F525}", "Seri teslimat", "\xDCst \xFCste 5 zamanında teslimat", (s) => (s.bestStreak || 0) >= 5, 120, 40, (s) => (s.bestStreak || 0) / 5],
      ["seri10", "☄️", "Durdurulamaz", "\xDCst \xFCste 10 zamanında teslimat", (s) => (s.bestStreak || 0) >= 10, 300, 80, (s) => (s.bestStreak || 0) / 10],
      ["gece", "\u{1F319}", "Gece kuşu", "Gece bir teslimat yap", (s) => s.nightJob, 50, 20],
      ["yaris", "\u{1F3C1}", "Pist canavarı", "Bir yarıştan madalya al", (s) => s.medals && Object.keys(s.medals).length > 0, 80, 30],
    ],
    DISC = [],
    ACHt = 0,
    ACHq = [];
  function DISCinit() {
    if (DISC.length || !Qe.buildings) return;
    let add = (k, name, x2, z2, r) => {
      DISC.some((d) => d.k === k || Math.hypot(d.x - x2, d.z - z2) < 40) || DISC.push({ k, name, x: x2, z: z2, r: r || 32 });
    };
    for (let b of Qe.buildings) {
      if (!b.lm && !/fak[üu]ltesi|yurtlar|stadyum|rekt[öo]rl|k[üu]t[üu]phane|kültür|derslik|spor salonu|yemekhane|teknokent|ar[ıi]-?[0-9]/i.test(b.name || "")) continue;
      if (!Gs((b.poly[0] || [0])[0], (b.poly[0] || [0, 0])[1], Qe.campus || b.poly)) continue;
      let [cx, cz] = Ws(b.poly),
        rr = Math.sqrt(Hs(b.poly)) * 0.75 + 18;
      add("b:" + (b.lm || b.name), b.name || b.lm, cx, cz, Math.min(90, rr));
    }
    for (let w of Qe.water || []) if (Hs(w.poly) > 800) add("w:golet", w.name || "G\xF6let", ...Ws(w.poly), 70);
    for (let pz of Qe.pitches || []) /stadyum/i.test(pz.name || "") && add("p:stadyum", pz.name, ...Ws(pz.poly), 70);
    for (let pl of Qe.places || [])
      /anıt|heykel|metro|ayazağa|çimleri|meteoroloji|kolej/i.test(pl.name || "") &&
        (!Qe.campus || Gs(pl.x, pl.z, Qe.campus) || pl.amenity === "metro") &&
        add("n:" + pl.name, pl.name, pl.x, pl.z, 26);
  }
  function FLOAT(t, c) {
    try {
      let d = document.createElement("div");
      ((d.className = "fl"), (d.textContent = t), (d.style.color = c || "#fff"), (d.style.top = 96 + (FLOAT.k = ((FLOAT.k || 0) + 1) % 3) * 26 + "px"), document.body.appendChild(d), setTimeout(() => d.remove(), 1500));
    } catch {}
  }
  function CONFETTI(n = 50) {
    try {
      let cs = ["#19c3d6", "#ffd36a", "#7ff0a0", "#ff8fa3", "#b49cff", "#ffffff"];
      for (let i = 0; i < n; i++) {
        let d = document.createElement("i");
        ((d.className = "cf"),
          (d.style.left = Math.random() * 100 + "vw"),
          (d.style.background = cs[i % cs.length]),
          d.style.setProperty("--dx", (Math.random() - 0.5) * 160 + "px"),
          d.style.setProperty("--r", (Math.random() - 0.5) * 1080 + "deg"),
          (d.style.animationDuration = 1.6 + Math.random() * 1.6 + "s"),
          (d.style.animationDelay = Math.random() * 0.35 + "s"),
          (d.style.width = 6 + Math.random() * 6 + "px"),
          document.body.appendChild(d),
          setTimeout(() => d.remove(), 3800));
      }
    } catch {}
  }
  function ACHPOP(ic, title, nm, rw) {
    ACHq.push([ic, title, nm, rw]);
    ACHq.length === 1 && ACHshow();
  }
  function ACHshow() {
    if (!ACHq.length) return;
    let [ic, title, nm, rw] = ACHq[0],
      d = document.createElement("div");
    ((d.className = "achpop"), (d.innerHTML = `<div class="ic">${ic}</div><div><div class="tt">${title}</div><div class="nm"></div><div class="rw">${rw}</div></div>`), (d.querySelector(".nm").textContent = nm));
    (mi || document.body).appendChild(d);
    setTimeout(() => d.classList.add("out"), 2600);
    setTimeout(() => {
      (d.remove(), ACHq.shift(), ACHshow());
    }, 2950);
  }
  function ACHT(n) {
    if (((ACHt += n), ACHt < 0.5)) return;
    ACHt = 0;
    let s = S.save;
    if (!s) return;
    ((s.ach = s.ach || {}), (s.disc = s.disc || {}), S.flags.nightJob && ((s.nightJob = !0), (S.flags.nightJob = !1)), DISCinit());
    if (x.mode === "walk" || x.mode === "ride")
      for (let d of DISC)
        if (!s.disc[d.k] && Math.hypot(d.x - x.x, d.z - x.z) < d.r) {
          ((s.disc[d.k] = s.day), FLOAT("\u{1F4CD} " + d.name, "#7fe6f2"), mt("\u{1F4CD} Keşfedildi: " + d.name + " \xB7 +15 XP", "good"), S3(15), CONFETTI(18), S.audio && S.audio.pick && S.audio.pick());
          break;
        }
    for (let [id, ic, nm, ds, ok, mon, xp] of ACHS)
      if (!s.ach[id] && ok(s)) {
        ((s.ach[id] = s.day), ACHPOP(ic, "ROZET KAZANILDI", nm, (mon ? "+" + mon + "₺ " : "") + (xp ? "+" + xp + " XP" : "")), mon && xn(mon, "Rozet: " + nm), xp && S3(xp), CONFETTI(80), S.audio && S.audio.level());
        break;
      }
  }
  function ACHVIEW(n) {
    let s = S.save;
    DISCinit();
    let got = Object.keys(s.ach || {}).length;
    n.appendChild(Bt(`<div class="card"><div class="grow"><div class="t">\u{1F3C6} ${got}/${ACHS.length} rozet \xB7 \u{1F4CD} ${Object.keys(s.disc || {}).length}/${DISC.length} yer</div><div class="prog"><i style="width:${(got / ACHS.length) * 100}%"></i></div></div></div>`));
    let g = Bt('<div class="achgrid"></div>');
    for (let [id, ic, nm, ds, ok, mon, xp, pr] of ACHS) {
      let has = !!(s.ach || {})[id],
        f = pr ? Math.min(1, pr(s)) : has ? 1 : 0,
        c = Bt(`<div class="achc ${has ? "ok" : ""}"><div class="i">${ic}</div><div class="n"></div><div class="d"></div><div class="r">${mon ? mon + "₺" : ""}${mon && xp ? " \xB7 " : ""}${xp ? xp + " XP" : ""}</div>${!has && pr ? `<div class="prog"><i style="width:${(f * 100).toFixed(0)}%"></i></div>` : ""}</div>`);
      ((c.querySelector(".n").textContent = nm), (c.querySelector(".d").textContent = ds), g.appendChild(c));
    }
    n.appendChild(g);
    let dl = Bt('<div class="card" style="margin-top:9px"><div class="grow"><div class="t">\u{1F4CD} Keşif listesi</div><div class="d"></div></div></div>');
    ((dl.querySelector(".d").innerHTML = DISC.map((d) => (s.disc[d.k] ? "✅ " : "⬜ ") + d.name.replace(/</g, "")).join("<br>")), n.appendChild(dl));
  }
