# İNİN v1.3: sürüm metinleri, yardım, kayıt aktarma
from patch_common import P
p = P('/home/claude/work/app.mod.js')
p.rep('''<div class="foot">v1.2.4 \\xB7 Hayran yap\\u0131m\\u0131 oyun \\xB7 ger\\xE7ek bir scooter \\u015Firketiyle ba\\u011Flant\\u0131s\\u0131 yok \\xB7 Harita \\xA9 OpenStreetMap katk\\u0131c\\u0131lar\\u0131 \\xB7 Y\\xFCkselti: Copernicus DEM</div>''',
      '''<div class="foot">v1.3.0 \\xB7 Hayran yap\\u0131m\\u0131 oyun \\xB7 ger\\xE7ek bir scooter \\u015Firketiyle ba\\u011Flant\\u0131s\\u0131 yok \\xB7 Harita \\xA9 OpenStreetMap katk\\u0131c\\u0131lar\\u0131 (ODbL, 26.11.2026) \\xB7 Y\\xFCkselti: SRTM / Terrain Tiles (AWS Open Data)</div>''')
p.rep('''<div class="tag">Ger\\xE7ek kamp\\xFCs haritas\\u0131 \\xB7 ger\\xE7ek yoku\\u015Flar</div>''',
      '''<div class="tag">Ger\\xE7ek kamp\\xFCs haritas\\u0131 \\xB7 ger\\xE7ek yoku\\u015Flar \\xB7 v1.3 b\\xFCy\\xFCk g\\xFCncelleme</div>''')
p.rep('''  <b>Hayatta kal:</b> Enerji azal\\u0131r \\u2192 yemekhane/kafe.''',
      '''  <b>Ayarlar (\\u2699\\uFE0F):</b> Oyunu zor bulursan <b>Arazi zorluklar\\u0131</b> ve <b>Cezalar</b>'\\u0131 kapatabilirsin.<br>
  <b>\\u0130lerleme:</b> \\u{1F3C6} Rozetler, \\u{1F4CD} kamp\\xFCste ke\\u015Fif (yerlerin yan\\u0131na git) ve \\u{1F525} seri teslimat bonusu (+%10/teslimat, en fazla +%50).<br>
  <b>Hayatta kal:</b> Enerji azal\\u0131r \\u2192 yemekhane/kafe.''')
# ayarlar: kaydı dışa/içe aktar (APK yeniden kurulumu için)
p.rep('''        n.appendChild(
          Gn('<div class="t">Kayd\\u0131 s\\u0131f\\u0131rla</div><div class="d">T\\xFCm ilerleme silinir.</div>', [''',
      '''        n.appendChild(
          Gn('<div class="t">\\u{1F4BE} Kay\\u0131t aktar</div><div class="d">Uygulamay\\u0131 silip yeniden kuracaksan \\xF6nce kopyala, sonra yap\\u0131\\u015Ft\\u0131r.</div>', [
            {
              t: "Kopyala",
              cls: "gray",
              fn: () => {
                Ln();
                let c = btoa(unescape(encodeURIComponent(localStorage.getItem("inin_save_v3") || "")));
                (navigator.clipboard && navigator.clipboard.writeText(c).then(
                  () => vn("Kay\\u0131t kodu panoya kopyaland\\u0131", "good"),
                  () => prompt("Kay\\u0131t kodun (kopyala):", c),
                )) || prompt("Kay\\u0131t kodun (kopyala):", c);
              },
            },
            {
              t: "Y\\xFCkle",
              cls: "gray",
              fn: () => {
                let c = prompt("Kay\\u0131t kodunu yap\\u0131\\u015Ft\\u0131r:");
                if (!c) return;
                try {
                  let j = decodeURIComponent(escape(atob(c.trim())));
                  if (JSON.parse(j).v !== 3) throw 0;
                  (localStorage.setItem("inin_save_v3", j), vn("Kay\\u0131t y\\xFCklendi, oyun yeniden a\\xE7\\u0131l\\u0131yor", "good"), setTimeout(() => location.reload(), 800));
                } catch {
                  vn("Kay\\u0131t kodu ge\\xE7ersiz", "bad");
                }
              },
            },
          ]),
        ),
        n.appendChild(
          Gn('<div class="t">Kayd\\u0131 s\\u0131f\\u0131rla</div><div class="d">T\\xFCm ilerleme silinir.</div>', [''')
p.save()
