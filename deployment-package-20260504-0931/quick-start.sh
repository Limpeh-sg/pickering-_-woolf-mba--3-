#!/bin/bash

# Pickering Global Campus MBA - 快速启动脚本
# 用于本地测试部署包

echo "🚀 Pickering Global Campus MBA - 快速启动"
echo "=========================================="
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未安装Node.js"
    echo "请访问 https://nodejs.org/ 下载安装"
    exit 1
fi

echo "✅ Node.js版本: $(node -v)"
echo ""

# 检查是否在部署包目录
if [ ! -d "dist" ] || [ ! -d "backend" ]; then
    echo "❌ 错误：请在部署包根目录运行此脚本"
    exit 1
fi

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
npm install --production
cd ..
echo "✅ 后端依赖安装完成"
echo ""

# 检查环境变量
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到.env文件"
    echo "正在从.env.example创建..."
    cp .env.example .env
    echo "✅ 已创建.env文件，请编辑配置"
    echo ""
fi

# 启动后端服务器
echo "🔧 启动后端服务器..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..
echo "✅ 后端服务器已启动 (PID: $BACKEND_PID)"
echo "   API地址: http://localhost:3001"
echo ""

# 启动前端服务器
echo "🌐 启动前端服务器..."
cd dist
npx serve -s . -p 3000 &
FRONTEND_PID=$!
cd ..
echo "✅ 前端服务器已启动 (PID: $FRONTEND_PID)"
echo "   网站地址: http://localhost:3000"
echo ""

echo "=========================================="
echo "🎉 启动完成！"
echo ""
echo "📝 访问地址："
echo "   前端: http://localhost:3000"
echo "   后端: http://localhost:3001"
echo ""
echo "⏹️  停止服务："
echo "   kill $FRONTEND_PID $BACKEND_PID"
echo ""
echo "或按 Ctrl+C 停止"
echo "=========================================="

# 等待用户中断
wait
