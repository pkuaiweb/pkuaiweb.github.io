@echo off
chcp 65001 >nul
echo.
echo 🚀 正在启动 PKU AI Web 本地开发服务器...
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules\" (
    echo 📦 首次运行，正在安装依赖...
    call npm install
    echo.
)

echo ✅ 启动开发服务器...
echo 💡 服务器启动后会自动打开浏览器
echo 💡 按 Ctrl+C 可以停止服务器
echo.
echo -----------------------------------
echo.

REM 启动开发服务器
call npm run dev

echo.
echo 👋 开发服务器已停止
pause
