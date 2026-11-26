#!/usr/bin/env python3
"""OSM (Overpass JSON) + Terrarium DEM -> İNİN harita verisi (L0 şeması)."""
import json, math, base64, re, collections
import numpy as np
from PIL import Image
from shapely.geometry import Polygon, LineString, Point, MultiPolygon
from shapely.ops import unary_union, linemerge

LAT0, LON0, MLAT, MLON = 41.105, 29.024, 111100, 83900
def P(la, lo): return [round((lo - LON0) * MLON, 2), round(-(la - LAT0) * MLAT, 2)]
BOUNDS = dict(minX=-870, maxX=1230, minZ=-725, maxZ=755)
def inb(p, m=0): return BOUNDS['minX'] - m <= p[0] <= BOUNDS['maxX'] + m and BOUNDS['minZ'] - m <= p[1] <= BOUNDS['maxZ'] + m

osm = json.load(open('osm.json'))['elements']
hw = json.load(open('hw.json'))['elements']
rels = json.load(open('rels.json'))['elements']
nodes_el = json.load(open('nodes.json'))['elements']

campus_way = [e for e in osm if e['type'] == 'way' and e['id'] == 549717756][0]
campus = [P(g['lat'], g['lon']) for g in campus_way['geometry']]
if campus[0] == campus[-1]: campus = campus[:-1]
CAMP = Polygon(campus)

def ring(e): return [P(g['lat'], g['lon']) for g in e['geometry'] if g]
def closed(e): return len(e.get('geometry', [])) > 3 and e['geometry'][0] == e['geometry'][-1]
def open_ring(r): return r[:-1] if len(r) > 1 and r[0] == r[-1] else r

# ---------------- YOLLAR ----------------
ROADS = {'motorway', 'motorway_link', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link',
         'tertiary', 'tertiary_link', 'residential', 'unclassified', 'living_street', 'service', 'road', 'busway'}
PATHS = {'footway', 'path', 'cycleway', 'steps', 'pedestrian', 'track', 'bridleway', 'corridor'}
road_ways, path_ways = [], []
for e in hw:
    if e['type'] != 'way': continue
    t = e.get('tags', {})
    h = t.get('highway')
    if t.get('area') == 'yes' or 'area:highway' in t: continue
    if t.get('tunnel') in ('yes', 'building_passage') and h not in PATHS: continue
    if t.get('tunnel') == 'yes': continue
    if t.get('indoor') == 'yes' or h == 'corridor': continue
    pts = ring(e)
    if not any(inb(p, 40) for p in pts): continue
    if h in ROADS: road_ways.append(e)
    elif h in PATHS: path_ways.append(e)

use = collections.Counter()
for e in road_ways:
    for i, n in enumerate(e['nodes']): use[n] += 1
    use[e['nodes'][0]] += 1; use[e['nodes'][-1]] += 1

def lanes_w(t, h):
    if 'width' in t:
        try: return max(3.5, min(16, float(re.sub('[^0-9.]', '', t['width']))))
        except: pass
    base = {'motorway': 11, 'trunk': 11, 'primary': 9.9, 'secondary': 8.5, 'tertiary': 7.5, 'residential': 6.4,
            'unclassified': 6.4, 'living_street': 5.6, 'service': 4.8, 'road': 6, 'busway': 6.5}
    if h.endswith('_link'): return 6
    if 'lanes' in t:
        try: return max(4.8, min(14, float(t['lanes'].split(';')[0]) * 3.3))
        except: pass
    return base.get(h, 6)

def rtype(h):
    if h.split('_')[0] in ('motorway', 'trunk', 'primary', 'secondary', 'tertiary') and not h.endswith('_link'): return 'ana'
    if h == 'service': return 'servis'
    return 'ara'

sep_sidewalks = []  # ayrı çizilmiş kaldırımlar
for e in path_ways:
    t = e['tags']
    if t.get('footway') == 'sidewalk' or t.get('path') == 'sidewalk':
        sep_sidewalks.append(LineString(ring(e)))
SEP = unary_union(sep_sidewalks) if sep_sidewalks else None

