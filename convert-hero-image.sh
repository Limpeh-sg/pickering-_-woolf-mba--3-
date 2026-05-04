#!/bin/bash

# Script to convert the uploaded campus image to optimized WebP format
# Usage: ./convert-hero-image.sh <input-image-path>

INPUT_IMAGE="$1"
OUTPUT_PATH="public/pgc_mba_landing_images/hero-campus-billboard.webp"

if [ -z "$INPUT_IMAGE" ]; then
    echo "❌ Error: Please provide the input image path"
    echo "Usage: ./convert-hero-image.sh <input-image-path>"
    exit 1
fi

if [ ! -f "$INPUT_IMAGE" ]; then
    echo "❌ Error: Input image not found: $INPUT_IMAGE"
    exit 1
fi

echo "🖼️  Converting image to WebP format..."
echo "   Input: $INPUT_IMAGE"
echo "   Output: $OUTPUT_PATH"
echo ""

# Convert to WebP with optimization
# -q 85: Quality 85% (good balance between size and quality)
# -resize 1920 0: Resize width to 1920px, maintain aspect ratio
# -m 6: Maximum compression effort
cwebp -q 85 -resize 1920 0 -m 6 "$INPUT_IMAGE" -o "$OUTPUT_PATH"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Image converted and saved to:"
    echo "   $OUTPUT_PATH"
    echo ""
    
    # Show file size
    if [ -f "$OUTPUT_PATH" ]; then
        SIZE=$(du -h "$OUTPUT_PATH" | cut -f1)
        echo "📦 File size: $SIZE"
    fi
else
    echo ""
    echo "❌ Error: Conversion failed"
    exit 1
fi
