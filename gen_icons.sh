#!/bin/bash
# Generate PWA PNG icons from SVG on Replit startup
# Creates icon-192.png and icon-512.png

if [ ! -f icon-512.png ]; then
  echo "[ICONS] Generating PWA icons..."

  # Try using rsvg-convert (if available)
  if command -v rsvg-convert &> /dev/null; then
    rsvg-convert -w 512 -h 512 icon.svg -o icon-512.png
    rsvg-convert -w 192 -h 192 icon.svg -o icon-192.png
    echo "[ICONS] Done (rsvg-convert)"

  # Try using ImageMagick
  elif command -v convert &> /dev/null; then
    convert -resize 512x512 icon.svg icon-512.png
    convert -resize 192x192 icon.svg icon-192.png
    echo "[ICONS] Done (ImageMagick)"

  # Try using sharp (Node.js)
  else
    node -e "
      const sharp = require('sharp');
      const fs = require('fs');
      const svg = fs.readFileSync('icon.svg');
      sharp(svg).resize(512, 512).png().toFile('icon-512.png').then(() => {
        return sharp(svg).resize(192, 192).png().toFile('icon-192.png');
      }).then(() => console.log('[ICONS] Done (sharp)')).catch(e => {
        // Fallback: create simple solid-color PNG
        console.log('[ICONS] No image tools — creating placeholder icons');
        const { createCanvas } = require('canvas');
      }).catch(() => {
        // Last resort: copy SVG as placeholder
        fs.copyFileSync('icon.svg', 'icon-512.png');
        fs.copyFileSync('icon.svg', 'icon-192.png');
        console.log('[ICONS] Using SVG placeholder');
      });
    " 2>/dev/null || {
      cp icon.svg icon-512.png
      cp icon.svg icon-192.png
      echo "[ICONS] Using SVG as icon"
    }
  fi
else
  echo "[ICONS] Already exist"
fi