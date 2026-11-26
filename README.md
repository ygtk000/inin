# İNİN — İTÜ Ayazağa Scooter Simülatörü

İTÜ Ayazağa kampüsünde elektrikli scooter kiralayıp iş yaptığın 3D simülasyon oyunu (PWA).

**Oyna:** https://ygtk000.github.io/inin/

**Android APK:** https://ygtk000.github.io/inin/ININ_Kampus.apk

iPhone: Safari'de aç → Paylaş → Ana Ekrana Ekle. İlk açılıştan sonra internetsiz çalışır.

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
