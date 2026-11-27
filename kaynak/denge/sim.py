import math, sys, json
# ---- parametreler ----
P = dict(
 D={'rahat':1.0,'normal':1.5,'gercek':2.0}, Dxp={'rahat':1.0,'normal':1.35,'gercek':1.7},
 jobPay=140, jobMin=2.6, jobXP=30, streak=1.35, event=1.06, jobShare=0.75,
 bizEff=0.75, fleetBase=50, fleetDem=0.75,
 xpA=60, xpB=28, xpE=1.25,
 bizPriceMul=1.0, bizIncMul=1.0, upc=[0.5,0.9,1.5,2.4], lvm=[1,1.5,2.1,2.8,3.6], mgrC=0.4,
 fleetSP=1200, fleetInc=20, permit={'m':3500,'f':2000,'d':2400,'t':3000}, station=3000,
 staff=6000, license=2500, garage=23000, shop=17500, radar=800,
 collectXP=50, offlineGH=16, offlineRate=0.5,
)
BC = {'otomat':(1200,45,2),'kucuk':(3000,125,3),'kafe':(4500,185,4),'berber':(3500,130,4),'kirtasiye':(4000,150,5),'kafeterya':(5500,220,5),'restoran':(7000,280,6),'zincir':(9000,360,7),'cowork':(5000,170,7),'magaza':(8000,260,8),'yikama':(6500,230,8),'market':(15000,520,10)}
CNT = {'otomat':2,'kucuk':9,'kafe':7,'zincir':4,'restoran':7,'kafeterya':4,'market':3,'magaza':2,'kirtasiye':3,'berber':1,'yikama':1,'cowork':1}
ZT = ['m','f','f','f','f','f','f','d','f','d','t','d','d']
def Ur(n,p): return round(p['xpA'] + p['xpB']*(n-1)**p['xpE'])
def run(diff='rahat', hours=1.5, days=7, p=P, verbose=False, unlockFleet=9):
    biz=[]  # [cat, lv, mgr]
    for c,k in CNT.items():
        for i in range(k): biz.append([c,0,0])
    zones=[[0,0,0] for _ in ZT]  # permit, n, station
    money=150; xp=0; lvl=1; t=0; lic=0; staff=0; garage=0; shop=0; nfleet=0
    events={}
    D=p['D'][diff]; Dx=p['Dxp'][diff]; PD=p.get('PD',{}).get(diff,1)
    def ti(l):
        T=[1,2,3,4,5,6,7,8,9,11,13,15,18,21,24,27,30,34]; return max(i for i,q in enumerate(T) if l>=q)
    def addxp(a):
        nonlocal xp,lvl
        xp+=a
        while xp>=Ur(lvl,p): xp-=Ur(lvl,p); lvl+=1; 
        if lvl>=34 and 'rektor' not in events: events['rektor']=t
    def bizInc(b):
        c=BC[b[0]]; return c[1]*p['bizIncMul']*p['lvm'][b[1]-1]*p['bizEff']*(0.88 if b[2] else 0.85) if b[1] else 0
    def fleetInc():
        s=0
        for z in zones:
            if z[1]: s+=p['fleetBase']*z[1]**0.9*p['fleetDem']*0.95*(1.25 if staff else 1)
        return s
    def options():
        o=[]
        for b in biz:
            c=BC[b[0]]; base=c[0]*p['bizPriceMul']
            if b[1]==0 and lvl>=c[2]: o.append((base/(c[1]*p['bizIncMul']*0.64),base,('buy',b)))
            elif 0<b[1]<5: cost=base*p['upc'][b[1]-1]; gain=c[1]*p['bizIncMul']*(p['lvm'][b[1]]-p['lvm'][b[1]-1])*0.64; o.append((cost/gain,cost,('up',b)))
            if b[1]>=2 and not b[2]: cost=base*p['mgrC']; o.append((cost/(c[1]*p['lvm'][b[1]-1]*0.3),cost,('mgr',b)))
        if lvl>=unlockFleet:
            if not lic: o.append((30,p['license'],('lic',None)))
            else:
                for i,z in enumerate(zones):
                    if not z[0]: o.append(((p['permit'][ZT[i]]+p['fleetSP']*3)/(p['fleetBase']*3**0.9*0.71),p['permit'][ZT[i]],('permit',z)))
                    elif z[1]<8:
                        cost=p['fleetSP']+p['fleetInc']*nfleet; g=p['fleetBase']*((z[1]+1)**0.9-z[1]**0.9)*0.71; o.append((cost/g,cost,('sc',z)))
                    if z[0] and not z[2]: o.append((200,p['station'],('st',z)))
                if not staff: o.append((60,p['staff'],('staff',None)))
        if lvl>=8 and not shop: o.append((80,p['shop'],('shop',None)))
        if not garage and lvl>=10: o.append((150,p['garage'],('gar',None)))
        o.sort(key=lambda q:q[0]); return o
    minute=0; dayLog=[]
    for d in range(days):
        if d>0:  # çevrimdışı
            off=sum(bizInc(b)/0.88*0.6/0.75*0.88 for b in biz if b[2])+fleetInc()
            money+=off*p['offlineGH']*p['offlineRate']*PD
        for m in range(int(hours*60)):
            t+=1/60
            gh=0.15
            # aktif işler
            jp=p['jobPay']*D*(1+0.02*ti(lvl))*p['streak']*p['event']
            money+=jp*p['jobShare']/p['jobMin']
            addxp(p['jobXP']*Dx*(1+0.01*ti(lvl))*p['jobShare']/p['jobMin'])
            # günlük görevler, keşif vb.
            addxp(25*4/127 + (20 if t<3 else 6)/60*15/15)
            money+=(80*(1+0.08*(lvl-1)))*4/127
            # pasif
            inc=sum(bizInc(b) for b in biz)*gh*PD; money+=inc
            addxp(sum(bizInc(b) for b in biz if not b[2])*gh/p['collectXP'])
            money+=fleetInc()*gh*PD
            # yatırım
            if m%p.get('every',1): continue
            for _ in range(20):
                o=options()
                if not o: break
                pb,cost,(k,ref)=o[0]
                if money<cost: break
                money-=cost
                addxp(cost/p.get('invXP',1e9))
                if k=='buy': ref[1]=1; addxp(20+cost/120)
                elif k=='up': ref[1]+=1; addxp(10+cost/150)
                elif k=='mgr': ref[2]=1
                elif k=='lic': lic=1; addxp(60)
                elif k=='permit': ref[0]=1
                elif k=='sc': ref[1]+=1; nfleet+=1; addxp(15)
                elif k=='st': ref[2]=1
                elif k=='staff': staff=1
                elif k=='shop': shop=1
                elif k=='gar': garage=1
            done=dict(allBiz=all(b[1]>=1 for b in biz), maxBiz=all(b[1]==5 and b[2] for b in biz), fleet=nfleet>=104 and all(z[2] for z in zones) and staff, gar=garage and shop, lvl=lvl>=34)
            for k,v in done.items():
                if v and k not in events: events[k]=round(t,2)
        dayLog.append((d+1,round(t,1),lvl,round(money),sum(1 for b in biz if b[1]),sum(b[1] for b in biz),nfleet,round(sum(bizInc(b) for b in biz)/0.15/60*0+sum(bizInc(b) for b in biz)), round(fleetInc())))
    return events, dayLog
if __name__=='__main__':
    for diff in ['rahat','normal','gercek']:
        for h in [1,1.5,2]:
            ev,log=run(diff,h)
            print(diff,h,ev)
    ev,log=run('rahat',1.5)
    for l in log: print(l)
