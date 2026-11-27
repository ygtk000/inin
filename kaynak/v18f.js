  // ---- telefon sekmeleri: İşletme, Filo, Görev, Garaj ----
  var V18UI = { sel: null, bf: "all", gs: "model" };
  function V18RR(n) {
    let sc = n.scrollTop;
    (C7(n), (n.scrollTop = sc));
  }
  function V18SEG(n, opts, cur, fn) {
    let w = Bt('<div class="seg" style="margin:0 0 8px;display:flex;gap:6px;flex-wrap:wrap"></div>');
    for (let [k, t] of opts) {
      let b = Bt(`<div class="btn ${k === cur ? "" : "gray"}" style="flex:1;min-width:0">${t}</div>`);
      ((b.onclick = (ev) => {
        (ev.stopPropagation(), Hn.click(), fn(k));
      }),
        w.appendChild(b));
    }
    n.appendChild(w);
  }
  function V18BAR(p, c) {
    return `<span style="display:inline-block;width:70px;height:7px;border-radius:4px;background:rgba(255,255,255,.15);vertical-align:middle;overflow:hidden"><i style="display:block;height:100%;width:${Math.round(Math.max(0, Math.min(1, p)) * 100)}%;background:${c || "#19c3d6"}"></i></span>`;
  }
  function V18TAB(n, k) {
    try {
      let on = Vn && Vn.querySelector(".tabs .tab.on");
      on && on.scrollIntoView && on.scrollIntoView({ block: "nearest", inline: "center" });
    } catch {}
    if (!V18READY && (k === "biz" || k === "fleet" || k === "goal" || k === "gar")) return (n.appendChild(Bt('<div class="d">Yükleniyor…</div>')), !0);
    if (k === "biz") return (V18UIBIZ(n), !0);
    if (k === "fleet") return (V18UIFLT(n), !0);
    if (k === "goal") return (V18UIGOAL(n), !0);
    if (k === "gar") return (V18UIGAR(n), !0);
    return !1;
  }
  function V18JH(n) {
    if (!V18READY) return;
    let e = S.save,
      ev = V18EV(),
      ti = V18TI(e.lvl),
      o = ["🎚️ ×" + V18DM().toFixed(2)];
    (ti && o.push("🎓 +%" + ti * 2), ev && o.push(V18EVS[ev][0] + " " + V18EVS[ev][1]), V18RN8() && o.push("🌧️🌙 ×1.5"), e.streak > 1 && o.push("🔥 Seri x" + e.streak + " (+%" + Math.round(Math.min(1, (e.streak - 1) * 0.1) * 100) + ")"));
    n.appendChild(Bt(`<div class="d" style="opacity:.85;margin:-4px 0 8px">${o.join(" · ")}</div>`));
  }
  // İşletmeler
  function V18UIBIZ(n) {
    let e = S.save,
      v = V18S(),
      own = V18BOWN(),
      h = e.hour,
      hourly = 0,
      cash = 0;
    for (let id of own) ((hourly += V18BINC(V18BI[id], v.biz[id], h) * (v.biz[id].mgr ? 0.88 : 1)), (cash += v.biz[id].cash));
    if (V18UI.sel && V18BI[V18UI.sel]) return V18UIBIZ1(n, V18UI.sel);
    n.appendChild(
      Gn(
        `<div class="t">🏪 İşletmelerin: ${own.length}/${V18B.length}</div><div class="d">Şu an ~${V18TL(hourly)}/saat · kasalarda ${V18TL(cash)} · toplam kazanç ${V18TL(v.st.bizIn)}<br>Kasası dolan işletme para kazanmayı durdurur: yanına gidip <b>💰 Kasayı topla</b> ya da müdür tut. Tedarik işleri o gün geliri +%25 artırır.</div>`,
      ),
    );
    V18SEG(
      n,
      [
        ["all", "Tümü"],
        ["own", "Benim"],
        ["sale", "Satılık"],
      ],
      V18UI.bf,
      (k) => ((V18UI.bf = k), V18RR(n)),
    );
    let L = V18B.map((b) => V18BI[b[0]]).filter((b) => (V18UI.bf === "own" ? v.biz[b.id] : V18UI.bf === "sale" ? !v.biz[b.id] : !0));
    L.sort((a, b) => !!v.biz[b.id] - !!v.biz[a.id] || V18BC[a.cat][6] - V18BC[b.cat][6] || V18BPRICE(a) - V18BPRICE(b));
    for (let b of L) {
      let c = V18BC[b.cat],
        st = v.biz[b.id],
        d = Math.hypot(b.dx - x.x, b.dz - x.z),
        lk = e.lvl < c[6],
        op = V18BOPEN(b, h);
      if (st) {
        let cap = V18BCAP(b, st);
        n.appendChild(
          Gn(
            `<div class="t">${c[1]} ${b.name} <span style="color:#ffd36a">★${st.lv}</span></div><div class="d">${st.mgr ? "👔 Müdür toplar" : "💰 " + V18TL(st.cash) + "/" + V18TL(cap) + " " + V18BAR(st.cash / cap, st.cash >= cap - 1 ? "#ff6a5a" : "#7ff0a0")} · ${op ? "~" + V18TL(V18BINC(b, st, h)) + "/sa" : "🌙 kapalı"} · ⭐${st.rt.toFixed(1)}${st.fresh === e.day ? " · 📦" : ""} · ${Math.round(d)} m</div>`,
            [{ t: "Yönet", fn: () => ((V18UI.sel = b.id), V18RR(n)) }],
          ),
        );
      } else {
        let p = V18BPRICE(b);
        n.appendChild(
          Gn(
            `<div class="t">${c[1]} ${b.name}</div><div class="d">${c[0]} · ${V18Z[b.zi][1]} · 🕘 ${c[4] <= 0 && c[5] >= 24 ? "7/24" : c[4] + "-" + c[5]} · ~${V18TL(c[3] * b.pm)}/sa · ${Math.round(d)} m</div>`,
            [
              lk
                ? { t: `${V18TL(p)}<br><small>Sv ${c[6]}</small>`, cls: "dis", fn: () => mt("Seviye " + c[6] + " (" + V18TN(c[6]) + ") gerekli", "bad") }
                : { t: `${V18TL(p)}<br><small>Satın al</small>`, cls: e.money < p ? "dis" : "", fn: () => (V18BBUY(b.id), V18RR(n)) },
            ],
          ),
        );
      }
    }
  }
  function V18UIBIZ1(n, id) {
    let e = S.save,
      v = V18S(),
      b = V18BI[id],
      c = V18BC[b.cat],
      st = v.biz[id],
      d = Math.hypot(b.dx - x.x, b.dz - x.z),
      back = Bt('<div class="btn gray" style="margin-bottom:8px">← İşletme listesi</div>');
    ((back.onclick = () => ((V18UI.sel = null), Hn.click(), V18RR(n))), n.appendChild(back));
    let go = { t: "📍 Rota", fn: () => ((S.route = Ji(x.x, x.z, b.dx, b.dz)), mt("Rota çizildi: " + b.name, "info"), Ts()) };
    if (!st) {
      let p = V18BPRICE(b);
      n.appendChild(
        Gn(
          `<div class="t">${c[1]} ${b.name}</div><div class="d">${c[0]} · ${V18Z[b.zi][1]}<br>Açık: ${c[4] <= 0 && c[5] >= 24 ? "7/24" : c[4] + ":00 - " + c[5] + ":00"} · temel gelir ~${V18TL(c[3] * b.pm)}/saat · kasa 5 saatlik geliri tutar<br>Gereken: Sv ${c[6]} (${V18TN(c[6])}) · bölge itibarı fiyatı düşürür</div>`,
          [{ t: `${V18TL(p)}<br><small>Satın al</small>`, cls: e.lvl < c[6] || e.money < p ? "dis" : "", fn: () => (V18BBUY(id), V18RR(n)) }, go],
        ),
      );
      return;
    }
    let cap = V18BCAP(b, st),
      up = st.lv < 5 ? Math.round((c[2] * b.pm * V18UPC[st.lv - 1]) / 50) * 50 : 0,
      mp = Math.round((c[2] * b.pm * 0.4) / 50) * 50;
    n.appendChild(
      Gn(
        `<div class="t">${c[1]} ${b.name} <span style="color:#ffd36a">★ Sv ${st.lv}/5</span></div><div class="d">${c[0]} · ${V18Z[b.zi][1]} · ${Math.round(d)} m uzakta<br>Şu an ${V18BOPEN(b, e.hour) ? "~" + V18TL(V18BINC(b, st, e.hour)) + "/saat" : "kapalı"} · ⭐ ${st.rt.toFixed(1)} memnuniyet${st.fresh === e.day ? " · 📦 taze stok (+%25)" : ""}<br>${st.mgr ? "👔 Müdür geliri otomatik yatırıyor (%12 pay)" : "💰 Kasa " + V18TL(st.cash) + " / " + V18TL(cap) + " " + V18BAR(st.cash / cap, "#7ff0a0")}<br>Yatırım: ${V18TL(st.inv)}</div>`,
        [go],
      ),
    );
    st.lv < 5 &&
      n.appendChild(
        Gn(`<div class="t">⬆️ Yükselt: Sv ${st.lv} → ${st.lv + 1}</div><div class="d">Gelir ×${V18LVM[st.lv - 1]} → ×${V18LVM[st.lv]}, kasa da büyür</div>`, [
          { t: `${V18TL(up)}`, cls: e.money < up ? "dis" : "", fn: () => (V18BUP(id), V18RR(n)) },
        ]),
      );
    n.appendChild(
      Gn(`<div class="t">👔 Müdür</div><div class="d">${st.mgr ? "Kasayı senin yerine topluyor, gelirin %12'sini alıyor." : "Kasayı otomatik toplar, sen yokken de kazandırır. Gelirin %12'sini alır."}</div>`, [
        st.mgr ? { t: "İşten çıkar", cls: "gray", fn: () => (V18BMGR(id), V18RR(n)) } : { t: V18TL(mp), cls: e.money < mp ? "dis" : "", fn: () => (V18BMGR(id), V18RR(n)) },
      ]),
    );
    let pc = Gn(`<div class="t">🏷️ Fiyat politikası</div><div class="d">Ucuz: gelir ×0.85, memnuniyet hızla 4.8'e çıkar · Normal · Pahalı: gelir ×1.25, memnuniyet 3.4'e düşer. Memnuniyet geliri etkiler.</div>`);
    n.appendChild(pc);
    V18SEG(
      n,
      [
        [0, "Ucuz"],
        [1, "Normal"],
        [2, "Pahalı"],
      ],
      st.pr,
      (k) => ((st.pr = k), Ln(), V18RR(n)),
    );
    d < 15 &&
      !st.mgr &&
      st.cash >= 1 &&
      n.appendChild(Gn(`<div class="t">💰 Kasada ${V18TL(st.cash)}</div>`, [{ t: "Topla", fn: () => (V18BCOL(id), V18RR(n)) }]));
    n.appendChild(Gn(`<div class="t">Sat</div><div class="d">Yatırımının yarısını (${V18TL(st.inv * 0.5)}) geri alırsın.</div>`, [{ t: "Sat", cls: "red", fn: () => (V18BSELL(id), (V18UI.sel = null), V18RR(n)) }]));
  }
  // Filo
  function V18UIFLT(n) {
    let e = S.save,
      v = V18S(),
      f = v.fl,
      h = e.hour;
    if (e.lvl < V18FLV)
      return void n.appendChild(
        Gn(
          `<div class="t">🔒 Filo patronluğu</div><div class="d">Seviye ${V18FLV} (${V18TN(V18FLV)}) olunca açılır.<br>Kendi İNİN filonu kur: bölge izni al, scooter yerleştir, şarjcı-dengeleyici-teknisyen tut. Sen iş yaparken (ve yokken) filon kazanır.</div>`,
        ),
      );
    if (!f.lic)
      return void n.appendChild(
        Gn(`<div class="t">🛴 İNİN bayi lisansı</div><div class="d">Kendi scooter filonu kurmak için lisans al. Her bölgeye en fazla ${V18FMAX} scooter koyabilirsin.</div>`, [
          { t: V18TL(V18FLIC), cls: e.money < V18FLIC ? "dis" : "", fn: () => (V18FLIC2(), V18RR(n)) },
        ]),
      );
    let now = 0,
      LK = V18FLOOK();
    for (let i = 0; i < V18Z.length; i++) now += V18FRATE(i, h);
    n.appendChild(
      Gn(
        `<div class="t">${V18FEMB[LK.emb][2] || "🛴"} ${LK.name}: ${V18FCNT()} scooter</div><div class="d">Şu an ~${V18TL(now)}/saat · bugün ${V18TL(f.today)} · toplam ${V18TL(f.total)}<br>Gelir bölgenin saate göre yoğunluğuna bağlı: fakülteler gündüz, yurtlar sabah-akşam, metro işe gidiş-dönüş saatlerinde yoğun. Yeni scooter: ${V18TL(V18FSP())}</div>`,
      ),
    );
    V18UI.fl ? V18UIFLOOK(n, () => V18RR(n)) : null;
    let tg = Bt(`<div class="btn ${V18UI.fl ? "" : "gray"}" style="margin:0 0 8px">${V18UI.fl ? "▲ Filo kimliğini kapat" : "🎨 Filo kimliği: ad, renk, desen, amblem"}</div>`);
    ((tg.onclick = (q) => (q.stopPropagation(), Hn.click(), (V18UI.fl = !V18UI.fl), V18RR(n))), n.insertBefore(tg, V18UI.fl ? n.lastChild : null));
    for (let k in V18FST) {
      let d = V18FST[k];
      n.appendChild(
        Gn(`<div class="t">${d[0]} ${f.staff[k] ? '<span style="color:#7ff0a0">· çalışıyor</span>' : ""}</div><div class="d">${d[1]} · işe alım ${V18TL(d[2])}, günlük maaş ${V18TL(d[3])}</div>`, [
          f.staff[k] ? { t: "Çıkar", cls: "gray", fn: () => (V18FSTAFF(k), V18RR(n)) } : { t: "İşe al", cls: e.money < d[2] ? "dis" : "", fn: () => (V18FSTAFF(k), V18RR(n)) },
        ]),
      );
    }
    for (let i = 0; i < V18Z.length; i++) {
      let Z = V18Z[i],
        z = f.z[Z[0]],
        dm = V18DEM(i, h),
        ic = dm >= 1.2 ? "🔥 yoğun" : dm >= 0.6 ? "🙂 orta" : "😴 sakin",
        rl = V18RLV(i);
      if (!z || !z.on) {
        let p = V18FZP(i);
        n.appendChild(Gn(`<div class="t">📍 ${Z[1]}</div><div class="d">${ic} · itibar: ${V18RN[rl]}</div>`, [{ t: `${V18TL(p)}<br><small>İzin al</small>`, cls: e.money < p ? "dis" : "", fn: () => (V18FZON(i), V18RR(n)) }]));
        continue;
      }
      let rp = Math.round((1 - z.c) * 120 * z.n),
        B = [
          { t: `+1<br><small>${V18TL(V18FSP())}</small>`, cls: z.n >= V18FMAX || e.money < V18FSP() ? "dis" : "", fn: () => (V18FADD(i, 1), V18RR(n)) },
          { t: "−1", cls: "gray", fn: () => (V18FADD(i, -1), V18RR(n)) },
        ];
      (z.st || B.push({ t: "⚡<br><small>1.200₺</small>", cls: e.money < 1200 ? "dis" : "", fn: () => (V18FSTN(i), V18RR(n)) }),
        !f.staff.tekn && rp > 20 && B.push({ t: `🔧<br><small>${V18TL(rp)}</small>`, fn: () => (V18FREP(i), V18RR(n)) }));
      n.appendChild(
        Gn(
          `<div class="t">📍 ${Z[1]} · 🛴 ${z.n}/${V18FMAX}</div><div class="d">${ic} · ~${V18TL(V18FRATE(i, h))}/sa · 🔋 ${V18BAR(z.b, z.b < 0.25 ? "#ff6a5a" : "#7ff0a0")} %${Math.round(z.b * 100)} · 🔧 %${Math.round(z.c * 100)}${z.st ? " · ⚡ istasyon" : ""} · ⭐ ${V18RN[rl]}</div>`,
          B,
        ),
      );
    }
  }
  // Görevler
  function V18UIGOAL(n) {
    let e = S.save,
      v = V18S(),
      ev = V18EV(),
      ti = V18TI(e.lvl),
      nx = V18TNEXT(e.lvl);
    n.appendChild(
      Gn(
        `<div class="t">🎓 ${V18TN(e.lvl)} · Sv ${e.lvl}</div><div class="d">İş primi +%${ti * 2}${nx ? " · Sonraki ünvan: <b>" + nx[1] + "</b> (Sv " + nx[0] + ")" : " · En yüksek ünvan!"}<br>XP ${Math.round(e.xp)}/${Ur(e.lvl)} ${V18BAR(e.xp / Ur(e.lvl), "#ffd36a")}</div>`,
      ),
    );
    n.appendChild(
      Gn(
        `<div class="t">${ev ? V18EVS[ev][0] + " Bugün: " + V18EVS[ev][1] : "📅 Bugün etkinlik yok"}</div><div class="d">${ev ? V18EVS[ev][2] : "Her yeni günde bir kampüs etkinliği çıkabilir: Final Haftası, Bahar Şenliği, Maç Günü, Kariyer Günleri, Mezuniyet..."}${V18RN8() ? "<br>🌧️🌙 Yağmurlu gece: teslimatlar ×1.5" : ""}<br>🎚️ Zorluk çarpanı ×${V18DM().toFixed(2)} (Ayarlar)</div>`,
      ),
    );
    let lg = v.login,
      k = ((lg.n || 1) - 1) % 7,
      R = [100, 150, 250, 350, 500, 700, 1200];
    n.appendChild(Gn(`<div class="t">🔥 Giriş serisi: ${lg.n || 0} gün</div><div class="d">Her gün oyuna gir: ${R.map((r, i) => (i === k ? "<b>" + r + "₺</b>" : r + "₺")).join(" → ")}</div>`));
    if (e.daily) {
      let dn = e.daily.list.filter((q) => q.done).length;
      n.appendChild(
        Gn(
          `<div class="t">📅 Günlük görevler (Gün ${e.day}) · ${dn}/${e.daily.list.length}</div><div class="d">${e.daily.list.map((q) => `${q.done ? "✅" : "⬜"} ${q.t} — ${Math.round(q.prog)}/${q.goal}${q.id === "clean" ? " m" : ""} · <span class="price">${q.rew}₺</span>`).join("<br>")}<br>Hepsini bitirdiğin gün serisi: ${v.dstreak || 0}</div>`,
        ),
      );
    }
    let wk = V18WEEK(),
      wl = V18WIDX().left;
    n.appendChild(
      Gn(
        `<div class="t">🏅 Haftalık görevler · ${wl} gün kaldı</div><div class="d">${wk.list.map((q) => `${q.done ? "✅" : "⬜"} ${q.t} — ${Math.round(q.prog)}/${q.goal} · <span class="price">${V18TL(q.rew)}</span>`).join("<br>")}</div>`,
      ),
    );
    let L = V18LG(),
      rk = V18LRANK(L);
    n.appendChild(
      Gn(
        `<div class="t">🏆 Haftalık Kurye Ligi · ${wl} gün kaldı</div><div class="d">${rk.map((q, i) => `${["🥇", "🥈", "🥉"][i] || i + 1 + "."} ${q[2] ? "<b>Sen (" + V18T[ti][2] + ")</b>" : q[0]} — ${V18TL(q[1])}`).join("<br>")}<br>Ödüller: 1. 3.000₺ · 2. 1.500₺ · 3. 750₺. Hafta gerçek takvimle 7 günde biter, sadece iş gelirin sayılır. Rakipler bekleyen işleri kapabilir!</div>`,
      ),
    );
    let zr = V18Z.map((Z, i) => {
      let r = v.rep[Z[0]] || 0,
        l = V18RLV(i),
        nx2 = V18RL[l + 1];
      return `${["⚪", "🟢", "🔵", "🟣", "🟡"][l]} ${Z[1]}: ${V18RN[l]} ${nx2 ? V18BAR((r - V18RL[l]) / (nx2 - V18RL[l]), "#b48cff") : ""}`;
    });
    n.appendChild(Gn(`<div class="t">⭐ Fakülte / bölge itibarı</div><div class="d">Bir bölgeye ya da bölgeden yaptığın her teslimat itibar kazandırır: o bölgede iş ücreti +%4/kademe, işletme ve filo geliri +%5/kademe, işletme fiyatları -%4/kademe.<br>${zr.join("<br>")}</div>`));
    let bn = Object.keys(v.bees).length;
    n.appendChild(
      Gn(
        `<div class="t">🐝 Altın Arılar: ${bn}/${V18BEEN}</div><div class="d">Kampüse 40 altın arı saklandı. Yanından geçince toplanır (+75₺, +30 XP).<br>10: Arı zil sesi + 500₺ · 20: Arı kask + 1.000₺ · 30: Altın iz efekti + 2.000₺ · 40: İNİN Altın Arı scooter + 5.000₺${v.radar ? "<br>📡 Arı radarı aktif: en yakın arı mini haritada" : ""}</div>`,
        v.radar ? [] : [{ t: "📡 Radar<br><small>800₺</small>", cls: e.money < 800 ? "dis" : "", fn: () => (e.money < 800 ? mt("Para yetmiyor", "bad") : (xn(-800, "Arı radarı"), (v.radar = 1), mt("📡 Mini haritada en yakın arı görünecek", "good"), Ln()), V18RR(n)) }],
      ),
    );
    n.appendChild(Gn(`<div class="t">🎓 Ünvanlar</div><div class="d">${V18T.map((q, i) => (i === ti ? "<b>▶ " : e.lvl >= q[0] ? "✓ " : "") + "Sv " + q[0] + " " + q[1] + (i === ti ? "</b>" : "")).join("<br>")}</div>`));
  }
  // Garaj
  function V18UIGAR(n) {
    let e = S.save,
      v = V18S(),
      g = v.gar;
    V18SEG(
      n,
      [
        ["model", "🛴 Model"],
        ["boya", "🎨 Boya"],
        ["kiyafet", "🧥 Kıyafet"],
        ["efekt", "✨ Efekt"],
      ],
      V18UI.gs,
      (k) => ((V18UI.gs = k), V18RR(n)),
    );
    if (V18UI.gs === "model") {
      e.own || n.appendChild(Gn(`<div class="t">Kendi scooter'ın yok</div><div class="d">Modeller kendi scooter'ın için. Mağaza'dan İNİN Pro'yu al (Sv 8). Kıyafetler herkese açık.</div>`, [{ t: "Mağaza", fn: () => ea("shop") }]));
      for (let k in V18M) {
        let m = V18M[k],
          ow = V18MOWN(k),
          eq = g.eq.model === k;
        n.appendChild(
          Gn(`<div class="t">${m[0]} ${eq ? '<span style="color:#7ff0a0">· seçili</span>' : ""}</div><div class="d">${m[1]}${m[3] > 1 && !ow ? " · Sv " + m[3] : ""}</div>`, [
            eq ? { t: "✓", cls: "gray", fn: () => {} } : ow ? { t: "Seç", fn: () => (V18MBUY(k), V18RR(n)) } : m[2] < 0 ? { t: "🐝 40", cls: "dis", fn: () => V18MBUY(k) } : { t: V18TL(m[2]), cls: e.money < m[2] || e.lvl < m[3] || !e.own ? "dis" : "", fn: () => (V18MBUY(k), V18RR(n)) },
          ]),
        );
      }
      return;
    }
    let G = V18UI.gs === "boya" ? ["col", "light"] : V18UI.gs === "kiyafet" ? ["hood", "pants", "hel", "hair"] : ["trail", "bell"];
    for (let k of G) {
      let C = V18CS[k],
        c = Bt(`<div class="card" style="display:block"><div class="t" style="margin-bottom:6px">${C[0]}</div></div>`),
        w = Bt('<div style="display:flex;flex-wrap:wrap;gap:6px"></div>');
      C[1].forEach((it, i) => {
        let ow = V18OWNS(k, i),
          eq = g.eq[k] === i,
          sw = k === "bell" || k === "trail" ? (it[2] === -1 ? "linear-gradient(90deg,#f44,#fa0,#ff0,#4f4,#4af,#a4f)" : k === "bell" ? "#2a3a40" : it[2] ? "#" + it[2].toString(16).padStart(6, "0") : "#222") : "#" + it[2].toString(16).padStart(6, "0"),
          b = Bt(
            `<div style="flex:0 0 auto;min-width:64px;padding:5px 7px;border-radius:10px;border:2px solid ${eq ? "#7ff0a0" : "rgba(255,255,255,.18)"};background:rgba(0,0,0,.25);text-align:center;font-size:11px;line-height:1.25"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 3px;background:${sw};border:2px solid rgba(255,255,255,.5)"></div>${it[0]}<br><b style="color:${eq ? "#7ff0a0" : ow ? "#cfe" : "#ffd36a"}">${eq ? "Takılı" : ow ? "Seç" : it[1] < 0 ? "🐝" : it[1] + "₺"}</b></div>`,
          );
        ((b.onclick = (ev) => {
          (ev.stopPropagation(), Hn.click(), V18GBUY(k, i), V18RR(n));
        }),
          w.appendChild(b));
      });
      (c.appendChild(w), n.appendChild(c));
    }
  }
