# Image Compression Tool Guide

## Features

- **Smart Compression**: Only compresses images larger than 100KB
- **Avoids Duplicates**: Automatically records compressed images to prevent re-compression
- **Uniform Sizing**: Resizes oversized images to a max width of 800px (suitable for avatars)
- **High Quality**: JPEG quality 80, maintaining clarity
- **Detailed Logging**: Records compression details and space savings for each image
- **Safe & Reliable**: Only replaces the original file if the compressed version is smaller

## Install Dependencies

Install the sharp image processing library before first use:

```bash
npm install
```

## Usage

### Compress All Images
```bash
npm run compress-images
```

### The tool will automatically:
1. Scan all `.jpg`, `.jpeg`, `.png` images under the `public/img` directory
2. Skip images smaller than 100KB
3. Skip previously compressed images (recorded in `.image-compression-log.json`)
4. Compress large images:
   - Resize images wider than 800px to 800px
   - Set JPEG quality to 80
   - Use maximum compression level for PNG
5. Only replace the original if the compressed version is smaller
6. Display a detailed compression report

## Example Output

```
Image Compression Tool

Scanning directory: ./public/img
Target max width: 800px
JPEG quality: 80
Min size to compress: 100.0 KB

Loaded compression log (0 files previously compressed)

Found 21 images

Skipped (too small): public/img/placeholder.png (6.2 KB)
Compressed: public/img/people/liumugeng.jpg
   2.7 MB -> 156.3 KB (saved 94.2%)
Compressed: public/img/people/jizhe.jpg
   1.6 MB -> 142.8 KB (saved 91.1%)

============================================================
Compression Summary
============================================================
Total images scanned: 21
Compressed: 15
Skipped: 6
Errors: 0

Total space saved: 8.2 MB (88.5%)
   Before: 9.3 MB
   After: 1.1 MB

Done! Compression log saved to: .image-compression-log.json
```

## Compression Log

The tool generates a `.image-compression-log.json` file in the project root, recording:
- Compression info for each image
- Original and compressed sizes
- Saved percentage
- Compression timestamp

Example:
```json
{
  "compressed": {
    "public/img/people/liumugeng.jpg": {
      "originalSize": 2831360,
      "compressedSize": 160051,
      "savedPercentage": 94.3,
      "timestamp": "2026-02-09T00:30:45.123Z"
    }
  },
  "lastRun": "2026-02-09T00:30:45.789Z"
}
```

## Configuration Parameters

Adjustable in `compress-images.js`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `TARGET_MAX_WIDTH` | 800 | Max image width (pixels) |
| `QUALITY` | 80 | JPEG compression quality (1-100) |
| `MIN_SIZE_TO_COMPRESS` | 100KB | Minimum file size to compress |

## Re-compress All Images

To re-compress all images with new parameters:
```bash
# Delete compression log
rm .image-compression-log.json

# Re-run compression
npm run compress-images
```

## Notes

- **Original files will be overwritten**: Compression replaces the original image directly. It's recommended to commit to Git first.
- **sharp library dependency**: Requires compiling native modules; the first installation may be slow.
- **Incremental runs**: Can be run multiple times; only newly added images will be processed.

## Integration with Deployment Workflow

It's recommended to run compression before deployment:
```bash
npm run compress-images    # Compress images
./deploy.sh                # Build and deploy
```
