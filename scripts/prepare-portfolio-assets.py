"""Mechanical web encoding only. Originals remain unchanged; CSS crops reviewed external bands."""
from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parent.parent
files={}
for filename in ['portfolio-display.json','related-displays.json']:
    data=json.loads((root/'content'/filename).read_text(encoding='utf-8'))
    entries=data.get('entries',data)
    for slug,entry in entries.items():
        if slug=='pressure-vessel-profile': continue
        for i,src in enumerate([entry['cover']]+[p['src'] for p in entry.get('interiors',[])]):
            files[src]=max(files.get(src,0),1100 if i==0 else 560)
dest=root/'assets/img/portfolio-web'; dest.mkdir(parents=True,exist_ok=True)
metadata={}
for n,(src,maxsize) in enumerate(sorted(files.items())):
    with Image.open(root/src.lstrip('/')) as original:
        im=original.convert('RGB'); w,h=im.size
        im.thumbnail((maxsize,maxsize),Image.Resampling.LANCZOS)
        name=f'page-{n:03d}-v1.webp'
        im.save(dest/name,'WEBP',quality=88,method=6)
        m={'width':w,'height':h,'thumbnail':'/assets/img/portfolio-web/'+name,'thumbWidth':im.width,'thumbHeight':im.height}
        if src in [f'/assets/img/cases/{series}-{i:02d}.jpg' for series,ids in [('259',[1,4,5,6]),('293',[1,2,3,5]),('291',[1,2,3,4])] for i in ids]:
            assert (w,h)==(1280,720)
            m['crop']=[131,0,1018,720]
            m['cropNote']='Reviewed external left/right capture bands only; internal artwork preserved.'
        metadata[src]=m
(root/'content/portfolio-media.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(root.name,len(metadata),'web derivatives prepared; originals unchanged')

