import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){const path=new URL(url).pathname;const file='dist'+path+'index.html';assert(existsSync(file),file+' missing');const html=readFileSync(file,'utf8');assert(html.includes(url),'Canonical missing '+url);assert(/<h1[ >]/i.test(html),'H1 missing '+url);for(const [,src] of html.matchAll(/src="(\/images\/[^"]+)"/g)){assert(existsSync('dist'+src),'Image missing '+src);}}
assert(readFileSync('dist/robots.txt','utf8').includes('https://safarsathi.in/sitemap.xml'));
console.log('Sitemap, public HTML, robots and referenced local images validated');

const errorPage=readFileSync('dist/404.html','utf8');assert(errorPage.includes('noindex,follow'));assert(!sitemap.includes('/404.html'));for(const [,href] of errorPage.matchAll(/href="(\/[^"]*)"/g)){const target=href.endsWith('/')?href+'index.html':href;assert(existsSync('dist'+target),'Broken 404 link '+href);}console.log('Custom 404 page and links validated');
