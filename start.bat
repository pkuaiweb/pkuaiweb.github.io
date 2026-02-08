@echo off
chcp 65001 >nul
echo.
echo Starting PKU AI Web local development server...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo First run detected, installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo The browser will open automatically after the server starts
echo Press Ctrl+C to stop the server
echo.
echo -----------------------------------
echo.

REM Start the development server
call npm run dev

echo.
echo Development server stopped
pause
