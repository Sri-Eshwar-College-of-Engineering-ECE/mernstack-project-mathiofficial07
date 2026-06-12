@echo off
echo Starting cleanup...
del /F /Q src\App.tsx 2>nul
del /F /Q src\main.tsx 2>nul
del /F /Q tsconfig.json 2>nul
del /F /Q tsconfig.app.json 2>nul
del /F /Q tsconfig.node.json 2>nul
del /F /Q vite.config.ts 2>nul
del /F /Q tailwind.config.ts 2>nul
del /F /Q src\vite-env.d.ts 2>nul
echo Cleanup attempted.
