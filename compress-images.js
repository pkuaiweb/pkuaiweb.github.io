#!/usr/bin/env node

import { readdir, stat, readFile, writeFile } from 'fs/promises'
import { join, relative, extname } from 'path'
import sharp from 'sharp'

const COMPRESSION_LOG = '.image-compression-log.json'
const PUBLIC_IMG_DIR = './public/img'
const TARGET_MAX_WIDTH = 800  // Avatars don't need to be too large
const QUALITY = 80  // JPEG quality
const MIN_SIZE_TO_COMPRESS = 100 * 1024  // Only compress images larger than 100KB

// Load compression log
async function loadCompressionLog() {
  try {
    const data = await readFile(COMPRESSION_LOG, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { compressed: {}, lastRun: null }
  }
}

// Save compression log
async function saveCompressionLog(log) {
  await writeFile(COMPRESSION_LOG, JSON.stringify(log, null, 2))
}

// Recursively get all images
async function getAllImages(dir) {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath))
    } else {
      const ext = extname(entry.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

// Get file size
async function getFileSize(filePath) {
  const stats = await stat(filePath)
  return stats.size
}

// Format file size
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// Compress a single image
async function compressImage(filePath, log) {
  const relativePath = relative(process.cwd(), filePath)
  const originalSize = await getFileSize(filePath)

  // Check if already compressed
  if (log.compressed[relativePath]) {
    console.log(`Skipped (already compressed): ${relativePath}`)
    return { skipped: true }
  }

  // Check if compression is needed
  if (originalSize < MIN_SIZE_TO_COMPRESS) {
    console.log(`Skipped (too small): ${relativePath} (${formatSize(originalSize)})`)
    return { skipped: true }
  }

  try {
    // Read image info
    const image = sharp(filePath)
    const metadata = await image.metadata()

    // Build compression pipeline
    let pipeline = sharp(filePath)

    // Resize if image width exceeds target
    if (metadata.width > TARGET_MAX_WIDTH) {
      pipeline = pipeline.resize(TARGET_MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
    }

    // Compress based on format
    const ext = extname(filePath).toLowerCase()
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 })
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, progressive: true })
    }

    // Save compressed image (overwrite original)
    await pipeline.toFile(filePath + '.tmp')

    // Check compressed size
    const compressedSize = await getFileSize(filePath + '.tmp')

    // Only replace if compressed version is smaller
    if (compressedSize < originalSize) {
      await writeFile(filePath, await readFile(filePath + '.tmp'))

      const savedPercentage = ((1 - compressedSize / originalSize) * 100).toFixed(1)
      console.log(`Compressed: ${relativePath}`)
      console.log(`   ${formatSize(originalSize)} -> ${formatSize(compressedSize)} (saved ${savedPercentage}%)`)

      // Record compression info
      log.compressed[relativePath] = {
        originalSize,
        compressedSize,
        savedPercentage: parseFloat(savedPercentage),
        timestamp: new Date().toISOString()
      }

      // Delete temp file
      await import('fs').then(fs => fs.promises.unlink(filePath + '.tmp'))

      return { compressed: true, originalSize, compressedSize }
    } else {
      console.log(`Skipped (no benefit): ${relativePath}`)
      await import('fs').then(fs => fs.promises.unlink(filePath + '.tmp'))
      return { skipped: true }
    }

  } catch (error) {
    console.error(`Error compressing ${relativePath}:`, error.message)
    return { error: true }
  }
}

// Main function
async function main() {
  console.log('Image Compression Tool\n')
  console.log(`Scanning directory: ${PUBLIC_IMG_DIR}`)
  console.log(`Target max width: ${TARGET_MAX_WIDTH}px`)
  console.log(`JPEG quality: ${QUALITY}`)
  console.log(`Min size to compress: ${formatSize(MIN_SIZE_TO_COMPRESS)}\n`)

  // Load compression log
  const log = await loadCompressionLog()
  console.log(`Loaded compression log (${Object.keys(log.compressed).length} files previously compressed)\n`)

  // Get all images
  const images = await getAllImages(PUBLIC_IMG_DIR)
  console.log(`Found ${images.length} images\n`)

  // Compression stats
  let stats = {
    total: images.length,
    compressed: 0,
    skipped: 0,
    errors: 0,
    totalOriginalSize: 0,
    totalCompressedSize: 0
  }

  // Compress one by one
  for (const imagePath of images) {
    const result = await compressImage(imagePath, log)

    if (result.compressed) {
      stats.compressed++
      stats.totalOriginalSize += result.originalSize
      stats.totalCompressedSize += result.compressedSize
    } else if (result.skipped) {
      stats.skipped++
    } else if (result.error) {
      stats.errors++
    }
  }

  // Update log
  log.lastRun = new Date().toISOString()
  await saveCompressionLog(log)

  // Output stats
  console.log('\n' + '='.repeat(60))
  console.log('Compression Summary')
  console.log('='.repeat(60))
  console.log(`Total images scanned: ${stats.total}`)
  console.log(`Compressed: ${stats.compressed}`)
  console.log(`Skipped: ${stats.skipped}`)
  console.log(`Errors: ${stats.errors}`)

  if (stats.compressed > 0) {
    const totalSaved = stats.totalOriginalSize - stats.totalCompressedSize
    const totalSavedPercentage = ((totalSaved / stats.totalOriginalSize) * 100).toFixed(1)
    console.log(`\nTotal space saved: ${formatSize(totalSaved)} (${totalSavedPercentage}%)`)
    console.log(`   Before: ${formatSize(stats.totalOriginalSize)}`)
    console.log(`   After: ${formatSize(stats.totalCompressedSize)}`)
  }

  console.log('\nDone! Compression log saved to:', COMPRESSION_LOG)
}

main().catch(console.error)
