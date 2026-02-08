#!/bin/bash

# 一键启动本地开发服务器脚本
# 用途：快速启动项目并在浏览器中预览网页

echo "🚀 正在启动 PKU AI Web 本地开发服务器..."
echo ""

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    echo ""
fi

echo "✅ 启动开发服务器..."
echo "💡 服务器启动后会自动打开浏览器"
echo "💡 按 Ctrl+C 可以停止服务器"
echo ""
echo "-----------------------------------"
echo ""

# 启动开发服务器
npm run dev

# 如果服务器被停止
echo ""
echo "👋 开发服务器已停止"
