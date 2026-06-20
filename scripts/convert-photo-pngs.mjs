/**
 * Convert large photo PNGs (no alpha) to JPEG and update source references.
 * Usage: node scripts/convert-photo-pngs.mjs
 */
import sharp from 'sharp'
import { readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises'
import { join, extname, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const SEARCH_DIRS = [join(ROOT, 'app'), join(ROOT, 'nuxt.config.ts')]
const IMAGE_ROOTS = [join(ROOT, 'public'), join(ROOT, 'app', 'assets')]
const MIN_BYTES = 100_000

/** @param {string} dir */
async function walkPng(dir) {
  /** @type {string[]} */
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walkPng(full)))
    else if (extname(entry.name).toLowerCase() === '.png') files.push(full)
  }
  return files
}

/** @param {string} dir */
async function walkSourceFiles(dir) {
  /** @type {string[]} */
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walkSourceFiles(full)))
    else if (/\.(vue|ts|js|json)$/.test(entry.name)) files.push(full)
  }
  return files
}

/** @param {string} pngPath */
async function convertPngToJpg(pngPath) {
  const size = (await stat(pngPath)).size
  if (size < MIN_BYTES) return null

  const meta = await sharp(pngPath).metadata()
  if (meta.hasAlpha) return null

  const jpgPath = pngPath.replace(/\.png$/i, '.jpg')
  const rel = relative(ROOT, pngPath)

  let rule = { max: 1536, quality: 85 }
  if (rel.includes('/images/thaifex/') || rel.includes('/images/foodex-japan/')) {
    rule = { max: 1400, quality: 85 }
  } else if (rel.includes('home-hero-mobile')) {
    rule = { max: 1080, quality: 85 }
  } else if (rel.includes('cfi-facility')) {
    rule = { max: 1920, quality: 85 }
  } else if (rel.includes('home-hero.png')) {
    rule = { max: 1920, quality: 85 }
  }

  const needsResize =
    (meta.width ?? 0) > rule.max || (meta.height ?? 0) > rule.max

  let pipeline = sharp(pngPath).rotate()
  if (needsResize) {
    pipeline = pipeline.resize({
      width: (meta.width ?? 0) >= (meta.height ?? 0) ? rule.max : undefined,
      height: (meta.height ?? 0) > (meta.width ?? 0) ? rule.max : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  await pipeline.jpeg({ quality: rule.quality, mozjpeg: true }).toFile(jpgPath)
  const after = (await stat(jpgPath)).size
  await unlink(pngPath)

  return { pngPath, jpgPath, rel, before: size, after }
}

async function updateReferences(conversions) {
  const sourceFiles = [
  ...(await walkSourceFiles(join(ROOT, 'app'))),
  join(ROOT, 'nuxt.config.ts'),
  ]

  for (const file of sourceFiles) {
    let content = await readFile(file, 'utf8')
    let changed = false

    for (const { pngPath, jpgPath } of conversions) {
      const relPng = relative(ROOT, pngPath).replaceAll('\\', '/')
      const relJpg = relative(ROOT, jpgPath).replaceAll('\\', '/')
      const pngName = relPng.split('/').pop() ?? ''
      const jpgName = relJpg.split('/').pop() ?? ''

      const replacements = [
        [relPng, relJpg],
        [`/${relPng.replace(/^public\//, '')}`, `/${relJpg.replace(/^public\//, '')}`],
        [pngName, jpgName],
        [pngName.replace(/ /g, '%20'), jpgName.replace(/ /g, '%20')],
      ]

      for (const [from, to] of replacements) {
        if (content.includes(from)) {
          content = content.split(from).join(to)
          changed = true
        }
      }
    }

    if (changed) {
      await writeFile(file, content, 'utf8')
      console.log(`  updated: ${relative(ROOT, file)}`)
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function main() {
  /** @type {string[]} */
  const pngFiles = []
  for (const dir of IMAGE_ROOTS) pngFiles.push(...(await walkPng(dir)))

  /** @type {Awaited<ReturnType<typeof convertPngToJpg>>[]} */
  const conversions = []

  for (const file of pngFiles) {
    try {
      const result = await convertPngToJpg(file)
      if (result) {
        conversions.push(result)
        const pct = (((result.before - result.after) / result.before) * 100).toFixed(0)
        console.log(
          `✓ ${result.rel}: ${formatBytes(result.before)} → ${formatBytes(result.after)} (-${pct}%) [png→jpg]`,
        )
      }
    } catch (err) {
      console.error(`✗ ${relative(ROOT, file)}: ${err instanceof Error ? err.message : err}`)
    }
  }

  if (conversions.length === 0) {
    console.log('No PNG photos converted.')
    return
  }

  console.log(`\nUpdating ${conversions.length} file references...`)
  await updateReferences(conversions)

  const saved = conversions.reduce((sum, c) => sum + (c.before - c.after), 0)
  console.log(`\nConverted: ${conversions.length} files`)
  console.log(`Saved:     ${formatBytes(saved)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
