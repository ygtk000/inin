import sys
class P:
    def __init__(s, f): s.f=f; s.src=open(f,encoding='utf-8').read()
    def rep(s, old, new, cnt=1):
        n=s.src.count(old)
        if n!=cnt: print('BULUNAMADI/ÇOKLU (%d):'%n, old[:160]); sys.exit(1)
        s.src=s.src.replace(old,new)
    def save(s): open(s.f,'w',encoding='utf-8').write(s.src); print('ok',s.f,len(s.src))
