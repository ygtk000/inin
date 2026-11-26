    // --- İNİN v1.5: çim alanlara hafif süs: çalı, çiçek öbeği, taş (instanced, az çizim çağrısı) ---
    {
      let rz = Wn(4242),
        bush = [],
        flw = [],
        rock = [],
        tries = e.trees ? 9e3 : 3500,
        mt2 = new ct(),
        q2 = new on(),
        pv = new L(),
        sv = new L(),
        okc = (x2, z2) => tn(x2, z2) === Pt.GRASS && x2 > Me.minX + 3 && x2 < Me.maxX - 3 && z2 > Me.minZ + 3 && z2 < Me.maxZ - 3 && !cn(x2, z2, 1.2);
      for (let i = 0; i < tries; i++) {
        let x2 = Me.minX + rz() * Ct,
          z2 = Me.minZ + rz() * It;
        if (!okc(x2, z2)) continue;
        let k = rz();
        if (k < 0.45) {
          let s = 0.6 + rz() * 0.7,
            c = new Le().setHSL(0.24 + rz() * 0.1, 0.45 + rz() * 0.2, 0.22 + rz() * 0.12);
          (pv.set(x2, Wt(x2, z2) - 0.1, z2), q2.setFromAxisAngle(new L(0, 1, 0), rz() * 6.28), sv.set(s, s * (0.6 + rz() * 0.3), s), bush.push({ x: x2, z: z2, m: new ct().compose(pv, q2, sv), c }));
        } else if (k < 0.85) {
          let hue = [0.0, 0.13, 0.85, 0.75, 0.6][(rz() * 5) | 0],
            n2 = 4 + ((rz() * 6) | 0);
          for (let j = 0; j < n2; j++) {
            let fx = x2 + (rz() - 0.5) * 2.4,
              fz = z2 + (rz() - 0.5) * 2.4,
              s = 0.18 + rz() * 0.14,
              c = new Le().setHSL(hue + (rz() - 0.5) * 0.04, 0.8, 0.62 + rz() * 0.15);
            (pv.set(fx, Wt(fx, fz) + 0.05, fz), sv.set(s, s * 0.7, s), q2.set(0, 0, 0, 1), flw.push({ x: fx, z: fz, m: new ct().compose(pv, q2, sv), c }));
          }
        } else if (k < 0.92) {
          let s = 0.3 + rz() * 0.5,
            c = new Le().setHSL(0.08, 0.05, 0.45 + rz() * 0.2);
          (pv.set(x2, Wt(x2, z2) - 0.05, z2), q2.setFromAxisAngle(new L(0, 1, 0), rz() * 6.28), sv.set(s, s * 0.6, s * 0.8), rock.push({ x: x2, z: z2, m: new ct().compose(pv, q2, sv), c }));
        }
      }
      let bg = new Qo(1, 0);
      bg.translate(0, 0.55, 0);
      let fg = new Qo(1, 0),
        rg = new Qo(1, 0);
      (rg.translate(0, 0.3, 0),
        bush.length && qs(bg, new lt({ color: 16777215 }), bush, { shadow: !1, color: !0 }),
        flw.length && qs(fg, new lt({ color: 16777215 }), flw, { shadow: !1, color: !0 }),
        rock.length && qs(rg, new lt({ color: 16777215 }), rock, { shadow: !1, color: !0 }));
    }
