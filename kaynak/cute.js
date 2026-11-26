  // --- İNİN v1.3: sevimli oyuncu karakteri ---
  function CUTE(hood, pants, skin, hair) {
    let a = new Tn(),
      mH = yn(hood),
      mP = yn(pants),
      mS = yn(skin),
      mHr = yn(hair),
      mW = yn(16316664),
      mK = yn(1645604),
      u = new Tn();
    ((u.position.y = 0.92), a.add(u));
    let tor = new Ie(new ln(0.19, 0.235, 0.58, 16), mH);
    ((tor.position.y = 0.3), u.add(tor));
    let belly = new Ie(new _i(0.2, 14, 10), mH);
    (belly.scale.set(1.12, 0.55, 0.95), (belly.position.y = 0.06), u.add(belly));
    let logo = new Ie(new ot(0.16, 0.07, 0.02), mW);
    (logo.position.set(0, 0.36, 0.215), (logo.rotation.x = -0.07), u.add(logo));
    let hoodR = new Ie(new e1(0.13, 0.055, 8, 18), mH);
    ((hoodR.rotation.x = Math.PI / 2), (hoodR.position.set(0, 0.6, -0.03)), u.add(hoodR));
    let f = new Ie(new ot(0.34, 0.4, 0.16), yn(3093046));
    (f.position.set(0, 0.32, -0.25), u.add(f), (f.visible = !1));
    let fl = new Ie(new ot(0.2, 0.06, 0.01), yn(1688534));
    (fl.position.set(0, 0.06, -0.081), f.add(fl));
    let p = new Tn();
    ((p.position.y = 0.6), u.add(p));
    let head = new Ie(new _i(0.205, 20, 16), mS);
    ((head.position.y = 0.17), head.scale.set(1, 0.95, 0.96), p.add(head));
    let hr = new Ie(new _i(0.218, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.47), mHr);
    (hr.position.set(0, 0.2, -0.02), hr.rotation.set(-0.32, 0, 0), p.add(hr));
    let bang = new Ie(new _i(0.1, 10, 8), mHr);
    (bang.scale.set(1.5, 0.45, 0.7), bang.position.set(0.05, 0.345, 0.12), (bang.rotation.z = 0.3), p.add(bang));
    let ey = new Tn();
    ((ey.position.set(0, 0.16, 0.18), p.add(ey)));
    for (let sx of [-1, 1]) {
      let e = new Ie(new _i(0.034, 12, 10), mK);
      (e.scale.set(0.85, 1.15, 0.6), e.position.set(sx * 0.072, 0, 0), ey.add(e));
      let hl = new Ie(new _i(0.012, 8, 6), mW);
      (hl.position.set(sx * 0.072 + 0.012, 0.016, 0.02), ey.add(hl));
      let ch = new Ie(new _i(0.032, 10, 8), yn(16751250));
      (ch.scale.set(1, 0.6, 0.4), ch.position.set(sx * 0.125, 0.115, 0.16), p.add(ch));
    }
    let mo = new Ie(new e1(0.028, 0.008, 6, 12, Math.PI), mK);
    (mo.position.set(0, 0.095, 0.196), (mo.rotation.z = Math.PI), p.add(mo));
    let m = new Ie(new _i(0.238, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), mW);
    ((m.position.y = 0.185), p.add(m), (m.visible = !1));
    let st = new Ie(new ot(0.05, 0.02, 0.44), yn(1688534));
    (st.position.y = 0.235, m.add(st));
    let arm = (sx) => {
        let g = new Tn(),
          s = new Ie(new ln(0.062, 0.058, 0.5, 10), mH);
        ((s.position.y = -0.25), g.add(s));
        let sh = new Ie(new _i(0.07, 10, 8), mH);
        g.add(sh);
        let hd = new Ie(new _i(0.068, 10, 8), mS);
        return ((hd.position.y = -0.52), g.add(hd), g);
      },
      leg = () => {
        let g = new Tn(),
          s = new Ie(new ln(0.085, 0.075, 0.82, 10), mP);
        ((s.position.y = -0.41), g.add(s));
        let sh = new Ie(new _i(0.095, 12, 8), mW);
        return (sh.scale.set(0.9, 0.55, 1.4), sh.position.set(0, -0.86, 0.04), g.add(sh), g);
      },
      E = arm(-1),
      w = arm(1);
    (E.position.set(-0.26, 0.54, 0), w.position.set(0.26, 0.54, 0), u.add(E), u.add(w));
    let v = leg(),
      P2 = leg();
    return (
      v.position.set(-0.1, 0, 0),
      P2.position.set(0.1, 0, 0),
      u.add(v),
      u.add(P2),
      (a.userData = { hip: u, la: E, ra: w, ll: v, rl: P2, neck: p, hel: m, bag: f, torso: tor, eyes: ey }),
      a.traverse((R) => {
        R.isMesh && (R.castShadow = !0);
      }),
      a
    );
  }