nodes_out, roads_out = {}, []
for e in road_ways:
    t = e['tags']; h = t['highway']
    ids = e['nodes']; geo = ring(e)
    W = round(lanes_w(t, h), 2)
    ty = rtype(h)
    oneway = t.get('oneway') in ('yes', '1', 'true') or t.get('junction') == 'roundabout' or h.startswith('motorway')
    surf = 'arnavut' if t.get('surface') in ('sett', 'cobblestone', 'unhewn_cobblestone') else 'tas'
    # parçala: kavşak düğümlerinde
    cut = [0] + [i for i in range(1, len(ids) - 1) if use[ids[i]] > 1] + [len(ids) - 1]
    for a, b in zip(cut, cut[1:]):
        pts = geo[a:b + 1]
        if len(pts) < 2: continue
        if not any(inb(p, 30) for p in pts): continue
        na, nb = str(ids[a]), str(ids[b])
        nodes_out[na] = geo[a]; nodes_out[nb] = geo[b]
        ls = LineString(pts)
        # kaldırım kararı (sol, sağ)
        sw = t.get('sidewalk', t.get('sidewalk:both'))
        swl = t.get('sidewalk:left'); swr = t.get('sidewalk:right')
        L = R = None
        if sw in ('no', 'none', 'separate'): L = R = False
        elif sw == 'both': L = R = True
        elif sw == 'left': L, R = True, False
        elif sw == 'right': L, R = False, True
        if swl: L = swl in ('yes', 'both')
        if swr: R = swr in ('yes', 'both')
        mid = ls.interpolate(0.5, normalized=True)
        in_campus = CAMP.buffer(25).contains(mid)
        default = False
        if h.startswith('motorway') or h.startswith('trunk'): default = False
        elif h in ('primary', 'secondary', 'tertiary', 'residential', 'unclassified', 'living_street'): default = True
        elif h.endswith('_link'): default = False
        elif h == 'service':
            default = in_campus and ls.length > 50 and t.get('service') not in ('parking_aisle', 'driveway', 'drive-through', 'emergency_access')
        if L is None: L = default
        if R is None: R = default
        # ayrı kaldırım varsa o tarafta üretme
        if SEP is not None and (L or R) and ls.length > 4:
            off = W / 2 + 3.0
            for side in ('left', 'right'):
                try: o = ls.parallel_offset(off, side, join_style=2)
                except Exception: continue
                if o.is_empty or o.length < 1: continue
                cov = o.buffer(3.5).intersection(SEP).length / max(1, o.length)
                if cov > 0.45:
                    if side == 'left': L = False
                    else: R = False
        r = {'a': na, 'b': nb, 'pts': pts, 'W': W, 'type': ty, 'name': t.get('name', ''), 'oneway': oneway, 'hw': h, 'surf': surf,
             'sws': [bool(L), bool(R)]}
        roads_out.append(r)

paths_out = []
for e in path_ways:
    t = e['tags']; h = t['highway']
    pts = ring(e)
    if len(pts) < 2: continue
    s = t.get('surface', '')
    if h == 'steps': ty = 'merdiven'
    elif s in ('ground', 'dirt', 'grass', 'gravel', 'fine_gravel', 'unpaved', 'earth', 'mud', 'sand', 'compacted', 'woodchips') or h in ('track', 'bridleway') or (h == 'path' and not s): ty = 'toprak'
    elif s in ('sett', 'cobblestone', 'unhewn_cobblestone'): ty = 'arnavut'
    else: ty = 'tas'
    w = None
    if 'width' in t:
        try: w = max(1.2, min(10, float(re.sub('[^0-9.]', '', t['width']))))
        except: w = None
    if w is None:
        w = {'steps': 2.4, 'cycleway': 2.6, 'path': 2.0, 'track': 3.0, 'pedestrian': 6.0}.get(h, 3.0)
        if t.get('footway') == 'sidewalk': w = 2.4
        if t.get('footway') == 'crossing': w = 3.0
    paths_out.append({'pts': pts, 'w': w, 't': ty, 'name': t.get('name', ''), 'loop': pts[0] == pts[-1],
                      'kind': t.get('footway', '') or h})

