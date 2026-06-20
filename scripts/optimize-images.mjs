/**
 * Batch-optimize site images in-place (same paths & formats — no code changes).
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import { join, extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const TARGET_DIRS = [join(ROOT, 'public'), join(ROOT, 'app', 'assets')]
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

/** @param {string} relPath */
function getRule(relPath) {
  const p = relPath.replaceAll('\\', '/')

  if (p.includes('/brans/') || p.startsWith('brans/')) {
    return { max: 320, quality: 82 }
  }
  if (p.includes('/images/team/')) {
    return { max: 560, quality: 85 }
  }
  if (p.includes('/assets/logo/') || p.endsWith('/logo/logo-2-10-10-63.png')) {
    return { max: 400, quality: 90 }
  }
  if (p.includes('logo-Exhibitions')) {
    return { max: 480, quality: 85 }
  }
  if (p.endsWith('favicon.png')) {
    return { max: 512, quality: 90, skipIfUnderBytes: 50_000 }
  }
  if (p.includes('home-hero') || p.includes('cfi-facility')) {
    return { max: 1920, quality: 85 }
  }
  if (p.includes('/assets/mobile/')) {
    return { max: 800, quality: 82 }
  }
  if (p.includes('/assets/Sardines-Mackerel/')) {
    return { max: 1200, quality: 82 }
  }
  if (p.includes('/assets/profile/')) {
    return { max: 1000, quality: 82 }
  }
  if (p.includes('ChatGPT')) {
    return { max: 1536, quality: 82 }
  }
  if (/\/images\/(gulfood|saudi|turkey|thai|thaifex|foodex-japan)\//.test(p)) {
    return { max: 1400, quality: 85 }
  }
  if (/\/assets\/(home|tuna)\/.*\.(jpe?g)$/i.test(p)) {
    return { max: 900, quality: 82 }
  }
  if (/\/public\/[^/]+\.(jpe?g)$/i.test(p)) {
    return { max: 1920, quality: 82 }
  }
  if (/\.(jpe?g)$/i.test(p)) {
    return { max: 1920, quality: 82 }
  }
  if (/\.png$/i.test(p)) {
    return { max: 1920, quality: 82 }
  }
  if (/\.webp$/i.test(p)) {
    return { max: 480, quality: 85 }
  }

  return { max: 1920, quality: 82 }
}

/** @param {string} dir */
async function walk(dir) {
  /** @type {string[]} */
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

/**
 * @param {string} filePath
 * @param {string} baseDir
 */
async function optimizeFile(filePath, baseDir) {
  const rel = relative(ROOT, filePath)
  const ext = extname(filePath).toLowerCase()
  const rule = getRule(rel)
  const before = (await stat(filePath)).size

  if (rule.skipIfUnderBytes && before < rule.skipIfUnderBytes) {
    return { rel, before, after: before, skipped: true, reason: 'already small' }
  }

  const meta = await sharp(filePath).metadata()
  const needsResize =
    (meta.width ?? 0) > rule.max || (meta.height ?? 0) > rule.max

  let pipeline = sharp(filePath).rotate()

  if (needsResize) {
    pipeline = pipeline.resize({
      width: (meta.width ?? 0) >= (meta.height ?? 0) ? rule.max : undefined,
      height: (meta.height ?? 0) > (meta.width ?? 0) ? rule.max : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  const tmp = `${filePath}.opt.tmp`

  if (ext === '.png') {
    await pipeline
      .png({
        compressionLevel: 9,
        effort: 10,
        palette: false,
      })
      .toFile(tmp)
  } else if (ext === '.webp') {
    await pipeline.webp({ quality: rule.quality ?? 82, effort: 6 }).toFile(tmp)
  } else {
    await pipeline
      .jpeg({
        quality: rule.quality ?? 82,
        mozjpeg: true,
        chromaSubsampling: '4:2:0',
      })
      .toFile(tmp)
  }

  const after = (await stat(tmp)).size

  if (after < before || needsResize) {
    await rename(tmp, filePath)
    return { rel, before, after, resized: needsResize }
  }

  await unlink(tmp)
  return { rel, before, after: before, skipped: true, reason: 'no gain' }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function main() {
  /** @type {string[]} */
  const allFiles = []
  for (const dir of TARGET_DIRS) {
    allFiles.push(...(await walk(dir)))
  }

  console.log(`Optimizing ${allFiles.length} images...\n`)

  let totalBefore = 0
  let totalAfter = 0
  /** @type {Array<{rel: string, before: number, after: number, resized?: boolean}>} */
  const improved = []

  for (const file of allFiles) {
    try {
      const result = await optimizeFile(file, ROOT)
      totalBefore += result.before
      totalAfter += result.after

      if (!result.skipped && result.after < result.before) {
        improved.push(result)
        const pct = (((result.before - result.after) / result.before) * 100).toFixed(0)
        console.log(
          `✓ ${result.rel}: ${formatBytes(result.before)} → ${formatBytes(result.after)} (-${pct}%)${result.resized ? ' [resized]' : ''}`,
        )
      }
    } catch (err) {
      console.error(`✗ ${relative(ROOT, file)}: ${err instanceof Error ? err.message : err}`)
    }
  }

  const saved = totalBefore - totalAfter
  const savedPct = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : '0'

  console.log('\n--- Summary ---')
  console.log(`Files processed: ${allFiles.length}`)
  console.log(`Files improved:  ${improved.length}`)
  console.log(`Total before:    ${formatBytes(totalBefore)}`)
  console.log(`Total after:     ${formatBytes(totalAfter)}`)
  console.log(`Saved:           ${formatBytes(saved)} (${savedPct}%)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
