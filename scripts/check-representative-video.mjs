import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
for(const path of ['dist/index.html','dist/about/index.html']) {
 const html=await readFile(path,'utf8');
 assert.equal((html.match(/youtube-nocookie.com\/embed\/DuzUu4Pd5dg/g)||[]).length,1,path+': video once');
 assert(html.includes('https://www.youtube.com/watch?v=DuzUu4Pd5dg'),path+': direct watch link');
 const frame=html.match(/<iframe[^>]*DuzUu4Pd5dg[^>]*>/)?.[0];
 assert(frame?.includes('allowfullscreen')&&frame.includes('title=')&&frame.includes('loading="lazy"'),path+': accessible iframe');
 assert(!frame.includes('autoplay'),path+': no autoplay');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,path+': unique IDs');
}
console.log('PASS: representative video v5 / main and about / no autoplay / direct links');