# ---------------- ALANLAR ----------------
def assemble(rel):
    """multipolygon üyelerinden halka kur -> [(outer, [inner...])]"""
    outs, ins = [], []
    for role in ('outer', 'inner'):
        segs = [[(g['lat'], g['lon']) for g in m.get('geometry', []) if g] for m in rel['members'] if m['type'] == 'way' and m.get('role', 'outer') in ((role,) if role == 'inner' else ('outer', ''))]
        segs = [s for s in segs if len(s) > 1]
        rings = []
        while segs:
            cur = segs.pop(0)
            changed = True
            while cur[0] != cur[-1] and changed:
                changed = False
                for i, s in enumerate(segs):
                    if s[0] == cur[-1]: cur += s[1:]
                    elif s[-1] == cur[-1]: cur += s[::-1][1:]
                    elif s[-1] == cur[0]: cur = s[:-1] + cur
                    elif s[0] == cur[0]: cur = s[::-1][:-1] + cur
                    else: continue
                    segs.pop(i); changed = True; break
            if len(cur) > 3: rings.append([P(a, b) for a, b in cur])
        (outs if role == 'outer' else ins).extend(rings)
    res = []
    for o in outs:
        po = Polygon(o)
        hs = [i for i in ins if po.contains(Point(i[0]))]
        res.append((open_ring(o), [open_ring(h) for h in hs]))
    return res

areas = []  # (tags, outer, holes)
for e in osm:
    if e['type'] == 'way' and closed(e):
        areas.append((e.get('tags', {}), open_ring(ring(e)), [], e['id']))
for e in osm:
    if e['type'] == 'relation' and e.get('tags', {}).get('type') == 'multipolygon' and 'members' in e:
        for o, hs in assemble(e): areas.append((e['tags'], o, hs, e['id']))
for e in rels:
    if 'members' in e:
        for o, hs in assemble(e): areas.append((e['tags'], o, hs, e['id']))

def cen(poly): c = Polygon(poly).centroid; return [c.x, c.y]
def area_in(poly): return any(inb(p, 0) for p in poly) and inb(cen(poly), 60)

water, forests, grass, pitches, lots, plazas, places, dorm_areas = [], [], [], [], [], [], [], []
for t, o, hs, i in areas:
    if len(o) < 3 or not area_in(o): continue
    try: pg = Polygon(o, hs)
    except Exception: continue
    A = abs(pg.area)
    lu, nat, lei, am = t.get('landuse'), t.get('natural'), t.get('leisure'), t.get('amenity')
    if nat == 'water' or lu in ('reservoir', 'basin') or t.get('water'):
        water.append({'poly': o, 'name': t.get('name', '')})
    elif lu == 'forest' or nat in ('wood', 'scrub'):
        forests.append({'poly': o})
    elif lu in ('grass', 'meadow', 'village_green', 'recreation_ground', 'flowerbed') or lei in ('park', 'garden') or nat in ('grassland', 'heath'):
        grass.append({'poly': o})
    if lei in ('pitch', 'track', 'stadium', 'sports_centre') and 'building' not in t:
        pitches.append({'poly': o, 'kind': lei, 'sport': t.get('sport', ''), 'name': t.get('name', '')})
    if am == 'parking' and t.get('parking', 'surface') in ('surface', '') and 'building' not in t:
        lots.append({'poly': o})
    if (t.get('highway') == 'pedestrian' or 'area:highway' in t or t.get('place') == 'square') and 'building' not in t:
        plazas.append({'poly': o})
    nm = t.get('name')
    if nm and 'building' not in t and t.get('highway') is None:
        c = cen(o)
        places.append({'x': c[0], 'z': c[1], 'name': nm, 'amenity': am or lu or lei or nat or '', 'area': A})
        if re.search('yurt', nm, re.I) and (lu == 'residential' or am == 'dormitory'):
            dorm_areas.append({'name': nm, 'poly': o})
