  // --- İNİN v1.4 dokuları: beyaz çizgili asfalt, taş kaldırım, bordür, çime geçiş ---
  function RTX(n) {
    let e = hn(512, 1024),
      t = e.getContext("2d"),
      r = Wn(n === "ana" ? 17 : n === "ara" ? 19 : 23);
    ((t.fillStyle = "#3a3d43"), t.fillRect(0, 0, 512, 1024));
    for (let i = 0; i < 26; i++) {
      let x2 = r() * 512,
        y2 = r() * 1024,
        rr = 40 + r() * 120,
        g = t.createRadialGradient(x2, y2, 0, x2, y2, rr),
        k = r() < 0.5;
      (g.addColorStop(0, k ? "rgba(70,72,78,0.35)" : "rgba(30,32,36,0.35)"), g.addColorStop(1, "rgba(0,0,0,0)"), (t.fillStyle = g), t.fillRect(x2 - rr, y2 - rr, rr * 2, rr * 2));
    }
    for (let i = 0; i < 70000; i++) {
      let v = r(),
        c = (v < 0.5 ? 85 + r() * 60 : 18 + r() * 20) | 0;
      ((t.fillStyle = `rgba(${c},${c},${c + 4},${0.25 + r() * 0.4})`), t.fillRect(r() * 512, r() * 1024, 1 + r() * 1.6, 1 + r() * 1.6));
    }
    if (n !== "plain")
      for (let cx of [0.27, 0.73]) {
        let g = t.createLinearGradient(cx * 512 - 46, 0, cx * 512 + 46, 0);
        (g.addColorStop(0, "rgba(0,0,0,0)"), g.addColorStop(0.5, "rgba(10,10,12,0.16)"), g.addColorStop(1, "rgba(0,0,0,0)"), (t.fillStyle = g), t.fillRect(cx * 512 - 46, 0, 92, 1024));
      }
    ((t.strokeStyle = "rgba(14,14,16,0.5)"), (t.lineWidth = 1.4));
    for (let i = 0; i < 7; i++) {
      t.beginPath();
      let x2 = 40 + r() * 430,
        y2 = r() * 1024;
      t.moveTo(x2, y2);
      for (let k = 0; k < 7; k++) ((x2 += (r() - 0.5) * 34), (y2 += 6 + r() * 26), t.lineTo(x2, y2));
      t.stroke();
    }
    if (n !== "plain") {
      let line = (x2, y2, w2, h2) => {
        ((t.fillStyle = "#f3f2ec"), t.fillRect(x2, y2, w2, h2), (t.fillStyle = "rgba(255,255,255,0.35)"));
        for (let i = 0; i < 300; i++) t.fillRect(x2 + r() * w2, y2 + r() * h2, 1, 1);
        t.fillStyle = "rgba(40,40,44,0.25)";
        for (let i = 0; i < 260; i++) t.fillRect(x2 + r() * w2, y2 + r() * h2, 1.5, 1.5);
      };
      (line(20, 0, 13, 1024), line(479, 0, 13, 1024), line(250, 0, 12, 300), line(250, 512, 12, 300));
    }
    let a = t.createLinearGradient(0, 0, 22, 0);
    (a.addColorStop(0, "rgba(0,0,0,0.35)"), a.addColorStop(1, "rgba(0,0,0,0)"), (t.fillStyle = a), t.fillRect(0, 0, 22, 1024));
    let b = t.createLinearGradient(512, 0, 490, 0);
    return (b.addColorStop(0, "rgba(0,0,0,0.35)"), b.addColorStop(1, "rgba(0,0,0,0)"), (t.fillStyle = b), t.fillRect(490, 0, 22, 1024), pi(e, !0, 8));
  }
  function SWTX() {
    let e = hn(256, 256),
      t = e.getContext("2d"),
      r = Wn(5);
    ((t.fillStyle = "#8f8a81"), t.fillRect(0, 0, 256, 256));
    let cols = ["#d9d3c7", "#cfc8ba", "#e2ddd2", "#c7bfb0", "#d4cdbf"];
    for (let y2 = 0; y2 < 8; y2++)
      for (let x2 = -1; x2 < 4; x2++) {
        let ox = x2 * 64 + (y2 % 2) * 32,
          c = cols[(r() * cols.length) | 0],
          px = ox + 2,
          py = y2 * 32 + 2;
        ((t.fillStyle = c), t.fillRect(px, py, 60, 28), (t.fillStyle = "rgba(255,255,255,0.35)"), t.fillRect(px, py, 60, 2), t.fillRect(px, py, 2, 28), (t.fillStyle = "rgba(0,0,0,0.12)"), t.fillRect(px, py + 26, 60, 2), t.fillRect(px + 58, py, 2, 28));
      }
    return (h3(t, 256, 256, 2500, 0.08, r), pi(e, !0, 8));
  }
  function KTX() {
    let e = hn(128, 128),
      t = e.getContext("2d"),
      r = Wn(8);
    ((t.fillStyle = "#e6e3dc"), t.fillRect(0, 0, 128, 128), h3(t, 128, 128, 1500, 0.1, r), (t.fillStyle = "#9d998f"), t.fillRect(0, 0, 128, 3), t.fillRect(0, 0, 3, 128));
    return pi(e, !0, 4);
  }
  function VTX() {
    let e = hn(128, 256),
      t = e.getContext("2d"),
      r = Wn(13),
      g = t.createLinearGradient(0, 0, 128, 0);
    (g.addColorStop(0, "rgba(124,118,88,0.95)"), g.addColorStop(0.35, "rgba(120,138,78,0.7)"), g.addColorStop(1, "rgba(110,160,70,0)"), (t.fillStyle = g), t.fillRect(0, 0, 128, 256));
    for (let i = 0; i < 2600; i++) {
      let x2 = Math.pow(r(), 1.6) * 128,
        a = 0.55 * (1 - x2 / 128);
      ((t.fillStyle = r() < 0.5 ? `rgba(90,130,55,${a})` : `rgba(150,140,105,${a})`), t.fillRect(x2, r() * 256, 1 + r() * 2, 1 + r() * 3));
    }
    let tx = pi(e, !0, 4);
    return ((tx.wrapS = Bi), tx);
  }
