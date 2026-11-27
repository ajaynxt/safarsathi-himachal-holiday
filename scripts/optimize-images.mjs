import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve('public/images');
const optimized=path.join(root,'optimized');
const manifest={};let originalBytes=0, optimizedBytes=0;
async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){if(file!==optimized)await walk(file);continue;}if(!/\.(png|jpe?g|webp)$/i.test(entry.name))continue;
const rel=path.relative(root,file).split(path.sep).join('/');const variants=[];const widths=rel==='logo.png'?[160,320,640]:[320,640,960,1440];const inputSize=(await fs.stat(file)).size;originalBytes+=inputSize;
for(const width of widths){const relative='images/optimized/'+rel+'-'+width+'.webp';const output=path.join('public',relative);await fs.mkdir(path.dirname(output),{recursive:true});const info=await sharp(file).rotate().resize({width,withoutEnlargement:true}).webp({quality:rel==='logo.png'?85:76,effort:4}).toFile(output);if(variants.some(v=>v.width===info.width)){await fs.unlink(output);break;}variants.push({src:'/'+relative,width:info.width});optimizedBytes+=info.size;if(info.width<width)break;}
manifest['images/'+rel]=variants;}}
await fs.rm(optimized,{recursive:true,force:true});await walk(root);await fs.writeFile(path.join(optimized,'manifest.json'),JSON.stringify(manifest));await fs.writeFile('src/data/imageVariants.ts','export const imageVariants: Record<string, {src: string; width: number}[]> = '+JSON.stringify(manifest)+';\n');console.log('Generated responsive WebP variants for '+Object.keys(manifest).length+' images. Original bytes: '+originalBytes+'; all variant bytes: '+optimizedBytes);