# yaya alanları (hw.json içinde area)
for e in hw:
    t = e.get('tags', {})
    if e['type'] == 'way' and closed(e) and (t.get('area') == 'yes' and t.get('highway') in ('pedestrian', 'footway') or 'area:highway' in t or t.get('place') == 'square'):
        o = open_ring(ring(e))
        if area_in(o): plazas.append({'poly': o})

for e in nodes_el:
    t = e.get('tags', {})
    p = P(e['lat'], e['lon'])
    if not inb(p, -10): continue
    rw = t.get('railway')
    if rw in ('subway_entrance', 'station') or (t.get('public_transport') == 'station' and 'subway' in json.dumps(t)):
        places.append({'x': p[0], 'z': p[1], 'name': t.get('name', 'Metro Girişi'), 'amenity': 'metro', 'railway': rw})
    elif t.get('name') and (t.get('amenity') or t.get('shop') or t.get('tourism') == 'artwork' or t.get('historic')):
        places.append({'x': p[0], 'z': p[1], 'name': t['name'], 'amenity': t.get('amenity') or t.get('shop') or t.get('tourism') or t.get('historic'), 'railway': ''})

# ---------------- BİNALAR ----------------
LM = [  # (regex, lm anahtarı, stil)
    (r'mustafa [iİ]nan', 'kutuphane', 'klinker'),
    (r'abdülhakim sancak', 'cami', 'beyaz'),
    (r'^merkez[iî] derslik a$', 'med', 'perfore'),
    (r'^merkez[iî] derslik b$', 'medb', 'perfore'),
    (r'^merkez[iî] derslik c$', 'medc', 'perfore'),
    (r'süleyman demirel kültür', 'sdkm', 'cam'),
    (r'^[iİ]tü rektörlüğü$', 'rektorluk', 'beyaz'),
    (r'rektörlük ek', 'rektorek', 'beyaz'),
    (r'elektrik-elektronik', 'eef', 'elek'),
    (r'bilgisayar ve bilişim', 'bbf', 'yesil'),
    (r'olimpik yüzme', 'havuz', 'cam'),
    (r'^arı kapı$', 'arikapi', 'beyaz'),
    (r'merkez spor salonu', 'spor', 'beton'),
    (r'^(batı|doğu)$', 'tribun', 'beton'),
    (r'inşaat fakültesi', 'insaat', 'beton'),
    (r'75\. yıl öğrenci sosyal', 'osm', 'cam'),
]
LEVEL_H = 3.5
def bheight(t, kind):
    def num(k):
        try: return float(re.sub('[^0-9.]', '', t[k]))
        except Exception: return None
    h = num('height') if 'height' in t else None
    lv = num('building:levels') if 'building:levels' in t else None
    # OSM'deki bazı 'height' değerleri eğimli arazide en alt kottan ölçülmüş; oyun eğimi zaten ekliyor
    if h and not (lv and h > lv * LEVEL_H + 6): return h
    rl = num('roof:levels') if 'roof:levels' in t else 0
    if lv: return lv * LEVEL_H + (rl or 0) * 2.5 + 1.2
    return {'university': 14, 'school': 11, 'dormitory': 13, 'apartments': 14, 'residential': 12, 'house': 7, 'garage': 3.5, 'garages': 3.5,
            'kiosk': 3.2, 'roof': 4.5, 'guardhouse': 3.6, 'commercial': 12, 'office': 14, 'retail': 5, 'supermarket': 5,
            'civic': 12, 'mosque': 12, 'stadium': 8, 'sports_centre': 12, 'industrial': 9, 'warehouse': 8, 'service': 4,
            'construction': 9, 'container': 3, 'shed': 3, 'hut': 3, 'kindergarten': 7, 'hangar': 9, 'transformer_tower': 4,
            'cabin': 3}.get(kind, 9)

def bstyle(t, kind, name):
    col = (t.get('building:colour') or '').lower()
    mat = (t.get('building:material') or '').lower()
    if 'green' in col or col.startswith('#4') and 'green' in col: return 'yesil'
    if mat in ('brick',): return 'tugla'
    if mat in ('glass',): return 'cam'
    if kind in ('dormitory', 'apartments', 'residential', 'house'): return 'yurt'
    if kind in ('mosque', 'guardhouse', 'kindergarten'): return 'beyaz'
    if kind in ('commercial', 'office'): return 'cam'
    if kind in ('retail', 'supermarket', 'kiosk'): return 'beyaz'
    return 'beton'

