import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){const path=new URL(url).pathname;const file='dist'+path+'index.html';assert(existsSync(file),file+' missing');const html=readFileSync(file,'utf8');assert(html.includes(url),'Canonical missing '+url);assert(/<h1[ >]/i.test(html),'H1 missing '+url);for(const [,src] of html.matchAll(/src="(\/images\/[^"]+)"/g)){assert(existsSync('dist'+src),'Image missing '+src);}}
assert(readFileSync('dist/robots.txt','utf8').includes('https://safarsathi.in/sitemap.xml'));
console.log('Sitemap, public HTML, robots and referenced local images validated');

const errorPage=readFileSync('dist/404.html','utf8');assert(errorPage.includes('noindex,follow'));assert(!sitemap.includes('/404.html'));for(const [,href] of errorPage.matchAll(/href="(\/[^"]*)"/g)){const target=href.endsWith('/')?href+'index.html':href;assert(existsSync('dist'+target),'Broken 404 link '+href);}console.log('Custom 404 page and links validated');

const variantsFile='dist/images/optimized/manifest.json';if(existsSync(variantsFile)){const manifest=JSON.parse(readFileSync(variantsFile,'utf8'));assert(Object.keys(manifest).length>=90,'Missing photo variants');for(const items of Object.values(manifest)){assert(items.length>0);for(const item of items)assert(existsSync('dist'+item.src),'Missing WebP '+item.src);}const home=readFileSync('dist/index.html','utf8');assert(home.includes('imagesrcset='),'Missing responsive hero preload');const gallery=readFileSync('dist/shimla-hotels/index.html','utf8');assert(gallery.includes('srcset=')&&gallery.includes('/images/optimized/'),'Static hotel WebP sources missing');console.log('Responsive WebP variants, hero preload and hotel images validated');}

for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){const html=readFileSync('dist'+new URL(url).pathname+'index.html','utf8');assert(html.includes('src="/measurement.js"'),'Missing measurement script '+url);assert(!html.includes('trackSafarConversion'),'Legacy conversion handler '+url);assert(!html.includes('gtm.js?id=GTM-WFW2KCVS'),'Unreviewed GTM '+url);}
assert(existsSync('dist/measurement.js'));assert(existsSync('dist/privacy/index.html'));console.log('Privacy notice and shared lead measurement validated');
