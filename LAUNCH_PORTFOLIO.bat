
@echo off
title Saurav Kumar - AI Engineer and Data Scientist Portfolio

echo ============================================================================
echo       SAURAV KUMAR - AI PORTFOLIO
echo ============================================================================
echo.

cd /d "%~dp0frontend"

if not exist "package.json" (
    echo ERROR: Frontend folder or package.json not found.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo Starting the latest React portfolio...
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:5173"

call npm run dev -- --host 127.0.0.1

pause