builds = []
bpolys = []
for t, o, hs, i in areas:
    if 'building' not in t: continue
    if len(o) < 3 or not inb(cen(o), 0): continue
    kind = t.get('building')
    name = t.get('name', '')
    b = {'poly': o, 'h': round(bheight(t, kind), 1), 'name': name, 'style': bstyle(t, kind, name), 'kind': kind,
         'amen': t.get('amenity', '')}
    if hs: b['holes'] = hs
    lv = t.get('building:levels')
    if lv:
        try: b['lv'] = int(float(lv))
        except: pass
    if t.get('building:colour'): b['col'] = t['building:colour']
    if kind == 'roof': b['roof'] = 1  # kanopi (kapı saçakları)
    nl = name.lower()
    for rx, key, st in LM:
        if re.search(rx, name, re.I):
            b['lm'] = key; b['style'] = st; break
    builds.append(b); bpolys.append(Polygon(o))
BU = unary_union([p.buffer(0) for p in bpolys])
# ebeveyni olmayan building:part
for e in osm:
    t = e.get('tags', {})
    if e['type'] == 'way' and 'building:part' in t and closed(e):
        o = open_ring(ring(e))
        if not inb(cen(o), 0): continue
        pg = Polygon(o).buffer(0)
        if pg.area < 4: continue
        if BU.intersection(pg).area / pg.area > 0.5: continue
        kind = t.get('building:part')
        b = {'poly': o, 'h': round(bheight(t, kind), 1), 'name': t.get('name', '') if len(t.get('name', '')) > 3 else '', 'style': 'beton', 'kind': 'university' if kind in ('yes', 'university') else kind, 'amen': ''}
        builds.append(b)

# ---- kanopiler, geçitler ve bina içinden geçen yolları düzelt ----
road_lines = [LineString(r['pts']) for r in roads_out]
path_lines = [LineString(p['pts']) for p in paths_out if len(p['pts']) > 1]
def cross_len(pg, lines):
    return sum(l.intersection(pg).length for l in lines if l.intersects(pg))
keep = []
for b in builds:
    pg = Polygon(b['poly']).buffer(0)
    k = b['kind']
    rl = cross_len(pg, road_lines); pl = cross_len(pg, path_lines)
    if k == 'construction' and rl > 3: continue
    if k in ('roof', 'bridge', 'train_station', 'carport', 'canopy') or (k == 'guardhouse' and rl + pl > 3) or b.get('lm') == 'arikapi':
        b['roof'] = 1
        b['minH'] = 8.8 if b.get('lm') == 'arikapi' else (7.5 if k in ('train_station', 'bridge') else 3.8)
        if b.get('lm') == 'arikapi': b['h'] = 10.5
        b['h'] = max(b['h'], b['minH'] + 0.7)
    keep.append(b)
builds = keep
# Arı Kapı sütunları ve kulübesi (OSM building:part)
for e in osm:
    t = e.get('tags', {})
    if e['type'] == 'way' and t.get('building:part') in ('column', 'guardhouse') and closed(e):
        o = open_ring(ring(e))
        if inb(cen(o), 0):
            builds.append({'poly': o, 'h': round(bheight(t, 'kiosk'), 1), 'name': '', 'style': 'beyaz', 'kind': t['building:part'], 'amen': ''})
# yaya yollarının bina içinden geçen kısımlarını kes (rota bina içinden geçmesin)
solid = unary_union([Polygon(b['poly']).buffer(-0.8) for b in builds if not b.get('roof') and Polygon(b['poly']).is_valid])
np_ = []
for p in paths_out:
    ls = LineString(p['pts'])
    if not ls.intersects(solid): np_.append(p); continue
    diff = ls.difference(solid)
    parts = [diff] if diff.geom_type == 'LineString' else list(getattr(diff, 'geoms', []))
    for g in parts:
        if g.length < 2: continue
        q = dict(p); q['pts'] = [[round(x, 2), round(y, 2)] for x, y in g.coords]; q['loop'] = False
        np_.append(q)
