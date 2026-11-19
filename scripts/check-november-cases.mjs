import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const display=JSON.parse(await readFile('content/portfolio-display.json','utf8')).entries;
const list=await readFile('dist/portfolio/index.html','utf8');
const expected=[['kolink-company-profile',4],['harnex-company-profile',8]];
for(const [slug,count] of expected){
 const c=JSON.parse(await readFile('content/cases/'+slug+'.json','utf8'));
 const html=await readFile('dist/portfolio/'+slug+'/index.html','utf8');
 assert.equal(c.images.length,count);
 assert.equal(display[slug].interiors.length,3);
 assert.equal((html.match(/class="pilot-zoom"/g)||[]).length,count);
 assert(list.includes('/portfolio/'+slug+'/'));
 assert(!html.includes('선별 0'));
 assert(!html.includes('완성 디자인 목업입니다.'));
 for(const img of c.images){
  assert(html.includes(img.src));
  assert((await readFile('dist'+img.src)).length>1000);
 }
 assert(!/\.pptx|\.psd|\.pdf|고객 전달 메일|Gmail 메시지 ID/.test(html));
}
const h=display['harnex-company-profile'].interiors.map(x=>x.src);
assert(h[0].includes('02-vision')&&h[1].includes('04-products')&&h[2].includes('07-quality'));
assert(list.indexOf('data-art-case="kolink-company-profile"')<list.indexOf('data-art-case="harnex-company-profile"'));
console.log('PASS: approved 2 cases, 12 real pages, 3 interiors per card, no private source downloads.');
