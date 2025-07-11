@echo off
echo Building Kona Charging Tracker for Windows...

echo.
echo Step 1: Building React application...
call npm run build
if %errorlevel% neq 0 (
    echo Error building React app
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Electron dependencies...
cd electron
call npm install
if %errorlevel% neq 0 (
    echo Error installing Electron dependencies
    pause
    exit /b 1
)

echo.
echo Step 3: Building Windows installer...
call npm run build:win
if %errorlevel% neq 0 (
    echo Error building Windows app
    pause
    exit /b 1
)

echo.
echo Build completed successfully!
echo Your installer is in the electron/dist/ folder
pause