paths_out = np_

print('roads', len(roads_out), 'paths', len(paths_out), 'buildings', len(builds), 'water', len(water), 'forests', len(forests), 'grass', len(grass),
      'pitches', len(pitches), 'lots', len(lots), 'plazas', len(plazas), 'places', len(places), 'dorm', [d['name'] for d in dorm_areas])
print('sidewalk sides:', sum(r['sws'][0] for r in roads_out) + sum(r['sws'][1] for r in roads_out), 'of', 2 * len(roads_out))
print('landmarks:', collections.Counter(b.get('lm') for b in builds if b.get('lm')))

# ---------------- YÜKSELTİ ----------------
Z = 15
def tile(lat, lon):
    n = 2 ** Z; x = (lon + 180) / 360 * n; y = (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n; return x, y
cache = {}
def tile_arr(X, Y):
    k = (X, Y)
    if k not in cache:
        a = np.asarray(Image.open(f'dem/{Z}_{X}_{Y}.png').convert('RGB')).astype(np.float64)
        cache[k] = a[:, :, 0] * 256 + a[:, :, 1] + a[:, :, 2] / 256 - 32768
    return cache[k]
def elev(lat, lon):
    x, y = tile(lat, lon)
    fx, fy = x * 256 - 0.5, y * 256 - 0.5
    x0, y0 = int(math.floor(fx)), int(math.floor(fy)); tx, ty = fx - x0, fy - y0
    def px(ix, iy): return tile_arr(ix // 256, iy // 256)[iy % 256, ix % 256]
    return (px(x0, y0) * (1 - tx) + px(x0 + 1, y0) * tx) * (1 - ty) + (px(x0, y0 + 1) * (1 - tx) + px(x0 + 1, y0 + 1) * tx) * ty
STEP = 10
x0, z0 = BOUNDS['minX'] - 40, BOUNDS['minZ'] - 40
nx = int((BOUNDS['maxX'] + 40 - x0) / STEP) + 1
nz = int((BOUNDS['maxZ'] + 40 - z0) / STEP) + 1
G = np.zeros((nz, nx))
for j in range(nz):
    for i in range(nx):
        x, z = x0 + i * STEP, z0 + j * STEP
        lat = LAT0 - z / MLAT; lon = LON0 + x / MLON
        G[j, i] = elev(lat, lon)
# hafif yumuşatma (DSM gürültüsü)
k = np.array([1, 4, 6, 4, 1], float); k /= k.sum()
Gp = np.pad(G, 2, mode='edge')
Gs = np.apply_along_axis(lambda r: np.convolve(r, k, 'valid'), 1, Gp)
Gs = np.apply_along_axis(lambda c: np.convolve(c, k, 'valid'), 0, Gs)
print('dem', nx, nz, 'min', G.min(), 'max', G.max())
q = np.clip(np.round(Gs * 10), 0, 65535).astype('<u2')
dem = {'x0': x0, 'z0': z0, 'step': STEP, 'nx': nx, 'nz': nz, 'b64': base64.b64encode(q.tobytes()).decode()}

out = {'src': 'osm', 'bounds': BOUNDS, 'ref': {'lat0': LAT0, 'lon0': LON0, 'mLat': MLAT, 'mLon': MLON},
       'nodes': nodes_out, 'roads': roads_out, 'paths': paths_out, 'buildings': builds, 'water': water, 'forests': forests,
       'grass': grass, 'pitches': pitches, 'lots': lots, 'plazas': plazas, 'places': places, 'campus': campus,
       'dormAreas': dorm_areas, 'dem': dem, 'osmDate': '2026-11-26'}
def rnd(o):
    if isinstance(o, float): return round(o, 2)
    if isinstance(o, list): return [rnd(v) for v in o]
    if isinstance(o, dict): return {k: rnd(v) for k, v in o.items()}
    return o
json.dump(rnd(out), open('L0_new.json', 'w'), ensure_ascii=False, separators=(',', ':'))
import os; print('size', os.path.getsize('L0_new.json'))
