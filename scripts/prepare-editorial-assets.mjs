import fs from 'node:fs/promises';
import sharp from 'sharp';
const assets = JSON.parse(await fs.readFile(new URL('../qa/asset-prompts-v3.json', import.meta.url), 'utf8'));
for (const asset of assets) {
  await sharp(asset.source).resize({ width: 1680, withoutEnlargement: true }).webp({ quality: 85 }).toFile(asset.output);
  console.log(asset.output);
}
