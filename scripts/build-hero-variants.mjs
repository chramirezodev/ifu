import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'docs/ajustes_V3/Miami_Skyline_Atardecer_4K_3840x2160_FINAL.jpg'
const OUT_DIR = 'public/images/hero'
const WIDTHS = [3840, 2560, 1920, 1280]

fs.mkdirSync(OUT_DIR, { recursive: true })

for (const w of WIDTHS) {
  const out = path.join(OUT_DIR, `miami-skyline-atardecer-${w}.jpg`)
  await sharp(SRC)
    .resize({ width: w, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(out)
  const m = await sharp(out).metadata()
  console.log(out, `${m.width}x${m.height}`, `${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
}
