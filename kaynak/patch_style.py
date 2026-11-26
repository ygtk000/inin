# İNİN v1.3: tatlı çizim tarzı: toon ışık, belirgin hatlar, canlı renkler, yeni karakter
from patch_common import P
p = P('/home/claude/work/app.mod.js')

# S1: toon (cel) gölgelendirme: Lambert ışığı yumuşak 3 kademeye bölünür
p.rep('''const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;''',
      '''const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	dotNL = smoothstep( 0.0, 0.1, dotNL ) * 0.55 + smoothstep( 0.42, 0.52, dotNL ) * 0.45;
	vec3 irradiance = dotNL * directLight.color;''')

# S2: canlı renkler için nötr ton eşleme
p.rep('''      (a.toneMapping = B2),
      (a.toneMappingExposure = 1.25),''', '''      (a.toneMapping = Dh),
      (a.toneMappingExposure = 1.12),''')

# S3: daha canlı zemin paleti
p.rep('''(s.fillStyle = "#5f8a3a"), s.fillRect(Me.minX, Me.minZ, Ct, It));''', '''(s.fillStyle = "#6fa845"), s.fillRect(Me.minX, Me.minZ, Ct, It));''')
p.rep('''    ((s.fillStyle = "rgba(120,170,70,0.55)"),''', '''    ((s.fillStyle = "rgba(150,210,95,0.6)"),''')
p.rep('''      (s.fillStyle = "#3e5f2a"),
      o.forests.forEach((l) => {''', '''      (s.fillStyle = "#4f8f3c"),
      o.forests.forEach((l) => {''')

# S4: hat (outline) sistemi: ters kabuk
p.rep('''  var yn = (n, e = {}) => new lt({ color: n, ...e }),''', '''  var OUTM = null,
    OUTLIST = [];
  function outMat() {
    return (
      OUTM ||
        ((OUTM = new qt({ color: 1586988, side: dn })),
        (OUTM.onBeforeCompile = (sh) => {
          sh.vertexShader = sh.vertexShader.replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
 transformed += normalize( normal ) * 0.03;`,
          );
        })),
      OUTM
    );
  }
  function OUTL(obj) {
    if (!obj) return;
    let L2 = [];
    obj.traverse((m) => {
      m.isMesh && !m.userData.isOut && m.geometry.attributes.normal && L2.push(m);
    });
    for (let m of L2) {
      let o = new Ie(m.geometry, outMat());
      ((o.userData.isOut = 1), (o.castShadow = !1), (o.receiveShadow = !1), m.add(o), OUTLIST.push(o));
    }
  }
  function OUTI(im) {
    if (!im || !im.parent || !im.geometry.attributes.normal) return;
    let o = new ui(im.geometry, outMat(), im.instanceMatrix.count);
    ((o.instanceMatrix = im.instanceMatrix), (o.count = im.count), (o.frustumCulled = im.frustumCulled), (o.castShadow = !1), (o.userData.src = im), im.parent.add(o), OUTLIST.push(o));
  }
  function OUTSYNC() {
    let on = !S.save || S.save.opt.outline !== !1;
    for (let o of OUTLIST) {
      let s = o.userData.src;
      s ? ((o.count = s.count), (o.visible = on && s.visible)) : (o.visible = on);
    }
    ut.edges && (ut.edges.visible = on);
  }
  var yn = (n, e = {}) => new lt({ color: n, ...e }),''')

# S5: yeni, sevimli oyuncu karakteri (iri kafa, gözler, kapşonlu)
p.rep('''  function i4(n = 3108784, e = 2830138, t = 14264190, i = 2759956, s = !1) {
    let a = new Tn(),''', '''  function i4(n = 3108784, e = 2830138, t = 14264190, i = 2759956, s = !1, cute = !1) {
    if (cute) return CUTE(n, e, t, i);
    let a = new Tn(),''')
CUTE = open('/home/claude/work/cute.js', encoding='utf-8').read()
p.rep('''  function p3(n, e, t) {''', CUTE + '''
  function p3(n, e, t) {''')
p.rep('''    ((x.person = i4(2764602, 1909811, 14725258, 2759956, !1)),''',
      '''    ((x.person = i4(1688534, 2834005, 15911845, 3877408, !1, !0)),''')
# yürürken kafa sallansın, gözler kırpsın
p.rep('''      (i.hip.position.y = 0.92 + Math.abs(Math.cos(e)) * 0.04 * t),''', '''      (i.hip.position.y = 0.92 + Math.abs(Math.cos(e)) * 0.04 * t),
      i.neck && (i.neck.rotation.z = Math.sin(e) * 0.06 * t),
      i.eyes && (i.eyes.scale.y = performance.now() % 3200 < 120 ? 0.15 : 1),''')

# S6: hatları ekle (oyuncu, scooterlar, araçlar, yayalar, ağaçlar)
p.rep('''      g4(r, c),
      Za(0.85, "Aray\\xFCz"),''', '''      g4(r, c),
      OUTL(x.person),
      OUTL(x.smesh),
      OUTL(x.ownMesh),
      di.forEach((d) => OUTL(d.mesh)),
      v3.forEach(OUTI),
      [Ga, Va, Es, Dr].forEach(OUTI),
      ut.chunks.slice().forEach(OUTI),
      (S.applyOutline = OUTSYNC),
      Za(0.85, "Aray\\xFCz"),''')
p.rep('''      let ze = tn(x.x, x.z);
      (W4(''', '''      OUTSYNC();
      let ze = tn(x.x, x.z);
      (W4(''')
p.save()
