    {
      // --- İNİN v1.3: simge yapılar (kaynak: OSM + yapı künyeleri), kanopiler ve bina hatları ---
      let colG = (g, hex, k = 1) => {
          g = g.index ? g : g.toNonIndexed();
          let c = new Le(hex),
            a = new Float32Array(g.attributes.position.count * 3);
          for (let i = 0; i < g.attributes.position.count; i++) ((a[i * 3] = c.r * k), (a[i * 3 + 1] = c.g * k), (a[i * 3 + 2] = c.b * k));
          return (g.setAttribute("color", new wt(a, 3)), g);
        },
        obb = (P) => {
          let cx = 0,
            cz = 0;
          for (let p of P) ((cx += p[0]), (cz += p[1]));
          ((cx /= P.length), (cz /= P.length));
          let sxx = 0,
            szz = 0,
            sxz = 0;
          for (let p of P) ((sxx += (p[0] - cx) ** 2), (szz += (p[1] - cz) ** 2), (sxz += (p[0] - cx) * (p[1] - cz)));
          let th = 0.5 * Math.atan2(2 * sxz, sxx - szz),
            ux = Math.cos(th),
            uz = Math.sin(th),
            a0 = 1e9,
            a1 = -1e9,
            b0 = 1e9,
            b1 = -1e9;
          for (let p of P) {
            let a = (p[0] - cx) * ux + (p[1] - cz) * uz,
              b = -(p[0] - cx) * uz + (p[1] - cz) * ux;
            ((a0 = Math.min(a0, a)), (a1 = Math.max(a1, a)), (b0 = Math.min(b0, b)), (b1 = Math.max(b1, b)));
          }
          return {
            cx: cx + ((a0 + a1) / 2) * ux - ((b0 + b1) / 2) * uz,
            cz: cz + ((a0 + a1) / 2) * uz + ((b0 + b1) / 2) * ux,
            ux,
            uz,
            L: a1 - a0,
            W: b1 - b0,
            th,
          };
        },
        vault = (C, hex, riseK) => {
          // kavisli çatı (kütüphanenin bakır çatısı, havuz)
          let o = obb(C.ring),
            rise = Math.max(2, o.W * riseK),
            N = 18,
            pos = [],
            idx = [],
            y0 = C.top - 0.2,
            hw = o.W / 2 + 0.7,
            hl = (o.L + 1.4) / 2,
            Y = (v) => y0 + rise * (1 - (v / hw) ** 2);
          for (let i = 0; i <= N; i++) {
            let v = -hw + (2 * hw * i) / N;
            for (let s of [-1, 1]) pos.push(o.cx + s * hl * o.ux - v * o.uz, Y(v), o.cz + s * hl * o.uz + v * o.ux);
            i && idx.push((i - 1) * 2, i * 2, (i - 1) * 2 + 1, (i - 1) * 2 + 1, i * 2, i * 2 + 1);
          }
          let g = new St();
          (g.setAttribute("position", new tt(pos, 3)), g.setIndex(idx), g.computeVertexNormals(), Q.push(colG(g, hex)));
          for (let s of [-1, 1]) {
            let cp = [o.cx + s * hl * o.ux, y0, o.cz + s * hl * o.uz],
              ci2 = [];
            for (let i = 0; i <= N; i++) {
              let v = -hw + (2 * hw * i) / N;
              (cp.push(o.cx + s * hl * o.ux - v * o.uz, Y(v), o.cz + s * hl * o.uz + v * o.ux), i && ci2.push(0, i, i + 1));
            }
            let g2 = new St();
            (g2.setAttribute("position", new tt(cp, 3)), g2.setIndex(ci2), g2.computeVertexNormals(), Q.push(colG(g2, 9268568)));
          }
          // çatı silüet hattı
          for (let s of [-1, 1]) {
            let R = [];
            for (let i = 0; i <= N; i++) {
              let v = -hw + (2 * hw * i) / N;
              R.push([o.cx + s * hl * o.ux - v * o.uz, Y(v), o.cz + s * hl * o.uz + v * o.ux]);
            }
            VLN.push(R);
          }
          return o;
        };
      var VLN = [];
      for (let C of LMK) {
        if (C.lm === "kutuphane") (vault(C, 10115637, 0.1), (C.top += 2));
        else if (C.lm === "havuz") vault(C, 9087658, 0.14);
        else if (C.lm === "sdkm") {
          // üç katlı ortak atriumun cam tavanı
          let o = obb(C.ring),
            g = new ot(Math.max(6, o.L * 0.35), 2.6, Math.max(5, o.W * 0.3));
          (g.rotateY(-o.th), g.translate(o.cx, C.top + 1.3, o.cz), Q.push(colG(g, 10474470)));
        } else if (C.lm === "cami") {
          // Abdülhakim Sancak Camii: 26 m çaplı, 21 m yüksek kubbe, 39 m kalem minare
          let o = obb(C.ring),
            r = Math.min(13, 0.46 * Math.min(o.L, o.W)),
            top = C.ground + 21,
            hd = Math.max(4, top - C.top - 1.6),
            dr = new ln(r * 1.03, r * 1.06, 1.6, 32, 1);
          (dr.translate(o.cx, C.top + 0.8, o.cz), Q.push(colG(dr, 15263976)));
          let dm = new _i(r, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2);
          (dm.scale(1, hd / r, 1), dm.translate(o.cx, C.top + 1.6, o.cz), Q.push(colG(dm, 8949907)));
          let al = new ln(0.12, 0.25, 2.2, 8);
          (al.translate(o.cx, C.top + 1.6 + hd + 1.1, o.cz), Q.push(colG(al, 13938487)));
          let far = C.ring[0],
            fd = 0;
          for (let p of C.ring) {
            let d = Math.hypot(p[0] - o.cx, p[1] - o.cz);
            d > fd && ((fd = d), (far = p));
          }
          let mx = far[0] + ((far[0] - o.cx) / fd) * 3.5,
            mz = far[1] + ((far[1] - o.cz) / fd) * 3.5,
            gy = Wt(mx, mz) - 1,
            H = C.ground + 39 - gy,
            sh = new ln(1.15, 1.45, H - 6, 12);
          (sh.translate(mx, gy + (H - 6) / 2, mz), Q.push(colG(sh, 15724783)));
          let bl = new ln(1.9, 1.5, 1.2, 12);
          (bl.translate(mx, gy + H * 0.68, mz), Q.push(colG(bl, 13421772)));
          let cn2 = new ln(0, 1.2, 6, 12);
          (cn2.translate(mx, gy + H - 3, mz), Q.push(colG(cn2, 7701126)));
          let fi = new ln(0.08, 0.12, 1.4, 6);
          (fi.translate(mx, gy + H + 0.7, mz), Q.push(colG(fi, 13938487)));
          Si({ x: mx, z: mz, r: 1.6, kind: "direk" });
        }
      }
      // kapı saçakları / kanopiler (altından geçilebilir)
      for (let B of Cano) {
        let P = B.poly.slice();
        if (P.length < 3) continue;
        let s2 = 0;
        for (let a = 0, b = P.length - 1; a < P.length; b = a++) s2 += (P[b][0] - P[a][0]) * (P[b][1] + P[a][1]);
        s2 > 0 && P.reverse();
        let gm = Math.max(...P.map((p) => Wt(p[0], p[1]))),
          y1 = gm + (B.minH || 3.8),
          y2 = gm + (B.h || 4.5),
          pos = [],
          idx = [],
          k = 0;
        for (let a = 0; a < P.length; a++) {
          let p = P[a],
            q2 = P[(a + 1) % P.length];
          (pos.push(p[0], y1, p[1], q2[0], y1, q2[1], q2[0], y2, q2[1], p[0], y2, p[1]), idx.push(k, k + 1, k + 2, k, k + 2, k + 3), (k += 4));
        }
        let tri = br.triangulateShape(
            P.map((p) => new je(p[0], p[1])),
            [],
          ),
          base = k;
        (P.forEach((p) => pos.push(p[0], y2, p[1])), tri.forEach((f) => idx.push(base + f[0], base + f[2], base + f[1])));
        let b2 = base + P.length;
        (P.forEach((p) => pos.push(p[0], y1, p[1])), tri.forEach((f) => idx.push(b2 + f[0], b2 + f[1], b2 + f[2])));
        let g = new St();
        (g.setAttribute("position", new tt(pos, 3)),
          g.setIndex(idx),
          g.computeVertexNormals(),
          Q.push(colG(g, B.lm === "arikapi" ? 16316138 : 13158600)));
        EDG.push([P, y1, y2, y1, !0]);
        let o = obb(P);
        if (B.lm !== "arikapi")
          for (let [sa, sb] of [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ]) {
            let a = sa * Math.max(0, o.L / 2 - 0.5),
              b = sb * Math.max(0, o.W / 2 - 0.5),
              px = o.cx + a * o.ux - b * o.uz,
              pz = o.cz + a * o.uz + b * o.ux,
              gy = Wt(px, pz),
              c = new ln(0.18, 0.18, y1 - gy + 0.4, 8);
            (c.translate(px, (y1 + gy) / 2, pz), Q.push(colG(c, 10066329)), Si({ x: px, z: pz, r: 0.3, kind: "direk" }));
          }
        else {
          // Arı Kapı: ana giriş yazısı
          let sg = Ys("İSTANBUL TEKNİK \xDCNİVERSİTESİ", null, "#1d2a33", "rgba(255,255,255,0)"),
            sm = new qt({ map: sg, transparent: !0, side: Mn, depthWrite: !1 }),
            wd = Math.min(o.L * 0.95, 30);
          for (let s of [-1, 1]) {
            let pl = new Ie(new ci(wd, wd / 4), sm),
              off = o.W / 2 + 0.08;
            (pl.position.set(o.cx - s * off * o.uz, (y1 + y2) / 2 + 0.1, o.cz + s * off * o.ux),
              (pl.rotation.y = -o.th + (s > 0 ? 0 : Math.PI)),
              t.add(pl));
          }
        }
      }
      // belirgin hatlar: çatı kenarları + bina köşeleri
      {
        let ep = [];
        for (let [R, y0, y1, gr, cano] of EDG) {
          let n = R.length;
          for (let a = 0; a < n; a++) {
            let p = R[a],
              q2 = R[(a + 1) % n],
              pr = R[(a - 1 + n) % n];
            (ep.push(p[0], y1 + 0.05, p[1], q2[0], y1 + 0.05, q2[1]), cano && ep.push(p[0], y0 - 0.05, p[1], q2[0], y0 - 0.05, q2[1]));
            let d1 = Math.atan2(p[1] - pr[1], p[0] - pr[0]),
              d2 = Math.atan2(q2[1] - p[1], q2[0] - p[0]),
              dd = Math.abs(((d2 - d1 + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
            dd > 0.45 && !cano && ep.push(p[0], Wt(p[0], p[1]) - 0.3, p[1], p[0], y1 + 0.05, p[1]);
          }
        }
        for (let R of VLN) for (let a = 1; a < R.length; a++) ep.push(...R[a - 1], ...R[a]);
        let eg = new St();
        eg.setAttribute("position", new wt(new Float32Array(ep), 3));
        let el = new Zo(eg, new yr({ color: 1645353, transparent: !0, opacity: 0.9 }));
        ((el.frustumCulled = !1), t.add(el), (ut.edges = el));
      }
    }
