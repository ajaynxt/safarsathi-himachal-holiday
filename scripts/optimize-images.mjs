import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images');
const skip = new Set(['logo.png']);
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(png|jpe?g)$/i.test(entry.name) && !skip.has(entry.name.toLowerCase())) {
      const output = file.replace(/\.(png|jpe?g)$/i, '.webp');
      await sharp(file)
        .rotate()
        .resize({ width: 1800, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(output);
    }
  }
}
await walk(root);
console.log('Optimized local travel photos to WebP.');
