  // ---- başlatma, kare güncellemesi, harita, HUD, rozetler ----
  var V18SC = null,
    V18VT = 0,
    V18LST = 0;
  function V18INIT() {
    if (!V18READY)
      try {
        V18SC = p4;
        (V18BPREP(), V18FPREP(), V18BEEPREP(), V18SIGNS(V18SC), V18BEEBUILD(V18SC), V18FLEETBUILD(V18SC), V18FSIGNS(V18SC), V18RIVBUILD(V18SC), V18GHBUILD(V18SC), V18TRBUILD(V18SC));
        let st = document.createElement("style");
        ((st.textContent = ".tabs{overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}.tabs::-webkit-scrollbar{display:none}.tabs .tab{flex:0 0 auto;padding:9px 11px;font-size:14px}"), document.head.appendChild(st));
        V18READY = !0;
      } catch (er) {
        console.error("V18", er);
      }
    if (!V18READY) return;
    let v = V18S();
    (V18FLEETM(), V18APPLY(), V18FAPPLY());
    for (let id in V18BI) V18SIGN(id);
    let M = [],
      o = V18OFFL();
    o && M.push(o);
    let l = V18LOGIN();
    (l && M.push(l), M.forEach((m, i) => setTimeout(() => Ot() && Ot().big(m[0], m[1], "good"), 2600 + i * 4300)), (v.lastReal = Date.now()), V18LG(), V18WEEK());
  }
  function V18OFFL() {
    let v = V18S(),
      el = v.lastReal ? (Date.now() - v.lastReal) / 6e4 : 0;
    if (el < 5) return null;
    let gh = Math.min(16, el / 15),
      inc = 0,
      cash = 0,
      fl = 0;
    for (let id in v.biz) {
      let b = V18BI[id],
        st = v.biz[id];
      if (!b) continue;
      let avg = V18BC[b.cat][3] * b.pm * V18LVM[st.lv - 1] * 0.6 * [0.85, 1, 1.25][st.pr] * V18DM();
      if (st.mgr) inc += avg * gh * 0.5 * 0.88;
      else {
        let add = Math.min(V18BCAP(b, st) - st.cash, avg * gh * 0.5);
        add > 0 && ((st.cash += add), (cash += add));
      }
    }
    for (let i = 0; i < V18Z.length; i++) {
      let z = v.fl.z[V18Z[i][0]];
      if (!z || !z.n) continue;
      let hr = v.fl.staff.sarj || z.st ? gh : Math.min(gh, z.b / 0.05);
      ((fl += 50 * Math.pow(z.n, 0.9) * 0.75 * z.c * (v.fl.staff.deng ? 1.25 : 1) * V18DM() * hr * 0.5), v.fl.staff.sarj || z.st || (z.b = Math.max(0, z.b - 0.05 * hr)));
    }
    ((inc = Math.round(inc)), (fl = Math.round(fl)));
    if (inc + fl + cash < 1) return null;
    (inc + fl > 0 && xn(inc + fl, "Sen yokken"), (v.st.bizIn += inc), (v.fl.total += fl), (v.st.fleetIn += fl));
    let h = el >= 120 ? Math.round(el / 60) + " saat" : Math.round(el) + " dk";
    return ["💤 SEN YOKKEN (" + h + ")", [inc ? "👔 Müdürler +" + V18TL(inc) : "", fl ? "🛴 Filo +" + V18TL(fl) : "", cash >= 1 ? "💰 Kasalarda " + V18TL(cash) + " birikti, toplamaya git" : ""].filter(Boolean).join("\n")];
  }
  function V18STEAL(dt) {
    let t = S.t || 0;
    if (t - V18LST < 40 || S.paused) return;
    for (let q of S.offers) {
      if (q.v18 && q.v18.k !== "biz") continue;
      if ((q.born == null && (q.born = t), t - q.born > 55 && Math.random() < dt * 0.03)) {
        V18LST = t;
        S.offers = S.offers.filter((o) => o !== q);
        let L = V18LG(),
          r = L.r[Math.floor(Math.random() * L.r.length)];
        ((r[1] += q.pay), V18S().st.stolen++, mt("🏁 Rakip kurye " + r[0] + ', "' + q.title + '" işini kaptı!', "warn"), S.offers.length < 2 && qa());
        break;
      }
    }
  }
  function V18BEECHK() {
    let v = V18S();
    for (let i = 0; i < V18BEES.length; i++) {
      if (v.bees[i]) continue;
      let b = V18BEES[i];
      if ((b[0] - x.x) ** 2 + (b[1] - x.z) ** 2 < 7) {
        v.bees[i] = 1;
        let n = Object.keys(v.bees).length;
        ((v.st.beeN = n), xn(75, "Altın Arı"), S3(30), Or("ari"), V18W("ari"), S.audio && S.audio.level());
        let ms = { 10: [500, "🔔 Arı vızıltısı zil sesi açıldı"], 20: [1e3, "⛑️ Arı kask rengi açıldı"], 30: [2e3, "✨ Altın Arı iz efekti açıldı"], 40: [5e3, "🛴 İNİN Altın Arı modeli açıldı!"] }[n];
        (ms && xn(ms[0], "Arı ödülü"), Ot() && Ot().big("🐝 ALTIN ARI " + n + "/" + V18BEEN, "+75₺ · +30 XP" + (ms ? "\n" + ms[1] + " · +" + V18TL(ms[0]) : ""), "good"), V18BEEM[i] && (V18BEEM[i].visible = !1), Ln());
      }
    }
  }
  function V18F(dt, act) {
    if (!V18READY || !S.save) return;
    let e = S.save,
      v = V18S(),
      cam = S.camera ? S.camera.position : null,
      T = performance.now() / 1e3;
    if (act) {
      (e.streak > 0 && !S.job && V18CT > 0 && ((V18CT -= dt), V18CT <= 0 && (mt("🔥 Seri bitti (x" + e.streak + "). Seriyi korumak için işleri ara vermeden al!", "info"), (e.streak = 0))),
        V18STEAL(dt));
      for (let r of V18RVN) V18RIVSTEP(r, dt);
      V18BEECHK();
    }
    if (((V18VT += dt), V18VT > 0.4 && cam)) {
      V18VT = 0;
      let cx = cam.x,
        cz = cam.z;
      for (let id in V18SG) {
        let s = V18SG[id];
        s.g.visible = (s.g.position.x - cx) ** 2 + (s.g.position.z - cz) ** 2 < 12100;
      }
      for (let i = 0; i < V18BEEM.length; i++) V18BEEM[i].visible = !v.bees[i] && (V18BEES[i][0] - cx) ** 2 + (V18BEES[i][1] - cz) ** 2 < 16900;
      for (let r of V18RVN) r.g.visible = !!r.pts && (r.x - cx) ** 2 + (r.z - cz) ** 2 < 48400;
      for (let s of V18FHS) s.g.visible = s.n > 0 && (s.g.position.x - cx) ** 2 + (s.g.position.z - cz) ** 2 < 12100;
    }
    if (cam)
      for (let id in V18SG) {
        let s = V18SG[id];
        s.g.visible && (s.board.rotation.y = Math.atan2(cam.x - s.g.position.x, cam.z - s.g.position.z));
      }
    if (cam) for (let s of V18FHS) s.g.visible && (s.board.rotation.y = Math.atan2(cam.x - s.g.position.x, cam.z - s.g.position.z));
    for (let i = 0; i < V18BEEM.length; i++) {
      let m = V18BEEM[i];
      if (!m.visible) continue;
      let b = V18BEES[i];
      (m.position.set(b[0], Ss(b[0], b[1]) + 1.25 + Math.sin(T * 2 + i) * 0.15, b[1]), (m.rotation.y = T * 1.4 + i));
      let w = V18BEEW[i],
        f = Math.sin(T * 40 + i) * 0.6;
      w[0] && (w[0].rotation.z = -0.3 - f);
      w[1] && (w[1].rotation.z = 0.3 + f);
    }
    for (let r of V18RVN) r.g.visible && (r.g.position.set(r.x, Ss(r.x, r.z) + A1(r.x, r.z), r.z), (r.g.rotation.y = r.yaw));
    (V18GHF(), V18TRF());
  }
  function V18MAP(g, d, E, m) {
    if (!V18READY) return;
    let v = V18S();
    ((g.textAlign = "center"), (g.textBaseline = "middle"));
    for (let id in V18BI) {
      let b = V18BI[id],
        st = v.biz[id],
        px = d(b.dx),
        py = E(b.dz);
      (st && ((g.fillStyle = "rgba(255,194,26,.95)"), g.beginPath(), g.arc(px, py, 11, 0, 7), g.fill()), (g.font = (st ? 14 : 11) + "px sans-serif"), (g.fillStyle = "#fff"), g.fillText(V18BC[b.cat][1], px, py));
    }
    for (let i = 0; i < V18Z.length; i++) {
      let z = v.fl.z[V18Z[i][0]];
      z && z.n && ((g.font = "bold 12px sans-serif"), (g.fillStyle = "#9cc8ff"), g.fillText((V18FEMB[V18FLOOK().emb][2] || "🛴") + " " + V18FNAME() + " · " + z.n, d(V18FHUB[i].x), E(V18FHUB[i].z) + 14));
    }
    for (let r of V18RVN)
      r.pts &&
        ((g.fillStyle = "#" + r.col.toString(16).padStart(6, "0")),
        g.beginPath(),
        g.arc(d(r.x), E(r.z), 5, 0, 7),
        g.fill(),
        (g.font = "bold 10px sans-serif"),
        (g.fillStyle = "#fff"),
        g.fillText(r.name, d(r.x), E(r.z) - 10));
  }
  function V18MINI(n, P, sz) {
    if (!V18READY) return;
    let v = V18S(),
      inb = (q) => q[0] > -10 && q[1] > -10 && q[0] < sz + 10 && q[1] < sz + 10;
    ((n.textAlign = "center"), (n.textBaseline = "middle"));
    for (let id in v.biz) {
      let b = V18BI[id];
      if (!b) continue;
      let q = P(b.dx, b.dz);
      inb(q) && ((n.fillStyle = v.biz[id].cash >= V18BCAP(b, v.biz[id]) - 1 && !v.biz[id].mgr ? "#ff6a5a" : "#ffc21a"), n.beginPath(), n.arc(q[0], q[1], 6, 0, 7), n.fill(), (n.font = "bold 9px sans-serif"), (n.fillStyle = "#000"), n.fillText("₺", q[0], q[1] + 0.5));
    }
    for (let r of V18RVN) {
      if (!r.pts) continue;
      let q = P(r.x, r.z);
      inb(q) && ((n.fillStyle = "#" + r.col.toString(16).padStart(6, "0")), (n.strokeStyle = "#fff"), (n.lineWidth = 1.5), n.beginPath(), n.arc(q[0], q[1], 4.5, 0, 7), n.fill(), n.stroke());
    }
    if (v.radar) {
      let bi = -1,
        bd = 1e18;
      for (let i = 0; i < V18BEES.length; i++) {
        if (v.bees[i]) continue;
        let d = (V18BEES[i][0] - x.x) ** 2 + (V18BEES[i][1] - x.z) ** 2;
        d < bd && ((bd = d), (bi = i));
      }
      if (bi >= 0 && bd < 9e4) {
        let q = P(V18BEES[bi][0], V18BEES[bi][1]);
        inb(q) && ((n.font = "15px sans-serif"), n.fillText("🐝", q[0], q[1]));
      }
    }
  }
  function V18HUD(t) {
    if (!V18READY) return "";
    let ev = V18EV(),
      s = t.streak || 0,
      o = [];
    (ev && o.push(V18EVS[ev][0] + " " + V18EVS[ev][1]),
      V18RN8() && o.push("🌧️🌙 ×1.5"),
      s > 1 && o.push("🔥x" + s + " +%" + Math.round(Math.min(1, (s - 1) * 0.1) * 100) + (S.job || V18CT <= 0 ? "" : " ⏱" + Math.ceil(V18CT) + "sn")));
    return o.length ? `<div class="row" style="color:#ffd36a;font-size:12px">${o.join(" · ")}</div>` : "";
  }
  function V18LV(l) {
    let o = [],
      ti = V18T.find((q) => q[0] === l);
    ti && o.push("🎓 Yeni ünvan: " + ti[1] + " · iş primi +%" + V18TI(l) * 2);
    for (let k in V18BC) V18BC[k][6] === l && o.push("🏪 " + V18BC[k][0] + " işletmeleri satın alınabilir");
    (l === V18FLV && o.push("🛴 Filo patronluğu açıldı!"), o.push(T3(l)));
    return o.join("\n");
  }
  function V18POOL() {
    try {
      let P = an.D.pois,
        out = (k) => {
          let p = P[k];
          return p.cx != null && !sn(p.cx, p.cz) && !(p.cat === "metro" && !/Tower|Plaza/i.test(p.name));
        };
      ((Xa = Xa.filter((k) => !/Seyr-i/.test(P[k].name) && !out(k))), (Ya = Ya.filter((k) => !out(k))));
    } catch {}
  }
  var V18FC = (s) => {
    let n = 0,
      z = s.v18 && s.v18.fl ? s.v18.fl.z : {};
    for (let k in z) n += z[k].n || 0;
    return n;
  };
  var V18BN = (s) => (s.v18 ? Object.keys(s.v18.biz).length : 0),
    V18AN = (s) => (s.v18 ? Object.keys(s.v18.bees).length : 0);
  ACHS.push(
    ["v18biz1", "🏪", "İlk dükkan", "İlk işletmeni satın al", (s) => V18BN(s) >= 1, 200, 50],
    ["v18biz10", "🏬", "Kampüs patronu", "10 işletmenin sahibi ol", (s) => V18BN(s) >= 10, 2e3, 200, (s) => V18BN(s) / 10],
    ["v18biz44", "👑", "Kampüsün sahibi", "Kampüsteki 44 işletmenin hepsini al", (s) => V18BN(s) >= 44, 2e4, 1e3, (s) => V18BN(s) / 44],
    ["v18filo10", "🛴", "Filo patronu", "10 scooterlık filo kur", (s) => V18FC(s) >= 10, 1500, 150, (s) => V18FC(s) / 10],
    ["v18filo50", "🚀", "Mobilite devi", "50 scooterlık filo kur", (s) => V18FC(s) >= 50, 8e3, 500, (s) => V18FC(s) / 50],
    ["v18ari10", "🐝", "Arı avcısı", "10 Altın Arı bul", (s) => V18AN(s) >= 10, 300, 60, (s) => V18AN(s) / 10],
    ["v18ari40", "🍯", "Kovan tamam", "40 Altın Arı'nın hepsini bul", (s) => V18AN(s) >= 40, 3e3, 300, (s) => V18AN(s) / 40],
    ["v18doc", "🎓", "Doçent", "Doçent ünvanını al (Sv 15)", (s) => s.lvl >= 15, 1500, 0, (s) => s.lvl / 15],
    ["v18prof", "📜", "Profesör", "Profesör ol (Sv 18)", (s) => s.lvl >= 18, 3e3, 0, (s) => s.lvl / 18],
    ["v18rektor", "🏛️", "Rektör", "Rektör ol (Sv 34)", (s) => s.lvl >= 34, 1e4, 0, (s) => s.lvl / 34],
    ["v18lig", "🏆", "Lig şampiyonu", "Haftalık kurye liginde 1. ol", (s) => !!s.v18 && s.v18.st.leagueWins >= 1, 1e3, 150],
    ["v18hayalet", "👻", "Kendini geç", "Bir yarışta kendi hayaletini geç", (s) => !!s.v18 && s.v18.st.ghostWins >= 1, 300, 60],
  );
