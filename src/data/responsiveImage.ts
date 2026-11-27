import { imageVariants } from './imageVariants';
export function responsiveImage(original: string, sizes: string, preferred = 640) {
  const key = original.replace(/^\.\//, '').replace(/^\//, '');
  const variants = imageVariants[key];
  if (!variants?.length) return { src: original };
  const chosen = variants.find(v => v.width >= preferred) || variants[variants.length - 1];
  return {src: chosen.src, srcSet: variants.map(v => v.src + ' ' + v.width + 'w').join(', '), sizes};
}
