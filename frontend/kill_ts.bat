@echo off
del /s /q /f src\*.tsx src\*.ts
del /q /f tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts tailwind.config.ts vitest.config.ts playwright.config.ts playwright-fixture.ts src\vite-env.d.ts
echo DONE
