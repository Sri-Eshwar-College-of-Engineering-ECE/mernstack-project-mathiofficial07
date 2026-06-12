$ErrorActionPreference = "SilentlyContinue"
echo "Starting final polish..."

# Favicon
$srcFavicon = "C:/Users/mathi/.gemini/antigravity/brain/450f5b96-57a0-4723-a422-6a9d7d0036d3/cashew_favicon_1773236485686.png"
$destFavicon = "d:/FST_Projects/cashew-commerce-hub-main/public/favicon.png"
if (Test-Path $srcFavicon) {
    Copy-Item -Path $srcFavicon -Destination $destFavicon -Force
    echo "Favicon copied."
}

# Cleanup TS files in src
echo "Cleaning up src directory..."
Get-ChildItem -Path "d:/FST_Projects/cashew-commerce-hub-main/src" -Recurse -Include *.ts, *.tsx | Remove-Item -Force
echo "TS files removed."

# Cleanup root TS configs
echo "Cleaning up root configurations..."
$rootFiles = @(
    "tsconfig.json", "tsconfig.app.json", "tsconfig.node.json", 
    "vite.config.ts", "tailwind.config.ts", "vitest.config.ts", 
    "playwright.config.ts", "playwright-fixture.ts", "src/vite-env.d.ts"
)
foreach ($f in $rootFiles) {
    $path = Join-Path "d:/FST_Projects/cashew-commerce-hub-main" $f
    if (Test-Path $path) {
        Remove-Item -Path $path -Force
        echo "Deleted $f"
    }
}

# Cleanup temporary scripts
echo "Cleaning up temporary scripts..."
$tempScripts = @(
    "cleanup_ts.js", "final_convert.js", "batch_ui_convert.js", 
    "convert_ts_to_js.js", "cleanup.bat", "convert.js", "final_polish.ps1", "cleanup_ts.js", "conversion_debug.log", "conversion.log", "final_conversion.log"
)
foreach ($s in $tempScripts) {
    $path = Join-Path "d:/FST_Projects/cashew-commerce-hub-main" $s
    if (Test-Path $path) {
        Remove-Item -Path $path -Force
        echo "Deleted script $s"
    }
}

echo "Final polish and cleanup complete!"
