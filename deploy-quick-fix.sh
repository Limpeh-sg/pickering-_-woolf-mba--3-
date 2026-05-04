#!/bin/bash

# 🚀 快速部署修复脚本
# 用于修复 Netlify 部署失败问题

echo "🔧 开始修复部署问题..."
echo ""

# 1. 清理旧的构建
echo "📦 清理旧的构建文件..."
rm -rf dist
rm -rf node_modules/.vite
echo "✅ 清理完成"
echo ""

# 2. 测试构建
echo "🏗️  测试本地构建..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 3. 检查构建输出
echo "📋 检查构建输出..."
if [ -d "dist" ]; then
    echo "✅ dist 目录存在"
    echo "📁 dist 目录内容:"
    ls -lh dist/ | head -10
    echo ""
else
    echo "❌ dist 目录不存在"
    exit 1
fi

# 4. 检查关键文件
echo "🔍 检查关键文件..."
files_to_check=(
    "dist/index.html"
    "dist/assets"
    "dist/pgc_mba_landing_images/hero-campus-billboard.webp"
)

for file in "${files_to_check[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "⚠️  $file 不存在"
    fi
done
echo ""

# 5. 显示构建统计
echo "📊 构建统计:"
echo "总文件数: $(find dist -type f | wc -l)"
echo "总大小: $(du -sh dist | cut -f1)"
echo ""

# 6. 提示下一步
echo "🎉 本地构建验证完成！"
echo ""
echo "📝 下一步操作:"
echo "1. 如果使用 Git，提交更改:"
echo "   git add ."
echo "   git commit -m 'Fix deployment issues'"
echo "   git push"
echo ""
echo "2. 或者使用 Netlify CLI 手动部署:"
echo "   netlify deploy --prod"
echo ""
echo "3. 或者在 Netlify Dashboard 中触发重新部署"
echo ""
echo "✨ 祝部署顺利！"
