  // ---- günlük / haftalık görevler, giriş serisi, kurye ligi ----
  function V18DAILY(i) {
    let e = S.save,
      v = V18S(),
      o = e.daily;
    o && o.list && o.day !== e.day && (v.dstreak = o.list.every((q) => q.done) ? (v.dstreak || 0) + 1 : 0);
    let g = Math.round((400 + e.lvl * 60) / 50) * 50,
      ow = V18BOWN().length > 0,
      P = [
        i[1],
        i[2],
        { id: "combo", t: "x4 teslimat serisine ulaş", goal: 4, prog: 0, rew: 90 },
        { id: "earn", t: "İşlerden " + g + "₺ kazan", goal: g, prog: 0, rew: 80 },
        { id: "zone", t: "3 farklı bölgeye teslimat yap", goal: 3, prog: 0, rew: 70 },
      ];
    ow && P.push({ id: "kasa", t: "İşletmelerinden 3 kez kasa topla", goal: 3, prog: 0, rew: 90 }, { id: "tedarik", t: "1 tedarik işi tamamla", goal: 1, prog: 0, rew: 100 });
    Object.keys(v.bees).length < V18BEEN && P.push({ id: "ari", t: "1 Altın Arı bul", goal: 1, prog: 0, rew: 120 });
    V18FCNT() > 0 && P.push({ id: "filo", t: "Filon bugün 400₺ kazansın", goal: 400, prog: 0, rew: 90 });
    e.lvl >= 6 && P.push({ id: "vip", t: "1 VIP teslimat yap", goal: 1, prog: 0, rew: 110 });
    for (let k = P.length - 1; k > 0; k--) {
      let j = Math.floor(Math.random() * (k + 1));
      [P[k], P[j]] = [P[j], P[k]];
    }
    let L = [i[0], ...P.slice(0, 3)],
      m = 1 + 0.08 * (e.lvl - 1);
    for (let q of L) q.rew = Math.round((q.rew * m) / 5) * 5;
    v.dz = {};
    return L;
  }
  var V18WT = [
    ["jobs", "teslimat yap", 40, 1200],
    ["earn", "₺ iş geliri kazan", 0, 1500],
    ["race", "yarış bitir", 5, 900],
    ["combo", "x8 seriye ulaş", 8, 1000],
    ["kasa", "₺ işletme geliri topla", 3e3, 1500],
    ["filo", "₺ filo geliri", 2500, 1400],
    ["ari", "Altın Arı bul", 5, 1200],
    ["tedarik", "tedarik işi yap", 4, 1100],
  ];
  function V18WEEK() {
    let e = S.save,
      v = V18S(),
      w = Math.floor((e.day - 1) / 7);
    if (v.week && v.week.w === w) return v.week;
    let ow = V18BOWN().length > 0,
      fl = V18FCNT() > 0,
      bees = Object.keys(v.bees).length < V18BEEN - 4,
      P = V18WT.filter((q) => (q[0] !== "kasa" && q[0] !== "tedarik") || ow).filter((q) => q[0] !== "filo" || fl).filter((q) => q[0] !== "ari" || bees);
    for (let k = P.length - 1; k > 0; k--) {
      let j = Math.floor(Math.random() * (k + 1));
      [P[k], P[j]] = [P[j], P[k]];
    }
    let m = 1 + 0.1 * (e.lvl - 1),
      L = P.slice(0, 3).map((q) => {
        let goal = q[0] === "earn" ? Math.round((2500 + e.lvl * 400) / 100) * 100 : q[0] === "jobs" ? 30 + Math.min(30, e.lvl * 2) : q[2];
        return { id: q[0], t: q[0] === "combo" ? "x8 teslimat serisine ulaş" : (q[0] === "earn" || q[0] === "kasa" || q[0] === "filo" ? V18TL(goal) : goal) + " " + q[1].replace(/^₺ /, ""), goal, prog: 0, rew: Math.round((q[3] * m) / 50) * 50 };
      });
    return (v.week = { w, list: L });
  }
  function V18W(id, a = 1) {
    if (!S.save) return;
    let wk = V18WEEK();
    for (let q of wk.list)
      q.id === id &&
        !q.done &&
        ((q.prog = id === "combo" ? Math.max(q.prog, a) : Math.min(q.goal, q.prog + a)),
        q.prog >= q.goal &&
          ((q.prog = q.goal), (q.done = !0), xn(q.rew, "Haftalık görev"), S3(120), Ot() && Ot().big("🏅 HAFTALIK GÖREV", q.t + "\n+" + V18TL(q.rew) + " · +120 XP", "good")));
  }
  var V18LN = [
    ["Hızlı Hakan", 0.7, 14697339],
    ["Turbo Tuğçe", 0.85, 9067766],
    ["Rüzgâr Rıza", 1, 15764004],
    ["Şimşek Selin", 1.12, 3062473],
    ["Kurye Kerem", 1.28, 15773480],
  ];
  function V18LG() {
    let v = V18S(),
      w = Math.floor((S.save.day - 1) / 7);
    if (!v.league || v.league.w !== w) {
      let old = v.league;
      if (old && old.w < w) V18LEND(old);
      v.league = { w, me: 0, r: V18LN.map((q) => [q[0], 0, q[1] * (0.9 + Math.random() * 0.2)]) };
    }
    return v.league;
  }
  function V18LRANK(L) {
    let a = L.r.map((q) => [q[0], q[1], 0]);
    a.push(["Sen", L.me, 1]);
    a.sort((p, q) => q[1] - p[1]);
    return a;
  }
  function V18LEND(L) {
    let a = V18LRANK(L),
      k = a.findIndex((q) => q[2]),
      rw = [2500, 1200, 600][k] || 0,
      v = V18S();
    rw && (xn(rw, "Kurye ligi ödülü"), S3([250, 150, 80][k]));
    k === 0 && v.st.leagueWins++;
    setTimeout(() => {
      Ot() && Ot().big("🏆 KURYE LİGİ " + (k + 1) + ". OLDUN", rw ? "Haftalık ödül +" + V18TL(rw) : "Bu hafta ilk 3'e giremedin. Yeni hafta başladı!", rw ? "good" : "info");
    }, 4500);
  }
  function V18LOGIN() {
    let v = V18S(),
      d = new Date(),
      f = (q) => q.getFullYear() + "-" + (q.getMonth() + 1) + "-" + q.getDate(),
      t = f(d),
      y = f(new Date(d.getTime() - 864e5));
    if (v.login.last === t) return null;
    ((v.login.n = v.login.last === y ? v.login.n + 1 : 1), (v.login.last = t));
    let k = (v.login.n - 1) % 7,
      m = [100, 150, 250, 350, 500, 700, 1200][k],
      x2 = [20, 30, 40, 60, 80, 100, 200][k];
    return (xn(m, "Giriş ödülü"), S3(x2), ["🔥 GİRİŞ SERİSİ " + v.login.n + ". GÜN", "Günlük ödül +" + V18TL(m) + " · +" + x2 + " XP" + (k === 6 ? "\n7. gün büyük ödülü!" : "\nYarın gel: " + V18TL([100, 150, 250, 350, 500, 700, 1200][(k + 1) % 7]))]);
  }
  // yeni gün (D1 sonunda)
  function V18DAY(n) {
    let e = S.save,
      v = V18S(),
      r = Math.random(),
      ks = Object.keys(V18EVS);
    v.ev = e.day > 1 && r < 0.55 ? { id: ks[Math.floor(Math.random() * ks.length)], day: e.day } : null;
    V18LG();
    V18WEEK();
    let fs = n ? "" : V18FDAY(),
      ev = V18EV();
    !n &&
      setTimeout(() => {
        ev && Ot() && Ot().big(V18EVS[ev][0] + " " + V18EVS[ev][1].toUpperCase(), V18EVS[ev][2], "info");
        fs && mt(fs, "info");
      }, 3500);
  }
  // ---- iş ödemesi çarpanları ----
  function V18JMUL(n, a) {
    let e = S.save,
      m = V18DM(),
      ti = V18TI(e.lvl),
      ev = V18EV(),
      zf = V18ZI(n.from.x, n.from.z),
      zt = V18ZI(n.to.x, n.to.z),
      rp = (V18RLV(zf) + V18RLV(zt)) / 2,
      k = 1;
    (m > 1.001 && (a && a.push("🎚️ Zorluk ×" + m.toFixed(2)), (k *= m)), ti > 0 && (a && a.push("🎓 Ünvan +%" + ti * 2), (k *= 1 + ti * 0.02)));
    rp > 0 && (a && a.push("⭐ İtibar +%" + Math.round(rp * 4)), (k *= 1 + rp * 0.04));
    let em = 1;
    (ev === "final" && n.type === "not" && (em = 1.6),
      ev === "bahar" && (em = 1.2),
      ev === "mac" && (V18Z[zt][0] === "kiz" || V18Z[zf][0] === "kiz") && (em = 1.5),
      ev === "kariyer" && (V18Z[zt][0] === "ari" || V18Z[zf][0] === "ari") && (em = 1.5),
      ev === "mezun" && (em = 1.15),
      em > 1 && (a && a.push(V18EVS[ev][0] + " " + V18EVS[ev][1] + " ×" + em), (k *= em)));
    V18RN8() && (a && a.push("🌧️🌙 Yağmurlu gece ×1.5"), (k *= 1.5));
    S.ride && S.ride.own && V18S().gar.eq.model === "kargo" && (a && a.push("📦 Kargo modeli +%12"), (k *= 1.12));
    n.v18 && n.v18.own && (a && a.push("🏪 Kendi dükkanın +%25"), (k *= 1.25));
    return k;
  }
  function V18PAY(n, s, a) {
    return s * V18JMUL(n, a);
  }
  function V18XP(n) {
    return Math.round(n.xp * V18DM() * (1 + V18TI(S.save.lvl) * 0.01));
  }
  var V18CT = 0;
  function V18DONE(n, paid) {
    let e = S.save,
      v = V18S(),
      zf = V18ZI(n.from.x, n.from.z),
      zt = V18ZI(n.to.x, n.to.z),
      g = n.type === "vip" ? 3 : 1;
    ((v.rep[V18Z[zf][0]] = (v.rep[V18Z[zf][0]] || 0) + g), zt !== zf && (v.rep[V18Z[zt][0]] = (v.rep[V18Z[zt][0]] || 0) + g));
    (v.dz[zt] || (v.dz[zt] = 1, Or("zone")), Or("earn", Math.round(paid)), n.type === "vip" && Or("vip"), e.streak >= 4 && Or("combo", 99));
    (V18W("jobs"), V18W("earn", paid), V18W("combo", e.streak || 0));
    let L = V18LG();
    ((L.me += paid), (v.hourIn += paid));
    [5, 10, 15, 20, 30].includes(e.streak) &&
      (xn(e.streak * 25, "Seri ödülü"), S3(e.streak * 4), setTimeout(() => Ot() && Ot().big("🔥 x" + e.streak + " SERİ!", "Seri ödülü +" + V18TL(e.streak * 25) + " · ödemeler +%" + Math.round(Math.min(1, (e.streak - 1) * 0.1) * 100), "good"), 2200));
    V18CT = 180;
    if (n.v18) {
      let q = n.v18;
      if (q.k === "sup" && v.biz[q.id]) {
        let st = v.biz[q.id];
        ((st.fresh = e.day), (st.rt = Math.min(5, st.rt + 0.3)), v.st.supplies++, Or("tedarik"), V18W("tedarik"), mt("📦 " + V18BI[q.id].name + " taze stokla bugün +%25 kazanıyor", "good"));
      }
      if (q.k === "flt") {
        let z = v.fl.z[q.id];
        z && ((z.b = 1), (z.c = Math.min(1, z.c + 0.15)), mt("⚡ Filo bataryaları dolu!", "good"));
      }
    }
  }
