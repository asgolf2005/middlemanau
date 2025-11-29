@echo off
REM Star Smiles Website - Windows Setup Script

echo.
echo ========================================
echo   Star Smiles Website Setup (Windows)
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)

echo [OK] npm version:
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo Creating .env.local file...
    copy .env.example .env.local
    echo [OK] Created .env.local
) else (
    echo [INFO] .env.local already exists
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. npm run dev          - Start development server
echo 2. Open http://localhost:3000 in your browser
echo 3. Edit .env.local to add your API keys
echo.
echo Check QUICKSTART.md for more info
echo.
pause
