# İNİN — İTÜ Ayazağa Scooter Simülatörü

İTÜ Ayazağa kampüsünde elektrikli scooter kiralayıp iş yaptığın 3D simülasyon oyunu (PWA).

**Oyna:** https://ygtk000.github.io/inin/

**Android APK:** https://ygtk000.github.io/inin/ININ_Kampus.apk

iPhone: Safari'de aç → Paylaş → Ana Ekrana Ekle. İlk açılıştan sonra internetsiz çalışır.

## v1.8.0
- 🎓 Seviyeler akademik ünvan verir: Hazırlık Öğrencisi → Lisans → Mühendis → Y. Lisans → Doktora → Arş. Gör. → Öğr. Gör. → Dr. Öğr. Üyesi → Doçent → Profesör → Bölüm Başkanı → Enstitü Müdürü → Dekan → Rektör Yardımcısı → Rektör (Sv 34). Her ünvan iş ücretine +%2 prim.
- 🏪 Kampüs içindeki 44 gerçek işletme (OSM 27.11.2026 + İTÜ ve yemek.com kaynakları) tabelalarıyla oyunda: satın al, 5 seviyeye yükselt, müdür tut, fiyat politikası seç, kasayı topla, tedarik işleriyle geliri artır. Sen yokken müdürler kazandırır.
- 🛴 Sv 9'da filo patronluğu: bölge izni, kendi scooter'ların (kampüste görünür), şarj istasyonu, şarjcı/dengeleyici/teknisyen, filo bakım işleri.
- 🎯 Görev sekmesi: genişletilmiş günlük görevler, haftalık görevler, gerçek gün giriş serisi, haftalık kurye ligi (rakipler işleri kapabilir), 13 bölgede fakülte itibarı, etkinlik günleri (Final Haftası, Bahar Şenliği, Maç Günü, Kariyer Günleri, Mezuniyet, Kampanya), yağmurlu gece ×1.5.
- 🎚️ Zorluk kademesi: Rahat ×1.00 / Normal ×1.25 / Gerçekçi ×1.50 ödül çarpanı.
- 🔥 Teslimat serisi en fazla +%100, 5/10/15/20/30'da seri ödülü; iş bitince 3 dk içinde yenisini almazsan seri biter.
- 🎨 Garaj: 6 scooter modeli (Retro, Sprint, Dağcı, Kargo, Altın Arı), scooter rengi, far ışığı, kapüşon/pantolon/kask/saç, iz efektleri, zil sesleri.
- 👻 Yarışlarda en iyi derecenin hayaleti ve kontrol noktalarında fark bildirimi. 🏁 Kampüste dolaşan rakip kuryeler. 🐝 Kampüse saklanmış 40 Altın Arı ve ödülleri.
- Kampüs dışındaki dükkanlar (İstinyePark, Maslak plazaları) artık iş noktası değil; tüm yeni işler ve rotalar kampüs içinde.

## v1.7.0
- Tüm yarışlar (başlangıç, bitiş, her kontrol noktası) ve görev alış/teslim noktaları tek tek kampüs sınırına göre kontrol edildi: hepsi içeride.
- Rota bulucu kampüs dışındaki yolları kullanmaz; dış kapıdaki (Metro gibi) noktalar en yakın kampüs içi noktaya alındı.
- Kampüs Maratonu artık yalnızca kampüs içi noktalardan geçer; Gölet Turu kampüs içi yollardan çizilir.
- Kontrol noktaları arasındaki düz hat bina, duvar, su veya sınır dışından geçmez (gerekirse ara kontrol noktası eklenir).
- Yola taşan bina parçaları kırpıldı.

## v1.6.0
- Tek yükselti yüzeyi: zemin (4 m ızgara), yollar, kaldırımlar, binalar ve fizik aynı yüzeyi kullanır.
- Yol boyuna profilleri yumuşatılır, kavşaklarda eşitlenir; yol kenarlarında yumuşak dolgu/yarma geçişi.
- Başka yolun asfaltına/binaya taşan kaldırım ve bordür parçaları kesilir; göbeklerde iç kaldırım yok; köprü/tünel/katmanlı yollar çıkarıldı.
- Çok daha fazla ağaç (zemin karolara bölündü, uzak ağaçların hattı çizilmez).

## v1.5.0
- Kavşaklar düzgün dolgu, yol parçalarının birleştiği yerlerde yuvarlak lekeler yok.
- Daha küçük tuşlar (Ayarlar → Tuş boyutu), ekranda İşler ve Ayarlar tuşları.
- Kısa, kapatılabilir öğreticiler; direksiyon hassasiyeti ayarı, yüksek hızda daha yumuşak dönüş.
- Çim alanlarda biçme desenleri, çiçek öbekleri, çalılar ve taşlar.

## v1.4.0
- Beyaz çizgili yeni asfalt, taş kaldırımlar ve bordürler; yollardan çime yumuşak geçiş, neredeyse her yolda kaldırım.
- Ekranı sürükleyerek etrafa bakma, birinci şahıs kamera.
- Ayarlar: "Hiçbir şey yavaşlatmasın", kamera seçimi, mini harita boyutu; mini haritaya dokununca tam harita açılır.
- Konfeti kaldırıldı, pencere ve karakter oranları düzeltildi.

## v1.3.0
- Harita OpenStreetMap'ten yeniden çekildi (26.11.2026): kampüs sınırı (OSM way 549717756) uydu görüntüsü, Büyükdere/Katar caddeleri ve kapılarla karşılaştırıldı.
- Eksik fakülte blokları (EEF, Kimya-Metalurji, Maden, İnşaat, Fen-Edebiyat, Gemi, YDY) avlularıyla eklendi; tüm yollar, kaldırımlar, merdivenler ve yaya yolları.
- Simge yapılar: Mustafa İnan Kütüphanesi (bakır kavisli çatı), Abdülhakim Sancak Camii (26 m kubbe, 39 m minare), MED, EEF, BBF, SDKM, Arı Kapı, olimpik havuz.
- Yükselti: 10 m ızgara, SRTM tabanlı Terrain Tiles (AWS Open Data).
- Daha kolay ekonomi, ayarlardan arazi zorlukları ve cezalar kapatılabilir.
- Tatlı çizim tarzı, belirgin hatlar, yeni karakter, rozetler, keşif, seri teslimat.

Hayran yapımı oyun, gerçek bir scooter şirketiyle bağlantısı yoktur.
Harita © OpenStreetMap katkıcıları (ODbL) · Yükselti: SRTM / Terrain Tiles (AWS Open Data)

`kaynak/` klasörü okunabilir kaynak kodu ve harita dönüştürücüsünü içerir.
