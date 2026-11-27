  // ---- filo kimliği: ad, renkler, desen, amblem ----
  var V18FCOL = [
      ["Turkuaz", 1688534],
      ["Lacivert", 1912687],
      ["Kırmızı", 14694718],
      ["Turuncu", 15764004],
      ["Sarı", 16106776],
      ["Yeşil", 3129201],
      ["Mor", 9067766],
      ["Pembe", 15757224],
      ["Siyah", 2500142],
      ["Beyaz", 15658734],
      ["Altın", 13938487],
      ["Gri", 9081232],
    ],
    V18FPAT = [
      ["Düz", 0],
      ["Yan şerit", 300],
      ["Çift şerit", 500],
      ["Arı bantları", 600],
    ],
    V18FEMB = [
      ["Yok", 0, ""],
      ["Arı", 300, "🐝"],
      ["Şimşek", 300, "⚡"],
      ["Roket", 300, "🚀"],
      ["Yıldız", 300, "⭐"],
      ["Ateş", 300, "🔥"],
      ["Tilki", 400, "🦊"],
      ["Ay", 400, "🌙"],
      ["Yonca", 400, "🍀"],
      ["Taç", 600, "👑"],
    ],
    V18FMAT = null,
    V18FEMT = null,
    V18FHS = [];
  function V18FLOOK() {
    let f = V18S().fl;
    return (f.look || (f.look = { name: "Benim Filom", col: 0, acc: 1, pat: 1, emb: 1, op: { 0: 1, 1: 1 }, oe: { 0: 1, 1: 1 } }), f.look);
  }
  function V18FNAME() {
    return V18FLOOK().name || "Filom";
  }
  function V18FMATS() {
    if (V18FMAT) return V18FMAT;
    let cv = document.createElement("canvas");
    ((cv.width = cv.height = 64), (V18FEMT = new Fn(cv)));
    return (V18FMAT = { body: yn(1688534), acc: yn(1912687), pat: yn(16777215), emb: new qt({ map: V18FEMT, transparent: !0, alphaTest: 0.25, side: 2 }) });
  }
  function V18FSIGNTEX(cv, n) {
    let L = V18FLOOK(),
      g = cv.getContext("2d"),
      c1 = "#" + V18FCOL[L.col][1].toString(16).padStart(6, "0"),
      c2 = "#" + V18FCOL[L.acc][1].toString(16).padStart(6, "0");
    ((cv.width = 256), (cv.height = 72), (g.fillStyle = c1), g.fillRect(0, 0, 256, 72), (g.fillStyle = "rgba(0,0,0,.35)"), g.fillRect(0, 0, 256, 72), (g.strokeStyle = c2), (g.lineWidth = 7), g.strokeRect(3.5, 3.5, 249, 65));
    ((g.textBaseline = "middle"), (g.font = "34px sans-serif"), g.fillText(V18FEMB[L.emb][2] || "🛴", 10, 37));
    let fs = 26,
      nm = V18FNAME();
    for (g.font = "bold " + fs + "px sans-serif"; g.measureText(nm).width > 186 && fs > 12;) (fs--, (g.font = "bold " + fs + "px sans-serif"));
    ((g.fillStyle = "#fff"), g.fillText(nm, 58, 27), (g.font = "bold 16px sans-serif"), (g.fillStyle = "#ffe9a8"), g.fillText("🛴 " + n + " scooter · İNİN bayisi", 58, 55));
    return cv;
  }
  function V18FAPPLY() {
    if (!S.save) return;
    let L = V18FLOOK(),
      M = V18FMATS(),
      c1 = V18FCOL[L.col][1],
      c2 = V18FCOL[L.acc][1];
    (M.body.color.setHex(c1), M.acc.color.setHex(c2), M.pat.color.setHex(L.pat === 3 ? 1710618 : c1 === c2 ? 16777215 : c2));
    let cv = V18FEMT.image,
      g = cv.getContext("2d");
    (g.clearRect(0, 0, 64, 64),
      L.emb && ((g.fillStyle = "rgba(255,255,255,.92)"), g.beginPath(), g.arc(32, 32, 30, 0, 7), g.fill(), (g.font = "40px sans-serif"), (g.textAlign = "center"), (g.textBaseline = "middle"), g.fillText(V18FEMB[L.emb][2], 32, 35)),
      (V18FEMT.needsUpdate = !0));
    let z = V18S().fl.z;
    for (let i = 0; i < V18FHS.length; i++) {
      let s = V18FHS[i],
        q = z[V18Z[i][0]];
      ((s.n = q ? q.n || 0 : 0), V18FSIGNTEX(s.tex.image, s.n), (s.tex.needsUpdate = !0));
    }
  }
  function V18FTEMPLATE() {
    let t = b1(!0),
      M = V18FMATS(),
      own = Y6().own,
      B = t.userData.body,
      L = V18FLOOK();
    B.children.forEach((c, k) => {
      c.isMesh && c.material === own && (c.material = k === 2 ? M.acc : M.body);
    });
    let add = (w, h, d, x2, y2, z2, m) => {
      let q = new Ie(new ot(w, h, d), m);
      return (q.position.set(x2, y2, z2), B.add(q), q);
    };
    if (L.pat === 1) for (let s of [-1, 1]) add(0.012, 0.024, 0.7, s * 0.102, 0.17, -0.02, M.pat);
    if (L.pat === 2) for (let s of [-1, 1]) (add(0.012, 0.014, 0.7, s * 0.102, 0.15, -0.02, M.pat), add(0.012, 0.014, 0.7, s * 0.102, 0.19, -0.02, M.pat));
    if (L.pat === 3) for (let zz of [-0.22, 0, 0.22]) add(0.206, 0.084, 0.06, 0, 0.17, zz, M.pat);
    let em = new Ie(new ci(0.14, 0.14), M.emb);
    (em.position.set(0, 0.8, 0.462), (em.rotation.x = -0.18), B.add(em));
    return t;
  }
  function V18FSIGNS(sc) {
    let pm = yn(5592405);
    for (let i = 0; i < V18Z.length; i++) {
      let H = V18FHUB[i],
        g = new Tn(),
        cv = document.createElement("canvas"),
        tex = new Fn(cv),
        post = new Ie(new ln(0.04, 0.04, 2.3, 6), pm),
        board = new Ie(new ci(1.9, 0.53), new qt({ map: tex, side: 2 }));
      ((post.position.y = 1.15), g.add(post), (board.position.y = 2.45), g.add(board));
      let sx = H.slots[0][0] - (H.slots[1][0] - H.slots[0][0]) * 1.6,
        sz = H.slots[0][1] - (H.slots[1][1] - H.slots[0][1]) * 1.6;
      (g.position.set(sx, Ss(sx, sz), sz), (g.visible = !1), sc.add(g), V18FHS.push({ g, board, tex, n: 0 }));
    }
  }
  function V18FREBUILD() {
    if (!V18SC) return;
    for (let o of V18FI) {
      (o.parent && o.parent.remove(o), o.geometry.dispose());
      for (let k = OUTLIST.length - 1; k >= 0; k--) OUTLIST[k].userData.src === o && (OUTLIST[k].parent && OUTLIST[k].parent.remove(OUTLIST[k]), OUTLIST.splice(k, 1));
    }
    ((V18FI.length = 0), V18FLEETBUILD(V18SC), V18FLEETM(), V18FAPPLY());
  }
  function V18FLSET(k, i) {
    let L = V18FLOOK();
    if (k === "pat" || k === "emb") {
      let T = k === "pat" ? V18FPAT : V18FEMB,
        O = k === "pat" ? L.op : L.oe;
      if (!O[i]) {
        if (S.save.money < T[i][1]) return mt("Para yetmiyor", "bad");
        (xn(-T[i][1], "Filo " + (k === "pat" ? "deseni" : "amblemi")), (O[i] = 1));
      }
    }
    let old = L[k];
    ((L[k] = i), k === "pat" && old !== i ? V18FREBUILD() : V18FAPPLY(), Ln());
  }
  function V18UIFLOOK(n, rr) {
    let L = V18FLOOK(),
      c = Bt(`<div class="card" style="display:block"><div class="t">🎨 Filo kimliği</div><div class="d" style="margin:2px 0 6px">Ad ve renkler ücretsiz. Scooter'ların, tabelaların ve haritadaki etiketin bu kimliği kullanır.</div></div>`),
      row = Bt('<div style="display:flex;gap:6px;align-items:center;margin-bottom:8px"></div>'),
      inp = document.createElement("input"),
      sv = Bt('<div class="btn" style="flex:0 0 auto">Kaydet</div>');
    ((inp.maxLength = 20), (inp.value = L.name), (inp.placeholder = "Filo adı"), (inp.style.cssText = "flex:1;min-width:0;font-size:16px;padding:8px 10px;border-radius:10px;border:2px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);color:#fff;font-weight:700"));
    for (let ev of ["keydown", "keyup", "keypress"]) inp.addEventListener(ev, (q) => (q.stopPropagation(), q.key === "Enter" && ev === "keydown" && sv.onclick(q)));
    ((sv.onclick = (q) => {
      q && q.stopPropagation && q.stopPropagation();
      let nm = inp.value.replace(/[<>&"`]/g, "").trim().slice(0, 20);
      if (!nm) return mt("Bir ad yaz", "bad");
      ((L.name = nm), V18FAPPLY(), Ln(), mt("🛴 Filonun adı artık: " + nm, "good"), Hn.click(), rr());
    }),
      row.appendChild(inp),
      row.appendChild(sv),
      c.appendChild(row));
    let sw = (title, list, cur, own, key, kind) => {
      c.appendChild(Bt(`<div class="d" style="margin:4px 0 4px;font-weight:700">${title}</div>`));
      let w = Bt('<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px"></div>');
      list.forEach((it, i) => {
        let on = cur === i,
          ow = !own || own[i] || !it[1],
          bg = kind === "col" ? "#" + it[1].toString(16).padStart(6, "0") : "#2a3a40",
          ic = kind === "emb" ? it[2] || "—" : kind === "pat" ? ["▭", "▤", "☰", "🐝"][i] : "",
          b = Bt(
            `<div style="flex:0 0 auto;min-width:${kind === "col" ? 44 : 64}px;padding:4px 6px;border-radius:10px;border:2px solid ${on ? "#7ff0a0" : "rgba(255,255,255,.18)"};background:rgba(0,0,0,.25);text-align:center;font-size:11px;line-height:1.25"><div style="width:24px;height:24px;border-radius:50%;margin:0 auto 2px;background:${bg};border:2px solid rgba(255,255,255,.5);font-size:15px;line-height:22px">${ic}</div>${kind === "col" ? "" : it[0] + "<br>"}<b style="color:${on ? "#7ff0a0" : ow ? "#cfe" : "#ffd36a"}">${on ? "✓" : ow ? (kind === "col" ? "" : "Seç") : it[1] + "₺"}</b></div>`,
          );
        ((b.onclick = (q) => {
          (q.stopPropagation(), Hn.click(), V18FLSET(key, i), rr());
        }),
          w.appendChild(b));
      });
      c.appendChild(w);
    };
    (sw("Gövde rengi", V18FCOL, L.col, null, "col", "col"), sw("Vurgu rengi (gidon direği, şeritler)", V18FCOL, L.acc, null, "acc", "col"), sw("Desen", V18FPAT, L.pat, L.op, "pat", "pat"), sw("Amblem", V18FEMB, L.emb, L.oe, "emb", "emb"));
    n.appendChild(c);
  }
