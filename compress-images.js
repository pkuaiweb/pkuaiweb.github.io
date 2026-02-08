#!/usr/bin/env node

import { readdir, stat, readFile, writeFile } from 'fs/promises'
import { join, relative, extname } from 'path'
import sharp from 'sharp'

const COMPRESSION_LOG = '.image-compression-log.json'
const PUBLIC_IMG_DIR = './public/img'
const TARGET_MAX_WIDTH = 800  // 头像不需要太大
const QUALITY = 80  // JPEG 质量
const MIN_SIZE_TO_COMPRESS = 100 * 1024  // 只压缩大于 100KB 的图片

// 加载已压缩记录
async function loadCompressionLog() {
  try {
    const data = await readFile(COMPRESSION_LOG, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { compressed: {}, lastRun: null }
  }
}

// 保存压缩记录
async function saveCompressionLog(log) {
  await writeFile(COMPRESSION_LOG, JSON.stringify(log, null, 2))
}

// 递归获取所有图片
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

// 获取文件大小
async function getFileSize(filePath) {
  const stats = await stat(filePath)
  return stats.size
}

// 格式化文件大小
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// 压缩单个图片
async function compressImage(filePath, log) {
  const relativePath = relative(process.cwd(), filePath)
  const originalSize = await getFileSize(filePath)

  // 检查是否已压缩过
  if (log.compressed[relativePath]) {
    console.log(`⏭️  Skipped (already compressed): ${relativePath}`)
    return { skipped: true }
  }

  // 检查是否需要压缩
  if (originalSize < MIN_SIZE_TO_COMPRESS) {
    console.log(`⏭️  Skipped (too small): ${relativePath} (${formatSize(originalSize)})`)
    return { skipped: true }
  }

  try {
    // 读取图片信息
    const image = sharp(filePath)
    const metadata = await image.metadata()

    // 构建压缩管道
    let pipeline = sharp(filePath)

    // 如果图片宽度超过目标宽度，则调整大小
    if (metadata.width > TARGET_MAX_WIDTH) {
      pipeline = pipeline.resize(TARGET_MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
    }

    // 根据格式压缩
    const ext = extname(filePath).toLowerCase()
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 })
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, progressive: true })
    }

    // 保存压缩后的图片（覆盖原文件）
    await pipeline.toFile(filePath + '.tmp')

    // 检查压缩后的大小
    const compressedSize = await getFileSize(filePath + '.tmp')

    // 只有压缩后更小才替换
    if (compressedSize < originalSize) {
      await writeFile(filePath, await readFile(filePath + '.tmp'))

      const savedPercentage = ((1 - compressedSize / originalSize) * 100).toFixed(1)
      console.log(`✅ Compressed: ${relativePath}`)
      console.log(`   ${formatSize(originalSize)} → ${formatSize(compressedSize)} (saved ${savedPercentage}%)`)

      // 记录压缩信息
      log.compressed[relativePath] = {
        originalSize,
        compressedSize,
        savedPercentage: parseFloat(savedPercentage),
        timestamp: new Date().toISOString()
      }

      // 删除临时文件
      await import('fs').then(fs => fs.promises.unlink(filePath + '.tmp'))

      return { compressed: true, originalSize, compressedSize }
    } else {
      console.log(`⏭️  Skipped (no benefit): ${relativePath}`)
      await import('fs').then(fs => fs.promises.unlink(filePath + '.tmp'))
      return { skipped: true }
    }

  } catch (error) {
    console.error(`❌ Error compressing ${relativePath}:`, error.message)
    return { error: true }
  }
}

// 主函数
async function main() {
  console.log('🖼️  Image Compression Tool\n')
  console.log(`📁 Scanning directory: ${PUBLIC_IMG_DIR}`)
  console.log(`📏 Target max width: ${TARGET_MAX_WIDTH}px`)
  console.log(`🎯 JPEG quality: ${QUALITY}`)
  console.log(`📦 Min size to compress: ${formatSize(MIN_SIZE_TO_COMPRESS)}\n`)

  // 加载压缩记录
  const log = await loadCompressionLog()
  console.log(`📋 Loaded compression log (${Object.keys(log.compressed).length} files previously compressed)\n`)

  // 获取所有图片
  const images = await getAllImages(PUBLIC_IMG_DIR)
  console.log(`🔍 Found ${images.length} images\n`)

  // 压缩统计
  let stats = {
    total: images.length,
    compressed: 0,
    skipped: 0,
    errors: 0,
    totalOriginalSize: 0,
    totalCompressedSize: 0
  }

  // 逐个压缩
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

  // 更新日志
  log.lastRun = new Date().toISOString()
  await saveCompressionLog(log)

  // 输出统计
  console.log('\n' + '═'.repeat(60))
  console.log('📊 Compression Summary')
  console.log('═'.repeat(60))
  console.log(`Total images scanned: ${stats.total}`)
  console.log(`✅ Compressed: ${stats.compressed}`)
  console.log(`⏭️  Skipped: ${stats.skipped}`)
  console.log(`❌ Errors: ${stats.errors}`)

  if (stats.compressed > 0) {
    const totalSaved = stats.totalOriginalSize - stats.totalCompressedSize
    const totalSavedPercentage = ((totalSaved / stats.totalOriginalSize) * 100).toFixed(1)
    console.log(`\n💾 Total space saved: ${formatSize(totalSaved)} (${totalSavedPercentage}%)`)
    console.log(`   Before: ${formatSize(stats.totalOriginalSize)}`)
    console.log(`   After: ${formatSize(stats.totalCompressedSize)}`)
  }

  console.log('\n✨ Done! Compression log saved to:', COMPRESSION_LOG)
}

main().catch(console.error)
