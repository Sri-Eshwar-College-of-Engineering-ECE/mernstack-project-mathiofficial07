@echo off
del /s /q src\*.ts src\*.tsx *.ts *.tsx
rmdir /s /q supabase src\integrations\supabase
del batch_ui_convert.js cleanup.bat cleanup_ts.js convert.js convert_ts_to_js.js final_cleanup.js final_convert.js final_polish.ps1 kill_ts.bat tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts vitest.config.ts tailwind.config.ts playwright.config.ts playwright-fixture.ts
echo Cleanup complete.
